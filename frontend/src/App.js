import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [stops, setStops] = useState([]);

  const [selectedMenu, setSelectedMenu] = useState('routes');
  const [loading, setLoading] = useState(true);

  // Upload States
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const API_URL = 'http://3.0.180.198:5000';

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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file); // Sesuai dengan field di backend: upload.single('image')

    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadResult(res.data.imageUrl);
    } catch (error) {
      console.error(error);
      alert('Gagal mengupload file, periksa backend atau S3');
    } finally {
      setIsUploading(false);
    }
  };

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

        <button
          style={{ ...menuButton, backgroundColor: '#2563eb' }}
          onClick={() => setSelectedMenu('upload')}
        >
          Upload Gambar
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

            {
              selectedMenu === 'upload' && (
                <div style={cardStyle}>
                  <h2>Upload Gambar Halte/Fasilitas (Simpan ke Amazon S3)</h2>
                  <p>Fitur ini memenuhi syarat upload file ke S3 untuk ETS Cloud.</p>
                  
                  <form onSubmit={handleUpload}>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])} 
                      style={{ marginBottom: '15px', display: 'block', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                    <button 
                      type="submit" 
                      style={menuButton} 
                      disabled={isUploading || !file}
                    >
                      {isUploading ? 'Mengunggah...' : 'Upload File'}
                    </button>
                  </form>
                  
                  {
                    uploadResult && (
                      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                        <h3 style={{ color: '#16a34a' }}>Berhasil Diunggah!</h3>
                        <p><strong>URL CloudFront / S3:</strong></p>
                        <a href={uploadResult} target="_blank" rel="noreferrer" style={{ wordBreak: 'break-all', color: '#2563eb' }}>
                          {uploadResult}
                        </a>
                        <br/><br/>
                        <img 
                          src={uploadResult} 
                          alt="Hasil Upload S3" 
                          style={{ maxWidth: '400px', width: '100%', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} 
                        />
                      </div>
                    )
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