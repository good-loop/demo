import { h, Fragment } from 'preact';
import React, { useState } from 'react';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const dropDownItems = [
	{ text: 'Our Mission', link: 'https://good-loop.com/our-mission' },
	{ text: 'Our Story', link: 'https://good-loop.com/our-story' },
	{ text: 'Press', link: 'https://good-loop.com/press' },
	{ text: 'Blog', link: 'https://medium.com/@GoodLoopHQ' }
]

const AboutUsMenu = () => {
	return dropDownItems.map(item => <DropdownItem href={item.link}>{item.text}</DropdownItem>)
}

const DemoPageNavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar expand="md" color="faded" light>
			<NavbarBrand className="gl-icon-centred">
				<div className="shadowcaster"></div>
				<img className="navbar-gl-icon" src="/img/favicon-60x60.png" alt=""/>
			</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar className="gl-bootstrap-navbar" id="navbar">
				<Nav navbar className="navbar-dark">
					<NavItem>
						<NavLink href="https://www.good-loop.com/">Home</NavLink>
					</NavItem>
					<UncontrolledDropdown nav inNavbar> 
						<DropdownToggle nav caret>About Us</DropdownToggle>
						<DropdownMenu right><AboutUsMenu /></DropdownMenu>
					</UncontrolledDropdown>
					<NavItem>
						<NavLink href="https://www.good-loop.com/contact-us">Contact Us</NavLink>
					</NavItem>
					<NavItem>
						<NavLink id="current-nav-link" href="https://demo.good-loop.com/">Players</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="https://www.good-loop.com/good-loop-for-the-general-public">My Impact</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="https://www.good-loop.com/careers">Careers</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}

export default DemoPageNavBar;

