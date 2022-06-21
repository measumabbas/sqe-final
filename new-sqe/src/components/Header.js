import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import {NavDropdown} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()
  const handleLogOut = ()=>{
    localStorage.removeItem('user');
    navigate('/');
  }
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">Student Registration</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features">Home</Nav.Link>
      <Nav.Link href="#pricing">About</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Services</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Courses</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link onClick={handleLogOut} eventKey={2} href="#memes">
        LogOut
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>


      
    </div>
  )
}

export default Header