import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './ProductSlider.css';

function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/getProductsshop')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/shop?productId=${productId}`);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <div className="slider-container">
      <h2>Featured Products</h2>
      <div className="slider">
        <button className="slider-button left" onClick={goToPrevious}>
          &#8249;
        </button>
        <div className="slider-track" style={{ transform: `translateX(-${currentIndex * 270}px)` }}>
          {products.map((product) => (
            <div
              key={product.id}
              className="slider-card"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={`${axios.defaults.baseURL}${product.image}`}
                alt={product.name}
                className="slider-img"
              />
              <div className="slider-content">
                <h3>{product.name}</h3>
                <p>Price: ₹{product.mrp}</p>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-button right" onClick={goToNext}>
          &#8250;
        </button>
      </div>
    </div>
  );
}

export default ProductSlider;
