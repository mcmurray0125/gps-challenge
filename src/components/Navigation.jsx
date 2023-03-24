import React, { useState } from "react"
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-large.png"


export default function Navigation() {
  const navigate = useNavigate()

return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="w-100 top-0 py-3" sticky="top" id="navbar" style={{zIndex: "1000"}}>
      <Container>
        <Navbar.Brand href="/">
            <img
                src={logo}
                height="30"
                className="d-inline-block align-top"
                alt="MyMoovs logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Our Products</Nav.Link>
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/action">Category 1</NavDropdown.Item>
              <NavDropdown.Item href="/comedy">Category 2</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/cart" aria-label="cart"><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}