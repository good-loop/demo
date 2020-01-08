/* @jsx h */
import { h, Fragment } from 'preact';
import { Container, Row, Col } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import VpaidAd from '../VpaidAd';
import TestAdSelector from './TestAdSelector';

const PlayerPage = ({ vpaid, size, vertId, 'gl.vert': vertParam, ...params}) => {

	const defaultAd = 'test_wide_multiple';
	if (vertId.length === 0 && !vertParam) vertId = defaultAd;

	return <>
			<TestSiteNavBar vertId={vertId || vertParam } {...params} />
			<Container>
				<TestAdSelector vertId={vertId} size={size} format={'player'} />
				<Row>
					<Col xs="12">
						{vpaid ? <VpaidAd vertId={vertId} size={size} nonce={size} /> : <GoodLoopAd vertId={vertId} size={size} nonce={size + vertId} />}
					</Col>
				</Row>
			</Container>
		</>
}

export default PlayerPage;