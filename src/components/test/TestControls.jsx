/* @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import { Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const testVerts = [
	'test_wide_multiple',
	'test_wide_single',
	'test_tall_multiple',
	'test_tall_single',
	'test_lesswide_multiple',
	'test_lesswide_single',
	'test_lesstall_multiple',
	'test_lesstall_single',
];

const urlWithParams = (newParams = {}) => {
	const urlParsed = new URL(window.location);
	Object.entries(newParams).forEach(([key, value]) => {
		if (value) {
			urlParsed.searchParams.set(key, value);
		} else {
			urlParsed.searchParams.delete(key);
		}
	})
	return `${urlParsed.pathname}${urlParsed.search}`;
};

const TestControls = (params) => {
	const vertId = params['gl.vert'];
	const forceServerType = params.forceServerType;

	const [newVertId, setNewVertId] = useState(vertId);
	const [newServerType, setNewServerType] = useState(forceServerType);

	// A link to toggle "jump directly to the end card"
	const endCardPreview = params['gl.variant'] === 'tq';
	const toggleEndCardUrl = urlWithParams({'gl.variant': (endCardPreview ? null : 'tq')});
	const toggleEndCardLabel = endCardPreview ? 'View the whole advert' : 'Jump directly to the end card';

	// A link to toggle "View as PUBLISHED/DRAFT"
	const adStatusPub = params['gl.status'] === 'PUBLISHED';
	const toggleAdStatusUrl = urlWithParams({'gl.status': (adStatusPub ? null : 'PUBLISHED')});
	const toggleAdStatusLabel = adStatusPub ? 'Show DRAFT version' : 'Show PUBLISHED version'

	const dropdownItems = testVerts.map(id => (
		<a href={urlWithParams({'gl.vert': id})} onClick={() => setNewVertId(id)}>
			<DropdownItem>{id}</DropdownItem>
		</a>
	));
	
	const serverTypes = [
		'auto', 'local', 'test', 'prod'
	];
	const serverDropdownItems = serverTypes.map(serverType => {
		let serverParam = serverType === 'auto' ? '' : serverType;
		// TODO: get good-loop ad to reload once the server type changes
		return (
			<a href={urlWithParams({forceServerType: serverParam})} onClick={() => setNewServerType(serverParam)}>
				<DropdownItem>{serverType}</DropdownItem>
			</a>
		);
	});

	const submitForm = (event) => {
		event.preventDefault();
		route(urlWithParams({'gl.vert': newVertId, forceServerType:newServerType}))
		return false;
	}

	return (
		<Row className="test-controls mb-4">
			<Col sm={6}>
				<p>
					<a href={toggleEndCardUrl}>{toggleEndCardLabel}</a><br/>
					<a href={toggleAdStatusUrl}>{toggleAdStatusLabel}</a>
				</p>
			</Col>
			<Col sm={6}>
				<Form inline onSubmit={submitForm}>
					<FormGroup>
						<Label inline for="new-vert-id">Advert ID:</Label>&nbsp;
						<Input inline type="text" placeholder="(adserver's choice)" name="new-vert-id" value={newVertId} onChange={e => setNewVertId(e.target.value)}></Input>&nbsp;
						<Button type="submit">Load</Button>&nbsp;
						<UncontrolledDropdown>
							<DropdownToggle caret>Test ads</DropdownToggle>
							<DropdownMenu>{ dropdownItems }</DropdownMenu>
						</UncontrolledDropdown>&nbsp;
						<UncontrolledDropdown>
							<DropdownToggle caret>{newServerType ? newServerType : "auto"}</DropdownToggle>
							<DropdownMenu>{serverDropdownItems}</DropdownMenu>
						</UncontrolledDropdown>
					</FormGroup>
				</Form>
			</Col>
		</Row>
	);
};

export default TestControls;