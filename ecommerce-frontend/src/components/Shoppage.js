import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar';
import './ShopPage.css';

function ShopPage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [filters, setFilters] = useState({
    section: [],
    name: '',
    minMRP: 100,
    maxMRP: 5000,
  });
  const [priceRange, setPriceRange] = useState([100, 5000]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedProductId = queryParams.get('productId');
  const sectionFromURL = queryParams.get('section');

  useEffect(() => {
    if (sectionFromURL) {
      const sections = sectionFromURL.split(',');
      setFilters((prev) => ({ ...prev, section: sections }));
    }
  }, [sectionFromURL]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.1.51:3000/getProductsshop', {
          params: { 
            ...filters, 
            minMRP: priceRange[0], 
            maxMRP: priceRange[1],
            section: filters.section.join(','),
          },
        });
        setProducts(response.data);

        const initialQuantities = response.data.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [filters, priceRange]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'section') {
      setFilters((prev) => {
        const updatedSections = checked
          ? [...prev.section, value]
          : prev.section.filter((section) => section !== value);
        return { ...prev, section: updatedSections };
      });
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePriceRangeChange = (minOrMax, value) => {
    if (minOrMax === 'min') {
      setPriceRange([Number(value), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Number(value)]);
    }
  };

  const clearFilters = () => {
    setFilters({
      section: [],
      name: '',
      minMRP: 100,
      maxMRP: 5000,
    });
    setPriceRange([100, 5000]);
  };

  return (
    <div className="shop-page">
      <Navbar />

      <div className="main-content">
        <div className="filter-sidebar">
          <h2>Filters</h2>

          {/* Section Filter */}
          <div className="filter-item">
            <label>Section:</label>
            <div>
              {['Mens', 'Womens', 'Boys', 'Girls'].map((section) => (
                <label key={section} style={{ marginRight: '10px' }}>
                  <input
                    type="checkbox"
                    name="section"
                    value={section}
                    checked={filters.section.includes(section)}
                    onChange={handleFilterChange}
                  />
                  {section}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-item">
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Search by product..."
            />
          </div>

          <div className="filter-item">
            <label>Price Range (₹{priceRange[0]} - ₹{priceRange[1]}):</label>
            <input
              type="range"
              min="100"
              max="5000"
              step="50"
              value={priceRange[0]}
              onChange={(e) => handlePriceRangeChange('min', e.target.value)}
              className="range-slider min-slider"
            />
            <input
              type="range"
              min="100"
              max="5000"
              step="50"
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange('max', e.target.value)}
              className="range-slider max-slider"
            />
            <p>Selected Range: ₹{priceRange[0]} - ₹{priceRange[1]}</p>
          </div>

          <button onClick={clearFilters} className="clear-filters-button">
            Clear Filters
          </button>
        </div>

        <div className="products-container">
          <h1>Welcome to the Styletria</h1>
          <p>Browse and buy your favorite products.</p>

          <div className="cards-container">
            {products.map((product) => (
              <div
                key={product.id}
                className={`card ${selectedProductId === product.id ? 'selected' : ''}`}
              >
                <img src={`http://192.168.1.51:3000${product.image}`} alt={product.name} />
                <div className="card-content">
                  <h3>{product.name}</h3>
                  <p>Section: {product.section}</p>
                  <p>MRP: ₹{product.mrp}</p>
                  <p>Discount: ₹{product.disrate1}</p>

                  <div className="quantity-container">
                    <button
                      onClick={() =>
                        setQuantities((prev) => ({
                          ...prev,
                          [product.id]: Math.max(prev[product.id] - 1, 1),
                        }))
                      }
                      className="quantity-button"
                    >
                      -
                    </button>
                    <span className="quantity-label">{quantities[product.id]}</span>
                    <button
                      onClick={() =>
                        setQuantities((prev) => ({
                          ...prev,
                          [product.id]: prev[product.id] + 1,
                        }))
                      }
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart({ ...product, quantity: quantities[product.id] })}
                    className="add-to-cart-button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
