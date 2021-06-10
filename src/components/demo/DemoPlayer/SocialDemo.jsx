import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Alert } from 'reactstrap';

import GoodLoopAd from "../../GoodLoopAd";
import MockFeed from './MockFeed';
import { DEFAULT_PROD_SOCIAL_AD, DEFAULT_PROD_SOCIAL_ADVERTISER } from '../constants';
import { getAdvertFromPortal, getVertiserFromPortal } from '../../../utils';


const SocialDemo = ({vertId, adBlocker, social, context, ...params}) => {
	// Adblock active? Show a warning.
	if (adBlocker) return adBlockerAlert;

	// If no app or context specified, default to Instagram Stories & set URL to match
	if (!social || !context) {
		let {search, hash} = window.location;
		if (hash) hash = '#' + hash; // don't insert # unless there's something to go after it
		route(`/portrait/social/instagram/stories${search}${hash}`);
	};

	// TODO What was the below comment referring to? 
	// If adblocker's in use fetch calls to portal might break, so we use the default advert/preview.

	const [showAd, setShowAd] = useState(false); // User has swiped/clicked to show the ad
	const [advert, setAdvert] = useState(null); // Advert object as retrieved from portal
	const [advertiser, setAdvertiser] = useState(null); // Advert's advertiser

	// On mounting the SocialDemo element or changing advert ID, fetch the advert from the portal.
	useEffect(() => {
		getAdvertFromPortal({id: vertId, callback: setAdvert, status: params['gl.status']});
	}, [vertId]);

	useEffect(() => {
		advert && getVertiserFromPortal({id: advert.vertiser, callback: setAdvertiser});
	}, [advert])

	// If the advert ID, social platform, or context to simulate changes, return to the initial simulated feed
	useEffect(() => {
		setShowAd(false);
	}, [social, context, vertId]);

	// We can auto redirect to default advert with the line below, but I think an alert is more useful to users.
	// if ( advert && ! mockSocialImage && vertId !== DEFAULT_PROD_AD ) route('/portrait/social/' + `?gl.vert=${DEFAULT_PROD_AD}`); // if no teaser image available show default advert instead

	const unitProps = {
		vertId: vertId,
		production: vertId === DEFAULT_PROD_SOCIAL_AD, // Default (production) ad always comes from the prod server
		size: 'portrait',
		delivery: 'app',
		'gl.after': 'persist',
		...params
	};

	return (
		<div className="ad-sizer portrait">
			<div className="aspectifier" />
			<MockFeed advert={advert} advertiser={advertiser} showAd={() => setShowAd(true)} socialType={social} socialContext={context} muted={!params.unmuteSocial}/>
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
