import React from 'react'
import { Container } from "react-bootstrap"
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart, addProduct, removeProduct } = useCart();

  
  return (
    <>
    <Container className='pt-5 cart-container'>
      <header>
        <h1>Your Cart</h1>
      </header>
      <section>
        items here
      </section>
    </Container>
    </>
  )
}
