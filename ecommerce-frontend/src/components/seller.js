import React, { useState } from 'react';
import axios from '../axios'; // Ensure this imports the axios instance you configured
import { useNavigate } from 'react-router-dom';
import './seller.css';
import Logo from '../logo.jpg'; // Import the logo image

function SellerLoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post('/auth/login', { username, password });
      console.log('Login Response:', response.data);
      // Save the token in localStorage after login
      localStorage.setItem('token', response.data.token);
      navigate('/sellerhome'); // Redirect to seller home after successful login
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Invalid credentials');
    }
  };

  // Handle registration
  const handleRegister = async () => {
    setError('');

    if (!username || !password || !email) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('/auth/register', { username, password, email });
      alert('Registration successful, please log in.');
      setIsRegistering(false);
    } catch (err) {
      setError('Error during registration');
    }
  };

  // Navigate to HomePage
  const navigateToHome = () => {
    navigate('/'); // This will take you to the home page
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="login-logo" />
        </div>
        <div className="login-title">Sivasakthi</div>
        <h2 className="login-header">{isRegistering ? 'Register' : 'Login'}</h2>

        {isRegistering ? (
          <div className="login-input-container">
            <div className="login-input-group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="login-input"
              />
            </div>
            <div className="login-input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="login-input"
              />
            </div>
            <div className="login-input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="login-input"
              />
            </div>
            <button onClick={handleRegister} className="login-button">Register</button>
            <p className="login-switch">
              Already have an account?{' '}
              <button onClick={() => setIsRegistering(false)} className="login-switch-btn">Log In</button>
            </p>
          </div>
        ) : (
          <div className="login-input-container">
            <div className="login-input-group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="login-input"
              />
            </div>
            <div className="login-input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="login-input"
              />
            </div>
            <button onClick={handleLogin} className="login-button">Login</button>
            <p className="login-switch">
              Not registered?{' '}
              <button onClick={() => setIsRegistering(true)} className="login-switch-btn">Create an account</button>
            </p>
          </div>
        )}

        {error && <p className="login-error">{error}</p>}

        {/* Navigate to Home Page Button */}
        <button onClick={navigateToHome} className="home-button">
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

export default SellerLoginPage;
