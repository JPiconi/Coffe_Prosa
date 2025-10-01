const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection.js');


const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, cpf } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO customers (name, email, password, cpf) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, cpf], (err, results) => {

        if (err) {
            return res.status(500).json({ error: 'Failed to register user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// Login a user
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM customers WHERE email = ?', [email], async (err, results) => {

        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    });
});

// Password recovery
router.post('/password-recovery', (req, res) => {
    const { email } = req.body;

    db.query('SELECT * FROM customers WHERE email = ?', [email], (err, results) => {

        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Email not found' });
        }

        // Here you would typically send an email with a password reset link
        res.json({ message: 'Password recovery email sent' });
    });
});

module.exports = router;
