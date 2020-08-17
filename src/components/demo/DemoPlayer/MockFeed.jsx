import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { visibleElement } from '../../../utils';
import { DEFAULT_PROD_AD } from '../constants';

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


/** Currently just Instagram. Mocks up the advert as it would be seen on a social network. */
const MockFeed = ({advert, showAd, socialType, muted}) => {
	const [visClass, setVisClass] = useState(''); // 'visible' if the fake feed is on-screen and should start animating

	// If the URL says the splash video should be unmuted, check and see if we need a click-to-play button
	const [canAutoplay, setCanAutoplay] = useState(muted);
	useEffect(() => {
		if (!muted) probeAutoplay(setCanAutoplay);
	}, []);

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
				<MockTag className="fill-abs mock-ad bg" src={mockSrc} loop muted playsInline autoplay={canAutoplay} />
				<MockTag className="fill-abs mock-ad" src={mockSrc} loop muted={muted} playsInline autoplay={canAutoplay} />
				<div className="fill-abs overlay">
					<div className="overlay-top">
						<img className="brand-logo" src={brandLogo} />
						{charityCarousel}
					</div>
					<div className="overlay-bottom" />
					<img className="gl-logo" src="/img/logo-social-splash.png" />
				</div>
			</div>
			<div className="fill-abs interaction-catcher" {...interactionProps} />
			{ !canAutoplay && <div className="fill-abs" style={{backgroundColor: 'rgba(255, 0, 255, 0.5)', color: 'white'}} onClick={() => setCanAutoplay(true)}>Click to play</div> }
		</div>
	);
};

export default MockFeed;