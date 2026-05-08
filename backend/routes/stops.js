const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM bus_stops', (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

router.post('/', (req, res) => {
  const { stop_name, location, image_url } = req.body;

  const sql = `
    INSERT INTO bus_stops(stop_name, location, image_url)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [stop_name, location, image_url],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: 'Bus stop created successfully'
      });
    }
  );
});

module.exports = router;