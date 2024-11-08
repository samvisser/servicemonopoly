// db.js
const pgp = require('pg-promise')();

// Set up the database connection using environment variables
const db = pgp({
  host: process.env.DB_SERVER,      // e.g., 'your-db-server.postgres.database.azure.com'
  port: process.env.DB_PORT || 5432,  // default PostgreSQL port
  database: process.env.DB_DATABASE, // your database name (e.g., 'your-database')
  user: process.env.DB_USER,        // your PostgreSQL user (e.g., 'your-admin-user')
  password: process.env.DB_PASSWORD, // your PostgreSQL password
  ssl: {
    rejectUnauthorized: false // Necessary for Azure PostgreSQL connection with SSL
  }
});

module.exports = db;