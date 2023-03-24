import { React, useEffect, useRef, useState} from 'react'
import { Container, Row, Col, Form, Button} from "react-bootstrap"
import data from "../products.json"
import ProductCard from './ProductCard'

export default function Home() {
    const [filter, setFilter] = useState(null)
    const minRef= useRef();
    const maxRef= useRef();

function updateFilter(e) {
    e.preventDefault()
    const min = minRef.current.value
    const max = maxRef.current.value

    if (!min && !max) {
        setFilter(null)
    } else {
        setFilter([min, max]);
    }
    };
      
    useEffect(() => {
    console.log(filter)
    }, [filter])

  return (
    <>
    <header className='py-4'>
        <Container>
            <h1>Welcome to QuickFood!</h1>
            <Form className='d-flex justify-content-end gap-2'>
                <Form.Group className='d-flex justify-content-end gap-2 align-items-center' controlId="formPriceRange">
                    <p className='m-0' style={{whiteSpace: "nowrap"}}>Filter Price</p>
                    <div className='form-min'>
                        <Form.Control type="number" placeholder="Min." ref={minRef}/>
                    </div>
                    <div className='form-max'>
                        <Form.Control type="number" placeholder="Max." ref={maxRef}/>
                    </div>
                </Form.Group>
                <Button type="submit" onClick={updateFilter}>Update</Button>
            </Form>
        </Container>
    </header>
    <section id='products-main'>
        <Container>
            <Row>
            {data.filter((product) => {
                if (!filter) {
                return true;
                }
                const [min, max] = filter;
                return product.price >= min && product.price <= max;
            })
            .map((product, index) => {
                return (
                <Col xs={6} md={3} key={index} className='mb-4'>
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
