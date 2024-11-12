import { Link } from 'react-router-dom';
import './ProductCard.css';
export default function ProductCard({ product, addToCart }) {
  return (
    <>
      <article style={{ border: '1px solid grey', padding: 10 }}>
        <h3>
          {product.title} - {product.id}
        </h3>
        <img src={product.image} alt={product.title} className="product-image" />
        <p>${product.price}</p>
        <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
        <button>
          <Link to={`/product/${product.id}`}>Más detalles</Link>
        </button>
      </article>
    </>
  );
}
