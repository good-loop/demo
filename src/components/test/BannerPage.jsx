import { h, Component, Fragment } from 'preact';
import { Container, Row, Col } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import TestAdSelector from './TestAdSelector';


const BannerPage = ({size, vertId, 'gl.vert': vertParam, ...params}) => <>
	<TestSiteNavBar vertId={vertId || vertParam} {...params} />
	<Container>
		<TestAdSelector size={size} vertId={vertId} format='banner' />
		<Row>You're on the banner page, size={size}.</Row>
		<Row><Col xs="12"><GoodLoopAd vertId={vertId} size={size} nonce={size + vertId} /></Col></Row>
	</Container>
</>;

export default BannerPage;