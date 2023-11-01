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

const DisplayDemo = ({subformat: size, vertId, forceServerType, noVertId, useDefault}) => {
	let iframeUrl = `${getProtocol(forceServerType)}//${getPrefix(forceServerType)}as.good-loop.com/display/${vertId}/index.html`;

	// if no ad is selected or the ad isn't a display ad, show default
	// TEMP HACK, just force it to use the old defaults as there's currently no actual existing 
	if(true || !noVertId || useDefault) iframeUrl = `${getProtocol(forceServerType)}//${getPrefix(forceServerType)}demo.good-loop.com${AD_FALLBACK[size]}`;
	
	return (
		<div className={`ad-sizer display banner-${size}`}>
			<iframe src={iframeUrl} className="display-embed" width={STANDARD_SIZES[size][0]} height={STANDARD_SIZES[size][1]} />
		</div>
	)
};

export default DisplayDemo;
