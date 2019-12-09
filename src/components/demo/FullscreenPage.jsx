/* @jsx h */
import { h } from 'preact';
import GoodLoopAd from "../GoodLoopAd";


const FullscreenPage = ({size = 'landscape'}) => {
	// gl.vert param is absolutely required!
	const vertId = new URL(window.location).searchParams.get('gl.vert') || '';

	return (
		<div id="fullscreen" className={size}>
			<GoodLoopAd bare size={size} vertId={vertId} nonce={`${size}${vertId}`} />
		</div>
	);
};

export default FullscreenPage;