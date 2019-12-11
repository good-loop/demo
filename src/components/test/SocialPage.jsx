/* @jsx h */
import { h, Fragment } from 'preact';
import { Container, Row, Col } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';

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
const PhoneWidget = ({vertId, halfHeight, noVideo, socialBars = '', socialAspect = 'r16_9', ...params}) => {
	const addressBar = socialBars.contains('addr');
	const navBar = socialBars.contains('nav');

	return (
		<div id="phone" className={socialAspect}>
			<div className="speaker"></div>
			<div className="screen">
				<div className="bar status-bar">
					<span className="content">status bar</span>
				</div>
				{addressBar ? (
					<div className="bar address-bar">
						<span className="content">address bar</span>
					</div>
				) : ''}
				<div className="screen-content">
					{noVideo ? (
						<div className="external-video">
							<video src="/img/triangle-loop.mp4" loop autoplay muted />
						</div>
					) : ''}
					<div className={halfHeight ? 'half-height' : 'full-height'}>
						<GoodLoopAd size="social" />
					</div>
				</div>
				{navBar ? (
					<div className="bar navigation-bar">
						<span className="content"><span>&#9664;</span><span>&#9679;</span><span>&#9632;</span></span>
					</div>
				) : ''}
			</div>
			<div className="phone-button"></div>
		</div>
	);
}

const ratios = {
	r4_3: '4:3 Legacy',
	r16_9: '16:9 Standard',
	r18_9: '18:9 Ultra-Tall'
};

const ControlsWidget = ({socialBars, socialAspect, vertId}) => {
	const addressBar = socialBars.contains('address');
	const navBar = socialBars.contains('nav');

	const ratioControls = Object.entries(ratios).map(([key, desc]) => {
		socialAspect === key ? <span>desc</span> : (
			<a href={controlUrl({replaceParam: {socialAspect: key}})}>{desc}</a>
		);
	})


	return <>
		{/*
		<div>
			<h2>Advert ID</h2>
			<p>If this is left empty, the advert will be taken from this window's gl.vert parameter or selected randomly.</p>
			<input id="advert-id" name="advert-id" /> <input type="button" value="Reload" onclick="loadFrame()" /><br/>
			<h3>Iframe URL</h3>
			<p>Use this URL where your ad platform of choice asks for a landing page</p>
			<code id="iframe-url"></code>
		</div>
		<div>
			<h2>Phone Aspect ratio</h2>
			{ratioControls}
		</div>
		<div>
			<h2>Bars</h2>
			<p>Depending on the phone OS and context, we might have to deal with address and navigation bars taking up vertical space.</p>
			<a href={controlUrl({toggleInParam: socialBars: 'address'})}/>{addressBar ? 'Hide ' : 'Show '}Address bar</a>
			<br/>
			<a href={controlUrl({toggleInParam: socialBars: 'nav'})}/>{addressBar ? 'Hide ' : 'Show '}Nav bar</a>
			<br/>
		</div>
		*/}
	</>;
}

const SocialPage = ({halfHeight, noVideo, vertId, 'gl.vert': vertParam, ...params}) => <>
	<TestSiteNavBar vertId={vertId || vertParam} {...params} />
	<Container>
		<Row>You're on the social page.</Row>
		<Row>
			<Col xs="12" md="6">
				<PhoneWidget vertId={vertId || vertParam} />
			</Col>
			<Col xs="12" md="6">
				<ControlsWidget vertId={vertId || vertParam} />
			</Col>
		</Row>
	</Container>
</>;

export default SocialPage;