const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM routes', (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

router.post('/', (req, res) => {
  const { corridor, origin, destination, description } = req.body;

  const sql = `
    INSERT INTO routes(corridor, origin, destination, description)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [corridor, origin, destination, description],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: 'Route created successfully'
      });
    }
  );
});

module.exports = router;