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

const unitTypeToSize = {
	landscape: 'landscape',
	portrait: 'portrait',
	trees: 'landscape',
};

const playerVariantToSize = {
	'landscape-a': 'landscape',
	'landscape-b': 'landscape',
	'landscape-tall': 'landscape',
	'trees': 'landscape',
	'trees-xmas': 'landscape',
};

/**
 * Approximately replicate the adunit's unit-type selection behaviour
 * so we can size the frame correctly in cases like the Levi's ad where
 * it will try to render as landscape regardless of container
 */
const sizeFromUnit = (unitObj) => {
	// URL param takes #1 priority...
	const unitTypeParam = new URLSearchParams(window.location.search).get('gl.unitType');
	if (unitTypeParam && unitTypeToSize[unitTypeParam]) return unitTypeToSize[unitTypeParam];
	// ...and then vert.advanced.playerVariant
	const playerVariant = unitObj.vert.advanced?.playerVariant;
	if (playerVariant && playerVariantToSize[playerVariant]) return playerVariantToSize[playerVariant];
	// Looks like the unit has no conclusive opinions about the size/shape of container it should be in.
	return null;
};

/**
 * How is this different from the React GoodLoopAd.jsx used in the portal?
 * This takes advantage of the fact that - unlike in React - Preact allows you to insert a <script>
 * tag in a component, and it will load and execute just as if you'd placed it in the DOM with e.g.
 * document.createElement - which allows for much simpler code.
 * It also doesn't provide for replacing custom CSS without reloading the whole adunit.
 * See VpaidAd.jsx for an adunit loader which inserts it using a VAST/VPAID player, instead of directly.
 */

const GoodLoopAd = ({size, vertId, bare, extraNonce, refPolicy = 'no-referrer-when-downgrade', onUnitJson, ...params}) => {
	// there's a race condition when using legacy units that means variant.delivery / gl.delivery gets unset
	// this stops the unit rendering TODO resolve later by merging params.variant on unit.json load - but for now shim it here
	if (!params['gl.delivery']) params['gl.delivery'] = 'direct'; // don't overwrite delivery=app on social page!

	// Load the ad
	const [unitJson, setUnitJson] = useState(null); // Preloaded unit.json
	const [unitBranch, setUnitBranch] = useState(false); // Extracted from unit.json: vert.legacyUnitBranch
	const [sizeOverride, setSizeOverride] = useState(); // Is the advert set up to force a different size from the container?

	// Fetch the advert from *as.good-loop.com so we can check if it has a legacy branch
	useEffect(() => {
		// respect new dataServer (ie "get unit.json from TEST") param, fall back to old forceServerType param
		const forceServerType = params.dataServer || params.forceServerType;
		getAdvertFromAS({id: vertId, params: {...params, forceServerType} }).then(unitObj => {
			if (onUnitJson) onUnitJson(unitObj); // Send back to calling component if a callback was supplied
			setUnitJson(JSON.stringify(unitObj));
			setUnitBranch(unitObj.vert.legacyUnitBranch || '');
			// Do we need to use a weird sizer like landscape-in-portrait?
			const sfu = sizeFromUnit(unitObj);
			if (sfu && sfu !== size) {
				setSizeOverride(sfu);
			}
		});
	}, [vertId]);

	// Changes if size or ad ID changes - breaks identity on script & container so they get removed on next render
	// TODO Used to be this.props so using params means there's stuff missing, fix
	const nonce = getNonce({vertId, size, ...params});

	let adElements;
	if (!unitJson || unitBranch === false) { // Once extracted from the ad, unitBranch will be undefined, null, or a string - not logical false
		adElements = <div style={loadingStyle} />
	} else {
		// respect new codeServer (ie "get unit.js from TEST") param, fall back to old forceServerType param
		const forceServerType = params.codeServer || params.forceServerType;
		console.log('forceServerType for unit.js:', forceServerType);
		const unitUrl = getAdUrl({file: 'unit.js', ...params, forceServerType, unitBranch});

		adElements = <>
			<div className="goodloopad" data-format={sizeOverride || size} data-mobile-format={sizeOverride || size} key={nonce + '-container'} />
			<script src={unitUrl} key={nonce + '-script'} referrerPolicy={refPolicy} />
			<script id="preloaded-unit-json" type="application/json">{unitJson}</script>
		</>;
	}

	// Aspectifier isn't always wanted - eg in fullscreen mode where making the
	// container 100% width and forcing it to 16:9 aspect will cause overflow
	if (bare) return adElements;

	const sizerClasses = ['ad-sizer', size, sizeOverride && `${sizeOverride}-in-${size}`].filter(a => !!a).join(' ');
	
	return (
		<div className={sizerClasses} key={nonce + '-direct'}>
			<div className="aspectifier" />
			{adElements}
		</div>
	);
};

export default GoodLoopAd;