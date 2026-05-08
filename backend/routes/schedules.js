const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM schedules', (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

router.post('/', (req, res) => {
  const { route_id, departure_time, arrival_time } = req.body;

  const sql = `
    INSERT INTO schedules(route_id, departure_time, arrival_time)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [route_id, departure_time, arrival_time],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: 'Schedule created successfully'
      });
    }
  );
});

module.exports = router;