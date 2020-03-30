import { h, Fragment } from 'preact';
import { useState, useCallback } from 'preact/hooks';

import GoodLoopAd from "./GoodLoopAd";


let fakeVisCheck; // Declared outside SocialAd so it persists across renders
const socialVertId = 'PL4bGYSW' //'0PVrD1kX' //  Default to TOMS Josh EN Male advert. ;
const socialUnitProps = {
	size: 'portrait',
	glParams: {'gl.delivery': 'app', 'gl.after': 'persist'},
	production: false
};
const hostPrefix = window.location.hostname.match(/^(test|local)/) ? 'test' : '';

const SocialAd = ({vertId = socialVertId}) => {
	if (vertId === 'test_wide_multiple') vertId = socialVertId;
	const [showAd, setShowAd] = useState(0); // User has swiped to show the ad
	const [visClass, setVisClass] = useState(''); // 'visible' if the fake feed is on-screen and should start animating
	const [previewUrl, setPreviewUrl] = useState('https://media.good-loop.com/uploads/standard/toms_snapchat_ad.mp4');
	const [isMockup, setIsMockup] = useState(false);

	// Call fetch on portal to get ad json, return videos in form of a promise
	const getAdVideos = vertId => {
		return fetch(`https://${hostPrefix}portal.good-loop.com/advert/${vertId}.json`)
			.then(res => res.json())
			.then(data => {
				return data.cargo.videos
			})
	};

	// Resolve recieved videos promise from AdServer.
	// If vertical vid available, use it for the preview
	const setPreviewVideoIfAvailable = videoArrayPromise => {
		videoArrayPromise
			.then(res => res.filter(e => e.aspect === '9:16'))
			.then(videos => {
				if (videos.length > 0) {
					setPreviewUrl(videos.pop().url);
					setIsMockup(true);
				} 
			})
	};

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
	// const videoUrl = adHasSocialPreview(vertId) ? getSocialPreview(vertId) : defaultPreviewUrl;

	// Get videos from ad, if vertical available use it for preview
	setPreviewVideoIfAvailable(getAdVideos(vertId));

	return (
		<div className="ad-sizer portrait">
			<div className="aspectifier" />
			<div className={`fake-feed ${visClass}`}>
				<img src="https://media.good-loop.com/uploads/standard/snap_logo_background.jpg" className="snap-img first" />
				<img src="https://media.good-loop.com/uploads/standard/snap_ferry_view.jpg" className="snap-img delay1" />
				<img src="https://media.good-loop.com/uploads/standard/snap_makeup_tutorial.jpg" className="snap-img delay2" />
				<img src="https://media.good-loop.com/uploads/standard/snap_food_bear.jpg" className="snap-img delay3" />
				<video src={previewUrl} className={`snap-img delay4${isMockup ? ' social-overlay' : ''}`}
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
