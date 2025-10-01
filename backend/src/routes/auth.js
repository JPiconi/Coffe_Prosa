import { Router } from 'express';
const router = Router();
import { query } from '../db/connection';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

// Route for user registration
router.post('/register', async (req, res) => {
    const { name, email, password, cpf } = req.body;
    const hashedPassword = await hash(password, 10);

    query('INSERT INTO customers (name, email, password, cpf) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, cpf], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to register user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// Route for user login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    query('SELECT * FROM customers WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    });
});

// Route for password recovery
router.post('/password-recovery', (req, res) => {
    const { email } = req.body;

    query('SELECT * FROM customers WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Email not found' });
        }

        // Logic for sending password recovery email would go here

        res.json({ message: 'Password recovery email sent' });
    });
});

export default router;
