const pool = require('../config/dbConfig');

exports.getAllUsers = async (req, res) => {
    try {
        const result = await pool.request().query('SELECT id, username FROM Users');
        res.render('users', { users: result.recordset });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
};
