/* @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import { Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const testVerts = {
	Default: '!test',
	'Single charity': '!test_charities:1',
	'Tall Video': '!test_video',
};

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

	
const serverTypes = {
	auto: '',
	local: 'local',
	test: 'test',
	prod: 'prod',
	stage: 'strage'
};


const TestControls = (params) => {
	const vertId = params['gl.vert'];
	let { dataServer, codeServer, forceServerType } = params;

	// Keep old URLs working: old "forceServerType" param presets dataServerType and codeServerType
	if (forceServerType) {
		dataServer = forceServerType;
		codeServer = forceServerType;
	}


	const [newVertId, setNewVertId] = useState(vertId);
	const [newCodeServer, setNewCodeServer] = useState(codeServer);
	const [newDataServer, setNewDataServer] = useState(dataServer);

	// A link to toggle "jump directly to the end card"
	const endCardPreview = params['gl.variant'] === 'tq';
	const toggleEndCardUrl = urlWithParams({'gl.variant': (endCardPreview ? null : 'tq')});
	const toggleEndCardLabel = endCardPreview ? 'View the whole advert' : 'Jump directly to the end card';

	// A link to toggle "View as PUBLISHED/DRAFT"
	const adStatusPub = params['gl.status'] === 'PUBLISHED';
	const toggleAdStatusUrl = urlWithParams({'gl.status': (adStatusPub ? null : 'PUBLISHED')});
	const toggleAdStatusLabel = adStatusPub ? 'Show DRAFT version' : 'Show PUBLISHED version'


	const testAds = Object.entries(testVerts).map(([label, id]) => (
		<a href={urlWithParams({'gl.vert': id})} onClick={() => setNewVertId(id)}>
			<DropdownItem>{label}</DropdownItem>
		</a>
	));


	const codeServers = Object.entries(serverTypes).map(([label, codeServer]) => {
		// TODO: get good-loop ad to reload once the server type changes
		return (
			<a href={urlWithParams({codeServer})} onClick={() => setNewCodeServer(codeServer)}>
				<DropdownItem>{label}</DropdownItem>
			</a>
		);
	});

	const dataServers = Object.entries(serverTypes).map(([label, dataServer]) => {
		// TODO: get good-loop ad to reload once the server type changes
		return (
			<a href={urlWithParams({dataServer})} onClick={() => setNewDataServer(dataServer)}>
				<DropdownItem>{label}</DropdownItem>
			</a>
		);
	});

	const submitForm = (event) => {
		event.preventDefault();
		route(urlWithParams({'gl.vert': newVertId, codeServer: newCodeServer, dataServer: newDataServer}))
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
							<DropdownMenu>{testAds}</DropdownMenu>
						</UncontrolledDropdown>
						&nbsp;code: <UncontrolledDropdown>
							<DropdownToggle caret>{newCodeServer ? newCodeServer : "auto"}</DropdownToggle>
							<DropdownMenu>{codeServers}</DropdownMenu>
						</UncontrolledDropdown>
						&nbsp;data: <UncontrolledDropdown>
							<DropdownToggle caret>{newDataServer ? newDataServer : "auto"}</DropdownToggle>
							<DropdownMenu>{dataServers}</DropdownMenu>
						</UncontrolledDropdown>
					</FormGroup>
				</Form>
			</Col>
		</Row>
	);
};

export default TestControls;