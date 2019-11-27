const webpack = require('webpack');
const path = require('path');

/**
 * Skeleton object with elements common to every configuration.
 * makeConfig() will add output filename (to make it a valid config)
 * and process.env (to set up compiled-in per-file parameters)
 */
const baseConfig = {
	entry: ['@babel/polyfill', './src/index.js'],
	output: {
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.jsx?/i,
				resolve: {
					extensions: ['.js', '.jsx'],
					alias: {
						'react': 'preact/compat',
						'react-dom': 'preact/compat',
					}
				},
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', { targets: { ie: "11" }, loose: true }]
					],
					plugins: [
						['@babel/plugin-transform-react-jsx', { pragma: 'h', pragmaFrag: 'Fragment' }],
					]
				}
			}
		]
	},
	devtool: 'source-map',
};

/**
 * Copy and fill out the baseConfig object with
 * @param {!String} filename Set the bundle output.filename
 * @param {!String} mode "production" or "development", determines minification
 * @param {!String} makeSourceMap
 */
const makeConfig = ({ entryFile, pathname, filename, mode }) => {
	// Make a shallow copy of baseConfig so assignments to 1st level children don't affect the template
	// For assignments to deeper children, assign a shallow copy of the parent first
	const config = Object.assign({}, baseConfig);

	// config.mode can be "development" or "production" & dictates whether JS is minified
	// Also available in bundle as process.env.NODE_ENV, used to conditionally set up logging & Redux dev tools
	config.mode = mode;

	// What's the entry point? 
	config.entry = [...config.entry]; // copy before assign!!!
	config.entry[1] = entryFile;

	// What filename should we render to?
	const newOutput = {
		path: path.resolve(__dirname, pathname),
		filename,
	};
	config.output = Object.assign({}, config.output, newOutput);
	console.log(config.output);

	return config;
};

// Output bundle files for production and dev/debug

const configs = [
	makeConfig({entryFile: './src/index-test.js', pathname: './web-test/', filename: 'bundle-debug.js', mode: 'development'}),
	makeConfig({entryFile: './src/index-demo.js', pathname: './web-demo/', filename: 'bundle-debug.js', mode: 'development'}),
];

// Allow debug-only compilation for faster iteration in dev
if (process.env.NO_PROD !== 'true') {
	configs.push(makeConfig({entryFile: './src/index-test.js', pathname: './web-test/', filename: 'bundle.js', mode: 'production'}));
	configs.push(makeConfig({entryFile: './src/index-demo.js', pathname: './web-demo/', filename: 'bundle.js', mode: 'production'}))
}

module.exports = configs;
