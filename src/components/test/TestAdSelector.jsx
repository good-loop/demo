import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const TestAdSelector = ({ vertId, size, format }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);

	const generateUrl = id => {
		return `/${format}/${size}/${id}?`;
	}

	const adIdList = [
		'test_wide_multiple',
		'test_wide_single',
		'test_tall_multiple',
		'test_tall_single',
		'test_lesstall_multiple',
		'test_lesstall_single',
	];

	const generateDropdownItems = () => {
		return adIdList.map(id => <a href={generateUrl(id)}><DropdownItem>{id}</DropdownItem></a> );
	}

	return (
		<Row className="test-ad-selector">

			<div className="selector-info">{ `Currently showing ${size} ${format} for ${vertId}` }</div>

			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret>
					Select advert
				</DropdownToggle>
				<DropdownMenu>
					{ generateDropdownItems() }
				</DropdownMenu>
			</Dropdown>
		</Row>
	);
}

export default TestAdSelector;