import { h, Fragment } from 'preact';
import GoodLoopAd from "../GoodLoopAd";

import { Row, Col, Alert } from 'reactstrap';

/** Simulated device screen images */
const frameImages = {
	landscape: '/img/iphone-frame-16-9-padded-notch.svg',
	desktop: '/img/laptop-websiteholder-text.png',
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


const DemoWidget = ({ format, device, defaultVertId, ...props }) => {
	// const vertId = props['gl.vert'] || 'ojRZHHd48s';
	const vertId = props['gl.vert'] || defaultVertId;

	const ad = format === 'social' ? (
		<img className="social-mockup" src="/img/snapchat.lynx.preview.jpg" />
	) : (
		<GoodLoopAd vertId={vertId} size={sizes[format][device]} nonce={`${format}${device}${vertId}`} />
	);

	return (
		<Row className="half-bg">
			<Col xs="12" className="text-center">
				<div className={`device-container ${device}`}>
					<div className="device-screen-bg" />
					<div className="ad-container">{ad}</div>
					<img className="frame-img" src={frameImages[device]} alt="Framing image for device"/>	
				</div>
				
			</Col>
		</Row>
	);
}

export default DemoWidget;
