import React, { Fragment, useEffect} from 'react';
import GoodLoopAd from "../GoodLoopAd";
import { DEFAULT_AD } from './constants';

/**
 * Set font size on the containing div to 1% window.innerHeight
 * so we can use it to set proportional height and width
 * - because in mobile Chrome and Safari, vh units take the area
 * behind the address bar to be part of the viewport's height,
 * meaning a 100vh element will need to scroll.
 */
const sizeElements = (event) => {
	document.getElementById('fullscreen').style.fontSize = (window.innerHeight / 100) + 'px';
};

/** Click the charity button, animate the pointer to emphasise interaction, then hide the pointer  */ 
const clickCharity2_doClick = (charity) => {
	window.setTimeout(() => charity.click(), 250);
	if (!showFakePointer) return;
	
	// Fake pointer requested? Hide it again after click.
	const pointer = document.querySelector('.fake-pointer');
	pointer.className += ' click';
	window.setTimeout(() => pointer.style.opacity = '0', 1250);
};

/** Select a charity, move the pointer to its button, hold a moment and then click it */
const clickCharity = () => {
	// Find a charity to click...
	const frame = document.querySelector('.goodloopframe');
	const charities = frame.contentDocument.querySelectorAll('.charity-button');
	if (charities.length < 2) return; // Only one charity? No pick -> no click -> no fake pointer.
	const charity = charities[charities.length - 2]; // Click middle of 3 charities, or first of 2

	window.setTimeout(() => clickCharity2_doClick(charity), 2000);

	// Fake pointer requested? Fade it in and move it into position.
	if (!showFakePointer) return;
	const frameBounds = frame.getBoundingClientRect();
	const cBounds = charity.getBoundingClientRect();
	// click a little towards the bottom-right to keep logo more visible
	const xMiddle = cBounds.left + (cBounds.width * 0.66) + frameBounds.left;
	const yMiddle = cBounds.top + (cBounds.height * 0.66) + frameBounds.top;
	// Fade in and slide into position
	const pointer = document.querySelector('.fake-pointer');
	pointer.style.opacity = '1';
	pointer.style.top = yMiddle + 'px';
	pointer.style.left = xMiddle + 'px';
}

// Hook for the ad recorder to trigger the fake mouse pointer & charity click
// TODO Hook the gl:minview etc events fired by the adunit to do this automatically and minimise how much Selenium has to interact with the page
window.recorderControls = { clickCharity };

const FullscreenPage = ({size = 'landscape', 'gl.vert': vertId = DEFAULT_AD, ...params}) => {
	useEffect(() => {
		sizeElements(); // set sizing once
		window.showFakePointer = new URL(window.location).searchParams.get('showPointer') === 'true';
		window.addEventListener('resize', sizeElements); // and update on resize/rotate
		return () => window.removeEventListener('resize', sizeElements); // and clean up on unmount
	}, []);

	return <>
		<div id="fullscreen" className={size}>
			<div className="fullscreen-inner">
				<GoodLoopAd bare size={size} vertId={vertId} {...params} />
			</div>
			<div className="fake-pointer" style={{opacity: '0'}}>
				<div className="click-effect" />
				<img src="/img/pointer.svg" />	
			</div>
		</div>
	</>;
};

export default FullscreenPage;