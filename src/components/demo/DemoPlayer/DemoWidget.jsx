import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import GoodLoopAd from "../../GoodLoopAd";

import { Row, Col } from 'reactstrap';

const detectEnvironment = () => {
	const host = window.location.hostname;
	if (host.includes('test')) return 'test';
	if (host.includes('local')) return 'local';
	return null;
}

const defaultVertId = window.location.hostname.match(/^(test|local)/) ? 'test_wide_multiple' : 'ojRZHHd48s';


/** Simulated device screen images */
const frameImages = {
	landscape: '/img/iphone-frame-16-9-padded-notch.svg',
	desktop: '/img/laptop-websiteholder-text.svg',
	portrait: '/img/iphone-frame-16-9-padded-notch-portrait.svg'
}

/** Advert sizes for different devices */
const sizes = {
	social: {
		portrait: 'social',
	}, // TODO Implement and use correct size then
	video: {
		landscape: 'landscape',
		desktop: 'landscape',
		portrait: 'portrait',
	}
}


const DemoWidget = ({ format, device, production, ...props }) => {
	// const vertId = props['gl.vert'] || 'ojRZHHd48s';
	const vertId = props['gl.vert'] || defaultVertId;

	console.log(`about to access sizes[${format}][${device}]`);

	const ad = format === 'social' ? (
		<SocialAd />
	) : (
		<GoodLoopAd vertId={vertId} size={sizes[format][device]} nonce={`${format}${device}${vertId}`} production={production} />
	);

	const styleFrame = (frameDevice) => ({ height: frameDevice === device ? 'inherit' : '0'});

	return (
		<Row className="half-bg">
			<Col xs="12" className="text-center">
				<div className={`device-container ${device}`}>
					<div className="device-shadow"/>
					<div className="device-screen-bg" />
					<div className="ad-container">{ad}</div>
					<img className="frame-img" src={frameImages['landscape']} style={styleFrame('landscape')} alt="Framing image for device"/>
					<img className="frame-img" src={frameImages['portrait']} style={styleFrame('portrait')} alt="Framing image for device"/>
					<img className="frame-img" src={frameImages['desktop']} style={styleFrame('desktop')} alt="Framing image for device"/>
				</div>
			</Col>
		</Row>
	);
}

const SocialAd = ({vertId, nonce}) => {
	const [showAd, setShowAd] = useState(0);
	const size = 'portrait';
	// Hardcoded TOMS Josh EN Male advert. We will show this only on the DemoPage.
	vertId = '0PVrD1kX';

	// Prevents scrolling on mobile when user attempts to swipe the social ad.
	const lockScreen = () => { 
		document.body.style.overflow = 'hidden';
		setShowAd(true);
	};
	const unlockScreen = () => { document.body.style.overflow = 'auto' };

	return (
		<div className="ad-sizer portrait" >
			<div className="aspectifier" />
			<div className="fake-feed" >
				<video
					onClick={ () => setShowAd(true) }
					onTouchStart={ lockScreen }
					onTouchEnd={ unlockScreen }
					width="100%"
					autoPlay
					muted
					playsInline
					loop
					src="https://media.good-loop.com/uploads/standard/toms_snapchat_ad.mp4" 
				/>
				<div className="show-ad" onClick={() => setShowAd(true)}>trigger ad</div>
			</div>
			<div className={`social-ad ${showAd ? 'show' : ''}`}>
				{ showAd ? <GoodLoopAd vertId={vertId} size={size} nonce={nonce} production social /> : '' }
			</div>
		</div>
	);
};

export default DemoWidget;
