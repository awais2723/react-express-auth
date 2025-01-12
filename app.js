const express = require('express');
const session = require('express-session');
const sql = require('mssql');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const {dbConfig} = require("./config/dbConfig");
require("dotenv").config();

const MSSQLStore = require("connect-mssql")(session);
const store = new MSSQLStore(dbConfig);


const app = express();
const PORT = 3000;
  

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,

    cookie: { secure: false, httpOnly: true },
  })
);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use(authRoutes);
app.use(userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
