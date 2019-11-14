/* @jsx h */
import { h, Fragment, Component } from 'preact';

// Decide which adserver to use and record it here - it's used in multiple places.
// This page can be accessed via localtest.gl.com, test.gl.com, or prodtest.gl.com
let prefix = 'test';
if (window.location.hostname.match(/^local/)) { prefix = 'local'; }
else if (window.location.hostname.match(/^prod/)) { prefix = ''; }
const glUnitUrl = `${window.location.protocol}//${prefix}as.good-loop.com/unit.js`;

class GoodLoopAd extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.nonce !== this.props.nonce;
	}

	render({size, vertId, nonce}) {
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