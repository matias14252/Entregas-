import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "../asyncMock";
import ProductsList from "./ProductsList";
import "./ProductsContainer.css";

export default function ProductsContainer({ addToCart }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Cargar los productos al inicio
  useEffect(() => {
    getProducts.then((data) => {
      setProducts(data);
      setFilteredProducts(category ? data.filter(product => product.category === category) : data);
    });
  }, [category]);
  return (
    <div className="container productscontainer">
      <h1 className="titulo">Vista de Productos</h1>

      <div className="category-filter">
        <Link to="/products">
          <button>Todos</button>
        </Link>
        <Link to="/category/deporte">
          <button>Deporte</button>
        </Link>
        <Link to="/category/urbano">
          <button>Urbano</button>
        </Link>
      </div>

      <ProductsList products={filteredProducts} addToCart={addToCart} />
    </div>
  );
}
