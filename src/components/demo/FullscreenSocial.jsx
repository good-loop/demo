import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getAdvertFromPortal, getVertiserFromPortal } from '../../utils';
import MockFeed from './DemoPlayer/MockFeed';

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

/**
 * @param {?String} platform: The social network (eg "instagram") to simulate
 * @param {?String} context: The context in which to show the simulated advert (eg "stories", "infeed")
 * @param {?String} noInterface Only show the simulated splash video - hide platform-specific stuff like username overlay. Default true
 */
const FullscreenSocial = ({platform = 'instagram', context = 'stories', 'gl.vert': vertId, noInterface, ...params}) => {
	const { forceServerType, 'gl.status': status } = params;
	// Coerce noInterface from string to boolean
	noInterface = (noInterface !== 'false');

	useEffect(() => {
		sizeElements(); // set sizing once
		window.addEventListener('resize', sizeElements); // and update on resize/rotate
		return () => window.removeEventListener('resize', sizeElements); // and clean up on unmount
	}, []);

	const [advert, setAdvert] = useState();
	const [advertiser, setAdvertiser] = useState();

	useEffect(() => {
		getAdvertFromPortal({id: vertId, status, callback: setAdvert, forceServerType});
	}, [vertId]);

	useEffect(() => {
		advert && getVertiserFromPortal({id: advert.vertiser, status, callback: setAdvertiser, forceServerType});
	}, [advert])

	const feed = advert && advertiser ? (
		<MockFeed socialType={platform} socialContext={context} advert={advert} advertiser={advertiser} noInterface={noInterface} />
	) : null;

	return (
		<div id="fullscreen" className="portrait">
			<div className="fullscreen-inner">
				{feed}
			</div>
		</div>
	);
}

export default FullscreenSocial;
