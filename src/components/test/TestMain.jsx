/** @jsx h */
import { h, Fragment } from 'preact';
import { Router } from 'preact-router';

import PlayerPage from './PlayerPage';
import BannerPage from './BannerPage';

const TestMain = () => <>
	<Router>
		<PlayerPage path="/:vertId?" size="landscape" />
		<PlayerPage path="/player/:vertId?" size="landscape" />
		<PlayerPage path="/player/:size/:vertId?" />
		<PlayerPage path="/vpaid/:vertId?" size="landscape" vpaid/>
		<PlayerPage path="/vpaid/:size/:vertId?" vpaid />
		<BannerPage path="/banner/:vertId?" size="mpu" />
		<BannerPage path="/banner/:size/:vertId?" />
	</Router>
</>;

// <SocialPage path="/social/video" /> {/* portrait/MPU2-style - full-screen with video */}
// <SocialPage path="/social/full" noVideo /> {/* full-screen, with no video */}
// <SocialPage path="/social/half" halfHeight novideo /> {/* half-screen, with externally-hosted video */}


export default TestMain;
