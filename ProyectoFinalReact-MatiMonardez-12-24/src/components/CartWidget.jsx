import React from 'react'
import { Cart } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'

export default function CartWidget() {
  const { totalProducts } = useCartContext()

  return (
    <div>
      <Link to="/Cart">
        <Button variant="secondary">
          <Cart color="white" size={45} />{' '}
          <span> {totalProducts() || ''} </span>
        </Button>
      </Link>
    </div>
  )
}
