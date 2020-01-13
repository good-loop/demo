/* @jsx h */
import { h, Fragment } from "preact";
import { Container, Row, Col, Footer, Alert, UncontrolledAlert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTwitterSquare, faFacebookSquare, faYoutubeSquare, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import DemoSiteNavBar from "./DemoSiteNavBar";
import DemoPlayer from './DemoPlayer/DemoPlayer';




/** We don't do anything with {matches, path, url} here, but we want to pull them out and only leave search params */
const DemoPage = ({device, format, matches, path, url, ...props}) => {
	const urlParams = new URLSearchParams(window.location.search);
	const vertId = urlParams.has('gl.vertId') ? urlParams.get('gl.vertId') : '';

	return (<>
		<DemoSiteNavBar/>
		<Container>
			<h4 className="playertopheader text-center">Want to see our products in action? Look no further.</h4>
			<DemoPlayer format={format} device={device} vertId={vertId}/>
			<RedMiddleSection format={format} device={device} {...props} />
			<HowItWorksSection/>
			<FooterSection/>
		</Container>
	</>);
};

const deviceToSize = {
	landscape: 'landscape',
	portrait: 'portrait',
	desktop: 'landscape',
};

const RedMiddleSection = ({format, device, ...props }) => {

	return (
		<Row className="red-bg pt-0">
			<Col className="justify-content-md-center text-center red-middle-col">
				<h4 className="playermiddleheader pt-0">if you&#x27;re running an ad online then why not work with us?</h4>
				<p>
					Our ethical ad formats are proven to drive higher engagement and
					significant brand uplift. So you can connect with your consumer in a
					meaningful way whilst enabling them to do good, for free.
				</p>
				<p>
					Want to know more?
					<div className="pt-5 pb-3"><a href="https://www.good-loop.com/contact-us" className="get-in-touch-button">Get In Touch</a></div>
				</p>
			</Col>
		</Row>
	);
};


const HowItWorksSection = () => {
	return <>
		<h4 className="playerheadingbottom text-center p-5">How It Works</h4>
		<Row className="how-it-works-row text-center pb-5 justify-content-center">
			<Col md='3'>
				<img src="/img/icon-heart.png" alt=""/>
				<p>People can opt-in to watch an ad in exchange for a free donation.</p>
			</Col>
			<Col md='3'>
				<img src="/img/icon-eye.png" alt=""/>
				<p>They give the advertiser 100% of their attention for at least 15 seconds.</p>
			</Col>
			<Col md='3'>
				<img className="coins-img" src="/img/icon-coins.png" alt=""/>
				<p>Then they get to donate half of the payment to a charity of their choice.</p>
			</Col>
		</Row>
	</>
};


const FooterSection = () => {
	return (
		<div className="footer column text-center pt-5">
				<h5>Keep In Touch</h5>
				<Row className="keep-in-touch justify-content-center">
					<Col xs="auto">
						<a className="fa-svg" href="https://www.facebook.com/the.good.loop/" target="_blank">
							<FontAwesomeIcon icon={faFacebookSquare} style={{color: 'rgba(131, 0, 0, 0.5)'}}/>
						</a>
						<a className="fa-svg" href="https://twitter.com/GoodLoopHQ" target="_blank">
							<FontAwesomeIcon icon={faTwitterSquare} style={{color: 'rgba(131, 0, 0, 0.5)'}}/>
						</a>
						<a className="fa-svg" href="https://www.linkedin.com/company/good.loop?trk=biz-companies-cym" target="_blank">
							<FontAwesomeIcon icon={faLinkedin} style={{color: 'rgba(131, 0, 0, 0.5)'}}/>
						</a>
						<a className="fa-svg" href="https://www.instagram.com/goodloophq/" target="_blank">
							<FontAwesomeIcon icon={faInstagram} style={{color: 'rgba(131, 0, 0, 0.5)'}}/>
						</a>
						<a className="fa-svg" href="https://www.youtube.com/channel/UCRhJgwNS5DsRHHzRWjDgjhA" target="_blank">
							<FontAwesomeIcon icon={faYoutubeSquare} style={{color: 'rgba(131, 0, 0, 0.5)'}}/>
						</a>
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
