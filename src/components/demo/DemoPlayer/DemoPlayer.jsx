/* @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Row, Col, UncontrolledAlert } from 'reactstrap';

import { DEFAULT_AD, DEFAULT_PROD_SOCIAL_AD, serverTypeForAd } from '../constants';

import GoodLoopAd from '../../GoodLoopAd';
import DisplayDemo from './DisplayDemo';
import SocialDemo from './SocialDemo';


/** Description of the Good-Loop formats */
const descriptions = {
	social: 'The Good-Loop social swipe-to-donate player is shown in social media apps: SnapChat, Instagram, Facebook, or Twitter.',
	display: 'Our ‘This Ad Does Good’ display ads are just like our video format but with a little twist. Rather than asking consumers to watch a brand video, we simply take the brand’s standard display adverts and wrap them in our bespoke creative skin to let consumers know the brand is supporting a social cause.\nWe serve this ad format across premium high-quality video inventory with leading publishers around the world.',
	video: '',
	'video-wtd': 'Our core product, the Good-Loop video player is shown in a website article as people scroll through, or appears as a pre-roll before a video begins.',
	'video-tadg': 'Welcome to our shiny core video offering – This Ad Does Good. The name says it all, to be honest. If consumers watch just half of the brand advert, they’ll unlock a free donation to a charity, funded by the advertiser.\nWe serve this ad format across premium high-quality video inventory with leading publishers around the world.',
};

/** Simulated device screen images */
const frameImages = {
	landscape: '/img/iphone-mockup-landscape.svg',
	desktop: '/img/laptop-websiteholder-text.svg',
	billboard: '/img/laptop-billboard-bg.svg',
	leaderboard: '/img/leaderboard-laptop.svg',
	responsive: '/img/responsive-laptop.svg',
	linkedin: '/img/laptop-linkedin-bg.svg',
	'double-mpu': '/img/laptop-double-mpu-bg.svg',
	portrait: '/img/iphone-mockup-portrait.svg'
};

/** Advert sizes for different devices */
const sizes = {
	landscape: 'landscape',
	desktop: 'landscape',
	portrait: 'portrait',
};

/* index.html loads the script "ads.js", which we know adblockers will catch.
It inserts a div with ID "aiPai9th" - if that isn't present, we know adblock is active. */
const adBlockDetected = !document.getElementById('aiPai9th');


/* We don't do anything with url, matches, path - we just don't want them in ...params */
const DemoPlayer = ({ format, device, 'gl.vert': vertId, url, matches, path, ...params}) => {
	const isVideo = (format === 'video');
	const isSocial = (format === 'social');
	const isDisplay = (format === 'display');

	// We display different text for TADG and WTD ads - inspect unit.json when loading a video ad to see which it is.
	const [videoType, setVideoType] = useState('');
	const onUnitJson = unitObj => {
		// Catch the old URL-param way of specifying This Ad Does Good
		if (params['gl.unitType'] === 'trees') {
			setVideoType('tadg');
			return;
		}
		setVideoType(unitObj.vert.advanced?.playerVariant === 'trees' ? 'tadg' : 'wtd');
	};
	const descKey = (format === 'video' && videoType) ? `video-${videoType}` : format;
	const description = descriptions[descKey];

	// Add "autoplay on load" to params
	params['gl.play'] = 'onload';

	// If missing vertId, use fallback ads for display format
	let noVertId = !!vertId;

	// Fill in default advert ID - different ads for social and video
	if (!vertId) vertId = isSocial ? DEFAULT_PROD_SOCIAL_AD : DEFAULT_AD;

	// If the ad is one of the default demo ads, tell GoodLoopAd / SocialDemo to fetch it from the appropriate ad server
	params.forceServerType = serverTypeForAd[vertId];

	const ad = {
		social: <SocialDemo vertId={vertId} adBlocker={adBlockDetected} {...params} />,
		video: <GoodLoopAd vertId={vertId} size={sizes[device]} extraNonce={`${format}${device}`} onUnitJson={onUnitJson} {...params} />,
		display: <DisplayDemo {...params} vertId={vertId} forceServerType={serverTypeForAd[vertId]} noVertId={noVertId} />
	}[format];

	// TODO we can add an extra block of description here, if needed.
	/* const socialDesc = isSocial ? (
		<div className="pb-2 d-flex justify-content-center">
			<p>Here's an example of a Good-Loop campaign, as seen on Instagram:</p>
		</div>
	) : ''; */

	const fullscreenUrl = new URL(window.location.href);
	fullscreenUrl.pathname = `/fullscreen/${sizes[device]}`;

	const fullscreenButton = isVideo ? (
		<Row className="red-bg justify-content-center pt-1">
			<a href={fullscreenUrl.toString()} target="_blank" className="fullscreen-button">Full Screen Demo</a>
		</Row>
	) : '';

	// Display ads take non-standard frames
	const currentFrame = isDisplay ? params.subformat : device;

	// We render all the frames at once & don't set display:none on them so there's no flicker while they load when switching
	const deviceFrames = Object.entries(frameImages).map(([frameName, src]) => (
		<img className={`frame-img ${frameName}`} src={src} style={{ height: frameName === currentFrame ? 'inherit' : '0'}} alt={`Framing image for ${frameName}`} />
	));

	let containerClasses = `device-container ${device} ${format}`;
	if (isDisplay) containerClasses += ` display banner-${params.subformat}`;

	return <>
		<Row className="justify-content-center pb-4">
			<Col xs="12" md="6" className="format-description text-center">
				{description.split('\n').map(line => <p>{line}</p>)}
			</Col>
		</Row>
		{ adBlockDetected ? (
			<UncontrolledAlert color="warning" role="alert">
				Adblocker detected. Some of our adverts might not play properly!
			</UncontrolledAlert>
		) : '' }
		<Row>
			<Col xs="12" className="text-center">
				<div className={containerClasses}>
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
