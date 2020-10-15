
/**
 * Construct a string from the props given to GoodLoopAd or VpaidAd which only changes when the adunit should be reloaded
 */
export const getNonce = (props) => {
	// Pretend vertId passed into ad component is gl.vert, to keep nonce stable
	if (props.vertId && !props['gl.vert']) props['gl.vert'] = props.vertId;

	// Grab all gl.* URL params & sort them so they always form a stable string
	const glParamString = Object.entries(props || {})
		.filter(([k, v]) => k.match(/^gl\./))
		.sort(([k1, v1], [k2, v2]) => k1 > k2)
		.reduce((acc, [k, v]) => acc + k + v, '');
	return props.size + glParamString + props.extraNonce;
};


let prefix = ''; // Default to production adserver (ie running on demo or prodtest.good-loop.com)
if (window.location.hostname.match(/^local/)) { prefix = 'local'; } // Running on localtest or localdemo.good-loop.com --> talk to localas
else if (window.location.hostname.match(/(^test)/)) { prefix = 'test'; } // Running on test or testdemo.good-loop.com --> talk to testas
const glBaseUrl = `${window.location.protocol}//${prefix}as.good-loop.com/`
const glTestUrl = `https://testas.good-loop.com/`
const glProdBaseUrl = `https://as.good-loop.com/`;

const getPrefixProtocol = (pre) => {
	if (pre === 'local')
		return 'http:'
	else
		return 'https:'
}

const getUrlGeneric = ({production, file, params}) => {
	const forceServerType = params.forceServerType;
	const url = new URL(
		(forceServerType ?
		getPrefixProtocol(forceServerType) + "//" + (forceServerType === 'prod' ? '' : forceServerType) + "as.good-loop.com/"
		: (production ? glProdBaseUrl : glBaseUrl))
	+ file);
	
	if (params) {
		Object.entries(params).forEach(([name, value]) => {
			if (name.match(/^gl\./) && value) url.searchParams.append(name, value);
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

export const getUnitUrl = ({...props} = {}) => getUrlGeneric({...props, file: 'unit.js'});
export const getVastUrl = ({...props} = {}) => getUrlGeneric({...props, file: 'vast.xml'});