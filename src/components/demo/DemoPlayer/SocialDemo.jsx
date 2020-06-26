import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Alert } from 'reactstrap';

import GoodLoopAd from "../../GoodLoopAd";
import MockFeed from './MockFeed';
import { DEFAULT_PROD_AD, DEFAULT_TEST_AD } from '../constants';


/**
 * TODO There are a lot of hyper-specific behaviours here and in MockFeed triggered
 * by advert ID being === DEFAULT_PROD_AD... There must be a better way.
 */

let portalHost = '';
if (window.location.hostname.match(/^(test)/)) portalHost = 'testportal';
if (window.location.hostname.match(/^(local)/)) portalHost = 'localportal';
let protocol = window.location.protocol;


const getAdvertFromPortal = ({id, callback}) => {
	// The default social ad should always be fetched from the production server.
	const adUrl = (id === DEFAULT_PROD_AD) ? (
		`https://portal.good-loop.com/vert/${id}.json`
	) : (
		`${protocol}://${portalHost}.good-loop.com/vert/${id}.json`
	);
	// Fetch the portal data, extract its json (json() returns a Promise) and execute the supplied callback
	return fetch(adUrl)
		.then(res => res.json())
		.then(({cargo}) => callback && callback(cargo));
};


const SocialDemo = ({vertId = DEFAULT_PROD_AD, adBlocker, social }) => {
	// Adblock active? Show a warning.
	if (adBlocker) return adBlockerAlert;

	// For local/testdemo.good-loop.com: The default test ad for other contexts is test_wide_multiple but that isn't set up for social.
	// So - override the default to use the LBP advert.
	if (vertId === DEFAULT_TEST_AD) vertId = DEFAULT_PROD_AD;

	// If no social app specified, default to Instagram & set URL to match
	if (!social) {
		let {search, hash} = window.location;
		const params = new URLSearchParams(search);
		params.set('gl.vert', vertId);
		search = '?' + params.toString();

		if (hash) hash = '#' + hash;
		route(`/portrait/social/instagram${search}${hash}`);
	};

	// TODO What was the below comment referring to? 
	// If adblocker's in use fetch calls to portal might break, so we use the default advert/preview.

	const [showAd, setShowAd] = useState(false); // User has swiped/clicked to show the ad
	const [advert, setAdvert] = useState(null); // Advert object as retrieved from portal

	// On mounting the SocialDemo element or changing advert ID, fetch the advert from the portal.
	useEffect(() => {
		getAdvertFromPortal({id: vertId, callback: setAdvert});
	}, [vertId]);


	// We can auto redirect to default advert with the line below, but I think an alert is more useful to users.
	// if ( advert && ! mockSocialImage && vertId !== DEFAULT_PROD_AD ) route('/portrait/social/' + `?gl.vert=${DEFAULT_PROD_AD}`); // if no teaser image available show default advert instead

	const unitProps = {
		vertId: vertId,
		production: vertId === DEFAULT_PROD_AD, // Default (production) ad always comes from the prod server
		size: 'portrait',
		delivery: 'app',
		'gl.after': 'persist'
	};

	return (
		<div className="ad-sizer portrait">
			<div className="aspectifier" />
			<MockFeed advert={advert} showAd={() => setShowAd(true)} socialType={social} />
			<div className={`social-ad fill-abs ${showAd ? 'show' : ''}`}>
				{ showAd && advert ? <GoodLoopAd {...unitProps} /> : '' }
			</div>
		</div>
	);
};

// The weird anchor is to force a reload with no params against `preact-router` behaviour
const noMockupAlert = (
	<Alert color="warning" className="no-video-alert">
		No social media mockup available for this advert. Please add the necessary assets in the editor's <n>Videos</n> section. To see our default demo click <a href="https://demo.good-loop.com/portrait/social/?gl.vert=0PVrD1kX" onClick={() => location.replace(location.pathname)}>here</a>!
	</Alert>
);

const adBlockerAlert = (
	<Alert color="warning" className="social-adblocker-alert">
		Please temporarily disable your adblocker to see our ads in action!
	</Alert>
);


export default SocialDemo;
