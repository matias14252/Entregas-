import React from 'react'
import { useCartContext } from '../context/CartContext'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
export default function ItemCart({ product }) {
  const { removeProduct } = useCartContext()
  const subTotal = () => product.quantity * product.price

  return (
    <div className="itemCart">
      <Card
        style={{
          width: '18rem',
          textAlign: 'center',
          borderWidth: 3,
          margin: 10,
        }}
      >
        <Card.Img variant="top" src={product.pictureUrl} />
        <Card.Body>
          <Card.Title>
            <h4>{product.title}</h4>
          </Card.Title>
          <Card.Text>
            <h4> precio: $ {product.price}</h4>
            <p>cantidad : {product.quantity}</p>
            <p>Id de producto: {product.id}</p>
            <h3> subtotal: $ {product.quantity * product.price} </h3>
          </Card.Text>

          <Button variant="danger" onClick={() => removeProduct(product.id)}>
            remover producto
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}
