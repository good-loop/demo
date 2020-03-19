const config = JSON.parse(process.env.__CONFIGURATION);

module.exports = {
	launch: {
		headless: config.head,
		executablePath: config.chrome ? '/usr/bin/google-chrome-stable' : ''
	}
};