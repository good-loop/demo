/* @jsx h */
import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getAdvertFromAS, getNonce, getAdUrl } from '../utils';

const loadingStyle = {
	position: 'absolute',
	left: 0,
	top: 0,
	width: '100%',
	height: '100%',
	backgroundColor: 'white'
};

/**
 * How is this different from the React GoodLoopAd.jsx used in the portal?
 * This takes advantage of the fact that - unlike in React - Preact allows you to insert a <script>
 * tag in a component, and it will load and execute just as if you'd placed it in the DOM with e.g.
 * document.createElement - which allows for much simpler code.
 * It also doesn't provide for replacing custom CSS without reloading the whole adunit.
 * See VpaidAd.jsx for an adunit loader which inserts it using a VAST/VPAID player, instead of directly.
 */

const GoodLoopAd = ({size, vertId, bare, extraNonce, refPolicy = 'no-referrer-when-downgrade', ...params}) => {
	// Load the ad
	const [unitJson, setUnitJson] = useState(null); // Preloaded unit.json
	const [unitBranch, setUnitBranch] = useState(false); // vert.legacyUnitBranch from the above

	// Fetch the advert from *as.good-loop.com so we can check if it has a legacy branch
	useEffect(() => {
		getAdvertFromAS({id: vertId, params}).then(unitObj => {
			setUnitBranch(unitObj.vert.legacyUnitBranch || '');
			setUnitJson(JSON.stringify(unitObj));
		});
	}, [vertId]);

	// Changes if size or ad ID changes - breaks identity on script & container so they get removed on next render
	// TODO Used to be this.props so using params means there's stuff missing, fix
	const nonce = getNonce({vertId, size, ...params});

	let adElements;
	if (!unitJson || unitBranch === false) { // Once extracted from the ad, unitBranch will be undefined, null, or a string - not logical false
		adElements = <div style={loadingStyle} />
	} else {
		// there's a race condition when using legacy units that means variant.delivery / gl.delivery gets unset
		// this stops the unit rendering TODO resolve later - but for now shim it by setting an override param
		const unitUrl = getAdUrl({file: 'unit.js', 'gl.delivery': 'direct', ...params, unitBranch});

		adElements = <>
			<div className="goodloopad" data-format={size} data-mobile-format={size} key={nonce + '-container'} />
			<script src={unitUrl} key={nonce + '-script'} referrerPolicy={refPolicy} />
			<script id="preloaded-unit-json" type="application/json">{unitJson}</script>
		</>;
	}

	// Aspectifier isn't always wanted - eg in fullscreen mode where making the
	// container 100% width and forcing it to 16:9 aspect will cause overflow
	if (bare) return adElements;
	
	return (
		<div className={`ad-sizer ${size}`} key={nonce + '-direct'}>
			<div className="aspectifier" />
			{adElements}
		</div>
	);
};

export default GoodLoopAd;