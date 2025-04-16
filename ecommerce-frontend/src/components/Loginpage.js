import React from 'react';
import Navbar from './navbar';

function LoginPage() {
  return (
    <div>
      <Navbar />
      <div style={loginPageStyle}>
        <h1>Login to Your Account</h1>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

const loginPageStyle = {
  textAlign: 'center',
  padding: '50px',
};

export default LoginPage;
