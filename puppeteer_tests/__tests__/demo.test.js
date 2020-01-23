
const config = JSON.parse(process.env.__CONFIGURATION);

const targetUrl = `http${config.site === 'local' ? '' : 's'}://${config.site}demo.good-loop.com`;

const APIBASE = targetUrl;
const customVertId = 'FKXON7w1oZ' //prod '0PVrD1kX';

describe('Demo page video tests', () => {

	it('should default to format: video, display: desktop', async () => {
		await page.goto(APIBASE);
		await expect(page).toMatch('Want to see our products in action?');

		await page.waitForSelector('.picker-button.video.current');
		await page.waitForSelector('.button.picker-button.desktop.current');
	});

	it('should default to laptop frame', async () => {
		await page.goto(APIBASE);

		await page.waitForSelector('.device-container.desktop');
	});

	it('should have a fullscreen button matching url id', async () => {
		await page.goto(APIBASE + `/?gl.vert=${customVertId}`);
		await page.waitForSelector('.fullscreen-button');

		const url = await page.evaluate(() => { return window.location });
		const searchParams = new URLSearchParams(url.search);
		const vertId = searchParams.get('gl.vertId');

		const fsButtonUrl = await page.$eval('.fullscreen-button', e => e.href);
		const fsButtonId =  fsButtonUrl.split('=').pop();
		await expect(fsButtonId).toMatch(vertId);
	});

	it('should update url appropriately when clicking picker buttons', async () => {
		await page.goto(APIBASE);
		await page.waitForSelector('.device-container.desktop');

		await expect(page).toClick('a', { class: 'landscape' });
		await page.click('a.landscape');

		const url = await page.evaluate(() => { return window.location.href });
		await expect(url.includes('landscape') && url.includes('video')).toBe(true);
	});
});

describe('Demo page social tests', () => {
	it('should disable picker options when selecting SOCIAL', async () => {
		await page.goto(APIBASE);
		await page.waitForSelector('.picker-button.social');

		await page.click('.picker-button.social');
		const disabledButtons = await page.$$('.disabled');
		
		await expect(disabledButtons.length).toBe(2);
	});

	it('should display appropriate description', async () => {
		// The string 'snapchat' is only used in the description,
		// so we can look through the entired rendered page
		await expect(page).toMatch('Snapchat');
	});

	it('should load multiple "slides" to simulate the snapchat feed', async () => {
		const slides = await page.$$('.snap-img');
		await expect(slides.length > 2).toBe(true);
	});

	it('should slide into our advert on video click', async () => {
		await page.click('video.snap-img');
		console.log(targetUrl);

		await page.waitForSelector('.social-ad.show');
	});
})
