import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import TestControls from './TestControls';


const BannerPage = ({size, ...params}) => {
	const adProps = {'gl.status': 'DRAFT', size, ...params};
	return <>
		<TestSiteNavBar {...params} />
		<Container>
			<p>Type: <code>banner</code>, Size: <code>{size}</code></p>
			<TestControls {...params} />
			<Row>You're on the banner page, size={size}.</Row>
			<Row><Col xs="12"><GoodLoopAd {...adProps} /></Col></Row>
		</Container>
	</>;
};

export default BannerPage;