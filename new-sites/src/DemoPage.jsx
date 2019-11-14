/* @jsx h */
import { h, Fragment, Component } from 'preact';

import GoodLoopAd from './GoodLoopAd';

const cssUrl = 'https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/css/daniels-first-project-c7e7cb.webflow.a38afa707.css';
const cssUrl2 = 'https://demo.good-loop.com/style/main.css';

const insertCss = (id, url) => {
	const stylesheet = document.createElement('link');
	stylesheet.id = id;
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	stylesheet.href = url;
	document.head.appendChild(stylesheet);
}

const removeCss = (id) => {
	const stylesheet = document.getElementById(id);
	stylesheet.parentNode.removeChild(stylesheet);
}

const makeUrl = (format, device) => {
	return '/';
}


class DemoPage extends Component {
	componentDidMount() {
		insertCss('demo-page-css', cssUrl);
		insertCss('demo-page-more-css', cssUrl2);
	}

	componentWillUnmount() {
		removeCss('demo-page-css');
		removeCss('demo-page-more-css');
	}


	render({format, device}) {
		const socialUrl = makeUrl('social', device);
		const videoUrl = makeUrl('video', device);
		const landscapeUrl = makeUrl(format, 'landscape');
		const laptopUrl = makeUrl(format, 'laptop');
		const portraitUrl = makeUrl(format, 'portrait');

		return <>
			<div data-collapse="medium" data-animation="default" data-duration="400" class="navbar w-nav">
				<div class="div-block-10">
					<nav role="navigation" class="gl-navmenu w-nav-menu">
						<a href="https://www.good-loop.com/" class="nav-link-2 w-nav-link">Home</a>
						<div data-delay="0" class="dropdown w-dropdown">
							<div class="dropdown-toggle-2 w-dropdown-toggle">
								<div class="icon w-icon-dropdown-toggle"></div>
								<div class="text-block-79">About Us</div>
							</div>
							<nav class="w-dropdown-list">
								<a href="https://www.good-loop.com/our-mission" class="w-dropdown-link">our mission</a>
								<a href="https://www.good-loop.com/our-story" class="w-dropdown-link">our story</a>
								<a href="https://www.good-loop.com/press" class="w-dropdown-link">Press</a>
								<a href="https://www.good-loop.com/blog" target="_blank" class="w-dropdown-link">blog</a>
								<a href="https://www.good-loop.com/resources" class="w-dropdown-link">resources</a>
							</nav>
						</div>
						<a href="https://www.good-loop.com/contact-us" class="w-nav-link nav-link-4">Contact us</a>
						<a href="https://www.good-loop.com/players" class="current nav-link-4 w-nav-link w--current">Players</a>
						<a href="https://my.good-loop.com" class="nav-link-4 w-nav-link">My Impact</a>
						<a href="https://www.good-loop.com/careers" class="nav-link-4 w-nav-link">Careers</a>
						<div data-delay="0" class="w-dropdown">
							<div class="w-dropdown-toggle" id="search-button">
								<div class="text-block-80"></div>
							</div>
						</div>
						<div data-w-id="cc1d2a7c-4df3-15af-e662-212d68e73499" id="search-div" class="w-container" style="display: none;">
							<form action="https://www.good-loop.com/search" class="search-2 w-form">
								<input type="search" class="search-input-2 w-input" maxlength="256" name="query" placeholder="Search…" id="search" required="" />
								<input type="submit" value="Search" class="gl-sendbtn w-button" />
							</form>
						</div>
					</nav>
					<div class="circlelogo">
						<div class="shadowcaster"></div>
						<img src="https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/5d1f67f4e3f0a740c2bc0dba_favicon-60x60.png" width="40" alt="" class="logoimg"/>
					</div>
					<div class="menu-button-2 w-nav-button">
						<div class="w-icon-nav-menu"></div>
					</div>
				</div>
			</div>

			<div class="container-62 w-container">
				<h4 class="playertopheader">want to see our products in action? look no further.</h4>

				{/* Which format? */}
				<div class='nav justify-content-center' id='format-menu'>
					<div id='pick-format-row' class='first row'>
						<div class='button-box col-auto icon-box option-button' id='social'><a href={socialUrl}>SOCIAL</a></div>
						<div class='button-box col-auto icon-box option-button' id='video'><a hreaf={videoUrl}>VIDEO</a></div>
						{/* <div hidden class='button-box col-auto icon-box option-button' id='display'><a>DISPLAY</a></div> */}
					</div>
				</div>

				{/* Which device? */}
				<div class='nav justify-content-center' id='button-menu'>
					<div class='second row'>
						<div class='button-box col-auto icon-box option-button' id='mobile-landscape'>
							<a href={landscapeUrl}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 46.9 25.6'>
									<path fill='currentColor' d='M40.8,0H6.1C2.7,0,0,2.7,0,6.1v13.4c0,3.4,2.7,6.1,6.1,6.1l0,0h34.7c3.4,0,6.1-2.7,6.1-6.1V6.1
										C46.9,2.7,44.2,0,40.8,0z M43.9,19.5c0,1.7-1.4,3.1-3.1,3.1H6.1c-1.7,0-3.1-1.4-3.1-3.1l0,0v-0.9c1.2-0.4,2-1.5,2-2.8V9.8
										C5,8.5,4.2,7.4,3,7V6.1C3,4.4,4.4,3,6.1,3h34.7c1.7,0,3.1,1.4,3.1,3.1V19.5z'/>
								</svg>
							</a>
							
						</div>
						<div class='button-box col-auto icon-box option-button' id='desktop'>
							<a href={laptopUrl}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 82 41.775'>
									<g fill='currentColor'>
										<path d='M71.39,41.412H11.079a1.5,1.5,0,0,1-1.5-1.5V1.5a1.5,1.5,0,0,1,1.5-1.5H71.39a1.5,1.5,0,0,1,1.5,1.5V39.912A1.5,1.5,0,0,1,71.39,41.412Zm-58.811-3H69.89V3H12.579Z'/>
										<path d='M80.5,41.412H1.969a1.5,1.5,0,0,1,0-3H80.5a1.5,1.5,0,0,1,0,3Z'/>
									</g>
								</svg>
							</a>
							
						</div>
						<div class='button-box col-auto icon-box option-button' id='mobile-portrait'>
							<a href={portraitUrl}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.612 46.895'>
									<path fill='currentColor' d='M19.516,0H6.1A6.1,6.1,0,0,0,0,6.1V40.8a6.1,6.1,0,0,0,6.1,6.1H19.516a6.1,6.1,0,0,0,6.1-6.1V6.1A6.1,6.1,0,0,0,19.516,0Zm3.1,40.8a3.1,3.1,0,0,1-3.1,3.1H6.1A3.1,3.1,0,0,1,3,40.8V6.1A3.1,3.1,0,0,1,6.1,3h.881a2.945,2.945,0,0,0,2.8,2.047h6.062A2.945,2.945,0,0,0,18.635,3h.881a3.1,3.1,0,0,1,3.1,3.1Z'/>
								</svg>
							</a>
						</div>
					</div>
				</div>

				{/* Describe the unit in question */}
				<div class='container description-text text-center'>
					<p id='describe-social' class='d-none'>
						The Good-Loop social swipe-to-donate player is shown in social media apps: SnapChat, Instagram, Facebook, or Twitter.
					</p>
					<p id='describe-video'>
						Our core product, the Good-Loop video player is shown in a website article as people scroll through (&quot;in-stream&quot;), or appears as a pre-roll before a video begins.
					</p>
					<p id='describe-display' class='d-none'>
						The Good-Loop click-to-donate display advert can be used anywhere that banner ads are used. A range of standard sizes are supported (banner, leaderboard, MPU, Double-MPU, etc.).
					</p>
					<div class="alert alert-warning alert-dismissible" role="alert">
						Adblocker detected. Some of our adverts might not play properly!
						<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
					</div>
				</div>
					
				{/* The unit, shown in a simulated device screen */}
				<div class="demo-div-container">
					<div class="demo-div-bg"></div>
					<div class='' id='demo-div'>
						<div class="demo-background-div"></div>
						<iframe id='demo-iframe' src=''></iframe>
					</div>
					<div class="frame"></div>
				</div>

				{/* The red-background section */}
				<div class="red-background">
					<a id="fullscreen-button" href="https://media.good-loop.com/uploads/raw/generic.html?gl.vert=JvtlN3pk&amp;gl.size=landscape" target="_blank" class="fullscreen-button w-button">Full Screen Demo</a>
					<h4 class="playermiddleheader">if you&#x27;re running an ad online then why not work with us?</h4>
					<div class="text-block-101">Our ethical ad formats are proven to drive higher engagement and significant brand uplift. So you can connect with your consumer in a meaningful way whilst enabling them to do good, for free.<br/><br/>Want to know more?</div>
					<a href="/contact-us" class="button-7 w-button">Get In Touch</a>
				</div>

				{/* The "How It Works" section*/}
				<div>
					<h4 class="playerheadingbottom">How It Works</h4>
					<div class="columns-16 icons-column">
						<div class="column-42 w-col w-col-3">
							<div class="div-block-37"><img src="https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/5d63ef28618d257cc856194c_icon-heart.png" alt="" class="image-56"/></div>
							<div class="text-block-102">People can opt-in to watch an ad in exchange for a free donation.</div>
						</div>
						<div class="column-40 w-col w-col-3">
							<div class="div-block-36"><img src="https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/5d63ef4d68fbe9536b33dde3_icon-eye.png" alt="" class="image-57"/></div>
							<div class="text-block-103">They give the advertiser 100% of their attention for at least 15 seconds.</div>
						</div>
						<div class="column-41 w-col w-col-3">
							<div class="div-block-38"><img src="https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/5d63f129f5f139f64df4578b_icon-coins.png" alt="" class="image-58"/></div>
							<div class="text-block-104">Then they get to donate half of the payment to a charity of their choice.</div>
						</div>
					</div>
				</div>

				<div class="footer">
					<div class="div-block-5">
					<h5 class="heading-44">Keep In Touch</h5>
						<div class="container-32 social-links-container w-container">
							<a href="https://www.facebook.com/the.good.loop/" target="_blank" class="link-block-2 w-inline-block">
								<div class="text-block-74"></div>
							</a>
							<a href="https://twitter.com/GoodLoopHQ" target="_blank" class="link-block-3 w-inline-block">
								<div class="text-block-73"></div>
							</a>
							<a href="https://www.linkedin.com/company/good.loop?trk=biz-companies-cym" target="_blank" class="link-block-4 w-inline-block">
								<div class="text-block-75"></div>
							</a>
							<a href="https://www.instagram.com/goodloophq/" target="_blank" class="link-block-5 w-inline-block">
								<div class="text-block-76"></div>
							</a>
							<a href="https://www.youtube.com/channel/UCRhJgwNS5DsRHHzRWjDgjhA" target="_blank" class="link-block-6 w-inline-block">
								<div class="text-block-77"></div>
							</a>
						</div>
					</div>
					<div class="div-block-6">
						<div class="gl-footertext-muted">© 2016-2019 Good.Loop Ltd. <a href="https://www.good-loop.com/privacy-policy" class="link-7">Privacy policy<br/>‍</a>Registered in Scotland, UK (No. SC548356)<br/>127 Rose Street South Lane, Edinburgh, EH2 4BB<br/><a href="https://doc.good-loop.com/terms/terms-of-use.html" target="_blank">Terms of Use</a></div>
					</div>
				</div>
			</div>
		</>;
	}
	
};

export default DemoPage;
