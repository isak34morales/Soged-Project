require('dotenv').config();
const express = require('express');
const path = require('path');
const chatRouter = require('./api/chat');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// API Routes
app.use('/api/chat', chatRouter);

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Soged server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the application`);
});
