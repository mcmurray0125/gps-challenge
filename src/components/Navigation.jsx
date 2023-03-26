import React, { useState } from "react"
import { Container, Nav, Navbar, NavDropdown, Badge } from 'react-bootstrap';
import logo from "../assets/logo-large.png"
import { useCart } from '../contexts/CartContext';


export default function Navigation() {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((accumulator, product) => accumulator + product.quantity, 0);

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
            <Nav.Link href="/cart" className="position-relative" aria-label="cart">
              {totalQuantity > 0 && <Badge bg="secondary" className="cart-badge">{totalQuantity}</Badge>}
              <i className="fa-solid fa-cart-shopping"></i>Cart
              </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}