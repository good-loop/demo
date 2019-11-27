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


const DemoWidget = ({ format, device, ...props }) => {
	const vertId = props['gl.vert'];

	const ad = format === 'social' ? (
		<div>Social test page: Work in progress</div>
	) : (
		<GoodLoopAd vertId={vertId} size={sizes[format][device]} nonce={`${format}${device}${vertId}`} />
	);

	return (
		<Row className="half-bg">
			<Col xs="12" className="text-center">
				<img id="frame" className={device} src={frameImages[device]} alt="device frame"/>
				<div className={`device-white-bg ${device}`}></div>
				<div className={`ad-container ${device}`}>{ad}</div>
			</Col>
		</Row>
	);
}

export default DemoWidget;
