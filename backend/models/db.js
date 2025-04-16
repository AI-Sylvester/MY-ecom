const { Pool } = require('pg');

// Create PostgreSQL client
const pool = new Pool({
  connectionString: 'postgres://postgres:1234@localhost/Ecom', // Adjust credentials as needed
  port: 5432, // Specify the port
});

// Check if the database is connected
pool.connect()
  .then(client => {
    client.query('SELECT current_database()', (err, res) => {
      if (err) {
        console.error('Error executing query:', err.stack);
      } else {
        console.log(`Connected to database: ${res.rows[0].current_database}`);
      }
      client.release(); // Release the client back to the pool
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err.stack);
  });

module.exports = pool;
