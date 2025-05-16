import React, { useEffect, useState } from 'react';
import '../components/TrainStatus.css';

const TrainStatus = () => {
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState('');

  const fetchTrainData = async () => {
    try {
      const response = await fetch('/api/trains');
      const data = await response.json();
      setTrains(data);
    } catch (err) {
      console.error('Failed to fetch train status:', err);
      setError('Unable to load train status.');
    }
  };

  useEffect(() => {
    fetchTrainData();
    const interval = setInterval(fetchTrainData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-4">🚆 Live Metro Train Status</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row g-4 justify-content-center">
        {trains.map((train, idx) => (
          <div key={idx} className="col-md-5">
            <div className="card shadow-sm p-3 h-100 status-card">
              <h5 className="mb-2">🚇 <strong>{train.name}</strong></h5>
              <p className="mb-1"><strong>📍 Location:</strong> {train.currentLocation}</p>
              <p className="mb-1">
                <strong>🕒 ETA:</strong> 
                <span className={`ms-2 fw-bold ${train.eta <= 2 ? 'text-danger' : 'text-success'}`}>
                  {train.eta} min
                </span>
              </p>
              <div className="status-icon mt-2">
                {train.eta === 0 
                  ? <span className="badge bg-warning text-dark">🛑 Stopped</span> 
                  : <span className="badge bg-success">🟢 En Route</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainStatus;
