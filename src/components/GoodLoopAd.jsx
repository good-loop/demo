/* @jsx h */
import { h, Fragment, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getAdvertFromPortal, getNonce, getUnitUrl } from '../utils';

/**
 * How is this different from the React GoodLoopAd.jsx used in the portal?
 * This takes advantage of the fact that - unlike in React - Preact allows you to insert a <script>
 * tag in a component, and it will load and execute just as if you'd placed it in the DOM with e.g.
 * document.createElement - which allows for much simpler code.
 * It also doesn't provide for replacing custom CSS without reloading the whole adunit.
 * 
 */
class GoodLoopAd extends Component {
	shouldComponentUpdate(nextProps) {
		return getNonce(nextProps) !== getNonce(this.props);
	}

	render({size, vertId, production, bare, extraNonce, delivery, refPolicy = 'no-referrer-when-downgrade', ...params}) {
		// Load the ad
		const [advert, setAdvert] = useState(null); // Advert object as retrieved from portal	
		// On mounting element or changing advert ID, fetch the advert from the portal.
		// This is for legacyUnitBranch
		// TODO Rather than portal, get unit.json from the ad server and insert its contents in a div with ID #preloaded-unit-json
		// in the .goodloopad div - BehaviourLoadUnit will find it and use it, saving the latency of another round-trip.
		useEffect(() => {
			getAdvertFromPortal({id: vertId, callback: setAdvert, status: params['gl.status']});
		}, [vertId]);
		if (!advert) {
			return null; // do we have a spinner we can use??
		}
		// Changes if size or ad ID changes - breaks identity on script & container so they get removed on next render
		const nonce = getNonce(this.props);

		const unitUrl = getUnitUrl({
			production,
			delivery,
			params: {
				'gl.vert': vertId,
				'gl.delivery': delivery,
				...params,
			},
			legacyUnitBranch: advert.legacyUnitBranch
		});

		const bareElements = <>
			<div className="goodloopad" data-format={size} data-mobile-format={size} key={nonce + '-container'}/>
			<script src={unitUrl} key={nonce + '-script'} referrerPolicy={refPolicy} />
		</>;

		// Aspectifier isn't always wanted - eg in fullscreen mode where making the
		// container 100% width and forcing it to 16:9 aspect will cause overflow
		if (bare) return bareElements;
		
		return (
			<div className={`ad-sizer ${size}`} key={nonce + '-direct'}>
				<div className="aspectifier" />
				{bareElements}
			</div>
		);
	}
};

export default GoodLoopAd;