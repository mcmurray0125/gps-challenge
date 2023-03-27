import React from "react"
import { Container, Nav, Navbar, Badge } from 'react-bootstrap';
import logo from "../assets/logo-large.png"
import { useCart } from '../contexts/CartContext';


export default function Navigation() {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((accumulator, product) => accumulator + product.quantity, 0);

return (
    <Navbar collapseOnSelect expand="md" bg="transparent" className="py-3" sticky="top" id="navbar" style={{zIndex: "1000"}}>
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
          </Nav>
          <Nav>
            <Nav.Link href="/cart" className="position-relative" aria-label="cart">
              {totalQuantity > 0 && 
                <Badge className="cart-badge bg-success" >{totalQuantity}</Badge>
              }
              <i className="fa-solid fa-cart-shopping"></i>Cart
              </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}