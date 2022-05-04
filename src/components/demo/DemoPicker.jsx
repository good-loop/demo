/* @jsx h */
import { h, Fragment } from 'preact';
import { Row, Col } from 'reactstrap';
import { landscapeSvg, desktopSvg, portraitSvg } from './DemoSvg';


/** Generates links to change the format (social/video) and simulated device (landscape/portrait phone, desktop) */
const DemoPicker = ({ format, device, subformat, context, noSocial, hides }) => {

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

	// Social subformats have subtypes for context - addressed as eg /portrait/social/instagram/infeed
	const subformatClasses = newSubformat => {
		let classes = `picker-button ${newSubformat}`;
		if (newSubformat === subformat || newSubformat === `${subformat}/${context}`) classes += ' current';
		return classes;
	};


	// Construct a new URL which will demo the chosen format + device + sub-format (banner type, social network, etc) combo.
	// Values not supplied will be left as current
	const hrefUrl = ({newFormat = format, newDevice = device, newSubformat}) => {
		let {search, hash} = window.location;
		if (hash) hash = '#' + hash;
		if (!newSubformat) {
			if (newFormat === format) newSubformat = subformat; // link from e.g. social to social? default to keeping current subformat
			else newSubformat = {social: 'instagram', display: 'billboard'}[newFormat] || ''; // cross-format link: take default subformat
		}

		return `/${newDevice}/${newFormat}/${newSubformat}${search}${hash}`;
	};

	const hideSocial = hides.includes('social');
	const hideVideo = hides.includes('desktop') && hides.includes('mobile-landscape') && hides.includes('mobile-portrait');

	// Don't allow format change if the noSocial URL param is set
	const formatPicker = noSocial ? '' : (
		<Row className="format-picker text-center justify-content-center">
			{hideSocial ? '' :
				<a href={hrefUrl({newFormat: 'social', newDevice: 'portrait'})} className={formatClasses('social')}>
					Social
				</a>}
			{hideVideo ? '' :
				<a href={hrefUrl({newFormat: 'video'})} className={formatClasses('video')}>
					Video
				</a>}
			<a href={hrefUrl({newFormat: 'display', newDevice: 'desktop', })} className={formatClasses('display')}>
				Display
			</a>
		</Row>
	);

	// Pick between device types (desktop, portrait/landscape mobile)
	const devicePicker = (format === 'video') ? (
		<Row className="device-picker justify-content-center pb-4 flex-row">
			<Col xs="auto" md="auto" className="text-center flex-row">
				{hides.includes("mobile-landscape") ? '' :
					<a href={hrefUrl({newDevice: 'landscape'})} className={deviceClasses('landscape')} >
						{landscapeSvg}
					</a>}
				{hides.includes("desktop") ? '' :
					<a href={hrefUrl({newDevice: 'desktop'})} className={deviceClasses('desktop')} >
						{desktopSvg}
					</a>}
				{hides.includes("mobile-portrait") ? '' :
					<a href={hrefUrl({newDevice: 'portrait'})} className={deviceClasses('portrait')} >
						{portraitSvg}
					</a>}
			</Col>
		</Row>
	) : null;

	// Pick between social platforms/contexts or between banner sizes
	let subformatPicker;
	if (format === 'social') {
		subformatPicker = (
			<Row className="subformat-picker justify-content-center pb-4 flex-row">
				<Col xs="auto" md="auto" className="text-center flex-row">
					<a href={hrefUrl({newSubformat: 'instagram/stories'})} className={subformatClasses('instagram/stories')} >
						Instagram<br/>Stories
					</a>
					<a href={hrefUrl({newSubformat: 'instagram/infeed'})} className={subformatClasses('instagram/infeed')} >
						Instagram<br/>In-Feed
					</a>
				</Col>
			</Row>
		)
	} else if (format === 'display') {
		subformatPicker = (
			<Row className="subformat-picker justify-content-center pb-4 flex-row">
				<Col xs="auto" className="text-center flex-row">
					<a href={hrefUrl({newSubformat: 'billboard'})} className={subformatClasses('billboard')} >
						Billboard
					</a>
					<a href={hrefUrl({newSubformat: 'double-mpu'})} className={subformatClasses('double-mpu')} >
						Double MPU
					</a>
				</Col>
			</Row>
		)
	};


	return <>
		{formatPicker}
		{devicePicker}
		{subformatPicker}
	</>;
};

export default DemoPicker;
