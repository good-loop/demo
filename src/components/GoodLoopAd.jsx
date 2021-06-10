/* @jsx h */
import { h, Fragment, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getAdvertFromPortal, getNonce, getUnitUrl } from '../utils';

/**
 * ??Relation to VpaidAd.jsx??
 * ?? Differences from the (React) GoodLoopUnit.jsx??
 * 
 */
class GoodLoopAd extends Component {
	shouldComponentUpdate(nextProps) {
		return getNonce(nextProps) !== getNonce(this.props);
	}

	render({size, vertId, production, bare, extraNonce, delivery, refPolicy = 'no-referrer-when-downgrade', ...params}) {
		// Load the ad
		const [advert, setAdvert] = useState(null); // Advert object as retrieved from portal	
		// On mounting element or changing advert ID, fetch the advert from the portal.
		// This is for legacyUnitBranch
		useEffect(() => {
			getAdvertFromPortal({id: vertId, callback: setAdvert, status: params['gl.status']});
		}, [vertId]);
		if ( ! advert) {
			return null; // do we have a spinner we can use??
		}
		// Changes if size or ad ID changes - breaks identity on script & container so they get removed on next render
		const nonce = getNonce(this.props);

		const unitUrl = getUnitUrl({
			production,
			delivery,
			params: {
				'gl.vert': vertId,
				'gl.delivery': delivery,
				...params,
			},
			legacyUnitBranch: advert.legacyUnitBranch
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