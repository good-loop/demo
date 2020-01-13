/** @jsx h */
import { h, Fragment } from 'preact';
import { Router } from 'preact-router';

import PlayerPage from './PlayerPage';
import BannerPage from './BannerPage';
import SocialPage from './SocialPage';
import AppNexusAdPage from "./AppNexusAdPage";

const TestMain = () => <>
	<Router>
		<PlayerPage path="/:vertId?" size="landscape" />
		<PlayerPage path="/player/:vertId?" size="landscape" />
		<PlayerPage path="/player/:size/:vertId?" />
		<PlayerPage path="/vpaid/:vertId?" size="landscape" vpaid/>
		<PlayerPage path="/vpaid/:size/:vertId?" vpaid />
		<BannerPage path="/banner/:vertId?" size="mpu" />
		<BannerPage path="/banner/:size/:vertId?" />
		<SocialPage path="/social/:vertId" />
		<SocialPage path="/social/full" noVideo />
		<SocialPage path="/social/half" halfHeight novideo />
		<AppNexusAdPage path="/appnexus"/>
	</Router>
</>;


export default TestMain;
