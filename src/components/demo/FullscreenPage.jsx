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
        // Grab vertId from url. If for whatever reason it's not provided let it fail.
        return params.get('gl.vert') || '';
    }

    const vertId = getVertId();

    return (
        <div id="fullscreen">
            <GoodLoopAd vertId={vertId} size={sizes[format || 'video'][device || 'desktop']} nonce={`${format}${device}${vertId}`} />
        </div>
    )
}

export default FullscreenPage;