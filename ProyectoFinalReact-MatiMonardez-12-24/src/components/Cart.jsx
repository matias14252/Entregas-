import React from 'react'
import { useCartContext } from '../context/CartContext'
import ItemCart from './ItemCart'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Cart() {
  const { cart, totalPrice } = useCartContext()

  if (cart.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          margin: '20px',
          borderRadius: 5,
          backgroundColor: 'white',
        }}
      >
        <h2>El carrito esta vacio</h2>
        <Link to="/">
          <Button style={{ margin: 10 }} variant="success" size="lg">
            Ir a catalogo
          </Button>
        </Link>
      </div>
    )
  }
  return (
    <>
      <div className="cartContainer">
        {' '}
        <div className="carrito">
          {cart.map((product) => (
            <ItemCart key={product.id} product={product} />
          ))}
        </div>
        <div className="irCheckout">
          <h2>Total a pagar: $ {totalPrice()}</h2>
          <Link to="/checkout">
            {' '}
            <Button size="lg" variant="success">
              {' '}
              Ir al checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
