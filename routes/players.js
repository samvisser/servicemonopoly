// In routes/players.js
var express = require('express');
var router = express.Router();
const db = require('../db');  // Import the database connection

// GET /players - get all players
router.get('/', function(req, res, next) {
  db.any('SELECT * FROM player;')
    .then(players => {
      res.json(players);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// GET /players/:id - get a player by their ID
router.get('/:id', function(req, res, next) {
  const playerId = req.params.id;

  // Query the database to fetch the player with the given ID
  db.one('SELECT * FROM player WHERE id = $1;', [playerId])  // $1 is a placeholder for parameterized queries
    .then(player => {
      res.json(player);  // Send the player data back as JSON
    })
    .catch(err => {
      res.status(404).json({ error: `Player with ID ${playerId} not found` });
    });
});

// GET /players/:id - get a player by their ID
router.get('/hw3', function(req, res, next) {
  const playerId = req.params.id;

  // Query the database
  db.one('SELECT Property.propName AS PropertyName FROM PlayerProperties JOIN Property ON PlayerProperties.propertyID = Property.ID WHERE PlayerProperties.gameID = 1;')
    .then(player => {
      res.json(player);  // Send the player data back as JSON
    })
    .catch(err => {
      res.status(404).json({ error: `Player with ID ${playerId} not found` });
    });
});


module.exports = router;