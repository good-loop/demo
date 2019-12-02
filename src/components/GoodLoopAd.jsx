/* @jsx h */
import { h, Fragment, Component } from 'preact';

// Decide which adserver to use and record it here - it's used in multiple places.
// This page can be accessed via localtest.gl.com, test.gl.com, or prodtest.gl.com
const local = window.location.hostname.match(/^local/);
const test = window.location.hostname.match(/^test/);


class GoodLoopAd extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.nonce !== this.props.nonce;
	}

	render({size, vertId, nonce, production}) {
		// const prefix = production ? '' : 
		let prefix;
		if (production) prefix = '';
		if (window.location.hostname.match(/^local/)) prefix = 'local';
		if (window.location.hostname.match(/^test/)) prefix = 'test';

		const glUnitUrl = `//${prefix}as.good-loop.com/unit.js`;
		const fullUnitUrl = glUnitUrl + (vertId ? `?gl.vert=${vertId}` : '');
		
		return (
			<div className={`ad-sizer ${size}`}>
				<div className="aspectifier" />
				<div className="goodloopad" data-format={size} data-mobile-format={size} key={nonce + '-container'}/>
				<script src={fullUnitUrl} key={nonce + '-script'}/>
			</div>
		);
	}
}

export default GoodLoopAd;