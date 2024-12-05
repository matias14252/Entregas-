import React from 'react'
import Item from './Item'

export default function ItemList({ Catalogo }) {
  return Catalogo.map((items) => {
    return (
      <>
        <div className="Cards" key={items.id}>
          <Item
            id={items.id}
            title={items.title}
            description={items.description}
            price={items.price}
            pictureUrl={items.pictureUrl}
            categoria={items.categoria}
          />
        </div>
      </>
    )
  })
}
