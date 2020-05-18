/* @jsx h */
import { h, Fragment } from 'preact';
import { Row, Col } from 'reactstrap';
import { landscapeSvg, desktopSvg, portraitSvg } from '../DemoSvg';


/** Generates links to change the format (social/video) and simulated device (landscape/portrait phone, desktop) */
const DemoPicker = ({ format, device, social, noSocial }) => {
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

	const socialClasses = newSocial => {
		let classes = `picker-button ${newSocial}`;
		if (newSocial === social) classes += ' current';
		return classes;
	};

	const hrefUrl = ({newFormat = format, newDevice = device, newSocial = 'snapchat'}) => {
		let {search, hash} = window.location;
		if (hash) hash = '#' + hash;
		let social = format === 'social' ? newSocial + '/' : '';
		return `/${newDevice}/${newFormat}/${social}${search}${hash}`;
	};

	// Don't allow format change if the noSocial URL param is set
	const formatPicker = noSocial ? '' : (
		<Row className="format-picker text-center justify-content-center">
			<a className={formatClasses('social')} href={hrefUrl({newFormat: 'social', newDevice: 'portrait'})}>
				Social
			</a>
			<a className={formatClasses('video')} href={hrefUrl({newFormat: 'video'})}>
				Video
			</a>
		</Row>
	);

	const socialPicker = format !== 'social' ? '' : (
		<Row className="format-picker text-center justify-content-center">
			<a className={socialClasses('snapchat')} href={hrefUrl({newSocial: 'snapchat'})}>
				Snapchat
			</a>
			<a className={socialClasses('instagram')} href={hrefUrl({newSocial: 'instagram'})}>
				Instagram
			</a>
		</Row>
	);

	return <>
		{formatPicker}
		<Row className="device-picker justify-content-center pb-4 flex-row">
			<Col xs="auto" md="auto" className="text-center flex-row">
				<a href={hrefUrl({newDevice: 'landscape'})} className={deviceClasses('landscape')} >
					{landscapeSvg}
				</a>
				<a href={hrefUrl({newDevice: 'desktop'})} className={deviceClasses('desktop')} >
					{desktopSvg}
				</a>
				<a href={hrefUrl({newDevice: 'portrait'})} className={deviceClasses('portrait')} >
					{portraitSvg}
				</a>
			</Col>
		</Row>
		{socialPicker}
	</>;
};

export default DemoPicker;
