import { h, Fragment } from 'preact';
import { TADG_DISPLAY_BILLBOARD, TADG_DISPLAY_DOUBLE_MPU } from '../constants';
import { getPrefix, getProtocol } from '../../../utils';

// TODO replace with KSizes? enum
const STANDARD_SIZES = {
	'double-mpu': [300, 600],
	billboard : [970, 250],
	leaderboard : [728, 90],
	responsive: [500, 500]
};

const DisplayDemo = ({subformat: size, vertId, forceServerType}) => {
	let iframeUrl = `${getProtocol(forceServerType)}//${getPrefix(forceServerType)}as.good-loop.com/display/${vertId}/index.html`;
	return (
		<div className={`ad-sizer display banner-${size}`}>
			<iframe src={iframeUrl} className="display-embed" width={STANDARD_SIZES[size][0]} height={STANDARD_SIZES[size][1]} />
		</div>
	)
};

export default DisplayDemo;
