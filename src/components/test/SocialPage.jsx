/* @jsx h */
import { h, Fragment } from 'preact';
import { route } from 'preact-router';
import { Container, Row, Col, ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import TestControls from './TestControls';



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


/**
 * 
 */
const PhoneWidget = ({extVideo, aspectRatio = '18_9', addrBar, navBar, vertId, children}) => {
	const addrBarEl = addrBar ? (
		<div id="address-bar" class="bar">
			<span class="content">address bar</span>
		</div>
	) : null;

	const navBarEl = navBar ? (
		<div id="navigation-bar" class="bar">
			<span class="content">Nav bar</span>
		</div>
	) : null;

	const extVideoEl = extVideo ? (
		<div id="external-video">
			<video src="triangle-loop.mp4" loop autoplay muted />
		</div>
	) : null;

	return (
		<div id="frame-sizer" className={`aspect-${aspectRatio}`}>
			<div id="phone-frame">
				<div className="phone-speaker"></div>
				<div id="phone-screen">
					<div id="status-bar" class="bar"><span class="content">status bar</span></div>
					{addrBarEl}
					<div id="screen-content" className={extVideo ? 'extVideo' : ''}>
						{extVideoEl}
						{children}
					</div>
					{navBarEl}
				</div>
				<div className="phone-speaker"></div>
			</div>
		</div>
	);
};




const PhoneControls = ({aspectRatio = '18_9', addrBar, navBar, extVideo}) => (
	<Col>
		<div className="mb-4">
			<h4>Phone Aspect Ratio</h4>
			<p>
				4:3 phones are mostly extinct, but you should check your design on both 16:9 and 18:9 screens.
			</p>
			<ButtonGroup style={{maxWidth: '200px'}}>
				<Button active={aspectRatio === '4_3'} onClick={() => setParams({aspectRatio: '4_3'})}>4:3</Button>
				<Button active={aspectRatio === '16_9'} onClick={() => setParams({aspectRatio: '16_9'})}>16:9</Button>
				<Button active={aspectRatio === '18_9'} onClick={() => setParams({aspectRatio: '18_9'})}>18:9</Button>
			</ButtonGroup>
		</div>
		<div className="mb-4">
			<h4>Bars</h4>
			<p>
				Depending on the phone OS and context, we might have to deal
				with address and navigation bars taking up vertical space.
				Check and make sure your design fits on the screen with and without both.
			</p>
			<FormGroup check>
				<Label check>
					<Input type="checkbox" onChange={e => setParams({addrBar: e.target.checked})} checked={addrBar} />
					{' '}Address bar
				</Label>
			</FormGroup>
			<FormGroup check>
				<Label check>
					<Input type="checkbox" onChange={e => setParams({navBar: e.target.checked})} checked={navBar}/>
					{' '}Navigation bar
				</Label>
			</FormGroup>
		</div>
		<div className="mb-4">
			<h4>External Video</h4>
			<p>
				When we run engage-to-donate ads on Twitter, they host and run the video, taking up half the screen height, and place our ad-unit below it.
				Use this setting to simulate that.
			</p>
			<FormGroup check>
				<Label check>
					<Input type="checkbox" onChange={e => setParams({extVideo: e.target.checked})} checked={extVideo} />
					{' '}External video
				</Label>
			</FormGroup>
		</div>
	</Col>
);

const SocialPage = ({halfHeight, size, format, wrapper, ...params}) => {
	const subtype = wrapper ? 'Brand.com wrapper' : 'Engage to donate';

	const adProps = {
		'gl.status': 'DRAFT',
		'gl.delivery': 'app',
		'gl.after': 'persist',
		...params
	};
	if (wrapper) adProps['gl.unitType'] = 'wrapper';

	return <>
		<TestSiteNavBar {...params} />
		<Container>
			<p>Type: <code>social</code>, Subtype: {subtype}</p>
			<TestControls {...params}/>
			<Row>
				<PhoneWidget {...params}>
					<GoodLoopAd bare size="portrait" {...adProps} />
				</PhoneWidget>
				<PhoneControls {...params} />
			</Row>
		</Container>
	</>;
};

export default SocialPage;