const { Pool } = require('pg');

// Create PostgreSQL client

const pool = new Pool({
  connectionString: 'postgresql://ecom_wkoi_user:EmtJJtgjskLTPjvvZ8bSRI6AVndb8ikY@dpg-d01kddqdbo4c738rodg0-a.singapore-postgres.render.com/ecom_wkoi',
  ssl: {
    rejectUnauthorized: false // This bypasses certificate validation. Use with caution in production.
  },
  port: 5432
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
