import { h } from 'preact';
import { useState } from 'preact/hooks';
import { visibleElement } from '../../../utils';
import { DEFAULT_PROD_AD } from '../constants';


const socialAppLogos = {
	instagram: '/img/instagram-logo.jpg'
};


/** Currently just Instagram. Mocks up the advert as it would be seen on a social network. */
const MockFeed = ({advert, showAd, socialType}) => {
	const [visClass, setVisClass] = useState(''); // 'visible' if the fake feed is on-screen and should start animating

	// For mobile: Lock window scrolling on swipe start & release on swipe end (so the demo unit can be swiped)
	const setScrollLock = (lock) => { 
		document.body.style.overflow = lock ? 'hidden' : 'auto';
		if (lock) showAd();
	};
	
	// Handle clicks and touches on the mock phone screen
	const interactionProps = {
		onClick: showAd,
		onMouseDown: showAd,
		onTouchStart: () => setScrollLock(true),
		onTouchEnd: () => setScrollLock(false),
		onTouchMove: e => e.preventDefault()
	};

	// Start a periodic check to see if the demo window is visible
	let visCheck;
	visCheck = window.setInterval(() => {
		const containerEl = document.querySelector('.ad-container');
		if (!containerEl || visibleElement(containerEl) < 0.75) return;
		// 75+% visible? Start animations etc now.
		setVisClass('visible');
		window.clearInterval(visCheck); // ...and stop the periodic check
	}, 100);

	// Grab the fake-social-ad media for the advert & check if it's a video or an image
	const mockSrc = advert && advert.mockSocialImage;
	const mockIsVideo = mockSrc && mockSrc.match(/\.(webm|mp4|m4v|avi)$/)

	// Brand logo
	let brandLogo = advert && advert.branding && advert.branding.logo;
	// TODO Just change this on the ad, which isn't running live & will look fine?
	// default love, beauty and planet logo is way too wide, so we'll use an alternative one.
	if (advert && advert.id === DEFAULT_PROD_AD) brandLogo = '/img/default-logo.jpg';

	// Construct the charity-logo carousel element
	const charityLogos = advert && advert.charities && advert.charities.list.map(({logo}) => logo);
	const charityCarousel = charityLogos ? (
		<div className={`charity-carousel count${charityLogos.length}`}>
			{charityLogos.map(src => <img src={src} className={`charity-logo fill-abs`} />)}
		</div>
	) : null;

	// Why two copies of the video/image?
	// The rear one is blurred and has size:cover to fill the screen,
	// the front one is unblurred and has size:contain so it's fully visible.
	const MockTag = mockIsVideo ? 'video' : 'img'

	return (
		<div className={`fake-feed fill-abs ${visClass}`}>
			<img src={socialAppLogos[socialType]} className="fill-abs social-splash" />
			<div className="fill-abs fade-in animate-in-sequence">
				<MockTag className="fill-abs mock-ad bg" src={mockSrc} loop muted playsInline autoplay />
				<MockTag className="fill-abs mock-ad" src={mockSrc} loop muted playsInline autoplay />
				<div className="fill-abs overlay">
					<div className="overlay-top">
						<img className="brand-logo" src={brandLogo} />
						{charityCarousel}
					</div>
					<div className="overlay-bottom"/>
				</div>
			</div>
			<div className="fill-abs interaction-catcher" {...interactionProps} />
		</div>
	);
};

export default MockFeed;