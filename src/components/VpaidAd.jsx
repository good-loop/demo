/* @jsx h */
import { h, Component } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import { getNonce, getVastUrl } from '../utils';

let vastplayer;

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
		});

		// run whenever container changes
		useEffect(() => {
			if (container.current) {
				vastplayer = new VASTPlayer(container.current);
				vastplayer.load(getVastUrl({params})).then(function() { vastplayer.startAd(); });
			} else {
				vastplayer && vastplayer.stopAd();
			}
			// Stop ad (ie destroy player) on unmount
			return () => vastplayer && vastplayer.stopAd();
		}, [container]);

		// Don't put the VPAID ad directly into the sizer! It seems to clone the element and break identity
		// - so Preact loses control of it, and can't remove it from the DOM when the component unmounts.
		return (
			<div className={`ad-sizer ${size}`} key={nonce + '-vpaid'}>
				<div className="vpaid-container" ref={container} />
				<div className="aspectifier" />
			</div>
		);
	}
}

export default VpaidAd;