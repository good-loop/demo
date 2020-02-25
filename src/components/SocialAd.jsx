import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

import GoodLoopAd from "./GoodLoopAd";


let fakeVisCheck; // Declared outside SocialAd so it persists across renders
const socialVertId = '0PVrD1kX'; // Default to TOMS Josh EN Male advert.
const socialUnitProps = {
	size: 'portrait',
	glParams: {'gl.delivery': 'app', 'gl.after': 'persist'},
	production: true
};


const SocialAd = ({vertId = socialVertId}) => {
	const [showAd, setShowAd] = useState(0); // User has swiped to show the ad
	const [visClass, setVisClass] = useState(''); // 'visible' if the fake feed is on-screen and should start animating

	// Prevents scrolling on mobile when user attempts to swipe the social ad.
	const lockScreen = () => { 
		document.body.style.overflow = 'hidden';
		setShowAd(true);
	};
	const unlockScreen = () => document.body.style.overflow = 'auto';

	/* TODO Turn this into an actual visibility check */
	if (!fakeVisCheck) {
		fakeVisCheck = window.setTimeout(() => setVisClass('visible'), 100);
	}

	// TODO When gl.delivery === 'app', gl.after should probably default to "persist"
	const unitProps = { vertId, ...socialUnitProps };

	return (
		<div className="ad-sizer portrait">
			<div className="aspectifier" />
			<div className={`fake-feed ${visClass}`}>
				<img src="https://media.good-loop.com/uploads/standard/snap_logo_background.jpg" className="snap-img first" />
				<img src="https://media.good-loop.com/uploads/standard/snap_ferry_view.jpg" className="snap-img delay1" />
				<img src="https://media.good-loop.com/uploads/standard/snap_makeup_tutorial.jpg" className="snap-img delay2" />
				<img src="https://media.good-loop.com/uploads/standard/snap_food_bear.jpg" className="snap-img delay3" />
				<video src="https://media.good-loop.com/uploads/standard/toms_snapchat_ad.mp4" className="snap-img delay4"
					autoPlay loop muted playsInline
					onMouseDown={() => setShowAd(true)}
					onTouchStart={lockScreen}
					onTouchEnd={unlockScreen}
					onTouchMove={e => e.preventDefault()}
				/>
				<div className="show-ad" onClick={() => setShowAd(true)} />
			</div>
			<div className={`social-ad ${showAd ? 'show' : ''}`}>
				{ showAd ? <GoodLoopAd {...unitProps} /> : '' }
			</div>
		</div>
	);
};


export default SocialAd;
