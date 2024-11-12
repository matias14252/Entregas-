import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = ({ cartItems, removeFromCart, incrementQuantity, decrementQuantity }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav
        style={{
          backgroundColor: 'red',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/products">Products</Link>
        </button>
        <button>
          <Link to="/contact">Contact</Link>
        </button>


        {/* Botón del Carrito */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <button onClick={toggleCart} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
            {/* Ícono de carrito con contador */}
            <img src='https://w7.pngwing.com/pngs/218/165/png-transparent-computer-icons-shopping-cart-software-others-miscellaneous-logo-shop-icon.png' alt="Carrito" style={{ width: '80px', height: '60px', marginRight: '10px' }} />
            <span style={{ color: 'white', fontWeight: 'bold' }}></span>
            {cartItems.length}
          </button>

          {/* Menú desplegable del carrito */}
          {isCartOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: 'white',
                border: '1px solid grey',
                borderRadius: '5px',
                width: '300px',
                padding: '10px',
                marginTop: '10px',
                zIndex: 1,
              }}
            >
              <h4>Carrito</h4>
              {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '5px 0',
                    }}
                  >
                    <img src={item.image} alt={item.title} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                    <span>{item.title}</span>
                    <span>${item.price}</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button onClick={() => decrementQuantity(item.id)}>-</button>
                      <span style={{ margin: '0 5px' }}>{item.quantity}</span>
                      <button onClick={() => incrementQuantity(item.id)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', fontWeight: 'bold' }}>
                      X
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
