import { h, Fragment } from 'preact';
import { Row, Col } from 'reactstrap';
import { landscapeSvg, desktopSvg, portraitSvg } from '../DemoSvg';


const DemoPicker = ({ format, device, hrefs, onClicks}) => {
	const deviceClasses = newDevice => {
		let classes = `picker-button ${newDevice}`
		if (format === 'social' && newDevice !== 'portrait') classes += ' disabled';
		if (newDevice === device) classes += ' current'
		return classes;
	}

	const formatClasses = newFormat => (
		`picker-button ${newFormat}${(newFormat === format) ? ' current' : ''}`
	);

	const hrefUrl = ({newFormat, newDevice}) => `/${newDevice || device}/${newFormat || format}`;

	return <>
		<Row className="format-picker text-center justify-content-center">
			<a className={formatClasses('social')} href={hrefUrl({newFormat: 'social', newDevice: 'portrait'})}>
				Social
			</a>
			<a className={formatClasses('video')} href={hrefUrl({newFormat: 'video'})}>
				Video
			</a>
		</Row>
		<Row className="device-picker justify-content-center pb-4 flex-row">
			<Col xs="auto" md="auto" className="text-center flex-row">
				<a href={hrefUrl({newDevice: 'landscape'})} className={`button ${deviceClasses('landscape')}`} >
					{landscapeSvg}
				</a>
				<a href={hrefUrl({newDevice: 'desktop'})} className={`button ${deviceClasses('desktop')}`} >
					{desktopSvg}
				</a>
				<a href={hrefUrl({newDevice: 'portrait'})} className={`button ${deviceClasses('portrait')}`} >
					{portraitSvg}
				</a>
			</Col>
		</Row>
	</>;
};

export default DemoPicker;