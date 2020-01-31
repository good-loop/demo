
const config = JSON.parse(process.env.__CONFIGURATION);
const { testServers, customVertIds } = require('../utils/testConfig');

const baseSite = testServers[config.site];
const dfltAdId = customVertIds[config.site];

const customVert = config.vert;

let adunit;
let countdown;
let searchParams;

describe('Adunit tests', () => {

	beforeAll(async () => {
		await page.goto(baseSite + `${'/?gl.vert=' + customVert}`);
		await page.waitForSelector('iframe');

		const adUnitHandle = await page.$('iframe.goodloopframe');
		adunit = await adUnitHandle.contentFrame();
	});

	it('should load and render adunit', async () => {
		await page.waitForSelector('.goodloopad');
		await adunit.waitForSelector('#player');
	});

	it('should display unlock text with countdown', async () => {
		// The section actually exists with the current 
		await expect(adunit).toMatch('Your donation will be unlocked in');
		await adunit.waitForSelector('.rollover.current');

		// Grab the actual countdown. It should start somewhere between 10 and 15 seconds
		// depending on advert
		let countdown = await adunit.$eval('span.current', e => e.textContent);
		countdown = parseInt(countdown);
		await expect(countdown > 9 && countdown < 16).toBe(true);
	});

	it('should start with charity buttons locked', async () => {
		await adunit.waitForSelector('.chooser-list.locked');
	});

	it('should unlock charity buttons when countdown reaches zero', async () => {
		// If autoplay flag is no present we click on play to start the ad.
		const playIcon = await adunit.$('.play-icon');
		if (playIcon) {
			await adunit.click('.play-icon');
		}
		// Wait for countdown in miliseconds, plus an extra one to make sure things are unlocked.
		await adunit.waitFor(countdown * 1000 + 10000);

		// Charity buttons should now be unlocked and clickable.
		await adunit.waitForSelector('.chooser-list.ready');
	}, 30000);

	it('should allow to click on one of the charity buttons', async () => {
		await adunit.waitForSelector('a.charity');

		await adunit.click('a.charity');

		await adunit.waitForSelector('.chooser-list.complete');
		await adunit.waitForSelector('.charity-selected');
	});
});
