const jwt = require('jsonwebtoken'); // Add this line to import jwt

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Use lowercase for header key
  const token = authHeader?.split(' ')[1]; // Extract the token
  console.log('Received Token:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log('Decoded Token:', decoded);
    req.user = decoded; // Attach user data to the request
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};
