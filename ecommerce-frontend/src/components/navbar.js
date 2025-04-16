import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../logo.jpg';

function Navbar({ cartCount }) {
  return (
    <nav style={navbarStyle}>
      {/* Logo and Heading wrapped in Link to Home */}
      <Link to="/" style={logoStyle}>
        <img src={logo} alt="Logo" style={logoImageStyle} />
        <h1 style={headingStyle}>Styleria</h1>
      </Link>

      {/* Right side navigation links */}
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li style={liStyle}>
          <Link to="/shop" style={linkStyle}>Shop</Link>
        </li>
        <li style={liStyle}>
          <Link to="/login" style={linkStyle}>Login</Link>
        </li>
        <li style={liStyle}>
          <Link to="/sellerlogin" style={linkStyle}>Seller</Link>
        </li>
        <li style={liStyle}>
          <Link to="/cart" style={linkStyle}>
            <FaShoppingCart style={cartIconStyle} />
            {cartCount > 0 && <span style={cartCountStyle}>{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

// Basic inline styles for the navbar
const navbarStyle = {
  backgroundColor: '#333',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none', // Remove underline from the Link
};

const logoImageStyle = {
  height: '40px',
  width: 'auto',
  marginRight: '10px',
};

const headingStyle = {
  color: 'white',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: 0,
};

const ulStyle = {
  listStyleType: 'none',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: 0,
};

const liStyle = {
  margin: '0 15px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
};

const cartIconStyle = {
  fontSize: '24px',
};

const cartCountStyle = {
  position: 'absolute',
  top: '-5px',
  right: '-5px',
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '50%',
  padding: '2px 8px',
  fontSize: '14px',
};

export default Navbar;
