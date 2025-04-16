import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage';
import ShopPage from './components/Shoppage';
import LoginPage from './components/Loginpage';
import CartPage from './components/cartpage';
import SellerLoginPage from './components/seller';  // Corrected the import here
import SellerHomePage from './components/sellerhomepage';
import AddProductPage from './components/addproduct';

function App() {
  const [cart, setCart] = useState([]);

  // Function to handle adding items to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        // If the product already exists in the cart, update quantity
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add the new product to the cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/shop"
            element={<ShopPage addToCart={addToCart} />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/sellerhome"
            element={<SellerHomePage />} 
          />
           <Route
            path="/sellerlogin"
            element={<SellerLoginPage />} 
          />
             <Route
            path="/addproduct"
            element={<AddProductPage />} 
          />
          <Route
            path="/cart"
            element={<CartPage cart={cart} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
