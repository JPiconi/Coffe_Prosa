const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get customer orders
router.get('/orders', (req, res) => {
    const customerId = req.user.id; // Assuming user ID is stored in req.user
    db.query('SELECT * FROM orders WHERE customer_id = ?', [customerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Route to get customer account details
router.get('/login', (req, res) => {
    const customerId = req.user.id; // Assuming user ID is stored in req.user
    db.query('SELECT * FROM customers WHERE id = ?', [customerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results[0]); // Return the first result
    });
});

// Route to update customer account details
router.put('/login', (req, res) => {
    const customerId = req.user.id; // Assuming user ID is stored in req.user
    const { name, email } = req.body;
    db.query('UPDATE customers SET name = ?, email = ? WHERE id = ?', [name, email, customerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update account details' });
        }
        res.json({ message: 'Account details updated successfully' });
    });
});

module.exports = router;
