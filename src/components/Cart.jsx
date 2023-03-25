import { useState, useEffect } from 'react'
import { Container, Table, Button, ListGroup, Form } from "react-bootstrap"
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart, addProduct, removeProduct, clearCart, removeItem } = useCart();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const totalQuantity = cart.reduce((accumulator, product) => accumulator + product.quantity, 0);
  const subtotal = cart.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0).toFixed(2);

  //Get Window Width for small screen cart.
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log (windowWidth)
  }, [windowWidth])
  
  return (
    <Container className='rounded mt-4 py-3 cart-container border border-light bg-light'>
      {cart.length === 0 ? 
      <div>no items</div> 
      :
      <>
        <header className='cart-header text-center'>  
          <h1 style={{fontWeight: "600"}}>Your Cart {`(${totalQuantity} items)`}</h1>
          <button className='clear-cart' onClick={clearCart}>Clear Cart</button>
        </header>
        {/* Cart Items Table */}
        <Table className='cart-table mb-0'>
          <thead>
            <tr>
              <th className='item-title-col'>Item</th>
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
                  <td className='cart-item-description py-4 w-50'>
                    <div className='description-main d-flex gap-4'>
                      <img src={item.image} className="cart-item-image"/>
                      <div className='cart-item-text'>
                        <h5 className='m-0'>{item.name}</h5>
                        <p className='m-0'>{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className='py-4'>{windowWidth < 767 && `Price: `}${item.price}</td>
                  <td className='py-4'>
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
                  <td className='cart-item-total py-4'>{windowWidth < 767 && `Total: `}${(item.price * item.quantity).toFixed(2)}</td>
                  <td className='cart-item-remove py-4'>
                    <button className='remove-item-button' onClick={() => removeItem(item)}>Remove</button>
                  </td>
                </tr>
                );
              })
            }
          </tbody>
        </Table>
        {/* Total Cart Price Breakdown */}
        <section className='cart-total'>
          <ListGroup variant="flush">
            <ListGroup.Item className='cart-total-item'>
              <div className='cart-total-label'>Subtotal:</div>
              <div>${subtotal}</div>
            </ListGroup.Item>
            <ListGroup.Item className='cart-total-item'>
              <div className='cart-total-label'>Shipping:</div>
              <div>FREE</div>
            </ListGroup.Item>
            <ListGroup.Item className='cart-total-item'>              
              <div className='cart-total-label'>Coupon Code:</div>
              <Form.Control placeholder="Coupon Code" style={{width: "140px"}}/>
            </ListGroup.Item>
            <ListGroup.Item className='cart-total-item'>
              <div className='cart-total-label'>Grand Total:</div>
              <div>$$$</div>
            </ListGroup.Item>
          </ListGroup>
          <Button className='w-100'>CHECKOUT</Button>
        </section>
      </>
      }
    </Container>
  )
  }
