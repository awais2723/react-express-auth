const { pool } = require("../config/dbConfig");

exports.getAllUsers = async (req, res) => {
  try {
    console.log('got users request');
    const result = await pool.request().query("SELECT id, username FROM Users");

    res.json({
      success: true,
      message: `Welcome ${req.user.username}`, // Use req.user for authenticated user data
      users: result.recordset, // Include the list of users
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Error retrieving users' });
  }
}