import React from 'react';
import Navbar from './navbar';

function LoginPage() {
  return (
    <div>
      <Navbar />
      <div style={styles.loginPage}>
        <h1 style={styles.title}>Login to Your Account</h1>
        <p style={styles.notice}>🚧 This page is currently under construction. Please check back later. 🚧</p>
        
        <form style={styles.form}>
          <input type="email" placeholder="Email" style={styles.input} disabled />
          <input type="password" placeholder="Password" style={styles.input} disabled />
          <button type="submit" style={styles.button} disabled>Login</button>
        </form>
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  loginPage: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  notice: {
    fontSize: '1.1rem',
    color: '#d35400',
    marginBottom: '30px',
    fontWeight: '500',
  },
  form: {
    display: 'inline-block',
    width: '300px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    boxSizing: 'border-box',
    fontSize: '1rem',
    backgroundColor: '#eee',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#888',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'not-allowed',
  },
};

export default LoginPage;
