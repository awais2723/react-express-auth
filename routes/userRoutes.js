const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/users', isAuthenticated, getAllUsers);

module.exports = router;
