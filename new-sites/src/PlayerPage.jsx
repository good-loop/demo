/* @jsx h */
import { h, Fragment } from 'preact';
import { Container, Row, Col } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from './GoodLoopAd';
import VpaidAd from './VpaidAd';

const PlayerPage = ({ vpaid, size, vertId, 'gl.vert': vertParam, ...params}) => <>
	<TestSiteNavBar vertId={vertId || vertParam} {...params} />
	<Container>
		<Row>
			<Col xs="12">You're on the {vpaid ? 'VPAID ' : ''}player page, size={size}.</Col>
		</Row>
		<Row>
			<Col xs="12">
				{vpaid ? <VpaidAd vertId={vertId} size={size} nonce={size} /> : <GoodLoopAd vertId={vertId} size={size} nonce={size} />}
			</Col>
		</Row>
	</Container>
</>;

export default PlayerPage;