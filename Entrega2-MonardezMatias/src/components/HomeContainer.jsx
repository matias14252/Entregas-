
import { Link } from 'react-router-dom';
import React from 'react';
import './HomeContainer.css';


const HomeContainer = () => {
  return (
    <div className="container">
      <section className="hero text-center my-5">
        <h1 className="display-4">Bienvenidos a Nuestra Tienda Online</h1>
        <p className="lead">Encuentra los mejores productos!.</p>
        <Link to="/products">
          <button className="cta-button">Explorar Productos</button>
        </Link>
      </section>
    </div>
  );
};

export default HomeContainer;
