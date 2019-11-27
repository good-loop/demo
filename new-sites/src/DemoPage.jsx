/* @jsx h */
import { h, Fragment } from "preact";
import { Container, Row, Col, Footer } from 'reactstrap';

import DemoSiteNavBar from "./DemoSiteNavBar";
import DemoWidget from "./components/DemoWidget";


const DemoPage = (props) => <>
	<DemoSiteNavBar />
	<Container>
		<h4 className="playertopheader text-center">Want to see our products in action? Look no further.</h4>
		<DemoWidget {...props} />
		<RedMiddleSection />
		<HowItWorksSection />
		<FooterSection />
	</Container>
</>;


const HowItWorksSection = () => {
	return <>
		<h4 className="playerheadingbottom">How It Works</h4>
		<Row className="how-it-works-row text-center">
			<Col xs='4'>
				<img src="https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/5d63ef28618d257cc856194c_icon-heart.png" alt=""/>
				<p>People can opt-in to watch an ad in exchange for a free donation.</p>
			</Col>
			<Col xs='4'>
				<img src="https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/5d63ef4d68fbe9536b33dde3_icon-eye.png" alt=""/>
				<p>They give the advertiser 100% of their attention for at least 15 seconds.</p>
			</Col>
			<Col xs='4'>
				<img src="https://uploads-ssl.webflow.com/5cd560eec4480f4f00e3c1c1/5d63f129f5f139f64df4578b_icon-coins.png" alt=""/>
				<p>Then they get to donate half of the payment to a charity of their choice.</p>
			</Col>
		</Row>
	</>
};

const RedMiddleSection = () => {
	return (
		<Row className="red-bg">
			<Col className="justify-content-md-center text-center">
				<a
					id="fullscreen-button"
					href="https://media.good-loop.com/uploads/raw/generic.html?gl.vert=JvtlN3pk&amp;gl.size=landscape"
					target="_blank"
					className="fullscreen-button w-button"
				>
					Full Screen Demo
				</a>
				<h4 className="playermiddleheader">
					if you&#x27;re running an ad online then why not work with us?
				</h4>
				<p>
					Our ethical ad formats are proven to drive higher engagement and
					significant brand uplift. So you can connect with your consumer in a
					meaningful way whilst enabling them to do good, for free.
				</p>
				<p>
					Want to know more?
					<div><a href="/contact-us" className="button-7 w-button">Get In Touch</a></div>
				</p>
			</Col>
		</Row>
	);
};

const FooterSection = () => {
	return (
		<div className="footer column text-center">
				<h5>Keep In Touch</h5>
				<Row className="keep-in-touch justify-content-center">
					<Col xs="auto">
						<a href="https://www.facebook.com/the.good.loop/" target="_blank"></a>
						<a href="https://twitter.com/GoodLoopHQ" target="_blank"></a>
						<a href="https://www.linkedin.com/company/good.loop?trk=biz-companies-cym" target="_blank"></a>
						<a href="https://www.instagram.com/goodloophq/" target="_blank"></a>
						<a href="https://www.youtube.com/channel/UCRhJgwNS5DsRHHzRWjDgjhA" target="_blank"></a>
					</Col>
				</Row>
				<Row>
					<Col>
						© 2016-2019 Good.Loop Ltd.{" "}
						<a href="https://www.good-loop.com/privacy-policy" className="link-7">
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
					</Col>
				</Row>
		</div>
	);
};

export default DemoPage;
