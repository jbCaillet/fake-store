import React, { useContext,useState } from 'react'
import { Link } from 'react-router'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { UserContext } from '../../../context/UserContext'

const NavBar = () => {
 
  const { handleLogOut, isLoggedIn, userLoged } = useContext(UserContext);
  return (
    <div>
      <Navbar expand="lg" className="navbar navbar-expand-lg navbar-dark fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/">Fake Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
              <Nav.Link as={Link} to="/cualquier-url">404</Nav.Link>
              {isLoggedIn &&  <Nav.Link as={Link} to="/user">Mi Cuenta</Nav.Link>}
              {userLoged.role == "admin" && <Nav.Link as={Link} to="/agregar-producto">Agregar producto</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
          {!isLoggedIn && <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>}

          
          {isLoggedIn && (
            <Nav.Link as="span" onClick={handleLogOut} style={{ cursor: 'pointer' }}>
              Cerrar sesión
            </Nav.Link>
          )}
        </Container>
      </Navbar>
    </div>




  );
}

export default NavBar;