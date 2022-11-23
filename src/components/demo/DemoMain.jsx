import React, { Fragment } from 'react';
import { Router } from 'preact-router';

import DemoPage from './DemoPage';
import FullscreenPage from './FullscreenPage';
import FullscreenSocial from './FullscreenSocial';

const TestMain = () => <>
	<Router>
		<DemoPage path="/" device="desktop" format="video" />
		<DemoPage path="/:device/:format/:subformat/:context?" />{/* eg "portrait/social/instagram/stories" */}
		<DemoPage path="/:device/:format/:subformat?" />
		<DemoPage path="/:device/:format?" />

		<FullscreenPage path="/fullscreen/:size?" />
		<FullscreenSocial path="/fullscreen/social/:platform/context?" />
		<FullscreenSocial path="/fullscreen/social/:platform" />
		<FullscreenSocial path="/fullscreen/social" />
	</Router>
</>;


export default TestMain;
