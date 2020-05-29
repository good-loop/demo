import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Alert, Row, Col } from 'reactstrap';

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
	instagram: '/img/swipe-overlay.png',
	twitter: '/img/swipe-overlay.png'
}

const socialAppLogos = {
	instagram: '/img/instagram-logo.jpg'
}

const SocialAd = ({vertId = socialVertId, adBlocker, social }) => {
	if (vertId === 'test_wide_multiple') vertId = socialVertId;
	// If no social app specified redirect to instagram version
	if (!social) route('/portrait/social/instagram' + `?gl.vert=${vertId}`);
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
	// This is disabled for now, but can be incorporated if requested.
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

	// Get videos from ad, if vertical available use it for preview
	// if (!adBlocker && vertId !== socialVertId && advert) (trySetPreviewVideo(advert));

	const mockSocialImage = advert && advert.mockSocialImage ? advert.mockSocialImage : null;
	
	// Charity and client logos
	const clientLogo = advert && advert.branding ? advert.branding.logo : '';
	const charityLogo = advert && advert.charities ? advert.charities.list[0].logo : '';

	// We can auto redirect to default advert with the line below, but I think an alert is more useful to users.
	// if ( advert && ! mockSocialImage && vertId !== socialVertId ) route('/portrait/social/' + `?gl.vert=${socialVertId}`); // if no teaser image available show default advert instead

	// TODO When gl.delivery === 'app', gl.after should probably default to "persist"
	const unitProps = { 
		vertId: vertId,
		delivery: 'app',
		production: vertId === socialVertId, // If we are using default ad we want to access it regardless of site's server
		...socialUnitProps,
	};
	
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
			id="preview-image"
			onMouseDown={() => setShowAd(true)}
			onTouchStart={lockScreen}
			onTouchEnd={unlockScreen}
			onTouchMove={e => e.preventDefault()}
			draggable={false}
		/>
	);

	// <img className="overlay-logo" src={ advert ? advert.branding.logo : '' } />
	const mockOverlay = (
		<>
			<div className="snap-img delay1 overlay-insta top">
				{/* <img src={'/img/overlay-insta-top.png'} /> */}
				{/* <div className="overlay-logo"></div> */}
				<Row>
					<Col>
						<div className="overlay-logo-div">
							<img src={clientLogo} />
						</div>
					</Col>
					<Col>
						<div className="overlay-logo-div">
							<img src={charityLogo} />
						</div>
					</Col>
				</Row>
			</div>		
			<img className="snap-img delay1 overlay-insta bot" src={'/img/overlay-insta-bot.png'} />
		</>
	);

	console.log(mockSocialImage)

	return (
		<>
			{ adBlocker || ! mockSocialImage ? 
				<> 
					{ ! mockSocialImage ? noMockupAlert : '' }
					{ adBlocker ? adBlockerAlert : '' }
				</>
			:	<div className="ad-sizer portrait">
					<div className="aspectifier" />
					<div className={`fake-feed ${visClass}`}>
						<img src={socialAppLogos[social]} className="first" />
						{ teaserImageOrVideo }
						{ vertId === socialVertId ? '' : mockOverlay }
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
const noMockupAlert = (
	<Alert color="warning" className="no-video-alert">
		No social media mockup available for this advert. Please add the necessary assets in the editor's <n>Videos</n> section. To see our default demo click <a href="https://demo.good-loop.com/portrait/social/?gl.vert=0PVrD1kX" onClick={() => location.replace(location.pathname)}>here</a>!
	</Alert>
)

const adBlockerAlert = (
	<Alert color="warning" className="social-adblocker-alert">
		Please temporarily disable your adblocker to see our ads in action!
	</Alert>
)


export default SocialAd;
