import { h, Fragment } from 'preact';
import { TADG_DISPLAY_BILLBOARD, TADG_DISPLAY_DOUBLE_MPU } from '../constants';


const iframeUrls = {
	billboard: TADG_DISPLAY_BILLBOARD,
	'double-mpu': TADG_DISPLAY_DOUBLE_MPU
};

const DisplayDemo = ({subformat: size}) => {
	return (
		<div className={`ad-sizer display banner-${size}`}>
			<iframe src={iframeUrls[size]} className="display-embed" />
			<div className="aspectifier" />
		</div>
	)
};

export default DisplayDemo;
