import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function ItemCount({ stock, initial, onAdd }) {
  const [contador, setContador] = useState(initial)

  return (
    <div className="itemCount">
      <p
        style={{
          backgroundColor: 'brown',
          color: 'white',
          borderRadius: 8,
          textAlign: 'center',
        }}
      >
        {' '}
        Solo quedan {stock - contador} unidades en stock{' '}
      </p>
      <div>
        <Button
          variant="secondary"
          onClick={() => {
            contador < stock ? setContador(contador + 1) : setContador(stock)
          }}
        >
          {' '}
          +{' '}
        </Button>
        <Button variant="outline-dark" style={{ margin: '5px' }}>
          {contador}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            contador >= 2 ? setContador(contador - 1) : setContador(1)
          }}
        >
          {' '}
          -{' '}
        </Button>
      </div>
      <button
        style={{
          backgroundColor: 'brown',
          color: 'white',
          borderRadius: 5,
          margin: 10,
          borderColor: 'brown',
          padding: 5,
        }}
        onClick={() => onAdd(contador)}
      >
        Agregar al carrito
      </button>{' '}
    </div>
  )
}
