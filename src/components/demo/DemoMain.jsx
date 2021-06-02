/** @jsx h */
import { h, Fragment } from 'preact';
import { Router } from 'preact-router';

import DemoPage from './DemoPage';
import FullscreenPage from './FullscreenPage';
import FullscreenSocial from './FullscreenSocial';

const TestMain = () => <>
	<Router>
		<DemoPage path="/" format="video" device="desktop" />
		<DemoPage path="/:device/:format/:social/:context?" />
		<DemoPage path="/:device/:format/:social?" />
		<DemoPage path="/:device/:format?" />
		<FullscreenPage path="/fullscreen/:size?" />
		<FullscreenSocial path="/fullscreen/social/:platform/context?" />
		<FullscreenSocial path="/fullscreen/social/:platform" />
		<FullscreenSocial path="/fullscreen/social" />
	</Router>
</>;


export default TestMain;
