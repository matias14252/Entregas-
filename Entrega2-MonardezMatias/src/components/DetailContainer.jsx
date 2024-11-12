import { useParams } from 'react-router-dom';
import { getProduct } from '../asyncMock';
import { useState, useEffect } from 'react';

export default function DetailContainer() {
  const { prodId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(getProduct(prodId));
  }, []);

  return (
    <>
      <h1>Vista de Detalle de producto {prodId}</h1>
      <p>ID: {product.id}</p>
      <h3>Nombre: {product.title}</h3>
      <img src={product.image} alt="" />
      <p>Descripcion: {product.description}</p>
      <p>Categoria: {product.category}</p>
      <p>Precio ${product.price}</p>
    </>
  );
}
