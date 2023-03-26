import { React, useEffect, useRef, useState} from 'react'
import { Container, Row, Col, Form, Button, Alert} from "react-bootstrap"
import data from "../products.json"
import ProductCard from './ProductCard'

export default function Home() {
    const [filter, setFilter] = useState(null)
    const [showAd, setShowAd] = useState(true);
    const [message, setMessage] = useState('');
    const minRef= useRef();
    const maxRef= useRef();

function updateFilter(e) {
    e.preventDefault()
    const min = minRef.current.value
    const max = maxRef.current.value

    if (!min || !max) {
        setFilter(null)
    } else if (Number(min) >= Number(max)) {
        setMessage('Min price must be greater than max.')
        setFilter(null);
    } else {
        setMessage('');
        setFilter([min, max]);
    }
};
      
  return (
    <>
    <header className='home-header py-4'>
            <div className='home-header-image'>
            </div>
            <h5 className='header-page-title'>Our Products</h5>
            <h1 className='header-brand'>QuickFood</h1>
            {showAd && <Alert variant="success" onClose={() => setShowAd(false)} dismissible className='mt-4'>
                Use code <strong>"MM"</strong> for $5 off your order!
            </Alert>}
    </header>
    <section id='products-main'>
        <Container className='py-3'>
            <Form className='d-flex justify-content-end gap-2'>
                <Form.Group className='d-flex justify-content-end gap-2 align-items-center' controlId="formPriceRange">
                    <Form.Label className='m-0' style={{whiteSpace: "nowrap"}}>Filter Price</Form.Label>
                    <div className='form-min'>
                        <Form.Control type="number" placeholder="Min." aria-label='Minimum price' ref={minRef}/>
                    </div>
                    <div className='form-max'>
                        <Form.Control type="number" placeholder="Max." aria-label='Maximum price' ref={maxRef}/>
                    </div>
                </Form.Group>
                <Button type="submit" onClick={updateFilter}>Update</Button>
            </Form>
            {message && <p className='m-0 text-danger w-100 text-end'>{message}</p>}
            <Row className='products-grid py-3'>
            {data.filter((product) => {
                if (!filter) {
                return true;
                }
                const [min, max] = filter;
                return product.price >= min && product.price <= max;
            })
            .map((product, index) => {
                return (
                <Col xs={6} md={4} lg={3} key={index} className='mb-4'>
                    <ProductCard product={product}/>
                </Col>
                );
            })}
            </Row>
        </Container>
    </section>
    </>
  )
}
