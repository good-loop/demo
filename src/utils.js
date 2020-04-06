
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
if (window.location.hostname.match(/^local/)) { prefix = 'test'; } // Running on localtest or localdemo.good-loop.com --> talk to localas
else if (window.location.hostname.match(/(^test)/)) { prefix = 'test'; } // Running on test or testdemo.good-loop.com --> talk to testas
const glBaseUrl = `${window.location.protocol}//${prefix}as.good-loop.com/`
const glProdBaseUrl = `https://as.good-loop.com/`;

const getUrlGeneric = ({production, vertId, file}) => (
	(production ? glProdBaseUrl : glBaseUrl) + file + (vertId ? '?gl.vert=' + vertId : '')
);

export const getUnitUrl = ({...props} = {}) => getUrlGeneric({...props, file: 'unit.js'});
export const getVastUrl = ({...props} = {}) => getUrlGeneric({...props, file: 'vast.xml'});