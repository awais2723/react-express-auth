const sql = require('mssql');
require('dotenv').config({

}); // Load environment variables from .env file

// Database configuration using environment variables
const dbConfig = {
    user: process.env.DB_USER || '', // Use the environment variable or default to empty for Windows Authentication
    password: process.env.DB_PASSWORD || '', // Use the environment variable or default to empty for Windows Authentication
    server: process.env.DB_SERVER, // Required: SQL Server name or IP address
    database: process.env.DB_DATABASE, // Required: Database name
    options: {
        encrypt: true, // Encrypt the connection (required for Azure)
        trustServerCertificate: true, // Accept self-signed certificates for local development
        
    },
    port: 1433, // Default SQL Server port
};

// Create a connection pool
const pool = new sql.ConnectionPool(dbConfig);

// Connect to the database and handle connection errors
pool.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Database connection failed:', err));

    module.exports = {
        dbConfig,
        pool,
    };