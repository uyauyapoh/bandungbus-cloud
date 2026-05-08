import { useEffect, useState } from 'react';
              )
            }

            {
              selectedMenu === 'schedules' && (
                <div>
                  <h2 style={{ marginBottom: '20px' }}>Jadwal Bus</h2>

                  {
                    schedules.map(schedule => (
                      <div key={schedule.id} style={cardStyle}>

                        <h3>Jadwal Perjalanan</h3>

                        <p>
                          <strong>Berangkat:</strong> {schedule.departure_time}
                        </p>

                        <p>
                          <strong>Tiba:</strong> {schedule.arrival_time}
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
                  <h2 style={{ marginBottom: '20px' }}>Halte Bus</h2>

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
                            maxWidth: '500px',
                            borderRadius: '15px',
                            marginTop: '15px'
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