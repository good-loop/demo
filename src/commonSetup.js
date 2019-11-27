export default () => {
	// Set us up to catch and log uncaught errors - but don't break anything already in place.
	let prevOnError = window.onerror || (() => { return false; }); // fill in with a no-op
	window.onerror = (error, ...rest) => {
		// TODO Hook up datalog logging
		// lgError('Uncaught error at root window: ' + error);
		return prevOnError(error, ...rest);
	};

	// process is a node global thing, setup via webpack config (or params on the webpack call in package.json)
	if (process.env.NODE_ENV !== 'production') {
		// eslint-disable-next-line global-require
		require('preact/debug');
	}
};
