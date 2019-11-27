/* @jsx h */
import { h, Fragment } from "preact";
import { Container, Row, Col, Footer, Alert } from 'reactstrap';

import DemoSiteNavBar from "./DemoSiteNavBar";
import DemoWidget from "./DemoWidget";
import { portraitSvg, desktopSvg, landscapeSvg } from './DemoSvg';

const deviceSvgs = {
	landscape: landscapeSvg,
	desktop: desktopSvg,
	portrait: portraitSvg,
};

/** Descriptions of the Good-Loop formats */
const descriptions = {
	social: 'The Good-Loop social swipe-to-donate player is shown in social media apps: SnapChat, Instagram, Facebook, or Twitter.',
	video: 'Our core product, the Good-Loop video player is shown in a website article as people scroll through ("in-stream"), or appears as a pre-roll before a video begins.',
	// display: '',
};


const makeUrl = (format, device, props) => {
	if (format === 'social') device = 'portrait';
	// TODO Make sure this is escaping things that should be escaped
	const propsString = props ? '?' + Object.entries(props).map((k, v) => `${k}=${v}`).join('&') : '';
	return `/${format}/${device}${propsString}`;
};


const FormatButton = ({format, current, ...props}) => {
	const classes = ['picker-button'];
	let url = '#'; // default to go-nowhere

	if (format !== current.format) {
		url = makeUrl(current.device, format, props);
	} else {
		classes.push('current'); // add marker class to highlight currently active format
	}

	return <a href={url} className={classes.join(' ')}>{format}</a>
};


const DeviceButton = ({device, current, ...props}) => {
	const classes = ['picker-button'];
	// can't show social on anything but portrait phone
	const disabled = (current.format === 'social' && device !== 'portrait'); 
	const isCurrent = (device === current.device);

	let url = '#'; // default to go-nowhere

	if (!isCurrent && !disabled) {
		url = makeUrl(device, current.format, props);
	} else if (isCurrent) {
		classes.push('current'); // add marker class to highlight currently active device
	} else if (disabled) {
		classes.push('disabled');
	}

	return <a href={makeUrl(device, current.format, props)} className={classes.join(' ')}>{deviceSvgs[device]}</a>
};


const fullScreenUrl = 'https://media.good-loop.com/uploads/raw/generic.html?gl.vert=JvtlN3pk&gl.size=landscape';

const DemoPage = ({device, format, ...props}) => <>
	<DemoSiteNavBar />
	<Container>

		<h4 className="playertopheader text-center">Want to see our products in action? Look no further.</h4>
		<Row className="format-picker text-center justify-content-center">
			<FormatButton format="social" current={{device, format}} {...props} />
			<FormatButton format="video" current={{device, format}} {...props} />
			{/* <FormatButton format="display" current={{device, format}} {...props} /> */}
		</Row>
		<Row className="device-picker justify-content-center">
			<Col xs="12" md="6" className="text-center">
				<DeviceButton device="landscape" current={{device, format}} {...props} />
				<DeviceButton device="desktop" current={{device, format}} {...props} />
				<DeviceButton device="portrait" current={{device, format}} {...props} />
			</Col>
		</Row>

		<Row className="justify-content-center">
			<Col xs="12" md="6" className="text-center">{descriptions[format]}</Col>
		</Row>

		{/* Alert if the user is using an ad-block */}
		<Alert className="alert alert-warning alert-dismissible" role="alert">
			Adblocker detected. Some of our adverts might not play properly!
			<button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
		</Alert>

		<DemoWidget device={device} format={format} {...props} />

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
				<img src="/img/icon-heart.png" alt=""/>
				<p>People can opt-in to watch an ad in exchange for a free donation.</p>
			</Col>
			<Col xs='4'>
				<img src="/img/icon-eye.png" alt=""/>
				<p>They give the advertiser 100% of their attention for at least 15 seconds.</p>
			</Col>
			<Col xs='4'>
				<img src="/img/icon-coins.png" alt=""/>
				<p>Then they get to donate half of the payment to a charity of their choice.</p>
			</Col>
		</Row>
	</>
};

const RedMiddleSection = () => {
	return (
		<Row className="red-bg">
			<Col className="justify-content-md-center text-center">
				<a href={fullScreenUrl} target="_blank" className="fullscreen-button w-button">Full Screen Demo</a>
				<h4 className="playermiddleheader">if you&#x27;re running an ad online then why not work with us?</h4>
				<p>
					Our ethical ad formats are proven to drive higher engagement and
					significant brand uplift. So you can connect with your consumer in a
					meaningful way whilst enabling them to do good, for free.
				</p>
				<p>
					Want to know more?
					<div><a href="https://www.good-loop.com/contact-us" className="w-button">Get In Touch</a></div>
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
