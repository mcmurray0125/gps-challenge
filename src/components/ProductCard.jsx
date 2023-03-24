import React, { useEffect } from 'react'
import { Card, Button } from "react-bootstrap"
import ProductModal from './ProductModal'

export default function ProductCard({ product }) {
    const [modalShow, setModalShow] = React.useState(false);

    
    return (
        <>
        <Card className="p-2 border-0 shadow">
            <Card.Body className='p-0'>
                <Card.Img src={product.image} className="shadow mb-3" alt='product image' aria-label={`display info for ${product.name}`} />
                <Card.Title className='m-0'>{product.name}</Card.Title>
                <Card.Text className='my-0'>${product.price}</Card.Text>
                <Card.Text className='my-0'>{product.description}</Card.Text>
            </Card.Body>
            <Card.Footer className='bg-transparent p-0 pt-2'>
                <Button variant='success' onClick={() => setModalShow(true)}>
                    Details
                </Button>
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
