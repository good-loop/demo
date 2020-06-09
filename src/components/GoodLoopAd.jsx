/* @jsx h */
import { h, Fragment, Component } from 'preact';
import { getNonce, getUnitUrl } from '../utils';

class GoodLoopAd extends Component {
	shouldComponentUpdate(nextProps) {
		return getNonce(nextProps) !== getNonce(this.props);
	}

	render({size, vertId, production, bare, extraNonce, delivery, refPolicy = 'no-referrer-when-downgrade', glParams, ...params}) {
		// Changes if size or ad ID changes - breaks identity on script & container so they get removed on next render
		const nonce = getNonce(this.props);

		const unitUrl = getUnitUrl({
			production,
			delivery,
			params: {
				'gl.vert': vertId,
				'gl.delivery': delivery,
				...glParams,
			}
		});

		const bareElements = <>
			<div className="goodloopad" data-format={size} data-mobile-format={size} key={nonce + '-container'}/>
			<script src={unitUrl} key={nonce + '-script'} referrerPolicy={refPolicy} />
		</>;

		// Aspectifier isn't always wanted - eg in fullscreen mode where making the
		// container 100% width and forcing it to 16:9 aspect will cause overflow
		if (bare) return bareElements;
		
		return (
			<div className={`ad-sizer ${size}`} key={nonce + '-direct'}>
				<div className="aspectifier" />
				{bareElements}
			</div>
		);
	}
};

export default GoodLoopAd;