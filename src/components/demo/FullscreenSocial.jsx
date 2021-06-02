import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { DEFAULT_PROD_SOCIAL_AD, DEFAULT_PROD_SOCIAL_ADVERTISER } from './constants';
import MockFeed from './DemoPlayer/MockFeed';

let portalPrefix = '';
if (window.location.hostname.match(/^(test)/)) portalPrefix = 'test';
if (window.location.hostname.match(/^(local)/)) portalPrefix = 'local';
let protocol = window.location.protocol;

const prodIds = { vert: DEFAULT_PROD_SOCIAL_AD, vertiser: DEFAULT_PROD_SOCIAL_ADVERTISER };

const getFromPortal = ({ type, id, callback, status }) => {
	// default ad / advertiser should come from production
	const serverBase = (prodIds[type] === id) ? (
		'https://portal.good-loop.com'
	) : (
		`${protocol}//${portalPrefix}portal.good-loop.com`
	)
	const url = `${serverBase}/${type}/${id}.json${status ? `?status=${status}` : ''}`;

	fetch(url)
	.then(res => res.json())
	.then(({cargo}) => callback && callback(cargo));
};

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

const FullscreenSocial = ({platform = 'instagram', context = 'stories', 'gl.vert': vertId }) => {
	useEffect(() => {
		sizeElements(); // set sizing once
		window.addEventListener('resize', sizeElements); // and update on resize/rotate
		return () => window.removeEventListener('resize', sizeElements); // and clean up on unmount
	}, []);

	const [advert, setAdvert] = useState();
	const [advertiser, setAdvertiser] = useState();

	useEffect(() => {
		getFromPortal({type: 'vert', id: vertId, callback: setAdvert});
	}, [vertId]);

	useEffect(() => {
		advert && getFromPortal({type: 'vertiser', id: advert.vertiser, callback: setAdvertiser});
	}, [advert])

	const feed = advert && advertiser ? (
		<MockFeed socialType={platform} socialContext={context} advert={advert} advertiser={advertiser} />
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
