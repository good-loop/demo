import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const DemoPageNavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	// id="current-nav-link" to show selected nav link
	return (
		<Navbar sticky="top" expand="lg" className="p-0" light>
			<NavbarBrand href="https://www.good-loop.com/">
				<img class="logo noaos normal-logo" alt="logo" src="/img/gl-logo2/Good-Loop-logo.svg" width="100%" height="100%" />
			</NavbarBrand>
			<NavbarToggler onClick={toggle}>
				<img src="/img/Icon_Hamburger.png" className="navbar-toggler-icon"/>
			</NavbarToggler>
			<Collapse isOpen={isOpen} navbar className="gl-bootstrap-navbar" id="navItemsDiv">
				<Nav navbar className="navbar-nav">
					<NavItem>
						<NavLink href="https://www.good-loop.com/products">Products</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="https://www.good-loop.com/partners">Partners</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="https://www.good-loop.com/resources">Resources</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="https://www.good-loop.com/company">Company</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
			<Nav className="pull-right justify-content-end">
				<NavItem>
					<NavLink href="https://www.good-loop.com/contact">Contact</NavLink>
				</NavItem>
			</Nav>
		</Navbar>
	);
}

export default DemoPageNavBar;

