import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductSlider.css';

function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // React Router hook

  useEffect(() => {
    axios.get('http://192.168.1.51:3000/getProductsshop')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const handleProductClick = (productId) => {
    navigate(`/shop?productId=${productId}`); // Navigate with query param
  };

  if (products.length === 0) return <p>Loading products...</p>;

  return (
    <div className="slider-container">
      <h2>Featured Products</h2>
      <div className="slider">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`slider-card ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleProductClick(product.id)} // Click handler
          >
            <img
              src={`http://192.168.1.51:3000${product.image}`}
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
    </div>
  );
}

export default ProductSlider;
