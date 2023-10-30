import { h, Fragment } from 'preact';
import { TADG_DISPLAY_BILLBOARD, TADG_DISPLAY_DOUBLE_MPU, TADG_DISPLAY_LEADERBOARD, TADG_DISPLAY_RESPONSIVE } from '../constants';
import { getPrefix, getProtocol } from '../../../utils';

// TODO replace with KSizes? enum
const STANDARD_SIZES = {
	'double-mpu': [300, 600],
	billboard : [970, 250],
	leaderboard : [728, 90],
	responsive: [950, 300]
};

const AD_FALLBACK = {
	'double-mpu' : TADG_DISPLAY_DOUBLE_MPU,
	billboard : TADG_DISPLAY_BILLBOARD,
	leaderboard : TADG_DISPLAY_LEADERBOARD,
	responsive : TADG_DISPLAY_RESPONSIVE
}

const DisplayDemo = ({subformat: size, vertId, forceServerType, noVertId}) => {
	let iframeUrl = `${getProtocol(forceServerType)}//${getPrefix(forceServerType)}as.good-loop.com/display/${vertId}/index.html`;
	if(!noVertId) iframeUrl = `${getProtocol(forceServerType)}//${getPrefix(forceServerType)}demo.good-loop.com${AD_FALLBACK[size]}`;
	
	console.log(vertId, iframeUrl)
	return (
		<div className={`ad-sizer display banner-${size}`}>
			<iframe src={iframeUrl} className="display-embed" width={STANDARD_SIZES[size][0]} height={STANDARD_SIZES[size][1]} />
		</div>
	)
};

export default DisplayDemo;
