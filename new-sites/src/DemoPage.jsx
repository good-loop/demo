/* @jsx h */
import { h, Fragment, Component } from "preact";

import GoodLoopAd from "./GoodLoopAd";
import DemoSiteNavBar from "./DemoSiteNavBar";
import DemoWidget from "./components/DemoWidget";

const cssUrl =
	"https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/css/daniels-first-project-c7e7cb.webflow.a38afa707.css";
const cssUrl2 = "https://demo.good-loop.com/style/main.css";

const insertCss = (id, url) => {
	const stylesheet = document.createElement("link");
	stylesheet.id = id;
	stylesheet.rel = "stylesheet";
	stylesheet.type = "text/css";
	stylesheet.href = url;
	document.head.appendChild(stylesheet);
};

const removeCss = id => {
	const stylesheet = document.getElementById(id);
	stylesheet.parentNode.removeChild(stylesheet);
};

const makeUrl = (format, device) => {
	return "/";
};

class DemoPage extends Component {
	componentDidMount() {
		insertCss("demo-page-css", cssUrl);
		insertCss("demo-page-more-css", cssUrl2);
	}

	componentWillUnmount() {
		removeCss("demo-page-css");
		removeCss("demo-page-more-css");
	}

	render({ format, device }) {
		const socialUrl = makeUrl("social", device);
		const videoUrl = makeUrl("video", device);
		const landscapeUrl = makeUrl(format, "landscape");
		const laptopUrl = makeUrl(format, "laptop");
		const portraitUrl = makeUrl(format, "portrait");

		return (
			<>
				<DemoSiteNavBar />
				<div class="container-62 w-container">
					<h4 class="playertopheader">
						want to see our products in action? look no further.
					</h4>

					<DemoWidget />
					<RedMiddleSection />
					<HowItWorksSection />
					<Footer />
				</div>
			</>
		);
	}
}

const HowItWorksSection = () => {
	return (
		<div>
			<h4 class="playerheadingbottom">How It Works</h4>
			<div class="columns-16 icons-column">
				<div class="column-42 w-col w-col-3">
					<div class="div-block-37">
						<img
							src="https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/5d63ef28618d257cc856194c_icon-heart.png"
							alt=""
							class="image-56"
						/>
					</div>
					<div class="text-block-102">
						People can opt-in to watch an ad in exchange for a free donation.
					</div>
				</div>
				<div class="column-40 w-col w-col-3">
					<div class="div-block-36">
						<img
							src="https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/5d63ef4d68fbe9536b33dde3_icon-eye.png"
							alt=""
							class="image-57"
						/>
					</div>
					<div class="text-block-103">
						They give the advertiser 100% of their attention for at least 15
						seconds.
					</div>
				</div>
				<div class="column-41 w-col w-col-3">
					<div class="div-block-38">
						<img
							src="https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/5d63f129f5f139f64df4578b_icon-coins.png"
							alt=""
							class="image-58"
						/>
					</div>
					<div class="text-block-104">
						Then they get to donate half of the payment to a charity of their
						choice.
					</div>
				</div>
			</div>
		</div>
	);
};

const RedMiddleSection = () => {
	return (
		<div class="red-background">
			<a
				id="fullscreen-button"
				href="https://media.good-loop.com/uploads/raw/generic.html?gl.vert=JvtlN3pk&amp;gl.size=landscape"
				target="_blank"
				class="fullscreen-button w-button"
			>
				Full Screen Demo
			</a>
			<h4 class="playermiddleheader">
				if you&#x27;re running an ad online then why not work with us?
			</h4>
			<div class="text-block-101">
				Our ethical ad formats are proven to drive higher engagement and
				significant brand uplift. So you can connect with your consumer in a
				meaningful way whilst enabling them to do good, for free.
				<br />
				<br />
				Want to know more?
			</div>
			<a href="/contact-us" class="button-7 w-button">
				Get In Touch
			</a>
		</div>
	);
};

const Footer = () => {
	return (
		<div class="footer">
			<div class="div-block-5">
				<h5 style={{textTransform: 'uppercase'}}>Keep In Touch</h5>
				<div class="container-32 social-links-container w-container">
					<a
						href="https://www.facebook.com/the.good.loop/"
						target="_blank"
						class="link-block-2 w-inline-block"
					>
						<div class="text-block-74"></div>
					</a>
					<a
						href="https://twitter.com/GoodLoopHQ"
						target="_blank"
						class="link-block-3 w-inline-block"
					>
						<div class="text-block-73"></div>
					</a>
					<a
						href="https://www.linkedin.com/company/good.loop?trk=biz-companies-cym"
						target="_blank"
						class="link-block-4 w-inline-block"
					>
						<div class="text-block-75"></div>
					</a>
					<a
						href="https://www.instagram.com/goodloophq/"
						target="_blank"
						class="link-block-5 w-inline-block"
					>
						<div class="text-block-76"></div>
					</a>
					<a
						href="https://www.youtube.com/channel/UCRhJgwNS5DsRHHzRWjDgjhA"
						target="_blank"
						class="link-block-6 w-inline-block"
					>
						<div class="text-block-77"></div>
					</a>
				</div>
			</div>
			<div class="div-block-6">
				<div class="gl-footertext-muted">
					© 2016-2019 Good.Loop Ltd.{" "}
					<a href="https://www.good-loop.com/privacy-policy" class="link-7">
						Privacy policy
						<br />‍
					</a>
					Registered in Scotland, UK (No. SC548356)
					<br />
					127 Rose Street South Lane, Edinburgh, EH2 4BB
					<br />
					<a
						href="https://doc.good-loop.com/terms/terms-of-use.html"
						target="_blank"
					>
						Terms of Use
					</a>
				</div>
			</div>
		</div>
	);
};

export default DemoPage;
