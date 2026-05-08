import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [stops, setStops] = useState([]);

  const API_URL = 'http://52.221.226.40:5000';

  useEffect(() => {

    axios.get(`${API_URL}/routes`)
      .then(res => setRoutes(res.data));

    axios.get(`${API_URL}/schedules`)
      .then(res => setSchedules(res.data));

    axios.get(`${API_URL}/stops`)
      .then(res => setStops(res.data));

  }, []);

  return (
    <div style={{ padding: '20px' }}>

      <h1>BandungBus Cloud</h1>

      <hr />

      <h2>Rute Bus</h2>

      {
        routes.map(route => (
          <div key={route.id}>
            <h3>{route.corridor}</h3>

            <p>
              {route.origin} → {route.destination}
            </p>

            <p>{route.description}</p>

          </div>
        ))
      }

      <hr />

      <h2>Jadwal Bus</h2>

      {
        schedules.map(schedule => (
          <div key={schedule.id}>

            <p>
              Berangkat: {schedule.departure_time}
            </p>

            <p>
              Tiba: {schedule.arrival_time}
            </p>

          </div>
        ))
      }

      <hr />

      <h2>Halte Bus</h2>

      {
        stops.map(stop => (
          <div key={stop.id}>

            <h3>{stop.stop_name}</h3>

            <p>{stop.location}</p>

            <img
              src={stop.image_url}
              alt={stop.stop_name}
              width="300"
            />

          </div>
        ))
      }

    </div>
  );
}

export default App;