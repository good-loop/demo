/* @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import TestSiteNavBar from './TestSiteNavBar';
import GoodLoopAd from '../GoodLoopAd';
import VpaidAd from '../VpaidAd';

const PlayerPage = ({ vpaid, size, vertId, 'gl.vert': vertParam, ...params}) => {

	const defaultAd = 'test_wide_multiple';
	if (vertId.length === 0 && !vertParam) vertId = defaultAd;

	return <>
			<TestSiteNavBar vertId={vertId || vertParam } {...params} />
			<Container>
				<TestAdSelector vertId={vertId}/>
				<Row>
					<Col xs="12">
						{vpaid ? <VpaidAd vertId={vertId} size={size} nonce={size} /> : <GoodLoopAd vertId={vertId} size={size} nonce={size + vertId} />}
					</Col>
				</Row>
			</Container>
		</>
}


const TestAdSelector = ({ vertId }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);

	return (
		<Row className="test-ad-selector">

			<div className="selector-info">{ `Currently showing player for ${vertId}` }</div>

			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret>
					Select advert
				</DropdownToggle>
				<DropdownMenu>
					<a href="/player/landscape/test_wide_multiple?"><DropdownItem>test_wide_multiple</DropdownItem></a>
					<a href="/player/landscape/test_wide_single?"><DropdownItem>test_wide_single</DropdownItem></a>
					<a href="/player/landscape/test_tall_multiple?"><DropdownItem>test_tall_multiple</DropdownItem></a>
					<a href="/player/landscape/test_tall_single?"><DropdownItem>test_tall_single</DropdownItem></a>
					<a href="/player/landscape/test_lesstall_multiple?"><DropdownItem>test_lesstall_multiple</DropdownItem></a>
					<a href="/player/landscape/test_lesstall_single?"><DropdownItem>test_lesstall_single</DropdownItem></a>
				</DropdownMenu>
			</Dropdown>
		</Row>
	);
}

export default PlayerPage;