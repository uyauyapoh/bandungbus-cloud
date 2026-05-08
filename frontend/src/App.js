import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [stops, setStops] = useState([]);

  const [selectedMenu, setSelectedMenu] = useState('routes');
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://52.221.226.40:5000';

  useEffect(() => {

    Promise.all([
      axios.get(`${API_URL}/routes`),
      axios.get(`${API_URL}/schedules`),
      axios.get(`${API_URL}/stops`)
    ])
      .then(([routesRes, schedulesRes, stopsRes]) => {

        setRoutes(routesRes.data);
        setSchedules(schedulesRes.data);
        setStops(stopsRes.data);

        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

  }, []);

  const menuButton = {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: '#0f172a',
    color: 'white'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f1f5f9',
        padding: '30px',
        fontFamily: 'Arial'
      }}
    >

      <div
        style={{
          background: 'linear-gradient(to right, #2563eb, #0f172a)',
          color: 'white',
          padding: '30px',
          borderRadius: '20px',
          marginBottom: '30px'
        }}
      >

        <h1>BandungBus Cloud</h1>

        <p>
          Sistem Informasi Transportasi Bus berbasis AWS Cloud
        </p>

      </div>

      <div
        style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '30px'
        }}
      >

        <button
          style={menuButton}
          onClick={() => setSelectedMenu('routes')}
        >
          Rute Bus
        </button>

        <button
          style={menuButton}
          onClick={() => setSelectedMenu('schedules')}
        >
          Jadwal Bus
        </button>

        <button
          style={menuButton}
          onClick={() => setSelectedMenu('stops')}
        >
          Halte Bus
        </button>

      </div>

      {
        loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            {
              selectedMenu === 'routes' && (
                <div>

                  {
                    routes.map(route => (
                      <div key={route.id} style={cardStyle}>

                        <h2>{route.corridor}</h2>

                        <p>
                          {route.origin} → {route.destination}
                        </p>

                        <p>{route.description}</p>

                      </div>
                    ))
                  }

                </div>
              )
            }

            {
              selectedMenu === 'schedules' && (
                <div>

                  {
                    schedules.map(schedule => (
                      <div key={schedule.id} style={cardStyle}>

                        <p>
                          Berangkat: {schedule.departure_time}
                        </p>

                        <p>
                          Tiba: {schedule.arrival_time}
                        </p>

                      </div>
                    ))
                  }

                </div>
              )
            }

            {
              selectedMenu === 'stops' && (
                <div>

                  {
                    stops.map(stop => (
                      <div key={stop.id} style={cardStyle}>

                        <h2>{stop.stop_name}</h2>

                        <p>{stop.location}</p>

                        <img
                          src={stop.image_url}
                          alt={stop.stop_name}
                          style={{
                            width: '100%',
                            maxWidth: '400px',
                            borderRadius: '10px'
                          }}
                        />

                      </div>
                    ))
                  }

                </div>
              )
            }
          </>
        )
      }

    </div>
  );
}

export default App;