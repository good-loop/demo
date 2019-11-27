import { h, Fragment } from 'preact';
import GoodLoopAd from "../GoodLoopAd";

import { Row, Col, Alert } from 'reactstrap';
import { portraitSvg, desktopSvg, landscapeSvg } from './DemoSvg';

const frameImages = {
	landscape: 'https://demo.good-loop.com/img/iphone-frame-16-9-padded-notch.svg',
	desktop: 'https://demo.good-loop.com/img/laptop-websiteholder-text.png',
	portrait: 'https://demo.good-loop.com/img/iphone-frame-16-9-padded-notch-portrait.svg'
}

const sizes = {
	social: {}, // TODO Implement and use correct size then
	video: {
		landscape: 'landscape',
		desktop: 'landscape',
		portrait: 'portrait',
	}
}


const makeUrl = (format, device, props) => {
	if (format === 'social') device = 'portrait';
	// TODO Make sure this is escaping things that should be escaped
	const propsString = props ? '?' + Object.entries(props).map((k, v) => `${k}=${v}`).join('&') : '';
	return `/${format}/${device}${propsString}`;
};


const DemoWidget = (props) => <>
	<FormatPicker {...props} />
	<DevicePicker {...props}/>
	<ExplanationText {...props}/>
	<Player {...props}/>
</>;

const Player = ({ format, device, ...props }) => {
	const vertId = props['gl.vert'];

	const ad = format === 'social' ? (
		<Col xs="12">Social test page: Work in progress</Col>
	) : (
		<GoodLoopAd vertId={vertId} size={sizes[format][device]} nonce={`${format}${device}${vertId}`} />
	);

	return <>
		<Row className="half-bg">
			<Col xs="12">
				<img id="frame" className={device} src={frameImages[device]} alt="device frame"/>
				<div className={`device-white-bg ${device}`}></div>
				<div className={`ad-container ${device}`}>{ad}</div>
			</Col>
		</Row>
	</>;
}

const FormatPicker = ({device, format}) => {
	const socialUrl = makeUrl('social', device);
	const videoUrl = makeUrl('video', device);

	// <Col xs="auto" className={`button-box col-auto icon-box option-button ${format === 'social' ? 'highlighted-button' : ''}`}></Col>
	return (
		<Row className={`format-picker text-center justify-content-center ${device} ${format}`}>
			<a className="social-button" href={socialUrl}>SOCIAL</a>
			<a className="video-button" href={videoUrl}>VIDEO</a>
			{/* <div hidden className='button-box col-auto icon-box option-button' id='display'><a>DISPLAY</a></div> */}
		</Row>
	);
};

const DevicePicker = ({device, format}) => {
	const landscapeUrl = makeUrl(format, 'landscape');
	const desktopUrl = makeUrl(format, 'desktop');
	const portraitUrl = makeUrl(format, 'portrait');

	const highlighter = id => { return id === device ? 'highlighted-button' : '' }
	const disabler = id => {
		return format === 'social' && id !== 'portrait' ? 'disabled-button' : '';
	}
	// <Col xs="auto" className={`button-box col-auto icon-box option-button ${highlighter('portrait')}`}></Col>
	// <a href={portraitUrl} className={disabler('portrait')}></a>
	return (
		<Row className={`device-picker justify-content-center ${device} ${format}`}>
			<Col xs="12" md="6" className="text-center">
				<a href={landscapeUrl} className="landscape-button">{landscapeSvg}</a>
				<a href={desktopUrl} className="desktop-button">{desktopSvg}</a>
				<a href={portraitUrl} className="portrait-button">{portraitSvg}</a>
			</Col>
		</Row>
	);
};

const ExplanationText = ({device, format}) => {
    const description =  {
        social: 'The Good-Loop social swipe-to-donate player is shown in social media apps: SnapChat, Instagram, Facebook, or Twitter.',
        video: 'Our core product, the Good-Loop video player is shown in a website article as people scroll through ("in-stream"), or appears as a pre-roll before a video begins.',
		// display: '',
    }[format];

    return <>
        <Row className="justify-content-center">
            <Col xs="12" md="6" className="text-center">{description}</Col>
		</Row>
            {/* Alert if the user is using an ad-block */}
		<Alert className="alert alert-warning alert-dismissible" role="alert">
			Adblocker detected. Some of our adverts might not play properly!
			<button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
		</Alert>
    </>
}

export default DemoWidget;
