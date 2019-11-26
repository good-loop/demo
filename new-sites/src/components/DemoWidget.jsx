import { h } from 'preact';
import React, { Fragment, useContext } from "react";
import GoodLoopAd from "../GoodLoopAd";
import VpaidAd from '../VpaidAd';
// import { useContext } from 'preact/hooks/src';
import { Store } from '../Store';

import { Row, Col, Container, Alert } from 'reactstrap';

const DemoWidget = () => {

	return (
		<>
            <FormatPicker />
            <DevicePicker />
            <ExplanationText />
			<Player />
		</>
	);
};

const Player = () => {
	const {state} = useContext(Store);
	const vpaid = false;

	const frameImages = {
		landscape: 'https://demo.good-loop.com/img/iphone-frame-16-9-padded-notch.svg',
		desktop: 'https://demo.good-loop.com/img/laptop-websiteholder-text.png',
		portrait: 'https://demo.good-loop.com/img/iphone-frame-16-9-padded-notch-portrait.svg'
	}

	const videoPlayer = () => {
        return (
				<>{
					vpaid ? <VpaidAd vertId={state.vertId} size={state.size} nonce={state.size} style={{width: '600px'}} /> 
					: <GoodLoopAd vertId={state.vertId} size={state.size} nonce={state.size} style={{width: '600px', height: '400px'}} />
				}</>
		)
	};

    const socialPlayer = (
        <Row><Col xs="12">Social test page: Work in progress</Col></Row>
    )

	return (
		<>
			<div className="container">
				<div className="row" style={{ position: 'relative' }}>
					<div className="half-bg"></div>
					<img id="frame" className={`${state.device}`} src={frameImages[state.device]} alt="device frame"/>
					<div className={`device-white-bg ${state.device}`}></div>
					<div className={`ad-container ${state.device}`}>
						{ state.format === 'social'? socialPlayer : videoPlayer() }
					</div>
				</div>
			</div>
		</>
	)
}

const FormatPicker = () => {
    const {state, dispatch} = useContext(Store);
    const handleClick = e => {
		// Social view disables desktop and landscape devices.
		if (e.target.id === 'social') { dispatch({ type: 'UPDATE_DEVICE', payload: 'portrait' }) }
		dispatch({ type: 'UPDATE_FORMAT', payload: e.target.id })
	}

	return (
		<>
			<div className="nav justify-content-center" id="format-menu">
				<div id="pick-format-row" class="first row">
					<div 
						className={`button-box col-auto icon-box option-button ${state.format === 'social'? 'highlighted-button' : ''}`}
						id="social" 
						onClick={handleClick}
						>
							<a id="social">SOCIAL</a>
					</div>
					<div 
						className={`button-box col-auto icon-box option-button ${state.format === 'video'? 'highlighted-button' : ''}`}
						id="video" 
						onClick={handleClick}
						>
							<a id="video">VIDEO</a>
					</div>
					{/* <div hidden class='button-box col-auto icon-box option-button' id='display'><a>DISPLAY</a></div> */}
				</div>
			</div>
		</>
	);
};

const DevicePicker = () => {
    const {state, dispatch} = useContext(Store);

    const handleClick = e => {
		dispatch({ type: 'UPDATE_DEVICE', payload: e.target.id });

		// Update SIZE depending on device:
		if (e.target.id === 'portrait') dispatch({ type: 'UPDATE_SIZE', payload: 'portrait' });
		else dispatch({ type: 'UPDATE_SIZE', payload: 'landscape' });
	} 


	const highlighter = id => { return id === state.device ? 'highlighted-button' : '' }
	const disabler = id => {
		return state.format === 'social' && id !== 'portrait' ? 'disabled-button' : '';
	}

	return (
		<>
			{/* Which device? */}
			<div className="nav justify-content-center" id="button-menu">
				<div className="second row">
					<div
						className={`button-box col-auto icon-box option-button ${highlighter('landscape')} ${disabler('landscape')}`}
						id="landscape"
                        onClick={handleClick}
					>
						<a href="#" id="landscape" className={disabler('landscape')}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.9 25.6" id="landscape">
								<path
									fill="currentColor"
									d="M40.8,0H6.1C2.7,0,0,2.7,0,6.1v13.4c0,3.4,2.7,6.1,6.1,6.1l0,0h34.7c3.4,0,6.1-2.7,6.1-6.1V6.1
										C46.9,2.7,44.2,0,40.8,0z M43.9,19.5c0,1.7-1.4,3.1-3.1,3.1H6.1c-1.7,0-3.1-1.4-3.1-3.1l0,0v-0.9c1.2-0.4,2-1.5,2-2.8V9.8
										C5,8.5,4.2,7.4,3,7V6.1C3,4.4,4.4,3,6.1,3h34.7c1.7,0,3.1,1.4,3.1,3.1V19.5z"
								/>
							</svg>
						</a>
					</div>
					<div 
                        className={`button-box col-auto icon-box option-button ${highlighter('desktop')} ${disabler('desktop')}`}
                        id="desktop"
                        onClick={handleClick}
                    >
						<a href="#" id="desktop" className={disabler('desktop')}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 41.775" id="desktop">
								<g fill="currentColor">
									<path d="M71.39,41.412H11.079a1.5,1.5,0,0,1-1.5-1.5V1.5a1.5,1.5,0,0,1,1.5-1.5H71.39a1.5,1.5,0,0,1,1.5,1.5V39.912A1.5,1.5,0,0,1,71.39,41.412Zm-58.811-3H69.89V3H12.579Z" />
									<path d="M80.5,41.412H1.969a1.5,1.5,0,0,1,0-3H80.5a1.5,1.5,0,0,1,0,3Z" />
								</g>
							</svg>
						</a>
					</div>
					<div
						className={`button-box col-auto icon-box option-button ${highlighter('portrait')}`}
						id="portrait"
                        onClick={handleClick}
					>
						<a href="#" className={disabler('portrait')}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 25.612 46.895"
                                id="portrait"
							>
								<path
									fill="currentColor"
									d="M19.516,0H6.1A6.1,6.1,0,0,0,0,6.1V40.8a6.1,6.1,0,0,0,6.1,6.1H19.516a6.1,6.1,0,0,0,6.1-6.1V6.1A6.1,6.1,0,0,0,19.516,0Zm3.1,40.8a3.1,3.1,0,0,1-3.1,3.1H6.1A3.1,3.1,0,0,1,3,40.8V6.1A3.1,3.1,0,0,1,6.1,3h.881a2.945,2.945,0,0,0,2.8,2.047h6.062A2.945,2.945,0,0,0,18.635,3h.881a3.1,3.1,0,0,1,3.1,3.1Z"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

const ExplanationText = () => {
    const {state} = useContext(Store);

    const describeText = {
        social: { id: 'describe-social', text: 'The Good-Loop social swipe-to-donate player is shown in social media apps: SnapChat, Instagram, Facebook, or Twitter.' },
        video: { is: 'describe-video', text: 'Our core product, the Good-Loop video player is shown in a website article as people scroll through (&quot;in-stream&quot;), or appears as a pre-roll before a video begins.' }
    }
    
    // Select from object based on current state
    let describe = describeText[state.format];

    return (
        <Container className="description-text text-center">
            <p id={describe.id}>
                {describe.text}
            </p>
            {/* Alert if the user is using an ad-block */}
            <Alert className="alert alert-warning alert-dismissible" role="alert">
				Adblocker detected. Some of our adverts might not play properly!
				<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
			</Alert>
        </Container>
    )
}

export default DemoWidget;
