/* @jsx h */
import { h, Component } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import { getNonce, getVastUrl } from '../utils';

let vastplayer;

/**
 * Inserts a Good-Loop ad in the DOM - but loads it in/via a VPAID container.
 * Used for testing VPAID-specific aspects of ad behaviour in an environment we control.
 */
class VpaidAd extends Component {
	shouldComponentUpdate(nextProps) {
		return getNonce(nextProps) !== getNonce(this.props);
	}

	render({size, vertId, ...props}) {
		const container = useRef(null);

		// Changes if size or ad ID changes - breaks identity on script & container so they get removed on next render
		const nonce = getNonce(this.props);

		// Firefox private browsing strips the REFERER header down to domain only. (Other browsers may well follow)
		// And unlike the adunit unit.json request, which forcibly passes the top
		// page URL as a param, vast.xml calls rely wholly on REFERER.
		// So as a shim, we need to explicitly place the gl.* params on the vast.xml call.
		const params = {};
		Object.entries(props).forEach(([key, value]) => {
			if (key.match(/gl\./)) params[key] = value;
			if (key === 'forceServerType') params[key] = value; // Hack: getVastUrl should be told if we want to override e.g. test to prod
		});
		params['gl.size'] = size;

		// Whenever container changes...
		useEffect(() => {
			if (container.current) {
				// New container? Start a new VAST player.
				vastplayer = new VASTPlayer(container.current);
				vastplayer.load(getVastUrl({params})).then(function() { vastplayer.startAd(); });
			} else {
				// Switching away from old container? Stop the current player, if present.
				vastplayer && vastplayer.stopAd();
			}
			// Stop ad (ie destroy player) on unmount
			return () => vastplayer && vastplayer.stopAd();
		}, [container]);

		// Don't put the VPAID ad directly into the sizer! Whene VASTplayer initialises, it clones the element
		// - so Preact loses control of it, and can't e.g. remove it from the DOM when the component unmounts,
		// meaning when the advert ID changes, a second orphaned container is left behind.
		return (
			<div className={`ad-sizer ${size}`} key={nonce + '-vpaid'}>
				<div className="vpaid-container" ref={container} />
				<div className="aspectifier" />
			</div>
		);
	}
}

export default VpaidAd;