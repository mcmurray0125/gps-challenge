import { React, useEffect, useRef, useState} from 'react'
import { Container, Row, Col, Form, Button, Alert, Pagination} from "react-bootstrap"
import data from "../products.json"
import ProductCard from './ProductCard'

export default function Home() {
    const [priceFilter, setPriceFilter] = useState(null)
    const [categoryFilter, setCategoryFilter] = useState(null)
    const [showAd, setShowAd] = useState(true);
    const [message, setMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const startIndex = (currentPage - 1) * 16;
    const endIndex = startIndex + 16;
    const minRef = useRef();
    const maxRef = useRef();
    const categoryRef = useRef();

    function handlePriceFilterChange(e) {
        e.preventDefault()
        const min = minRef.current.value;
        const max = maxRef.current.value;

        if (!min || !max) {
            setPriceFilter(null);
            setMessage('')
            if (!min && max || min && !max) {
                setMessage('Please enter both values or no values.');
                setPriceFilter(null);
            }
        } else if (Number(min) >= Number(max)) {
            setMessage('Min price must be less than max.');
            setPriceFilter(null);
        } else {
            setMessage('');
            setPriceFilter([min, max]);
        }
    };

    function updateCategory() {
        if (categoryRef.current.value === 'all') {
            setCategoryFilter(null)
        } else {
            setCategoryFilter(categoryRef.current.value)
        }
    }

    function filteredData() {
    const [min, max] = priceFilter || [];
    const filteredData = data.filter((product) => {
    if (!priceFilter) {
        if (!categoryFilter) {
            return true;
        } else {
            return product.category === categoryFilter;
        }
    } else {
        if (!categoryFilter) {
            return product.price >= min && product.price <= max;
        } else {
            return product.price >= min && product.price <= max && product.category === categoryFilter;
        }
    }
    });
    return filteredData;
    }

    
    useEffect(() => {
        const totalPages = Math.ceil(filteredData().length / 16);
        setTotalPages(totalPages);
    }, [filteredData]);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [totalPages]);
    
    const scrollToTop = () => {
        setTimeout(() => {
          window.scrollTo(0, 0);
      }, 200);
      };

    //Pagination
    let items = [];
    const paginate = (number) => setCurrentPage(number);

    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={currentPage === number} onClick={() => {paginate(number); scrollToTop()}}>
          {number}
        </Pagination.Item>
      );
    }
      
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
    <section className='filters'>
        <Container className='filters-container py-3'>
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
                <Button type="submit" onClick={handlePriceFilterChange}>Update</Button>
            </Form>
            {message && <p className='m-0 mt-1 text-danger w-100 text-end'>{message}</p>}
            <Form className='category-filter mt-2'>
                <Form.Group className='d-flex justify-content-end gap-2 align-items-center'> 
                    <Form.Label className='m-0' style={{whiteSpace: "nowrap"}}>Category</Form.Label>   
                    <Form.Select className="quiz-filters" ref={categoryRef} onChange={updateCategory}>
                        <option value="all">All</option>
                        <option value="Single Serving">Single Serving</option>
                        <option value="To Share">To Share</option>
                    </Form.Select>
                </Form.Group>
            </Form>
        </Container>
    </section>
    <section id='products-main'>
        <Container className='products-container rounded py-3'>
        {filteredData().length === 0 ? (
            <div className='no-products-wrapper py-5'>
                <h1 className='m-0'>No Items Found</h1>
                <p className='m-0 text-center'>Try updating your price filter to find items within that range.</p>
            </div>
        ) : (
        <>
            <Row className='products-grid'>
                {filteredData().slice(startIndex, endIndex).map((product, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={index} className='mb-4'>
                    <ProductCard product={product} />
                </Col>
                ))}
            </Row>
            <Pagination className='w-100 d-flex justify-content-center'>
                {items}
            </Pagination>
        </>
        )}
        </Container>
    </section>
    </>
  )
}
