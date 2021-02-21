import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SiteNavbar = () => {
	return(
		<header>
			<Navbar bg="light" fixed="top">
				<Navbar.Brand>
					<img
						alt="Leonardo DRS Starburst"
						src="/resources/images/logo-star.png"
						height="30"
					/>{' '}
					Internal Operating Plan
				</Navbar.Brand>
				<Nav>
					<Nav.Link as={Link} to="/">Home</Nav.Link>
					<NavDropdown title="IOP Data">
						<NavDropdown.Item as={Link} to="/MonthlyIOP">Monthly View</NavDropdown.Item>
						<NavDropdown.Item>Historical Data</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item>Data Entry</NavDropdown.Item>
					</NavDropdown>
					<NavDropdown title="Resources">
						<NavDropdown.Item as={Link} to="/PartViewer">Part Viewer</NavDropdown.Item>
						<NavDropdown.Item  as={Link} to="/NewPartReg">New Part Registration</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link>Reporting</Nav.Link>
					<NavDropdown title="Administration">
						<NavDropdown.Item>Users</NavDropdown.Item>
						<NavDropdown.Item>Roles</NavDropdown.Item>
						<NavDropdown.Item>Announcements</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar>
		</header>
	);
}

export default SiteNavbar;