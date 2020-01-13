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
	const vertId = props['gl.vert'] || defaultVertId;

	const ad = format === 'social' ? <SocialAd /> : (
		<GoodLoopAd vertId={vertId} size={sizes[format][device]} nonce={`${format}${device}${vertId}`} production={production} />
	);

	const styleFrame = (frameDevice) => ({ height: frameDevice === device ? 'inherit' : '0'});

	const socialTextPresentation = (
		<div className="pb-2 d-flex justify-content-center">
			<p>Here's an example of a Good-Loop campaign, as seen on Snapchat:</p>
		</div>
	);

	return (
		<>
		{ format === 'social' ? socialTextPresentation : '' }
		<Row className="half-bg">
			<Col xs="12" className="text-center">
				<div className={`device-container ${device} ${format === 'social' ? 'social' : ''}`}>
					<div className="device-shadow"/>
					<div className="device-screen-bg" />
					<div className="ad-container">{ad}</div>
					<img className="frame-img" src={frameImages['landscape']} style={styleFrame('landscape')} alt="Framing image for device"/>
					<img className="frame-img" src={frameImages['portrait']} style={styleFrame('portrait')} alt="Framing image for device"/>
					<img className="frame-img" src={frameImages['desktop']} style={styleFrame('desktop')} alt="Framing image for device"/>
				</div>
			</Col>
		</Row>
		</>
	);
}

const SocialAd = ({vertId, nonce}) => {
	const [showAd, setShowAd] = useState(0);
	const [visible, setVisible] = useState(false);

	let fakeVisCheck;

	const size = 'portrait';
	// Hardcoded TOMS Josh EN Male advert.
	vertId = '0PVrD1kX';

	// Prevents scrolling on mobile when user attempts to swipe the social ad.
	const lockScreen = () => { 
		document.body.style.overflow = 'hidden';
		setShowAd(true);
	};
	const unlockScreen = () => { 
		document.body.style.overflow = 'auto';
	};

	/* TODO Turn this into an actual visibility check */
	if (!fakeVisCheck) {
		fakeVisCheck = window.setTimeout(() => {
			setVisible(true);
		}, 100);
	}

	let feedClass = 'fake-feed' + (visible ? ' visible' : '');

	// TODO When gl.delivery === 'app', gl.after should probably default to "persist"
	const unitProps = { vertId, size, nonce, glParams: {'gl.delivery': 'app', 'gl.after': 'persist'}, production: true };

	return (
		<div className="ad-sizer portrait" >
			<div className="aspectifier" />
			<div className={feedClass} >
				<img src="https://media.good-loop.com/uploads/standard/snap_logo_background.jpg" className="snap-img first" />
				<img src="https://media.good-loop.com/uploads/standard/snap_ferry_view.jpg" className="snap-img delay1" />
				<img src="https://media.good-loop.com/uploads/standard/snap_makeup_tutorial.jpg" className="snap-img delay2" />
				<img src="https://media.good-loop.com/uploads/standard/snap_food_bear.jpg" className="snap-img delay3" />
				<video src="https://media.good-loop.com/uploads/standard/toms_snapchat_ad.mp4" className="snap-img delay4"
					autoPlay loop muted playsInline
					onMouseDown={() => setShowAd(true)}
					onTouchStart={lockScreen}
					onTouchEnd={unlockScreen}
					onTouchMove={e => e.preventDefault()}
				/>
				<div className="show-ad" onClick={() => setShowAd(true)} />
			</div>
			<div className={`social-ad ${showAd ? 'show' : ''}`}>
				{ showAd ? <GoodLoopAd {...unitProps} /> : '' }
			</div>
		</div>
	);
};

export default DemoWidget;
