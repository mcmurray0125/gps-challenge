import React, { useEffect } from 'react'
import { Card, Button } from "react-bootstrap"

export default function ProductCard(props) {
    return (
        <Card className="p-2 border-0 shadow">
            <Card.Body className='p-0'>
                <Card.Img src={props.image} className="shadow mb-3" alt='product image' aria-label={`display info for ${props.name}`} />
                <Card.Title className='m-0'>{props.name}</Card.Title>
                <div className='d-flex align-items-center justify-content-between'>
                <Card.Text className='my-0'>${props.price}</Card.Text>
                </div>
            </Card.Body>
            <Card.Footer className='bg-transparent p-0 pt-2'>
                <Button variant='success'>
                    Details
                </Button>
            </Card.Footer>
        </Card>
      )
}
