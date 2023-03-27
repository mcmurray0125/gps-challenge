import { useState, useEffect, useRef } from 'react'
import { Container, Table, Button, ListGroup, Form } from "react-bootstrap"
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart, addProduct, removeProduct, clearCart, removeItem } = useCart();
  const [coupon, setCoupon] = useState(null);
  const [validCoupon, setValidCoupon] = useState(false)
  const [message, setMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const totalQuantity = cart.reduce((accumulator, product) => accumulator + product.quantity, 0);
  const subtotal = cart.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);
  const grandTotal = subtotal + coupon
  const couponRef = useRef()

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

  function checkCoupon(event) {
    event.preventDefault();
    couponRef.current.value.toUpperCase() === 'MM' 
      ? (setCoupon(-5), setValidCoupon(true))
      : (setMessage('Code not valid.'), setCoupon(0));
  }
  
  
  return (
    <div className='cart-wrapper'>
    <Container className='rounded mt-4 py-3 cart-container'>
      {/* Empty Cart */}
      {cart.length === 0 ?
      <section className='empty-cart-wrapper py-5'>
        <h1 className='m-0'>Your cart is empty</h1>
        <p className='m-0 text-center'>When you've added items to your cart, they will appear here.</p>
        <a href='/'>SHOP OUR PRODUCTS</a>
      </section>
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
                  <td className='py-4 cart-item-price'>{windowWidth < 767 && `Price: `}${item.price}</td>
                  <td className='cart-item-toggler py-4'>
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
              <div>${subtotal.toFixed(2)}</div>
            </ListGroup.Item>
            <ListGroup.Item className='cart-total-item'>
              <div className='cart-total-label'>Shipping:</div>
              <div>FREE</div>
            </ListGroup.Item>
            <ListGroup.Item className='cart-total-item coupon-container'>
              {!validCoupon ?
              <>
                <div className='coupon-wrapper'>
                  <div className='cart-total-label'>Coupon Code:</div>
                  <Form className='coupon-form'>
                    <Form.Control placeholder="Coupon Code" type='text' aria-label='coupon-input' ref={couponRef} style={{width: "140px"}}/>
                    <Button onClick={checkCoupon} type='submit' aria-label='submit coupon'>Submit</Button>
                  </Form>
                </div>
                {coupon === 0 && <p className='m-0 mt-2 align-self-end text-danger'>Coupon not valid.</p>}
              </>
              : 
              <div className='coupon-wrapper text-success'>
                <div className='cart-total-label'>MM Applied &#x2713;</div>
                <div>-$5.00</div>
              </div>
            }              
            </ListGroup.Item>
            <ListGroup.Item className='cart-total-item'>
              <div className='cart-total-label'>Grand Total:</div>
              <div>${grandTotal.toFixed(2)}</div>
            </ListGroup.Item>
          </ListGroup>
          <Button className='w-100'>CHECKOUT</Button>
        </section>
      </>
      }
    </Container>
    </div>
  )
  }
