import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function SellerHomePage() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle button clicks and navigate to different pages
  const navigateTo = (path) => {
    navigate(path); // Navigate to the provided path
  };

  // Handle logout action
  const handleLogout = () => {
    // Clear the token from localStorage (or sessionStorage)
    localStorage.removeItem('token');
    // Optionally clear other authentication-related data if necessary
    // Redirect to login page after logout
    navigate('/sellerlogin');
  };

  return (
    <div className="seller-homepage">
      <h1 className="dashboard-title">Seller Dashboard</h1>

      <div className="dashboard-buttons">
        {/* Dashboard Button */}
        <button
          className="dashboard-button"
          onClick={() => navigateTo('/dashboard')} // Navigate to the dashboard page
        >
          Dashboard
        </button>
{/* Profile Button */}
<button
          className="dashboard-button"
          onClick={() => navigateTo('/addproduct')} // Navigate to the profile page
        >
          Add Product
        </button>
        {/* Profile Button */}
        <button
          className="dashboard-button"
          onClick={() => navigateTo('/profile')} // Navigate to the profile page
        >
          Profile
        </button>

        {/* Sales Button */}
        <button
          className="dashboard-button"
          onClick={() => navigateTo('/sales')} // Navigate to the sales page
        >
          Sales
        </button>

        {/* Logout Button */}
        <button
          className="dashboard-button"
          onClick={handleLogout} // Handle logout
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SellerHomePage;
