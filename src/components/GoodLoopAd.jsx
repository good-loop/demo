/* @jsx h */
import { h, Fragment, Component } from 'preact';


class GoodLoopAd extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.nonce !== this.props.nonce;
	}

	render({size, vertId, nonce, production, bare, glParams = {}}) {
		const host = window.location.hostname;

		let prefix = '';
		if (!production) {
			if (host.match(/^local/)) prefix = 'local';
			else if (host.match(/^test/)) prefix = 'test';
		}
		
		const glUnitUrl = new URL(`https://${prefix}as.good-loop.com/unit.js`);
		if (vertId) glUnitUrl.searchParams.set('gl.vert', vertId);
		Object.entries(glParams).forEach(([key, value]) => {
			glUnitUrl.searchParams.set(key, value);
		})

		const bareElements = <>
			<div className="goodloopad" data-format={size} data-mobile-format={size} key={nonce + '-container'}/>
			<script src={glUnitUrl.toString()} key={nonce + '-script'}/>
		</>;

		// Aspectifier isn't always wanted - eg in fullscreen mode where making the
		// container 100% width and forcing it to 16:9 aspect will cause overflow
		if (bare) return bareElements;
		
		return (
			<div className={`ad-sizer ${size}`}>
				<div className="aspectifier" />
				{bareElements}
			</div>
		);
	}
}

export default GoodLoopAd;