import React, { Fragment, useState } from 'react';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const aboutDropDownItems = [
	{ text: 'Our Story', link: 'https://good-loop.com/our-story.html' },
	{ text: 'Donations report', link: 'https://good-loop.com/donations-report.html' },
	{ text: 'Press & awards', link: 'https://good-loop.com/press-and-awards.html' }
]

const newsDropDownItems = [
	{ text: 'Good News', link: 'https://good-loop.com/good-news/index.html' },
	{ text: 'Company News', link: 'https://good-loop.com/company-news/index.html' },
	{ text: 'Podcast', link: 'https://good-loop.com/podcast/index.html' }
]

const wwwwDropDownItems = [
	{ text: 'Brands & Agencies', link: 'https://good-loop.com/brands.html' },
	{ text: 'The Public', link: 'https://good-loop.com/the-public.html' },
	{ text: 'Publishers', link: 'https://good-loop.com/publishers.html' },
	{ text: 'Charities', link: 'https://good-loop.com/charities.html' }
]

const AboutUsMenu = () => {
	return aboutDropDownItems.map(item => <DropdownItem href={item.link}>{item.text}</DropdownItem>)
}

const NewsAndViewsMenu = () => {
	return newsDropDownItems.map(item => <DropdownItem href={item.link}>{item.text}</DropdownItem>)
}

const WhoWeWorkWithMenu = () => {
	return wwwwDropDownItems.map(item => <DropdownItem href={item.link}>{item.text}</DropdownItem>)
}

const DemoPageNavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	// id="current-nav-link" to show selected nav link
	return (
		<Navbar sticky="top" expand="lg" color="faded" light>
			<NavbarBrand href="https://www.good-loop.com/">
				<img class="logo noaos normal-logo" alt="logo" src="/img/good-loop-logo-text.svg" width="100%" height="100%" />
			</NavbarBrand>
			<NavbarToggler onClick={toggle}>
				<img src="/img/Icon_Hamburger.png" className="navbar-toggler-icon"/>
			</NavbarToggler>
			<Collapse isOpen={isOpen} navbar className="gl-bootstrap-navbar" id="navItemsDiv">
				<Nav navbar className="navbar-nav">
					<NavItem>
						<NavLink href="https://www.good-loop.com/what-we-do.html">What We Do</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="https://www.good-loop.com/products.html">Products</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="https://www.good-loop.com/case-study/index.html">Case Studies</NavLink>
					</NavItem>
					<UncontrolledDropdown nav inNavbar> 
						<DropdownToggle nav caret>About</DropdownToggle>
						<DropdownMenu><AboutUsMenu /></DropdownMenu>
					</UncontrolledDropdown>
					<UncontrolledDropdown nav inNavbar> 
						<DropdownToggle nav caret>News and Views</DropdownToggle>
						<DropdownMenu><NewsAndViewsMenu /></DropdownMenu>
					</UncontrolledDropdown>
					<UncontrolledDropdown nav inNavbar> 
						<DropdownToggle nav caret>Who We Work With</DropdownToggle>
						<DropdownMenu><WhoWeWorkWithMenu /></DropdownMenu>
					</UncontrolledDropdown>
					<NavItem>
						<NavLink className="btn btn-primary" href="https://www.good-loop.com/contact.html">Contact</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}

export default DemoPageNavBar;

