import { h, Fragment } from 'preact';
import React, { useState } from 'react';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const dropDownItems = [
    { text: 'Our Mission', link: 'https://good-loop.com/our-mission' },
    { text: 'Our Story', link: 'https://good-loop.com/our-story' },
    { text: 'Press', link: 'https://good-loop.com/press' },
    { text: 'Blog', link: 'https://medium.com/@GoodLoopHQ' }
]

const DropDownMenu = () => {
    return dropDownItems.map(item => <DropdownItem href={item.link}>{item.text}</DropdownItem>)
}

const DemoPageNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar expand="md" style={{backgroundColor: '#fff'}}> {/* css inStyle */}
            <NavbarBrand className="gl-icon-centred">
                <div className="shadowcaster"></div>
                <img className="navbar-gl-icon" src="/img/favicon-60x60.png" alt=""/>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar className="gl-bootstrap-navbar" id="navbar">
                <Nav navbar style={{marginTop: '0', alignItems: 'center'}}> {/* css inStyle */}
                    <NavItem>
                        <NavLink href="/" className="w-nav-link nav-link-4">Home</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar> 
                        <DropdownToggle nav caret className="w-nav-link nav-link-4">
                            About Us
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropDownMenu />
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                        <NavLink className="w-nav-link nav-link-4">Contact Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="w-nav-link nav-link-4">Players</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="w-nav-link nav-link-4">My Impact</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="w-nav-link nav-link-4">Careers</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default DemoPageNavBar;
