import { h, Fragment } from 'preact';
import { useState, useCallback, useEffect } from 'preact/hooks';

import GoodLoopAd from "./GoodLoopAd";
import { getUnitUrl } from '../utils';


const socialVertId = '0PVrD1kX' // 'PL4bGYSW' //  Default to TOMS Josh EN Male advert. ;
const socialUnitProps = {
	size: 'portrait',
	glParams: {'gl.delivery': 'app', 'gl.after': 'persist'},
};
const hostPrefix = window.location.hostname.match(/^(test|local)/) ? 'test' : '';


/** If the preview video is running, restart it. */
const loopVideo = () => {
	const video = document.querySelector('#preview-video');
	if (!video) return;
	video.pause();
	video.currentTime = 0;
	video.play();
}


/** Fetch an advert from the portal by ID and return a Promise which will resolve to the video list */
const getAdVideos = vertId => fetch(`https://${hostPrefix}portal.good-loop.com/advert/${vertId}.json`)
	.then(res => res.json())
	.then(({ cargo }) => cargo.videos);


const SocialAd = ({vertId = socialVertId, prod}) => {
	if (vertId === 'test_wide_multiple') vertId = socialVertId;
	const [showAd, setShowAd] = useState(0); // User has swiped to show the ad
	const [visClass, setVisClass] = useState(''); // 'visible' if the fake feed is on-screen and should start animating
	const [previewUrl, setPreviewUrl] = useState('https://media.good-loop.com/uploads/standard/toms_snapchat_ad.mp4');
	const [isMockup, setIsMockup] = useState(false);

	useEffect(() => {
		let delayInterval; // Put this in outer scope so the cleanup return function can access it
		const startLooping = () => {
			loopVideo();
			delayInterval = window.setInterval(loopVideo, 7000);
		};
		// The slideshow animation takes about 4.7s to complete before the video starts,
		// so wait that long before setting up the timer
		const loopTimeout = window.setTimeout(startLooping, 4700);

		// Adds class `visible` to fake-feed element after 100ms.
		const visibility = window.setTimeout(() => setVisClass('visible'), 100);
		// Cancel any timers that are still active on unmount
		return () => {
			window.clearTimeout(delayInterval);
			window.clearInterval(loopTimeout)
			window.clearTimeout(visibility);
		};
	}, []);

	// If vertical vid available, use it for the preview
	const trySetPreviewVideo = videos => {
		const video = videos.find(e => e.aspect === '9:16');
		if (!video) return;
		setPreviewUrl(video.url);
		setIsMockup(true);
	};

	// Prevents scrolling on mobile when user attempts to swipe the social ad.
	const lockScreen = () => { 
		document.body.style.overflow = 'hidden';
		setShowAd(true);
	};
	const unlockScreen = () => document.body.style.overflow = 'auto';

	// TODO When gl.delivery === 'app', gl.after should probably default to "persist"
	const unitProps = { 
		vertId: vertId,
		production: vertId === socialVertId, // If we are using default ad we want to access it regardless of site's server
		...socialUnitProps 
	};

	// Get videos from ad, if vertical available use it for preview
	getAdVideos(vertId).then(trySetPreviewVideo);

	return (
		<div className="ad-sizer portrait">
			<div className="aspectifier" />
			<div className={`fake-feed ${visClass}`}>
				<img src="https://media.good-loop.com/uploads/standard/snap_logo_background.jpg" className="snap-img first" />
				<img src="https://media.good-loop.com/uploads/standard/snap_ferry_view.jpg" className="snap-img delay1" />
				<img src="https://media.good-loop.com/uploads/standard/snap_makeup_tutorial.jpg" className="snap-img delay2" />
				<img src="https://media.good-loop.com/uploads/standard/snap_food_bear.jpg" className="snap-img delay3" />
				<video className="snap-img delay4" id="preview-video" src={previewUrl} //className={`snap-img delay4${isMockup ? ' social-overlay' : ''}`}
					loop muted playsInline
					onMouseDown={() => setShowAd(true)}
					onTouchStart={lockScreen}
					onTouchEnd={unlockScreen}
					onTouchMove={e => e.preventDefault()}
				/>
				{ unitProps.production ? '' : <img className="snap-img delay4 overlay" src="/img/swipe-overlay.png" /> }
				<div className="show-ad" onClick={() => setShowAd(true)} />
			</div>
			<div className={`social-ad ${showAd ? 'show' : ''}`}>
				{ showAd ? <GoodLoopAd {...unitProps} /> : '' }
			</div>
		</div>
	);
};


export default SocialAd;
