/** @jsx h */
import { h, Fragment } from 'preact';
import { Router } from 'preact-router';

import PlayerPage from './PlayerPage';
import BannerPage from './BannerPage';
import SocialPage from './SocialPage';

const TestMain = () => <>
	<Router>
		<PlayerPage path="/" size="landscape" />
		<PlayerPage path="/player/" size="landscape" />
		<PlayerPage path="/player/:size/" />
		<PlayerPage path="/vpaid/" size="landscape" vpaid/>
		<PlayerPage path="/vpaid/:size/" vpaid />
		<BannerPage path="/banner/" size="mpu" />
		<BannerPage path="/banner/:size/" />
		<SocialPage path="/social/" />
		<SocialPage path="/social/full" noVideo />
		<SocialPage path="/social/half" halfHeight novideo />
	</Router>
</>;


export default TestMain;
