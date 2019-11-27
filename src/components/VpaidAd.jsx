/* @jsx h */
import { h, Component } from 'preact';
import { useRef, useEffect } from 'preact/hooks';

// Decide which adserver to use and record it here - it's used in multiple places.
// This page can be accessed via localtest.gl.com, test.gl.com, or prodtest.gl.com
let prefix = 'test';
if (window.location.hostname.match(/^local/)) { prefix = 'local'; }
else if (window.location.hostname.match(/^prod/)) { prefix = ''; }
const glVastUrl = `${window.location.protocol}//${prefix}as.good-loop.com/vast.xml`;

let vastplayer;

class VpaidAd extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.nonce !== this.props.nonce;
	}

	render({size, vertId, nonce}) {
		const container = useRef(null);

		// run whenever container changes
		useEffect(() => {
			if (container.current) {
				const fullVastUrl = glVastUrl + (vertId ? `?gl.vert=${vertId}` : '');
				console.log('container', container);
				vastplayer = new VASTPlayer(container.current);
				vastplayer.load(fullVastUrl).then(function() { vastplayer.startAd(); });
			} else {
				vastplayer && vastplayer.stopAd();
			}
			// Stop ad (ie destroy player) on unmount
			return () => vastplayer && vastplayer.stopAd();
		}, [container]);

		// Don't put the VPAID ad directly into the sizer! It seems to clone the element and break identity
		// - so Preact loses control of it, and can't remove it from the DOM when the component unmounts.
		return (
			<div className={`ad-sizer ${size}`} key={nonce + '-vpaid'} >
				<div className="vpaid-container" ref={container} />
				<div className="aspectifier" />
			</div>
		);
	}
}

export default VpaidAd;