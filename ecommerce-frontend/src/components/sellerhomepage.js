import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerHomePage.css';

function SellerHomePage() {
  const navigate = useNavigate();

  // Navigate to a working route
  const navigateTo = (path) => {
    navigate(path);
  };

  // Show under construction alert
  const showUnderConstruction = () => {
    alert('🚧 This section is under construction. Please check back later.');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sellerlogin');
  };

  return (
    <div className="seller-homepage">
      <h1 className="dashboard-title">Seller Dashboard</h1>

      <div className="dashboard-buttons">
        {/* Buttons */}
        <button className="dashboard-button" onClick={showUnderConstruction}>
          Dashboard
        </button>

        <button className="dashboard-button" onClick={() => navigateTo('/addproduct')}>
          Add Product
        </button>

        <button className="dashboard-button" onClick={showUnderConstruction}>
          Profile
        </button>

        <button className="dashboard-button" onClick={showUnderConstruction}>
          Sales
        </button>

        {/* Info Message */}
        <p className="logout-message">🔒 Logout to view Shop Home Page</p>

        <button className="dashboard-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default SellerHomePage;
