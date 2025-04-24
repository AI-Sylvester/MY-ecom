const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { verifyToken } = require('./middleware/authmiddleware');
const pool = require('./models/db');
const { slogin, sregister } = require('./controllers/sellerlogincontroller');
const { upload, addProduct,getProducts } = require('./controllers/productcontroller');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS Configuration
const allowedOrigins = [
  'http://192.168.1.51:3001',  // Local IP (for local development)
  'https://riazshopy.netlify.app',  // Netlify URL (replace with your actual Netlify URL)
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));  // Block the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Serve static files (images) from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Check if database is connected
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
  } else {
    console.log('Database connected successfully:', res.rows[0]);
  }
});

// Example protected route (requires a valid JWT)
app.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route');
});

// Seller authentication routes
app.post('/auth/login', slogin);
app.post('/auth/register', sregister);

// Product route for adding products
app.post('/products', upload.single('image'), addProduct);
app.get('/getProductsshop',getProducts);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
