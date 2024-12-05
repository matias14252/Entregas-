import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export default function item({
  id,
  title,
  description,
  price,
  pictureUrl,
  categoria,
}) {
  return (
    <>
      {' '}
      <Card
        className="item"
        style={{
          width: '15rem',

          margin: 10,
        }}
      >
        <Card.Img variant="top" src={pictureUrl} />
        <Card.Body>
          <Card.Title>
            <h3>{title}</h3>
          </Card.Title>
          <Card.Text>
            <h4> precio: ${price}</h4>

            <p>Muebles de {categoria}</p>
          </Card.Text>

          <Link className="link" to={'/item/' + id}>
            {' '}
            <Button variant="success">Ir a detalles del producto </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  )
}
