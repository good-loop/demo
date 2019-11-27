/* @jsx h */
import { h, Fragment } from 'preact';
import { Container, Row, Col } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import VpaidAd from '../VpaidAd';

const SocialPage = ({ vpaid, size, vertId, 'gl.vert': vertParam, ...params}) => <>
	<TestSiteNavBar vertId={vertId || vertParam} {...params} />
	<Container>
		<Row>
			<Col xs="12">Social test page: Work in progress</Col>
		</Row>
	</Container>
</>;

export default SocialPage;