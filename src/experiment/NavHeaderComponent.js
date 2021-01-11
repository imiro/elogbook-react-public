import React, { useState } from 'react'
import { Row, Col, Navbar, NavbarBrand, Nav, 
		 NavbarToggler, Collapse, NavItem } from 'reactstrap'
import { useAuth } from '../providers/auth'
import { Menu } from 'react-feather'

export function NavHeaderComponent(props) {

	const [isOpen, setIsOpen] = useState(false)
	const { user } = props 
	const { updateCredentials } = useAuth()

	const toggle = () => setIsOpen(!isOpen)

	const logOut = () => {
	   updateCredentials(null)
	}
	
	return (
	<Row>
			<Col md="12">
			<Navbar color="default" role="navigation" expand="md">
					<NavbarBrand>E-Logbook FKUI</NavbarBrand>
					<NavbarToggler onClick={toggle} > <Menu /> </NavbarToggler>
					<Collapse isOpen={isOpen} navbar>
							<Nav navbar className="navbar-right">
									<NavItem>{'Logged in as '}{user.name} </NavItem>
									<NavItem>
									<a href="" onClick={logOut}> Logout </a>
									</NavItem>
							</Nav>
					</Collapse>

			</Navbar>
			</Col>
	</Row>
	)
}
