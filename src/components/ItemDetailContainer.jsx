import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export default function ItemDetailContainer() {
  const { iditem } = useParams()
  const [prodDetalle, setProdDetalle] = useState([])

  useEffect(() => {
    const db = getFirestore()

    const queryDoc = doc(db, 'productos', iditem)

    getDoc(queryDoc).then((res) =>
      setProdDetalle({ id: res.id, ...res.data() }),
    )
  }, [iditem])

  return (
    <div className="Cards" key={prodDetalle.id}>
      <ItemDetail item={prodDetalle} />
    </div>
  )
}
