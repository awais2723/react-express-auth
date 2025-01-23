const express = require('express');
const session = require('express-session');
const sql = require('mssql');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { dbConfig } = require('./config/dbConfig');
require('dotenv').config();

const MSSQLStore = require('connect-mssql')(session);

const store = new MSSQLStore(dbConfig);

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

app.options("*", cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url);
  console.log('Headers:', req.headers);
  next();
});

// CORS setup to allow React frontend requests

app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
  })
);




// Routes
app.use('/api/auth', authRoutes); // Prefix routes with /api
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
