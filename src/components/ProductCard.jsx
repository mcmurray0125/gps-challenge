import React from 'react'
import { Card, Button } from "react-bootstrap"
import ProductModal from './ProductModal'
import { useCart } from '../contexts/CartContext';

export default function ProductCard({ product }) {
    const [modalShow, setModalShow] = React.useState(false);
    const { cart, addProduct, removeProduct } = useCart();

    const productIndex = cart.findIndex(item => item.id === product.id);
    const productInCart = productIndex !== -1;
    
    return (
        <>
        <Card className="product-card-wrapper p-2 border-0 h-100">
            <Card.Body className='product-card-body p-0'>
                <Card.Img src={product.image} className="product-card-image shadow mb-3" alt='product image'/>
                <div className='product-text'>
                    <Card.Title className='m-0'>{product.name}</Card.Title>
                    <Card.Text className='my-0'>${product.price.toFixed(2)}</Card.Text>
                    <Card.Text className='py-2'>{product.description}</Card.Text>
                </div>
            </Card.Body>
            <Card.Footer className='bg-transparent p-0 pt-2'>
                <div className='product-buttons d-flex flex-wrap justify-content-between gap-3 py-2'>
                    {!productInCart ?
                    <Button className='add-to-cart-button p-1' onClick={() => addProduct(product)} variant='outline-success'>
                        Add to Cart
                    </Button> :
                    <div className="quantity-toggle d-flex align-items-center justify-content-center gap-2">
                        <Button variant='success' className='d-flex align-items-center justify-content-center minus-btn' onClick={() => removeProduct(product)}>
                            <span>-</span>
                        </Button>
                        <p className='m-0 fs-5'>{cart[productIndex].quantity}</p>
                        <Button variant='success' className='d-flex align-items-center justify-content-center plus-btn' onClick={() => addProduct(product)}>
                            <span>+</span>
                        </Button>
                    </div>
                    }
                    <Button variant='outline-success' className='p-1' onClick={() => setModalShow(true)} aria-label={`display info for ${product.name}`}>
                        Details
                    </Button>
                </div>
            </Card.Footer>
        </Card>
        <ProductModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            product={product}
        />
        </>
      )
}
