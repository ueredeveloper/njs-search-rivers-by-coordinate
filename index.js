// index.js
const express = require('express');
const app = express();
const port = 3315;

// Serve static files from the public folder
app.use(express.static('public'));

// Import routes
const indexRoutes = require('./routes/index');

// Use routes
app.use('/services', indexRoutes);

// Page and Map
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
