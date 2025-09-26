const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Route to get all menu items
router.get('/', menuController.getAllMenuItems);

// Route to get a specific menu item by ID
router.get('/:id', menuController.getMenuItemById);

// Route to add a new menu item
router.post('/', menuController.addMenuItem);

// Route to update an existing menu item
router.put('/:id', menuController.updateMenuItem);

// Route to delete a menu item
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;