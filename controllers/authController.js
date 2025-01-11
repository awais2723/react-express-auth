const bcrypt = require('bcrypt');
const pool = require('../config/dbConfig');
const sql = require('mssql');


exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        
        await pool.request()
        
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .query('INSERT INTO Users (username, password) VALUES (@username, @password)');
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        const user = result.recordset[0];
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { id: user.id, username: user.username };
            res.redirect('/users');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
};
