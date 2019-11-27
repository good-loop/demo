/** @jsx h */
import { h, Fragment } from 'preact';
import { Router } from 'preact-router';

import DemoPage from './DemoPage';

const TestMain = () => <>
	<Router>
		<DemoPage path="/" format="video" device="desktop" />
		<DemoPage path="/:device/:format" />
	</Router>
</>;


export default TestMain;
