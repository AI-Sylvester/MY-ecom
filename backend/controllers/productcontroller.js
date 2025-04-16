const path = require('path');
const pool = require('../models/db');
const fs = require('fs');
const multer = require('multer');

// Set up Multer (for image upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    cb(null, uploadsDir);  // Ensure the uploads directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
  },
});

const upload = multer({ storage });

// Controller to add a product to the database
const addProduct = async (req, res) => {
  const {
    barcode, name, hsn, brand, type, style, color, size, qty, crate, mrp,
    disrate1, disrate2, verified, section, sectionGroup
  } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const query = `
      INSERT INTO product (
        barcode, name, hsn, brand, type, style, color, size, qty, crate, mrp, 
        disrate1, disrate2, verified, image, section, sectiongroup
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
      ) RETURNING *;
    `;

    const result = await pool.query(query, [
      barcode, name, hsn, brand, type, style, color, size, qty, crate, mrp,
      disrate1, disrate2, verified, image, section, sectionGroup
    ]);

    res.status(201).json({
      message: 'Product added successfully!',
      product: result.rows[0],
    });
  } catch (err) {
    console.error('Error inserting product:', err);
    res.status(500).json({
      message: 'Error inserting product data. Please try again.',
      error: err.message,
    });
  }
};
const getProducts = async (req, res) => {
  const { section, name, minMRP, maxMRP } = req.query;

  let query = 'SELECT * FROM product WHERE 1=1';
  const values = [];

  if (section) {
    const sections = section.split(',');
    query += ` AND section IN (${sections.map((_, i) => `$${i + 1}`).join(', ')})`;
    values.push(...sections);
  }

  if (name) {
    query += ` AND name ILIKE $${values.length + 1}`;
    values.push(`%${name}%`);
  }

  if (minMRP) {
    query += ` AND mrp >= $${values.length + 1}`;
    values.push(minMRP);
  }

  if (maxMRP) {
    query += ` AND mrp <= $${values.length + 1}`;
    values.push(maxMRP);
  }

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({
      message: 'Error fetching products. Please try again.',
      error: err.message,
    });
  }
};


module.exports = { upload, addProduct,getProducts };
