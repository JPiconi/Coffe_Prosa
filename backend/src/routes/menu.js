import { Router } from 'express';
const router = Router();
import { getAllMenuItems, getMenuItemById, addMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController';

// Route to get all menu items
router.get('/', getAllMenuItems);

// Route to get a specific menu item by ID
router.get('/:id', getMenuItemById);

// Route to add a new menu item
router.post('/', addMenuItem);

// Route to update an existing menu item
router.put('/:id', updateMenuItem);

// Route to delete a menu item
router.delete('/:id', deleteMenuItem);

export default router;
