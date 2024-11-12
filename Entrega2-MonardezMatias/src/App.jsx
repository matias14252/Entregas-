import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/NavBar';
import HomeContainer from './components/HomeContainer';
import ProductsContainer from './components/ProductsContainer';
import ContactContainer from './components/ContactContainer';
import DetailContainer from './components/DetailContainer';

function App() {
  // Estado para almacenar los productos en el carrito
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      // Aquí verificamos si el producto ya está en el carrito
      const existingProduct = prevCartItems.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Función para incrementar la cantidad de un producto
  const incrementQuantity = (id) => {
    setCartItems(cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Función para decrementar la cantidad de un producto
  const decrementQuantity = (id) => {
    setCartItems(cartItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };
  return (
    <>
      <BrowserRouter>
        <NavBar
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity} />
        <Routes>
          <Route exact path="/" element={<HomeContainer />} />
          <Route exact path="/products" element={<ProductsContainer addToCart={addToCart} />} />
          <Route exact path="/product/:prodId" element={<DetailContainer />} />
          <Route path="/category/:category" element={<ProductsContainer />} /> {/* Ruta para categorías */}
          <Route exact path="/contact" element={<ContactContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
