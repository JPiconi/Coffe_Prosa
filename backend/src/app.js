const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = require('./routes/adminDashboard');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customerDashboard');
const menuRoutes = require('./routes/menu');


const app = express();
const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/menu', menuRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
