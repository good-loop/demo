import React, { Fragment, useState } from 'react';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import VpaidAd from '../VpaidAd';
import TestControls from './TestControls';


const PlayerPage = ({ vpaid, size, ...params}) => {
	const [restrictWidth, setRestrictWidth] = useState(false);
	// Add "restrict width of fabric ad" as a gl.param so changing it breaks identity & reloads the ad
	const adProps = {'gl.status': 'DRAFT', size, 'gl.restrictWidth': restrictWidth, ...params};

	const AdTag = vpaid ? VpaidAd : GoodLoopAd;

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
				<Col>
					<AdTag {...adProps} />
				</Col>
			</Row>
		</Container>
		{extraControls}
	</>;
}

export default PlayerPage;