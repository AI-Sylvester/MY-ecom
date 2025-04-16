const bcrypt = require('bcryptjs'); // Not needed in this case but keeping it for future use if needed
const jwt = require('jsonwebtoken');
const pool = require('../models/db');

const secretKey = '8f6f1e9d-c438-45f7-b3b4-49f4a9c23c97'; // Secret key for JWT

// Login function
const slogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists in the database
    const result = await pool.query('SELECT * FROM sellerinfo WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Compare the plain password with the entered password
    if (password !== user.spassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }); // Expiration time set to 1 hour
    res.json({ token, userole: user.userole }); // Return token and user role

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register function
const sregister = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM sellerinfo WHERE username = $1 OR email = $2', [username, email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Store the plain password directly in the database (no hashing)
    const newUserResult = await pool.query(
      'INSERT INTO sellerinfo (username, spassword, email, sellercode) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, password, email, 'seller_placeholder'] // Store password directly as plain text
    );

    // Get the newly created user's ID (you can get this from the result of the insertion)
    const newUser = newUserResult.rows[0];

    // Generate the final sellercode using the user's id
    const finalSellercode = `seller${newUser.id}`;

    // Update the user record with the generated sellercode
    await pool.query(
      'UPDATE sellerinfo SET sellercode = $1 WHERE id = $2',
      [finalSellercode, newUser.id]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { slogin, sregister };
