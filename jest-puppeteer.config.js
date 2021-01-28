const config = JSON.parse(process.env.__CONFIGURATION);

module.exports = {
	launch: {
		headless: config.head,
		// CHANGE THIS TO YOUR CHROME INSTALLATION PATH
		executablePath: config.chrome ? '/usr/bin/google-chrome' : ''
	}
};