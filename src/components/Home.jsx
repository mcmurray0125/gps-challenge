import React from 'react'
import { Container, Row, Col} from "react-bootstrap"
import data from "../products.json"
import ProductCard from './ProductCard'

export default function Home() {
  return (
    <>
    <header className='py-4'>
        <Container>
            <h1>Welcome to Quick Food!</h1>
        </Container>
    </header>
    <Container>
        <section id='products-main'>
        <Row>
        {data.map((product, index) => {
              return (
                <Col xs={6} md={3} key={index} className='mb-4'>
                  <ProductCard {...product}/>
                </Col>
                )
              })}
        </Row>
        </section>
    </Container>
    </>
  )
}
