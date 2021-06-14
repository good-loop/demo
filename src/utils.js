
/**
 * Construct a string from the props given to GoodLoopAd or VpaidAd which only changes when the adunit should be reloaded
 */
export const getNonce = ({size, extraNonce, ...props}) => {
	// Pretend vertId passed into ad component is gl.vert, to keep nonce stable
	if (props.vertId && !props['gl.vert']) props['gl.vert'] = props.vertId;

	// Grab all gl.* URL params & sort them so they always form a stable string
	const glParamString = Object.entries(props || {})
		.filter(([k, v]) => k.match(/^gl\./))
		.sort(([k1, v1], [k2, v2]) => k1 > k2)
		.reduce((acc, [k, v]) => acc + k + v, '');
	return size + glParamString + extraNonce;
};

/** What server type are we on - prod, test, or local? */
let serverType = 'prod'; // Default to production adserver (ie running on demo or prodtest.good-loop.com)
if (window.location.hostname.match(/^local/)) {
	serverType = 'local'; // Running on localtest or localdemo.good-loop.com --> talk to localas
} else if (window.location.hostname.match(/(^test)/)) {
	serverType = 'test'; // Running on test or testdemo.good-loop.com --> talk to testas
}

/** Returns the appropriate server domain prefix for the given server type */
const getPrefix = stype => ({prod: '', test: 'test', local: 'local'}[stype]);
/** Returns the appropriate http(s) protocol for the given server type */
const getProtocol = (prefix) => (prefix === 'local') ? 'http:' : 'https:';

const glBaseUrl = `${window.location.protocol}//${getPrefix(serverType)}as.good-loop.com/`


/** Get the URL for an ad file (eg unit.js, unit.json, vast.xml) with appropriate server type and parameters */
export const getAdUrl = ({file = 'unit.js', forceServerType, unitBranch, ...params}) => {
	const isUnitJs = (file === 'unit.js');
	// Override to unit(-debug).js if necessary
	if (params['gl.debug'] !== 'false' && isUnitJs) {
		file = 'unit-debug.js';
	}
	// ...and override to custom/legacy branch if requested
	if (unitBranch && isUnitJs) {
		file = `legacy-units/${unitBranch}/${file}`;
	}

	// use different server to "same type as this site" if requested
	let baseUrl = glBaseUrl;
	if (forceServerType) {
		baseUrl = `${getProtocol(forceServerType)}//${getPrefix(forceServerType)}as.good-loop.com/`;
	}

	const url = new URL(baseUrl + file);

	// append gl.* parameters
	if (params) {
		Object.entries(params).forEach(([name, value]) => {
			if (name.match(/^gl\./) && value) url.searchParams.set(name, value);
		});
	}
	return url.toString();
};


/** Copy-paste from adunit... Examines the given element & returns how much of its area is in the viewport (if not behind another element) */
export const visibleElement = (element) => {
	try {
		// element may be in a different context from us - get the relevant document
		const doc = element.ownerDocument;

		if (element.offsetWidth === 0 || element.offsetHeight === 0) return false;
		const height = doc.documentElement.clientHeight;
		const width = doc.documentElement.clientWidth;
		const rects = element.getClientRects();

		const on_top = function(rect) {
			const x = (rect.left + rect.right) / 2;
			const y = (rect.top + rect.bottom) / 2;
			return element.contains(doc.elementFromPoint(x, y));
		};

		for (let i = 0, length = rects.length; i < length; i++) {
			const rect = rects[i];
			const rectHeight = rect.bottom - rect.top;
			const rectWidth = rect.right - rect.left;
			const visibleHeight = Math.min(height, rect.bottom) - Math.max(0, rect.top);
			const visibleWidth = Math.min(width, rect.right) - Math.max(0, rect.left);
			const visibleFraction = (visibleHeight / rectHeight) * (visibleWidth / rectWidth);
			if (visibleFraction <= 0 ) return false;
			if ( ! on_top(rect)) return false;
			return visibleFraction;
		}
		return true;
	} catch(err) {
		console.warn(err); // WTF?
		return false;
	}
}; // ./visibleElement


export const getServer = () => {
	let server = new URLSearchParams(window.location.search).get('server');
	if (server) {
		return server;
	}
	if (window.location.hostname.match(/^(test)/)) server = 'test';
	if (window.location.hostname.match(/^(local)/)) server = 'local';
	if (!server) server = 'prod';
	return server;
};

/**
 * TODO There are a lot of hyper-specific behaviours here and in MockFeed triggered
 * by advert ID being === DEFAULT_PROD_AD... There must be a better way.
 */

// for testing, allow server to be set via server=production|test|local
let server = getServer();
let portalPrefix = server === 'prod' ? '' : server;
let protocol = window.location.protocol;
if (portalPrefix != 'local') protocol = 'https:';

// const prodIds = { vert: DEFAULT_PROD_SOCIAL_AD, vertiser: DEFAULT_PROD_SOCIAL_ADVERTISER };
//  const getFromPortal = ({ type, id, callback, status }) => {
// 	 // default ad / advertiser should come from production
// 	 const serverBase = (prodIds[type] === id) ? (
// 		 'https://portal.good-loop.com'
// 	 ) : (
// 		 `${protocol}//${portalPrefix}portal.good-loop.com`
// 	 )
// 	 const url = `${serverBase}/${type}/${id}.json${status ? `?status=${status}` : ''}`;
 
// 	 fetch(url)
// 	 .then(res => res.json())
// 	 .then(({cargo}) => callback && callback(cargo));
//  };
 
export const getAdvertFromPortal = ({id, callback, status}) => {
	 let adUrl = `${protocol}//${portalPrefix}portal.good-loop.com/vert/${id}.json`;
 
	 if (status) adUrl += `?status=${status}`
	 // Fetch the portal data, extract its json (json() returns a Promise) and execute the supplied callback
	 return fetch(adUrl)
		 .then(res => res.json())
		 .then(({cargo}) => callback && callback(cargo));
 };

 export const getAdvertFromAS = ({id, params = {}}) => {
	const adUrl = getAdUrl({file: 'unit.json', 'gl.vert': id, ...params});

	// Fetch the portal data, extract its json (json() returns a Promise) and execute the supplied callback
	return fetch(adUrl).then(res => res.json());
};
 
 export const getVertiserFromPortal = ({id, callback, status}) => {
	 let url = `${protocol}//${portalPrefix}portal.good-loop.com/vertiser/${id}.json`;
 
	 if (status) url += `?status=${status}`
		 fetch(url)
		 .then(res => res.json())
		 .then(({cargo}) => callback && callback(cargo));
 };
 