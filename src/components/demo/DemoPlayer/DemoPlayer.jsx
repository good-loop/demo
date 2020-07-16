/* @jsx h */
import { h, Fragment } from 'preact';
import { Row, Col, UncontrolledAlert } from 'reactstrap';

import GoodLoopAd from '../../GoodLoopAd';
import DemoPicker from '../DemoPicker';

import SocialDemo from './SocialDemo';
import { DEFAULT_TEST_AD, DEFAULT_PROD_AD } from '../constants';


/** Description of the Good-Loop formats */
const descriptions = {
	social: "The Good-Loop social swipe-to-donate player is shown in social media apps: SnapChat, Instagram, Facebook, or Twitter.",
	video: "Our core product, the Good-Loop video player is shown in a website article as people scroll through, or apprears as a pre-roll before a video begins."
};

/** Simulated device screen images */
const frameImages = {
	landscape: '/img/iphone-mockup-landscape.svg',
	desktop: '/img/laptop-websiteholder-text.svg',
	portrait: '/img/iphone-mockup-portrait.svg'
};

/** Advert sizes for different devices */
const sizes = {
	landscape: 'landscape',
	desktop: 'landscape',
	portrait: 'portrait',
};

const defaultVertId = window.location.hostname.match(/^(test|local)/) ? DEFAULT_TEST_AD : DEFAULT_PROD_AD;

/* index.html loads the script "ads.js", which we know adblockers will catch.
It inserts a div with ID "aiPai9th" - if that isn't present, we know adblock is active. */
const adBlockDetected = !document.getElementById('aiPai9th');

/* We don't do anything with url, matches, path - we just don't want them in ...params */
const DemoPlayer = ({ format, device, social, vertId = defaultVertId, url, matches, path, ...params}) => {
	const isSocial = (format === 'social');

	const ad = isSocial ? (
		<SocialDemo vertId={vertId} adBlocker={adBlockDetected} social={social} {...params} />
	) : (
		<GoodLoopAd vertId={vertId} size={sizes[device]} extraNonce={`${format}${device}`} {...params} />
	);

	// TODO we can add an extra block of description here, if needed.
	const socialDesc = isSocial ? (
		<div className="pb-2 d-flex justify-content-center">
			<p>Here's an example of a Good-Loop campaign, as seen on Instagram:</p>
		</div>
	) : '';

	const fullscreenButton = isSocial ? '' : (
		<Row className="red-bg justify-content-center pt-1">
			<a href={`/fullscreen/${sizes[device]}?gl.vert=${vertId}`} target="_blank" className="fullscreen-button w-button">
				Full Screen Demo
			</a>
		</Row>
	);

	// We render all the frames at once & don't set display:none on them so there's no flicker while they load when switching
	const deviceFrames = Object.entries(frameImages).map(([thisDevice, src]) => (
		<img className="frame-img" src={src} style={{ height: thisDevice === device ? 'inherit' : '0'}} alt={`Framing image for ${thisDevice}`} />
	));

	return <>
		<Row className="justify-content-center pb-4">
			<Col cs="12" md="6" className="text-center">
				{descriptions[format]}
			</Col>
		</Row>
		{ adBlockDetected ? (
			<UncontrolledAlert color="warning" role="alert">
				Adblocker detected. Some of our adverts might not play properly!
			</UncontrolledAlert>
		) : '' }
		<Row className="half-bg">
			<Col xs="12" className="text-center">
				<div className={`device-container ${device} ${format}`}>
					<div className="device-shadow"/>
					<div className="device-screen-bg" />
					<div className="ad-container">{ad}</div>
					{ deviceFrames }
				</div>
			</Col>
		</Row>
		{ fullscreenButton }
	</>;
};

export default DemoPlayer;
