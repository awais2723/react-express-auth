const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const jwt = require('jsonwebtoken');

router.post('/register', registerUser); // POST /api/auth/register
router.post('/login', loginUser); // POST /api/auth/login
router.post('/logout', logoutUser); // POST /api/auth/logout






// Middleware to verify JWT token
router.get('/verify-token', (req, res) => {
  console.log('Received Headers:', req.headers);
  const authHeader = req.headers['authorization']; // Use lowercase for header key
  const token = authHeader?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    res.status(200).json({ success: true, user: decoded }); // Respond with user info
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});


module.exports = router;




