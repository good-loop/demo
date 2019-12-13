import { h } from 'preact';
// import React from 'react';

const landscapeSvg = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.9 25.6" id="landscape">
		<path fill="currentColor" d="M40.8,0H6.1C2.7,0,0,2.7,0,6.1v13.4c0,3.4,2.7,6.1,6.1,6.1l0,0h34.7c3.4,0,6.1-2.7,6.1-6.1V6.1C46.9,2.7,44.2,0,40.8,0z M43.9,19.5c0,1.7-1.4,3.1-3.1,3.1H6.1c-1.7,0-3.1-1.4-3.1-3.1l0,0v-0.9c1.2-0.4,2-1.5,2-2.8V9.8C5,8.5,4.2,7.4,3,7V6.1C3,4.4,4.4,3,6.1,3h34.7c1.7,0,3.1,1.4,3.1,3.1V19.5z" />
	</svg>
);

const desktopSvg = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 41.775" id="desktop">
		<g fill="currentColor">
			<path d="M71.39,41.412H11.079a1.5,1.5,0,0,1-1.5-1.5V1.5a1.5,1.5,0,0,1,1.5-1.5H71.39a1.5,1.5,0,0,1,1.5,1.5V39.912A1.5,1.5,0,0,1,71.39,41.412Zm-58.811-3H69.89V3H12.579Z" />
			<path d="M80.5,41.412H1.969a1.5,1.5,0,0,1,0-3H80.5a1.5,1.5,0,0,1,0,3Z" />
		</g>
	</svg>
);

const portraitSvg = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.612 46.895" id="portrait">
		<path fill="currentColor" d="M19.516,0H6.1A6.1,6.1,0,0,0,0,6.1V40.8a6.1,6.1,0,0,0,6.1,6.1H19.516a6.1,6.1,0,0,0,6.1-6.1V6.1A6.1,6.1,0,0,0,19.516,0Zm3.1,40.8a3.1,3.1,0,0,1-3.1,3.1H6.1A3.1,3.1,0,0,1,3,40.8V6.1A3.1,3.1,0,0,1,6.1,3h.881a2.945,2.945,0,0,0,2.8,2.047h6.062A2.945,2.945,0,0,0,18.635,3h.881a3.1,3.1,0,0,1,3.1,3.1Z" />
	</svg>
);

export {
	landscapeSvg,
	desktopSvg,
	portraitSvg,
};
