import React from 'react'
import { Container, Table, Button } from "react-bootstrap"
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart, addProduct, removeProduct, clearCart } = useCart();
  const totalQuantity = cart.reduce((accumulator, product) => accumulator + product.quantity, 0);

  
  return (
    <Container className='pt-5 cart-container'>
      {cart.length === 0 ? 
      <div>no items</div> 
      :
      <>
        <header className='cart-header text-center'>  
          <h1 style={{fontWeight: "600"}}>Your Cart {`(${totalQuantity} items)`}</h1>
          <button className='clear-cart' onClick={clearCart}>Clear Cart</button>
        </header>
        <Table >
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
                return (
                <tr key={index} className="cart-item">
                  <td className='cart-item-description py-3'>
                    <div className='description-main d-flex gap-2'>
                      <img src={item.image} style={{width: "60px", height: "60px", objectFit: "cover"}}/>
                      <div className='cart-item-text'>
                        <h5 className='m-0'>{item.name}</h5>
                        <p className='m-0'>{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className='py-3'>${item.price}</td>
                  <td className='py-3'>
                    <div className="quantity-toggle d-flex align-items-center gap-2">
                        <Button variant='success' className='d-flex align-items-center justify-content-center minus-btn' onClick={() => removeProduct(item)}>
                            <span>-</span>
                        </Button>
                        <p className='m-0 fs-5'>{item.quantity}</p>
                        <Button variant='success' className='d-flex align-items-center justify-content-center plus-btn' onClick={() => addProduct(item)}>
                            <span>+</span>
                        </Button>
                    </div>  
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>Remove</td>
                </tr>
                );
              })
            }
          </tbody>
        </Table>
          <div>Your Total</div>
      </>
      }
    </Container>
  )
  }
