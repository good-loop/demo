/* @jsx h */
import { h, Fragment } from "preact";
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faFacebookSquare, faYoutubeSquare, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import DemoSiteNavBar from './DemoSiteNavBar';
import DemoPlayer from './DemoPlayer/DemoPlayer';
import DemoPicker from './DemoPicker';

/**
 * We don't do anything with {matches, path, url} here - we just don't want them in ...props
 * We pull both capitalisations of "nosocial" so we can type the wrong one and still have it work
 * 
 * Hide values represent the 4 demo formats available:
 * - social
 * - desktop
 * - mobile-landscape
 * - mobile-portrait
 * Given as a comma separated string as served by PropControl
 */
const DemoPage = ({matches, path, url, noSocial, hide, ...props}) => {
	// Allow any noSocial param at all, even an empty one, to work (unless value is "false")
	const noSocialMerged = (noSocial !== 'false' && noSocial !== undefined) || (noSocial !== 'false' && noSocial !== undefined);
	const hides = hide ? hide.split(",") : [];

	return <>
		<DemoSiteNavBar />
		<Container>
			<h4 className="playertopheader text-center">Want to see our products in action? Look no further.</h4>
			<DemoPicker noSocial={noSocialMerged} hides={hides} {...props} />
		</Container>
		<div className="half-bg">
			<Container>
				<DemoPlayer noSocial={noSocialMerged} {...props} />
			</Container>
		</div>
		<div className="red-bg">
			<Container>
				<RedMiddleSection />
			</Container>
		</div>
		<Container>
			<HowItWorksSection format={props.format} />
			<FooterSection />
		</Container>
	</>;
};


const RedMiddleSection = () => (
	<Row className="pt-0">
		<Col className="justify-content-md-center text-center red-middle-col">
			<h4 className="playermiddleheader pt-0">if you&#x27;re running an ad online then why not work with us?</h4>
			<p>
				Our ethical ad formats are proven to drive higher engagement and
				significant brand uplift. So you can connect with your consumer in a
				meaningful way whilst enabling them to do good, for free.
			</p>
			<p>
				Want to know more?
				<div className="pt-5 pb-3">
					<a href="https://www.good-loop.com/contact" className="button get-in-touch">Get in touch</a>
				</div>
			</p>
		</Col>
	</Row>
);


const formatToSteps = {
	display: [
		<p>We wrap your standard display adverts in our unique creative skin.</p>,
		<p>This draws consumer attention and lets them know you're supporting a social cause.</p>,
		<p>You get higher ad engagement, with significantly higher ad recall - all whilst building brand love.</p>
	],
	video: [
		<p>Consumers are invited to watch your ad in exchange for a free donation to a charity funded by the advertiser.</p>,
		<p>They give your ad 100% of their attention for at least 15 seconds, unlocking the free donation.</p>,
		<p>You get higher ad engagement, with significantly higher ad recall - all whilst building brand love.</p>
	],
};


const HowItWorksSection = ({format}) => {
	const steps = formatToSteps[format] || formatToSteps.video;

	return <>
		<h4 className="playerheadingbottom text-center p-5">How It Works</h4>
		<Row className="how-it-works-row text-center pb-5 justify-content-center">
			<Col md="3">
				<img src="/img/icon-heart.png" alt=""/>
				{steps[0]}
			</Col>
			<Col md="3">
				<img src="/img/icon-eye.png" alt=""/>
				{steps[1]}
			</Col>
			<Col md="3">
				<img className="coins-img" src="/img/icon-coins.png" alt=""/>
				{steps[2]}
			</Col>
		</Row>
	</>;
};


const contactIcons = [
	{ icon: faFacebookSquare, url: 'https://www.facebook.com/the.good.loop/' },
	{ icon: faTwitterSquare, url: 'https://twitter.com/GoodLoopHQ' },
	{ icon: faLinkedin, url: 'https://www.linkedin.com/company/good.loop?trk=biz-companies-cym' },
	{ icon: faInstagram, url: 'https://www.instagram.com/goodloophq/' },
	{ icon: faYoutubeSquare, url: 'https://www.youtube.com/channel/UCRhJgwNS5DsRHHzRWjDgjhA' },
].map(({name, url, icon, colour}) => (
	<a className="fa-svg" href={url} target="_blank"><FontAwesomeIcon icon={icon} style={{color: 'rgba(131, 0, 0, 0.5)'}} /></a>
));


const FooterSection = () => (
	<div className="footer column text-center pt-5">
			<h5>Keep In Touch</h5>
			<Row className="keep-in-touch justify-content-center">
				<Col xs="auto">{ contactIcons }</Col>
			</Row>
			<Row>
				<Col>
					&#169; 2016-2023 Good-Loop Ltd.{" "}
					<a href="https://doc.good-loop.com/policy/privacy-policy.html" className="link-7">
						Privacy policy<br />‍
					</a>
					Registered in Scotland, UK (No. SC548356)<br />
					127 Rose Street South Lane, Edinburgh, EH2 4BB<br />
					<a href="https://doc.good-loop.com/terms/terms-of-use.html" target="_blank">
						Terms of Use
					</a>
				</Col>
			</Row>
	</div>
);


export default DemoPage;
