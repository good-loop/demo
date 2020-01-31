
const config = JSON.parse(process.env.__CONFIGURATION);
const { testServers, customVertIds } = require('../utils/testConfig');

const baseSite = testServers[config.site];
const dfltAdId = customVertIds[config.site]

// What's with this stuff above?
// In order to bypass Jest's restriction on non pre-defined argvs we'll execute our tests through a node runner,
// allowing us to parse any argv, check it against our own pre-defined flags, and pass them on inside process.env.
// targetServer and customVertId are just enums defined in the utils dir to be used along with the custom argvs
// present in the config object. More details on implementationa and use available on the wiki.
// https://wiki.good-loop.com/index.php?title=Front-end_Testing

// The tests below are quite simple and illustrate how to use Puppeteer alogng with Jest.
// And here's a happy clown: o<| : o ) --|--<

describe('Ad unit tests', () => {
	it('should display the ad unit', async () => {
		// TODO Abstract out the initial "load page, wait for adunit, get iframe contents" step into a utility function
		await page.goto(`${baseSite}?gl.vert=${dfltAdId}`);

		// .goodloopad gets given class .populated by unit.js
		await page.waitForSelector('.goodloopad.populated');

		// Get the iframe contents
		const glFrame = await page.$('iframe.goodloopframe');

		// Confirm that we get the countdown message
		// TODO This doesn't match! Figure out which element to use as search root (we may need to traverse further in)
		await expect(glFrame).toMatch('Your donation will be unlocked');
	});

/*
	it('should default to laptop frame', async () => {
		///////// TEST THAT SOMETHING EXISTS //////////////
		// Very simple but with loads of potential. Upon page load waitForSelector will
		// parse the existing elements on page, or, if doesn't find the one it's looking for,
		// it'll wait until one is generated, or the timeout is exhausted.
		// You should usually include it just as a safety check for things to have been loaded
		// correctly
		await page.goto(baseSite);

		await page.waitForSelector('.device-container.desktop');
		///////////////////////////////////////////////////
	});

	it('should have a fullscreen button matching url id', async () => {
		await page.goto(baseSite + `/?gl.vert=${customVertIds[config.site]}`);
		await page.waitForSelector('.fullscreen-button');

		////// RUN ANY JS YOU WANT IN THE BROWSER ///////////
		// page.evaluate allows you to do just that. You can include from browser debuggers
		// to custom scraping functions.
		const url = await page.evaluate(() => { return window.location });
		////////////////////////////////////////////////////
		const searchParams = new URLSearchParams(url.search);
		const vertId = searchParams.get('gl.vertId');

		////// CUSTOM JS ON SELECTED NODE //////////////////
		// Like page.evaluate above, but this one takes a selector and allows you to pass the
		// element to your callback function.
		const fsButtonUrl = await page.$eval('.fullscreen-button', e => e.href);
		////////////////////////////////////////////////////

		const fsButtonId =  fsButtonUrl.split('=').pop();

		////// JEST'S EXPECT ALONG PUPPETEER ///////////////
		// Just testifying stuff exists is not always enough, and in some cases
		// might lead you to false positives. Sometimes it's safer to use actual comparisons.
		// For instance that an array of html elements have a particular length, and one of them has
		// a particular attribute.
		await expect(fsButtonId).toMatch(vertId);
		////////////////////////////////////////////////////
	});

	it('should update url appropriately when clicking picker buttons', async () => {
		///// MANIPULATE DOM AND TEST CONSEQUENCES /////////
		// The main thing is to simulate the way a user would interact with our app and
		// corroborate that the behaviour is as expected in each case. Below a simple example of this
		// process with notes on what each step does.
		await page.goto(baseSite);
		// Make sure the device container (where the demo iframe lives) has the class desktop.
		await page.waitForSelector('.device-container.desktop'); 

		// Check that a link with the class 'landscape' exists, and that it is possible to click on it.
		// Then, click on it. The first line is not strictly necessary (if the device container already exist,
		// so must the buttons), but it would provide a more precise error message if things fail around here
		await expect(page).toClick('a', { class: 'landscape' });
		await page.click('a.landscape');

		// Use page.evaluate() to execute a line of js inside the browser, in this case grabbing the url
		const url = await page.evaluate(() => { return window.location.href });

		// Make sure the url includes the keywords. This means it has been formatted and pushed correctly.
		await expect(url.includes('landscape') && url.includes('video')).toBe(true);
		/////////////////////////////////////////////////////
	});

	it('should display correct player/format upon clicking widget buttons', async () => {
		//// ANOTHER JOURNEY ////////////////////////////////
		await page.goto(baseSite); // go to page
		await page.waitForSelector('.button.picker-button'); // wait for picker buttons to render
		await page.click('.button.landscape'); // click on the 'landscape' button
		await page.waitForSelector('.button.picker-button.landscape.current'); // Make sure landscape button is now the current one
		await page.waitForSelector('.goodloopad.populated.landscape'); // Make sure our goodloopad div (containing the player) gets the landscape class
		/////////////////////////////////////////////////////
	});
*/
});
