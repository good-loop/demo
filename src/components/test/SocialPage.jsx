/* @jsx h */
import { h, Fragment } from 'preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import { Container, Row, Col, ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import TestControls from './TestControls';

const controlUrl = ({replaceParam = {}, toggleInParam = {}}) => {
	const url = new URL(window.location.href);
	const params = url.searchParams;

	Object.entries(replaceParam).forEach(([key, value]) => {
		params.set(key, value);
	});

	Object.entries(toggleInParam).forEach(([key, value]) => {
		if (!params.has(key)) {
			params.set(key, '');
		}
		const param = params.get(key).split(',');
		if (param.contains(value)) {
			params.set(key, param.splice(param.indexOf(value), 1));
		} else {
			param.push(value)
			params.set(key, params.join(','));
		}
	});

	return 
};

const ratios = {
	'16_9': 'sixteennine',
	'18_9': 'nineteennine',
	'4_3': 'fourthree'
};

/**
 * 
 */
const PhoneWidget = ({halfHeight, noVideo, noAddressBar, noNavBar, socialAspect = 'r16_9', ...params}) => {
	const urlParams = new URLSearchParams(window.location.search);

	const statusBar = urlParams.get('statusBar');
	const addressBar = urlParams.get('addrBar');
	const navBar = urlParams.get('navBar');
	const ratio = urlParams.get('aspectRatio') || '18_9';
	const vertId = urlParams.get('gl.vertId');

	return (
		<div id="frame-sizer" className={ratios[ratio]}>
			<div id="phone-frame">
				<div id="phone-speaker"></div>
				<div id="phone-screen">
					{ statusBar ?
					<div id="status-bar" class="bar">
						<span class="content">status bar</span>
					</div> : '' }

					{ addressBar ?
					<div id="address-bar" class="bar">
						<span class="content">address bar</span>
					</div> : '' }

					<div id="screen-content">
						<div id="external-video" style="display: none;">
							<video src="triangle-loop.mp4" loop autoplay muted />
						</div>
						<GoodLoopAd vertId={vertId} size="portrait" glParams={{'gl.delivery': 'app', 'gl.after': 'persist'}} nonce={vertId}/>
					</div>

					{ navBar ?
					<div id="navigation-bar" class="bar" style="display: none;">
						<span class="content"><span>&#9664;</span><span>&#9679;</span><span>&#9632;</span></span>
					</div> : '' }
				</div>
				<div id="phone-button"></div>
			</div>
		</div>
	);
};


const setParams = (newParams) => {
		const newUrl = new URL(window.location);
		Object.entries(newParams).forEach(([key, value]) => {
			if (value) {
				newUrl.searchParams.set(key, value);
			} else {
				newUrl.searchParams.delete(key);
			}
		});

		route(`${newUrl.pathname}${newUrl.search}`);
	};


const PhoneControls = ({statusBar, addrBar, navBar}) => (
	<Col>
		<div className="d-flex flex-column">
		<Label>Phone Aspect Ratio</Label>
			<ButtonGroup style={{maxWidth: '200px'}}>
				<Button onClick={() => setParams({aspectRatio: '4_3'})}>4:3</Button>
				<Button onClick={() => setParams({aspectRatio: '16_9'})}>16:9</Button>
				<Button onClick={() => setParams({aspectRatio: '18_9'})}>18:9</Button>
			</ButtonGroup>
		</div>
		<div className="d-flex flex-column">
			<Label>Bars</Label>
			<p>Depending on the phone OS and context, we might have to deal with address and navigation taking up vertical space.</p>
			<FormGroup check className="d-flex flex-column">
				<Label check>
					<Input type="checkbox" onClick={() => setParams({statusBar: !statusBar})} value={statusBar} />
					{' '} Status Bar
				</Label>
				<Label check>
					<Input type="checkbox" onClick={() => setParams({addrBar: !addrBar})} value={addrBar} />
					{' '} Address bar
				</Label>
				<Label check>
					<Input type="checkbox" onClick={() => setParams({navBar: !navBar})} value={navBar}/>
					{' '} Navigation bar
				</Label>
			</FormGroup>
		</div>
	</Col>
);

const SocialPage = ({halfHeight, noVideo, size, format, ...params}) => {
	const vertId = params['gl.vert'];

	return <>
		<TestSiteNavBar {...params} />
		<Container>
			<p>Type: <code>social</code>, Size: <code>{size}</code></p>
			<TestControls {...params}/>
			<Row>
				<PhoneWidget {...params} />
				<PhoneControls {...params} />
			</Row>
		</Container>
	</>;
};

export default SocialPage;