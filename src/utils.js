
/**
 * Construct a string from the props given to GoodLoopAd or VpaidAd which only changes when the adunit should be reloaded
 */
export const getNonce = (props) => {
	// Grab all gl.* URL params & sort them so they always form a stable string 
	const glParamString = Object.entries(props || {})
		.filter(([k, v]) => k.match(/^gl\./))
		.sort(([k1, v1], [k2, v2]) => k1 > k2)
		.reduce((acc, [k, v]) => acc + k + v, '');
	return props.size + glParamString;
};

let prefix = 'test';
if (window.location.hostname.match(/^local/)) { prefix = 'local'; } // Running on localtest.good-loop.com --> talk to localas
else if (window.location.hostname.match(/^prod/)) { prefix = ''; } // Running on prodtest.good-loop.com --> talk to as
const glBaseUrl = `${window.location.protocol}//${prefix}as.good-loop.com/`
const glProdBaseUrl = `https://as.good-loop.com/`;

export const getUnitUrl = ({production} = {}) => (production ? glProdBaseUrl : glBaseUrl) + 'unit.js';
export const getVastUrl = ({production} = {}) => (production ? glProdBaseUrl : glBaseUrl) + 'vast.xml';