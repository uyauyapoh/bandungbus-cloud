const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('BandungBus API Running');
});

app.get('/routes', (req, res) => {

  db.query(
    'SELECT * FROM routes',
    (err, result) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

app.get('/schedules', (req, res) => {

  db.query(
    'SELECT * FROM schedules',
    (err, result) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

app.get('/stops', (req, res) => {

  db.query(
    'SELECT * FROM bus_stops',
    (err, result) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

const uploadAPI = require('./routes/upload');

app.use('/upload', uploadAPI);

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});