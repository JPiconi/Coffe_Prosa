const menuController = {};
const db = require('../db/connection');

// Get all menu items
menuController.getAllMenuItems = (req, res) => {
    db.query('SELECT * FROM menu_items', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
};

// Add a new menu item
menuController.addMenuItem = (req, res) => {
    const { name, description, price, category } = req.body;
    db.query('INSERT INTO menu_items (name, description, price, category) VALUES (?, ?, ?, ?)', [name, description, price, category], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add menu item' });
        }
        res.status(201).json({ message: 'Menu item added successfully' });
    });
};

// Update an existing menu item
menuController.updateMenuItem = (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    db.query('UPDATE menu_items SET name = ?, description = ?, price = ?, category = ? WHERE id = ?', [name, description, price, category, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update menu item' });
        }
        res.json({ message: 'Menu item updated successfully' });
    });
};

// Delete a menu item
menuController.deleteMenuItem = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM menu_items WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete menu item' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    });
};

module.exports = menuController;