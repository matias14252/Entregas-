import React from 'react'
import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import ItemCount from './ItemCount'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'

export default function ItemDetail({ item }) {
  const [irCarrito, setIrCarrito] = useState(false)

  const { addItem } = useCartContext()

  const onAdd = (quantity) => {
    setIrCarrito(true)
    addItem(item, quantity)
  }

  return (
    <div>
      <Card
        style={{
          margin: 10,
          width: 310,
          textAlign: 'center',
        }}
      >
        <Card.Img variant="top" src={item.pictureUrl} />
        <Card.Body>
          <Card.Title>
            <h3>{item.title}</h3>
          </Card.Title>
          <Card.Text>
            <p>{item.description}</p>
            <h4> precio: $ {item.price}</h4>
            <p>Id de producto: {item.id}</p>
            <p>Muebles de {item.categoria}</p>
          </Card.Text>
          {irCarrito ? (
            <Link className="link" to={'/Cart'}>
              {' '}
              <Button variant="danger">Ir al carrito </Button>{' '}
            </Link>
          ) : (
            <ItemCount stock={10} initial={1} onAdd={onAdd} />
          )}{' '}
          <Link className="link" to={'/categoria/' + item.categoria}>
            <Button variant="success"> ir atras </Button>{' '}
          </Link>
        </Card.Body>
      </Card>
    </div>
  )
}
