import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import ItemDetailContainer from './components/ItemDetailContainer'
import ItemListContainer from './components/ItemListContainer'
import ColorSchemesExample from './components/Navbar'
import CartProvider from './context/CartContext'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ColorSchemesExample />

        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route
            path="/categoria/:idcategoria"
            element={<ItemListContainer />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/item/:iditem" element={<ItemDetailContainer />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
