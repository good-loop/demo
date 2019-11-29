import { h } from 'preact';
import GoodLoopAd from "../GoodLoopAd";

const sizes = {
	social: {
		portrait: 'social',
	},
	video: {
		landscape: 'landscape',
		desktop: 'landscape',
		portrait: 'portrait',
	}
}

const FullscreenPage = ({format, device}) => {

    const getVertId = () => {
        const url = new URL(window.location);
        const params = new URLSearchParams(url);
        return params.get('gl.vert') || '';
    }

    const vertId = getVertId();

    return (
        <div id="fullscreen">
            <GoodLoopAd vertId={vertId} size={sizes[format][device]} nonce={`${format}${device}${vertId}`} />
        </div>
    )
}

export default FullscreenPage;