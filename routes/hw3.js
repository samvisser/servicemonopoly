// In routes/players.js
var express = require('express');
var router = express.Router();
const db = require('../db');  // Import the database connection

router.get('/', function(req, res, next) {
  db.any('SELECT Property.propName AS PropertyName FROM PlayerProperties JOIN Property ON PlayerProperties.propertyID = Property.ID WHERE PlayerProperties.gameID = 1;')
    .then(hw3 => {
      res.json(hw3);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;