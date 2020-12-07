/* @jsx h */
import { h, Fragment } from 'preact';
import { Row, Col } from 'reactstrap';
import { landscapeSvg, desktopSvg, portraitSvg } from './DemoSvg';


/** Generates links to change the format (social/video) and simulated device (landscape/portrait phone, desktop) */
const DemoPicker = ({ format, device, social, noSocial, hide }) => {

	const deviceClasses = newDevice => {
		let classes = `button picker-button ${newDevice}`
		if (format === 'social' && newDevice !== 'portrait') classes += ' disabled';
		if (newDevice === device) classes += ' current'
		return classes;
	}

	const formatClasses = newFormat => {
		let classes = `picker-button ${newFormat}`;
		if (newFormat === format) classes += ' current';
		return classes;
	};

	// Construct a new URL which will demo the chosen format + device + optional social network combo.
	// Format/device/social values not supplied will be left as current
	const hrefUrl = ({newFormat = format, newDevice = device, newSocial = (social || 'instagram')}) => {
		let {search, hash} = window.location;
		if (hash) hash = '#' + hash;
		let social = (newFormat === 'social') ? (newSocial + '/') : '';
		return `/${newDevice}/${newFormat}/${social}${search}${hash}`;
	};

	const hideVideo = hide.includes("desktop") && hide.includes("mobile-landscape") && hide.includes("mobile-portrait");

	// Don't allow format change if the noSocial URL param is set
	const formatPicker = noSocial ? '' : (
		<Row className="format-picker text-center justify-content-center">
			{hide.includes("social") ? '' : 
				<a href={hrefUrl({newFormat: 'social', newDevice: 'portrait'})} className={formatClasses('social')}>
					Social
				</a>}
			{hideVideo ? '' :
				<a href={hrefUrl({newFormat: 'video'})} className={formatClasses('video')}>
					Video
				</a>}
		</Row>
	);

	return <>
		{formatPicker}
		<Row className="device-picker justify-content-center pb-4 flex-row">
			<Col xs="auto" md="auto" className="text-center flex-row">
				{hide.includes("mobile-landscape") ? '' :
					<a href={hrefUrl({newDevice: 'landscape'})} className={deviceClasses('landscape')} >
						{landscapeSvg}
					</a>}
				{hide.includes("desktop") ? '' :
					<a href={hrefUrl({newDevice: 'desktop'})} className={deviceClasses('desktop')} >
						{desktopSvg}
					</a>}
				{hide.includes("mobile-portrait") ? '' :
					<a href={hrefUrl({newDevice: 'portrait'})} className={deviceClasses('portrait')} >
						{portraitSvg}
					</a>}
			</Col>
		</Row>
	</>;
};

export default DemoPicker;
