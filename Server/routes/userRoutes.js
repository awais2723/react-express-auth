const express = require('express');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const {getAllUsers} = require('../controllers/userController');
const { pool } = require('../config/dbConfig');
const router = express.Router();

// Get all users (authenticated route)
router.get('/', isAuthenticated, getAllUsers);

module.exports = router;
