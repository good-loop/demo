import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { visibleElement } from '../../../utils';
import { DEFAULT_PROD_AD, DEFAULT_PROD_SOCIAL_AD } from '../constants';

// Tiny base64-encoded video with sound - if the URL specifies the splash video should be unmuted, we try to autoplay this to see if we're allowed.
const videoSrc = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAxxtZGF03gIATGF2YzU4LjU0LjEwMAACMEAOAAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1NSByMjkxNyAwYTg0ZDk4IC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxOCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAANGWIhAAp/0izXGg3h2CB2fdmlld1dFbjq90+fJxklTjCfDwVmqnJeyeiqKko2H96u4kPeKXeAgBMYXZjNTguNTQuMTAwAAIwQA4AAAUobW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAHQAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAil0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAACIAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAACAAAAASAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAAiAAAAAAABAAAAAAGhbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAA8AAAAAgBVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABTG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAQxzdGJsAAAAqHN0c2QAAAAAAAAAAQAAAJhhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAACAAEgBIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAMmF2Y0MBZAAK/+EAGWdkAAqs2Ul+IwEQAAADABAAAAMDwPEiWWABAAZo6+PLIsAAAAAQcGFzcAAAAAEAAAABAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAIAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAuoAAAABAAAAFHN0Y28AAAAAAAAAAQAAAEUAAAIpdHJhawAAAFx0a2hkAAAAAwAAAAAAAAAAAAAAAgAAAAAAAAB0AAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAAAAHgAABAAAAQAAAAABoW1kaWEAAAAgbWRoZAAAAAAAAAAAAAAAAAAALuAAAAVoVcQAAAAAAC1oZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU291bmRIYW5kbGVyAAAAAUxtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAARBzdGJsAAAAanN0c2QAAAAAAAAAAQAAAFptcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAALuAAAAAAADZlc2RzAAAAAAOAgIAlAAIABICAgBdAFQAAAAABDYgAAAthBYCAgAUUiFblAAaAgIABAgAAACBzdHRzAAAAAAAAAAIAAAABAAAEAAAAAAEAAAFoAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAABUAAAACAAAAGHN0Y28AAAAAAAAAAgAAADAAAAMvAAAAGnNncGQBAAAAcm9sbAAAAAIAAAAB//8AAAAcc2JncAAAAAByb2xsAAAAAQAAAAIAAAABAAAAYnVkdGEAAABabWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY1OC4yOS4xMDA=';
const TEST_AUTOPLAY_DELAY = 100; // msec

// Mostly copy-pasted from adunit. Create a video element, very tiny and quiet and off-screen - but still having content - and see if it can play without user action.
const probeAutoplay = (callback) => {
	const video = document.createElement('video');
	// Mark the test video so our play() wrapper can ignore it
	video.gl_direct_video = true;
	video.src = videoSrc;
	video.volume = 0.01; // video should be effectively silent but be sure
	// Various browsers complain & cause inaccurate test results if video is hidden/transparent so put it offscreen
	video.style.position = 'fixed';
	video.style.right = '-5000px';

	// Got an answer - clean up video and signal invoking code
	const resolve = (result) => {
		video.parentNode.removeChild(video);
		callback(result);
	}
	
	document.body.appendChild(video);
	const playPromise = video.play();

	// Hopefully play() returns a promise...
	if (playPromise && typeof(playPromise.then) === 'function') {
		let resolved = false;
		playPromise.then(() => {
			resolve(true);
		}).catch(() => {
			resolve(false);
		}).finally(() => resolved = true);
		// Browser bug seen by Roscoe 2018-03-11: Sometimes the play promise just doesn't resolve?
		// Recorded by other users in various browsers, causative conditions unknown.
		// Give it a half-second, then assume no autoplay.
		setTimeout(() => !resolved && resolve(false), 500);
	} else {
		// ...but allow for old browsers where it doesn't
		setTimeout(() => resolve(!video.paused), TEST_AUTOPLAY_DELAY);
	}

};

const socialAppLogos = {
	instagram: '/img/instagram-logo.jpg'
};

/**
 * TODO Doc - link to Instagram's specs for this, or an example
 */
const InstagramStories = ({brandLogo, brandName, charityCarousel, progressClass, videoDuration, mockMedia}) => (
	<div className="fill-abs fade-in">
		{mockMedia}
		<div className="interface fill-abs">
			<div className="top-gradient" />
			<div className="bottom-gradient" />
			<div className="progress-bar">
				<div className={`progress-bar-filled ${progressClass}`} style={`animation-duration: ${videoDuration}s`}/>
			</div>
			<div className="brand-id">
				<img className="brand-logo" src={brandLogo} />
				<div className="brand-id-text">
					<div className="brand-name">{brandName}</div>
					<div className="sponsored-marker">Sponsored</div>
				</div>
			</div>
			<div className="controls dismiss">⨉</div>
			<div className="swipe-cta">
				<img className="arrow first" src="/img/instagram-chevron.svg" />
				<img className="arrow second" src="/img/instagram-chevron-circle.svg" />
				<div className="text">Learn More</div>
			</div>
			<div className="controls options">⋯</div>
			
		</div>
		<div className="video-overlay fill-abs">
			<div className="wave">
				<img className="brand-logo" src={brandLogo} />
				<div className="unlock-text">UNLOCK A FREE<br/>DONATION</div>
				{charityCarousel}
			</div>
			<img className="gl-ident" src="/img/logo-social-ident.svg" />
		</div>
	</div>
);

/**
 * TODO Doc - link to Instagram's specs for this, or an example
 */
const InstagramInFeed =  ({brandLogo, brandName, charityCarousel, progressClass, videoDuration, mockMedia}) => (
	<div className="fill-abs fade-in">
		<img className="interface-top fill-bar" src="/img/instagram-feed-top.png" />
		<div className="brand-id fill-bar">
			<img className="brand-logo" src={brandLogo} />
			<div className="brand-id-text">
				<div className="brand-name">{brandName}</div>
				<div className="sponsored-marker">Sponsored</div>
			</div>
			<div className="controls options">⋮</div>
		</div>
		<div className="media-box fill-bar">
			<div className="media-sizer">
				{mockMedia}
			</div>
			<div className="video-overlay fill-abs">
				<div className="wave">
					<img className="brand-logo" src={brandLogo} />
					<div className="unlock-text">UNLOCK A FREE<br/>DONATION</div>
					{charityCarousel}
				</div>
				<img className="gl-ident" src="/img/logo-social-ident.svg" />
			</div>
		</div>
		<div className="swipe-cta">
			Learn More
			<img className="chevron" src="/img/chevron-right.svg" />
		</div>
		<img className="interface-middle fill-bar" src="/img/instagram-feed-middle.png" />
		<div className="likes">871 likes</div>
		<div className="post-text">
			<span className="brand-name">{brandName}</span> Swipe to find out how we're giving lorem ipsum dolor sit amet, adepiscing consectetur elit,
		</div>
		<img className="interface-bottom fill-bar" src="/img/instagram-feed-bottom.png" />
	</div>
);


/** Currently just Instagram. Mocks up the advert as it would be seen on a social network. */
const MockFeed = ({advert, advertiser, showAd, socialType, socialContext, muted}) => {
	const [visClass, setVisClass] = useState(''); // 'visible' if the fake feed is on-screen and should start animating
	const [showVideo, setShowVideo] = useState(true); // We'll hide the video after the user swipes to the Good-Loop ad

	// If the URL says the splash video should be unmuted, check and see if we need a click-to-play button
	const [canAutoplay, setCanAutoplay] = useState(muted);
	useEffect(() => {
		if (!muted) probeAutoplay(setCanAutoplay);
	}, []);

	// If the advert ID, social platform, or context to simulate changes, return to the initial simulated feed
	useEffect(() => {
		setShowVideo(true);
	}, [socialType, socialContext, advert && advert.id]);

	// Determine how long the progress bar's animation should be
	const [videoDuration, setVideoDuration] = useState(30);
	const videoRef = (element) => {
		console.log('ref fired');
		if (!element || !element.duration || element.duration === videoDuration) return;
		setVideoDuration(element.duration);
	}

	// Start animating progress bar when video runs
	const [progressClass, setProgressClass] = useState('');
	const onPlay = () => setProgressClass('animate1');
	const onSeeked = () => {
		// Seek event fires on loop - change the "animate" class on the progress bar to reset animation
		setProgressClass(progressClass === 'animate1' ? 'animate2' : 'animate1');
	}

	// When the user swipes to the advert, also set state in this component
	// to remove the splash video so it doesn't keep playing in the background
	const showAd2 = () => {
		showAd();
		window.setTimeout(() => setShowVideo(false), 750);
	};

	// For mobile: Lock window scrolling on swipe start & release on swipe end (so the demo unit can be swiped)
	const setScrollLock = (lock) => { 
		document.body.style.overflow = lock ? 'hidden' : 'auto';
		if (lock) showAd2();
	};

	// Handle clicks and touches on the mock phone screen
	const interactionProps = {
		onClick: showAd2,
		onMouseDown: showAd2,
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
	// TODO Allow use of an alternate logo for the mock video - almost always want bold square no-text
	if (advert && advert.id === DEFAULT_PROD_SOCIAL_AD) {
		brandLogo = 'https://media.good-loop.com/uploads/standard/blue-flag-clean-notext-6916484732719654408.svg';
	}

	// TODO Set brand handle?
	let brandName = advertiser && advertiser.name;
	if (brandName) brandName = brandName.toLocaleLowerCase().replaceAll(/\s/g, '');

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

	const clickToPlay = (
		<div className="fill-abs click-to-play" onClick={() => setCanAutoplay(true)}>
			<h3>Click to start</h3>
			<div><small>Your browser settings don't allow this demo to play automatically.</small></div>
		</div>
	);

	const mockMedia = showVideo ? <>
		<MockTag className="mock-ad bg fill-abs" src={mockSrc} loop muted playsInline autoplay={canAutoplay} />
		<MockTag className="mock-ad fill-abs" src={mockSrc} loop muted={muted} playsInline autoplay={canAutoplay} onPlay={onPlay} onSeeked={onSeeked} ref={videoRef} />
	</> : null;

	const feedProps = { brandLogo, brandName, charityCarousel, progressClass, videoDuration, mockMedia };

	let feed;
	if (socialType === 'instagram') {
		if (socialContext === 'stories') {
			feed = <InstagramStories {...feedProps} />
		} else if (socialContext === 'infeed') {
			feed = <InstagramInFeed {...feedProps} />
		}
	}

	return (
		<div className={`fake-feed fill-abs ${visClass} ${socialType} ${socialContext}`}>
			<img src={socialAppLogos[socialType]} className="fill-abs social-splash" />
			{feed}
			
			<div className="fill-abs interaction-catcher" {...interactionProps} />
			{ !canAutoplay && clickToPlay }
		</div>
	);
};

export default MockFeed;