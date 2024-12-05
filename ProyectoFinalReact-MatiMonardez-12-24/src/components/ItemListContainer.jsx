import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useParams } from 'react-router-dom'
import ItemList from './ItemList'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

export default function ItemListContainer({}) {
  const { idcategoria } = useParams()
  const [Catalogo, setCatalogo] = useState([])

  useEffect(() => {
    const db = getFirestore()
    let productos
    if (idcategoria) {
      productos = query(
        collection(db, 'productos'),
        where('categoria', '==', idcategoria),
      )
    } else {
      productos = collection(db, 'productos')
    }

    getDocs(productos).then((res) => {
      const arrayNorm = res.docs.map((element) => {
        return {
          id: element.id,
          title: element.data().title,
          description: element.data().description,
          price: element.data().price,
          pictureUrl: element.data().pictureUrl,
          categoria: element.data().categoria,
          stock: element.data().stock,
        }
      })

      setCatalogo(arrayNorm)
    })
  }, [idcategoria])

  return (
    <>
      {' '}
      <div className="itemlistcont">
        {!Catalogo.length && <Spinner animation="grow" />}

        <ItemList Catalogo={Catalogo} />
      </div>
    </>
  )
}
