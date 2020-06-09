/* @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import VpaidAd from '../VpaidAd';
import TestControls from './TestControls';


const PlayerPage = ({ vpaid, size, ...params}) => {
	const adProps = {size, ...params};
	const ad = vpaid ? <VpaidAd {...adProps} /> : <GoodLoopAd {...adProps} />;

	const [restrictWidth, setRestrictWidth] = useState(false);

	const extraControls = size === 'fabric' ? (
		<Container>
			<FormGroup check inline>
				<Label check>
					<Input type="checkbox" checked={restrictWidth} onChange={e => setRestrictWidth(e.target.checked)} />{' '}
					Restrict width (to simulate in-article or mobile contexts)
				</Label>
			</FormGroup>
		</Container>
	) : null;

	return <>
		<TestSiteNavBar {...params} />
		<Container>
				<p>Type: <code>player</code>, Size: <code>{size}</code></p>
				<TestControls {...params} />
		</Container>
		<Container fluid={size === 'fabric'} style={restrictWidth ? {maxWidth: '300px'} : {}}>
			<Row>
				<Col>{ad}</Col>
			</Row>
		</Container>
		{extraControls}
	</>;
}

export default PlayerPage;