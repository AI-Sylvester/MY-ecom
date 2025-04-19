const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Create PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Test the DB connection
pool.connect()
  .then(client => {
    return client.query('SELECT current_database()')
      .then(res => {
        console.log(`✅ Connected to database: ${res.rows[0].current_database}`);
        client.release();
      })
      .catch(err => {
        console.error('❌ Query error:', err.stack);
        client.release();
      });
  })
  .catch((err) => {
    console.error('❌ Error connecting to database:', err.stack);
  });

module.exports = pool;
