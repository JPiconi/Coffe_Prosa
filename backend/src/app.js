import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import adminRoutes from './routes/adminDashboard';
import authRoutes from './routes/auth';
import customerRoutes from './routes/customerDashboard';
import menuRoutes from './routes/menu';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/menu', menuRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
