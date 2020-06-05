import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Alert, Row, Col } from 'reactstrap';

import GoodLoopAd from "./GoodLoopAd";

const socialVertId = 'Of0Vpbg2Ct' // '0PVrD1kX' // 'PL4bGYSW' //  Defaults to Love & Beauty Planet ;
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
	const [showAd, setShowAd] = useState(0); // User has swiped to show the ad
	const [visClass, setVisClass] = useState(''); // 'visible' if the fake feed is on-screen and should start animating
	const [noVideoAvailable, setNoVideoAvailable] = useState(false);
	const [advert, setAdvert] = useState(null);

	const getAdvertFromPortal = () =>{
		const advertId = vertId;
		const protocol = hostPrefix === 'local' ? 'http' : 'https';
		// if default grab TOMS advert from prod server
		const adUrl = vertId === socialVertId ? 'https://portal.good-loop.com/vert/Of0Vpbg2Ct.json'
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
	let clientLogo = advert && advert.branding ? advert.branding.logo : '';
	// default love, beuaty and planet logo is way too wide, so we'll use an alternative one.
	if (vertId === socialVertId) clientLogo = '/img/default-logo.jpg';
	const charityLogos = advert && advert.charities ? advert.charities.list.map(charity => charity.logo) : '';

	const mockIsVideo = () => {
		if (!mockSocialImage) return false;

		const fileType = mockSocialImage.split('.').pop();
		return fileType === 'mp4' ? true : false;
	}

	// We can auto redirect to default advert with the line below, but I think an alert is more useful to users.
	// if ( advert && ! mockSocialImage && vertId !== socialVertId ) route('/portrait/social/' + `?gl.vert=${socialVertId}`); // if no teaser image available show default advert instead

	// TODO When gl.delivery === 'app', gl.after should probably default to "persist"
	const unitProps = { 
		vertId: vertId,
		delivery: 'app',
		production: vertId === socialVertId, // If we are using default ad we want to access it regardless of site's server
		...socialUnitProps,
	};
	
	const teaserImageOrVideo = mockIsVideo ? (
		<video src={mockSocialImage}
			className="snap-img delay1"
			id="preview-video"
			loop muted playsInline autoplay
			onMouseDown={() => setShowAd(true)}
			onTouchStart={lockScreen}
			onTouchEnd={unlockScreen}
			onTouchMove={e => e.preventDefault()}
		/>)
	: (
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

	// Parse charity logo urls returning div with 1 to 3 logo images.
	// charcount and logo- classes used for the fade in css animation
	const charUrlsIntoElements = () => {
		if (!charityLogos) return <div></div>;
		const charcount = charityLogos.length;
		const logos = charityLogos.map( (src, i) => {
			return <img src={src} className={`charity-logo logo-${i}`} />
		});
		return (
			<div className={`overlay-logo-div charcount-${charcount}`} id="charity-logo-div">
				{ logos }
			</div>
		)
	};

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
						{ charUrlsIntoElements() }
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
						{ mockOverlay }
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
