/** @jsx h */
import { h, Fragment } from 'preact';
import { Router } from 'preact-router';

import DemoPage from './DemoPage';
import FullscreenPage from './FullscreenPage';

const TestMain = () => <>
	<Router>
		<DemoPage path="/" format="video" device="desktop" />
		<DemoPage path="/:device/:format/:social?" />
		<DemoPage path="/:device/:format?" />
		<FullscreenPage path="/fullscreen/:size?" />
	</Router>
</>;


export default TestMain;
