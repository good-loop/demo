/* @jsx h */
import { h, Fragment } from 'preact';
import { Container, Row, Col } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import VpaidAd from '../VpaidAd';
import TestControls from './TestControls';

const PlayerPage = ({ vpaid, size, ...params}) => {
	const adProps = {size, ...params};
	const ad = vpaid ? <VpaidAd {...adProps} /> : <GoodLoopAd {...adProps} />;

	return <>
			<TestSiteNavBar {...params} />
			<Container>
				<p>Type: <code>player</code>, Size: <code>{size}</code></p>
				<TestControls {...params} />
				<Row>
					<Col xs="12">{ad}</Col>
				</Row>
			</Container>
		</>
}

export default PlayerPage;