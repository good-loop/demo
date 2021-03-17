/* @jsx h */
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
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

const pointerAway = () => {
	const pointer = document.querySelector('.fake-pointer');
	pointer.style.opacity = '0';
}

const showClick = (charity) => {
	const pointer = document.querySelector('.fake-pointer');
	pointer.className += ' click';
	window.setTimeout(() => charity.click(), 250);
	window.setTimeout(pointerAway, 1000);
};

const prepareToClick = () => {
	const frame = document.querySelector('.goodloopframe');
	const frameBounds = frame.getBoundingClientRect();
	const charities = frame.contentDocument.querySelectorAll('.charity');
	if (charities.length < 2) return;
	const charity = charities[Math.floor(Math.random() * charities.length)];
	const bounds = charity.getBoundingClientRect();
	// click a little towards the bottom-right to keep logo more visible
	const xMiddle = bounds.left + (bounds.width * 0.66) + frameBounds.left;
	const yMiddle = bounds.top + (bounds.height * 0.66) + frameBounds.top;
	// Fade in and slide into position
	const pointer = document.querySelector('.fake-pointer');
	pointer.style.opacity = '1';
	pointer.style.top = yMiddle + 'px';
	pointer.style.left = xMiddle + 'px';

	window.setTimeout(() => showClick(charity), 1000);
}

const FullscreenPage = ({size = 'landscape', 'gl.vert': vertId = DEFAULT_AD}) => {
	useEffect(() => {
		// Show the fake click effect? Wait how long?

		const clickDelay = new URL(window.location).searchParams.get('clickDelay');
		if (clickDelay) {
			window.setTimeout(prepareToClick, Number.parseFloat(clickDelay));
		}
		
		sizeElements(); // set sizing once
		window.addEventListener('resize', sizeElements); // and update on resize/rotate
		return () => window.removeEventListener('resize', sizeElements); // and clean up on unmount
	}, []);

	const pointerStyle = true ? {} : {display: 'none'};

	return <>
		<div id="fullscreen" className={size}>
			<div className="fullscreen-inner">
				<GoodLoopAd bare size={size} vertId={vertId} nonce={`${size}${vertId}`} />
			</div>
			<div className="fake-pointer" style={{opacity: '0'}}>
				<div className="click-effect" />
				<img src="/img/pointer.svg" />	
			</div>
		</div>
	</>;
};

export default FullscreenPage;