import { h, Fragment } from 'preact';
import { Row, Col, UncontrolledAlert } from 'reactstrap';

import DemoPicker from './DemoPicker';
import DemoWidget from './DemoWidget';


/** Description of the Good-Loop formats */
const descriptions = {
	social: "The Good-Loop social swipe-to-donate player is shown in social media apps: SnapChat, Instagram, Facebook, or Twitter.",
	video: "Our core product, the Good-Loop video player is shown in a website article as people scroll through, or apprears as a pre-roll before a video begins."
};

const adBlockDetected = !document.getElementById('aiPai9th');

const DemoPlayer = ({ format, device, vertId, noSocial, ...props}) => {
	return <>
		<DemoPicker format={format} device={device} vertId={vertId} noSocial={noSocial} />
		<Row className="justify-content-center pb-4">
			<Col cs="12" md="6" className="text-center">
				{descriptions[format]}
			</Col>
		</Row>
		<AdBlockAlert />
		<DemoWidget device={device} format={format} vertId={vertId} {...props} />
		<Row className="red-bg justify-content-center pt-1">
			<FullscreenButton format={format} device={device} vertId={vertId} />
		</Row>
	</>;
};

/*
	For this adblocker to work inject a dummy ad.js generating a div with the id below in the page head
	Check the Demo Page index.html for an example.
*/
const AdBlockAlert = () => !adBlockDetected ? '' : (
	<UncontrolledAlert color="warning" role="alert">
		Adblocker detected. Some of our adverts might not play properly!
	</UncontrolledAlert>
);

//// Fullscreen Button ////

const deviceToSize = {
	landscape: 'landscape',
	portrait: 'portrait',
	desktop: 'landscape',
};

const FullscreenButton = ({ format, device, vertId }) => {
	const fullscreenURL = `//${window.location.host}/fullscreen/${deviceToSize[device]}?gl.vert=${vertId}`;
	if (format !== 'social') {
		return <a href={fullscreenURL} target="_blank" className="fullscreen-button w-button">Full Screen Demo</a>
	} else {
		return '';
	}
};
//////////////////////////

export default DemoPlayer;