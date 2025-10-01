const menuController = {};

// Get all menu items
menuController.getAllMenuItems = (req, res) => {
    query('SELECT * FROM menu_items', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
};

menuController.getMenuItemById = (req, res) => {
    const { id } = req.params;
    query('SELECT * FROM menu_items WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json(results[0]);
    });
};

// Add a new menu item
menuController.addMenuItem = (req, res) => {
    const { name, description, price, category } = req.body;
    query('INSERT INTO menu_items (name, description, price, category) VALUES (?, ?, ?, ?)', [name, description, price, category], (err, results) => {
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
    query('UPDATE menu_items SET name = ?, description = ?, price = ?, category = ? WHERE id = ?', [name, description, price, category, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update menu item' });
        }
        res.json({ message: 'Menu item updated successfully' });
    });
};

// Delete a menu item
menuController.deleteMenuItem = (req, res) => {
    const { id } = req.params;
    query('DELETE FROM menu_items WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete menu item' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    });
};

export default menuController;
