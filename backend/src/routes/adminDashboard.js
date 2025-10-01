import { Router } from 'express';
const router = Router();
import { query } from '../db/connection';

// Route to get all menu items for admin
router.get('/menu', (req, res) => {
    query('SELECT * FROM menu_items', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Route to add a new menu item
router.post('/menu', (req, res) => {
    const { name, description, price, category } = req.body;
    query('INSERT INTO menu_items (name, description, price, category) VALUES (?, ?, ?, ?)', [name, description, price, category], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add menu item' });
        }
        res.status(201).json({ message: 'Menu item added successfully' });
    });
});

// Route to update an existing menu item
router.put('/menu/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    query('UPDATE menu_items SET name = ?, description = ?, price = ?, category = ? WHERE id = ?', [name, description, price, category, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update menu item' });
        }
        res.json({ message: 'Menu item updated successfully' });
    });
});

// Route to delete a menu item
router.delete('/menu/:id', (req, res) => {
    const { id } = req.params;
    query('DELETE FROM menu_items WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete menu item' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    });
});

// Route to get customer data
router.get('/customers', (req, res) => {
    query('SELECT * FROM customers', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

export default router;
