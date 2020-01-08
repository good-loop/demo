import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const TestAdSelector = ({ vertId, size, format }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);

	const generateUrl = id => {
		return `/${format}/${size}/${id}?`;
	}

	return (
		<Row className="test-ad-selector">

			<div className="selector-info">{ `Currently showing ${size} ${format} for ${vertId}` }</div>

			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret>
					Select advert
				</DropdownToggle>
				<DropdownMenu>
					<a href={generateUrl('test_wide_multiple')}><DropdownItem>test_wide_multiple</DropdownItem></a>
					<a href={generateUrl('test_wide_single')}><DropdownItem>test_wide_single</DropdownItem></a>
					<a href={generateUrl('test_tall_multiple')}><DropdownItem>test_tall_multiple</DropdownItem></a>
					<a href={generateUrl('test_tall_single')}><DropdownItem>test_tall_single</DropdownItem></a>
					<a href={generateUrl('test_lesstall_multiple')}><DropdownItem>test_lesstall_multiple</DropdownItem></a>
					<a href={generateUrl('test_lesstall_single')}><DropdownItem>test_lesstall_single</DropdownItem></a>
				</DropdownMenu>
			</Dropdown>
		</Row>
	);
}

export default TestAdSelector;