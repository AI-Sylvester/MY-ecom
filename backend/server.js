const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const { verifyToken } = require('./middleware/authmiddleware');
const pool = require('./models/db');
const { slogin, sregister } = require('./controllers/sellerlogincontroller');
const { upload, addProduct, getProducts } = require('./controllers/productcontroller');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3001', // local dev frontend
  'https://your-netlify-site.netlify.app' // replace with actual Netlify URL
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Serve static files (e.g., product images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test DB connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.stack);
  } else {
    console.log('✅ Database connected:', res.rows[0]);
  }
});

// Routes
app.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route');
});

app.post('/auth/login', slogin);
app.post('/auth/register', sregister);
app.post('/products', upload.single('image'), addProduct);
app.get('/getProductsshop', getProducts);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
