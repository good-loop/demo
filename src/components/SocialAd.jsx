import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Alert } from 'reactstrap';

import GoodLoopAd from "./GoodLoopAd";
import { getUnitUrl } from '../utils';

const tomsDemoPreview = 'https://media.good-loop.com/uploads/standard/toms_snapchat_ad.mp4';
const socialVertId = '0PVrD1kX' // 'PL4bGYSW' //  Default to TOMS Josh EN Male advert. ;
const socialUnitProps = {
	size: 'portrait',
	glParams: {'gl.delivery': 'app', 'gl.after': 'persist'},
};
let hostPrefix = '';
if (window.location.hostname.match(/^(test)/)) hostPrefix = 'test';
if (window.location.hostname.match(/^(local)/)) hostPrefix = 'local';

// Format displayed is the same accross social apps, but specific elements of the overlay might be different.
const appOverlays = {
	snapchat: '/img/swipe-overlay.png',
	instagram: '/img/swipe-overlay.png',
	twitter: '/img/swipe-overlay.png'
}

const socialAppLogos = {
	snapchat: 'https://media.good-loop.com/uploads/standard/snap_logo_background.jpg',
	instagram: '/img/instagram-logo.jpg'
}

const SocialAd = ({vertId = socialVertId, adBlocker, social }) => {
	console.log('social i sheeeere', social)
	if (vertId === 'test_wide_multiple') vertId = socialVertId;
	// If adblocker's in use fetch calls to portal might break, so we use the default advert/preview.
	if (adBlocker) vertId = socialVertId;
	const [showAd, setShowAd] = useState(0); // User has swiped to show the ad
	const [visClass, setVisClass] = useState(''); // 'visible' if the fake feed is on-screen and should start animating
	const [noVideoAvailable, setNoVideoAvailable] = useState(false);
	const [advert, setAdvert] = useState(null);

	const getAdvertFromPortal = () =>{
		const advertId = vertId;
		const protocol = hostPrefix === 'local' ? 'http' : 'https';
		// if default grab TOMS advert from prod server
		const adUrl = vertId === socialVertId ? 'https://portal.good-loop.com/vert/0PVrD1kX.json'
			: `${protocol}://${hostPrefix}portal.good-loop.com/vert/${advertId}.json`;
		return fetch(adUrl)//('https://as.good-loop.com/unit.json?gl.vert=0PVrD1kX')
			.then(res => res.json())
			.then(json => json.cargo)
			.then(data => {
				setAdvert(data)
			})
	}

	useEffect(() => {
		getAdvertFromPortal();
		// Adds class `visible` to fake-feed element after 100ms.
		const visibility = window.setTimeout(() => setVisClass('visible'), 100);
	}, []);

	// If vertical vid available, use it for the preview
	const trySetPreviewVideo = data => {
		if (!advert) return;
		const video = advert.videos.find(e => e.aspect === '9:16');
		// If no portrait video available we'll use default ad/preview
		if (!video) {
			// unitProps.production = true;
			// vertId = socialVertId;
			setNoVideoAvailable(true)
			return;
		}
		setPreviewUrl(video.url);
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
		...socialUnitProps,
	};

	// Get videos from ad, if vertical available use it for preview
	if (!adBlocker && vertId !== socialVertId && advert) (trySetPreviewVideo(advert));

	const mockSocialImage = advert ? advert.mockSocialImage : '';

	const teaserImageOrVideo = vertId === socialVertId ? (
		<video className="snap-img delay1" id="preview-video" src={tomsDemoPreview} //className={`snap-img delay4${isMockup ? ' social-overlay' : ''}`}
			loop muted playsInline autoplay
			onMouseDown={() => setShowAd(true)}
			onTouchStart={lockScreen}
			onTouchEnd={unlockScreen}
			onTouchMove={e => e.preventDefault()}
		/>
	) : (
		<img src={mockSocialImage}
			className="snap-img delay1"
			id="preview-video"
			onMouseDown={() => setShowAd(true)}
			onTouchStart={lockScreen}
			onTouchEnd={unlockScreen}
			onTouchMove={e => e.preventDefault()}
			draggable={false}
		/>
	);

	return (
		<>
			{ adBlocker ? 
				<> 
					{ noVideoAvailable ? noVideoAlert : '' }
					{ adBlocker ? adBlockerAlert : '' }
				</>
			:	<div className="ad-sizer portrait">
					<div className="aspectifier" />
					<div className={`fake-feed ${visClass}`}>
						<img src={socialAppLogos[social]} className="first" />
						{ teaserImageOrVideo }
						{ vertId === socialVertId ? '' : <img className="snap-img delay1 overlay" src={appOverlays[social]} /> }
						<div className="show-ad" onClick={() => setShowAd(true)} />
						<div className="social-text-bg"></div>
					</div>
					<div className={`social-ad ${showAd ? 'show' : ''}`}>
						{ showAd && advert ? <GoodLoopAd {...unitProps} /> : '' }
					</div>
				</div>
			}
		</>
	);
};

// The weird anchor is to force a reload with no params against `preact-router` behaviour
const noVideoAlert = (
	<Alert color="warning" className="no-video-alert">
		No social media video available for this advert. To see our default demo click <a href="https://demo.good-loop.com/portrait/social/?gl.vert=0PVrD1kX" onClick={() => location.replace(location.pathname)}>here</a>!
	</Alert>
)

const adBlockerAlert = (
	<Alert color="warning" className="social-adblocker-alert">
		Please temporarily disable your adblocker to see our ads in action!
	</Alert>
)


export default SocialAd;
