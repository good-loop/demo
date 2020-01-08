/* @jsx h */
import { h, Fragment } from 'preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import { Container, Row, Col, ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import TestAdSelector from './TestAdSelector';

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

/**
 * 
 */
const PhoneWidget = ({vertId, halfHeight, noVideo, noAddressBar, noNavBar, socialAspect = 'r16_9', ...params}) => {

	return (
		<div id="frame-sizer" className="eighteennine">
			<div id="phone-frame">
				<div id="phone-speaker"></div>
				<div id="phone-screen">
					<div id="status-bar" class="bar">
						<span class="content">status bar</span>
					</div>
					{ noAddressBar ? '' :<div id="address-bar" class="bar">
						<span class="content">address bar</span>
					</div> }
					<div id="screen-content">
						<div id="external-video" style="display: none;">
							<video src="triangle-loop.mp4" loop autoplay muted />
						</div>
						<GoodLoopAd vertId={vertId} size="portrait" glParams={{'gl.delivery': 'app', 'gl.after': 'persist'}} nonce={vertId}/>
					</div>
					{ noNavBar ? '' : <div id="navigation-bar" class="bar" style="display: none;">
						<span class="content"><span>&#9664;</span><span>&#9679;</span><span>&#9632;</span></span>
					</div> }
				</div>
				<div id="phone-button"></div>
			</div>
		</div>
	);
}

const PhoneControls = () => {
	let urlParams = new URLSearchParams(window.location.search);
	const [params, setParams] = useState(urlParams);

	const toggleBooleanParam = e => {
		const param = e.target.value;
		if (urlParams.has(param)) {
			urlParams.delete(param);
		} else { urlParams.append(param, true) }

		setParams(urlParams);

		const currentPath = window.location.pathname;
		route(currentPath + '?' + urlParams.toString())
	}
	
	return (
		<Col>
			<div className="d-flex flex-column">
			<Label>Phone Aspect Ratio</Label>
				<ButtonGroup style={{maxWidth: '200px'}}>
					<Button>4:3</Button>
					<Button>16:9</Button>
					<Button>18:9</Button>
				</ButtonGroup>
			</div>
			<div className="d-flex flex-column">
				<Label>Bars</Label>
				<p>Depending on the phone OS and context, we might have to deal with address and anvigation taking up vertical space.</p>
				<FormGroup className="d-flex flex-column">
					<Label>
						<Input 
							value="statusBar"
							type="checkbox"
							onClick={toggleBooleanParam}
							defaultChecked={ urlParams.has('statusBar') }
						/>
						{' '} Status Bar
					</Label>
					<Label>
						<Input
							value="addrBar"
							type="checkbox"
							onClick={toggleBooleanParam}
							defaultChecked={ urlParams.has('addrBar') }
						/>
						{' '} Address bar
					</Label>
					<Label>
						<Input
							value="navBar"
							type="checkbox"
							onClick={toggleBooleanParam}
							defaultChecked={ urlParams.has('navBar') }
						/>
						{' '} Navigation bar
					</Label>
				</FormGroup>
			</div>
		</Col>
	)
}

const ratios = {
	r4_3: '4:3 Legacy',
	r16_9: '16:9 Standard',
	r18_9: '18:9 Ultra-Tall'
};

const SocialPage = ({halfHeight, noVideo, vertId, 'gl.vert': vertParam, size, format, ...params}) => {
	console.log(vertId);

	return (
		<>
			<TestSiteNavBar vertId={vertId || vertParam} {...params} />
			<Container>
				<TestAdSelector vertId={vertId} size={size} format="social" social/>
				<Row>You're on the social page.</Row>
				<Row>
					<PhoneWidget vertId={vertId} />
					<PhoneControls />
				</Row>
			</Container>
		</>
	)
};

export default SocialPage;