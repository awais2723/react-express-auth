const sql = require('mssql');

// Database configuration for Windows Authentication
const dbConfig = {
    server: 'DESKTOP-1N9IL0J',
    database: 'user_login_system',
    options: {
        encrypt: false, // Use encryption (required for Azure; optional for local)
        trustServerCertificate: true, // Bypass certificate validation (useful for local setups)
    },
    authentication: {
        type: 'ntlm',
        options: {
            userName: 'awais2', // Leave empty to use the logged-in Windows user
            password: '1234', // Leave empty for Windows Authentication
            domain: '',   // Optional; usually not needed
        },
    },
    port: 1433, // Default SQL Server port
};

// Create a connection pool
const pool = new sql.ConnectionPool(dbConfig);

pool.connect()
    .then(() => console.log('Connected to database'))
    .catch((err) => console.error('Database connection failed:', err));

module.exports = pool;
