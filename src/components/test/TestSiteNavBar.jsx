/* @jsx h */
import { h, Fragment } from 'preact';
import { Container, Navbar, NavbarToggler, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const players = {
	'landscape': 'Landscape',
	'portrait': 'Portrait',
	// 'square': 'Square'
};

const social = {
	'video': 'Our video',
	'full': 'No Video',
	'half': 'Host Video'
};

const banners = {
	'mpu': 'MPU',
	'mpu2': 'Double MPU',
	'leaderboard': 'Leaderboard',
	'billboard': 'Billboard',
	'footer': 'Sticky footer',
	'vbnr': 'Vertical banner'
};

const pageGroups = {
	player: { title: 'Player', links: players },
	social: { title: 'Social', links: social },
	banner: { title: 'Banners', links: banners}
};

const stringParams = params => {
	if (!params) return '';
	const asEntries = Object.entries(params);
	if (asEntries.length === 0) return '';

	return '?' + asEntries.map(([key, val]) => (
		`${key}=${val}`
	)).join('&');
}


/**
 * Iterates through pageGroups and creates a drop-down set of links for each top-level entry.
 */
const LinkBlock = ({vertId, ...params}) => (
	Object.entries(pageGroups).map(([path1, {links, title}]) => (
		<UncontrolledDropdown nav inNavBar>
			<DropdownToggle nav caret>{title}</DropdownToggle>
			<DropdownMenu>
				{Object.entries(links).map(([path2, text]) => {
					// append auxiliary "VPAID" links onto the player entries
					const pathEnding = `${path2}/${vertId}${stringParams(params)}`;
					let vpaid = '';
					if (path1 === 'player') vpaid = <> (<a href={`/vpaid/${pathEnding}`}>VPAID</a>)</>;
					return (
						<DropdownItem>
							<a href={`/${path1}/${pathEnding}`}>{title}</a>{vpaid}
						</DropdownItem>
					);
				})}
			</DropdownMenu>
		</UncontrolledDropdown>
	))
);


const TestSiteNavBar = ({ vertId = '', matches, path, url, ...params }) => (
	<Navbar color="dark" dark expand>
		<Container>
			<Nav navbar>
				<NavbarBrand><img src="/img/gl-test-pages-logo-light.svg" /></NavbarBrand>
					<LinkBlock vertId={vertId} {...params} />
				<NavbarToggler />
			</Nav>
		</Container>
	</Navbar>
);


export default TestSiteNavBar;
