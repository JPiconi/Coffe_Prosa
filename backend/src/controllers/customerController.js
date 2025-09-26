const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to get customer details by ID
router.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(results[0]);
    });
});

// Route to update customer details
router.put('/customers/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, cpf } = req.body;
    db.query('UPDATE customers SET name = ?, email = ?, cpf = ? WHERE id = ?', [name, email, cpf, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update customer details' });
        }
        res.json({ message: 'Customer details updated successfully' });
    });
});

// Route to delete a customer account
router.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM customers WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete customer account' });
        }
        res.json({ message: 'Customer account deleted successfully' });
    });
});

// Route to get all orders for a customer
router.get('/customers/:id/orders', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM orders WHERE customer_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

module.exports = router;