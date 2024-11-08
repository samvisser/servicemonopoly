// routes/players.js
const express = require('express');
const db = require('../db'); // Import db.js to get the connection
const router = express.Router();

// Define the /players endpoint
router.get('/players', async function(req, res, next) {
  try {
    // Query the database to get players
    const players = await db.any('SELECT id, email, name FROM players');
    
    // Send the result as JSON
    res.json(players);
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;