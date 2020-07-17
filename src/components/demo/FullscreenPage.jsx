/* @jsx h */
import { h } from 'preact';
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

const FullscreenPage = ({size = 'landscape', 'gl.vert': vertId = DEFAULT_AD}) => {
	useEffect(() => {
		sizeElements(); // set sizing once
		window.addEventListener('resize', sizeElements); // and update on resize/rotate
		return () => window.removeEventListener('resize', sizeElements); // and clean up on unmount
	}, true);

	return (
		<div id="fullscreen" className={size}>
			<div className="fullscreen-inner">
				<GoodLoopAd bare size={size} vertId={vertId} nonce={`${size}${vertId}`} />
			</div>
		</div>
	);
};

export default FullscreenPage;