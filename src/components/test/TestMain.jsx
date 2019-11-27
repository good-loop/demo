/** @jsx h */
import { h, Fragment } from 'preact';
import { Router } from 'preact-router';

import PlayerPage from './PlayerPage';
import BannerPage from './BannerPage';

const TestMain = () => <>
	<Router>
		<PlayerPage path="/" size="landscape" />
		<PlayerPage path="/player/:size/:vertId?/" />
		<PlayerPage path="/vpaid/:size/:vertId?/" vpaid />
		<BannerPage path="/banner/:size/:vertId?/" />
	</Router>
</>;


export default TestMain;
