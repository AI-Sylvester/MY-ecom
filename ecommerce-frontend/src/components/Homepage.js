import React from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import homepic from '../kol.png';
import women from '../wom.jpg';
import kids from '../kids.png';
import ProductSlider from './ProductSlider';

import './home.css';

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="home-page-container">
        <h1>Welcome to RiaShopy</h1>
        <p>Great for fashion or lifestyle brands. Explore our products and great deals!</p>

        <div className="cards-container">
          {/* Card 1 - Mens */}
          <div className="card">
            <img src={homepic} alt="Mens" className="card-img" />
            <div className="card-content">
              <h3>Mens</h3>
              <p>Unleash your style with our premium collection of men's fashion! From trendy outfits to timeless classics, find the perfect look that defines you.</p>
              <Link to="/shop?section=Mens" className="card-btn">Shop Now</Link>
            </div>
          </div>

          {/* Card 2 - Womens */}
          <div className="card">
            <img src={women} alt="Womens" className="card-img" />
            <div className="card-content">
              <h3>Womens</h3>
              <p>Embrace elegance with our curated collection of women's fashion. Discover stylish outfits, statement pieces, and the perfect fit for every occasion.</p>
              <Link to="/shop?section=Womens" className="card-btn">Shop Now</Link>
            </div>
          </div>

          {/* Card 3 - Kids */}
          <div className="card">
            <img src={kids} alt="Kids" className="card-img" />
            <div className="card-content">
              <h3>Kids</h3>
              <p>Make every day fun and fashionable with our adorable kids’ collection. From comfy basics to cute outfits, find the perfect look for your little one!</p>
              <Link to="/shop?section=Boys,Girls" className="card-btn">Shop Now</Link>
            </div>
          </div>
        </div>

        <ProductSlider />
      </div>
    </div>
  );
}

export default HomePage;
