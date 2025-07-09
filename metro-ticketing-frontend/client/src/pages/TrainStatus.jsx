import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import '../components/GlobalStyles.css';

const TrainStatus = () => {
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { getTrainData } = useUser();

  const fetchTrainData = async () => {
    setLoading(true);
    try {
      // Use your getTrainStatuses service through context
      const response = await getTrainData();
      setTrains(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch train status:', err);
      setError('Unable to load train status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainData();
    const interval = setInterval(fetchTrainData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <div className="card">
          <div className="loading-spinner"></div>
          <p className="text-center mt-md">Loading train status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card card-wide">
        <h1 className="page-title">🚊 Live Train Status</h1>
        <p className="page-subtitle">Real-time updates every 30 seconds</p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {trains.length === 0 && !error ? (
          <div className="alert alert-info">
            📍 No trains currently running
          </div>
        ) : (
          <div className="data-list mt-lg">
            {trains.map((train, index) => (
              <div key={index} className="data-item">
                <div className="flex-between mb-sm">
                  <div className="data-label">🚇 Train {train.id}</div>
                  <div className={`status-indicator ${train.status === 'running' ? 'status-online' : 'status-warning'}`}>
                    {train.status === 'running' ? '🟢 Running' : '🟡 Delayed'}
                  </div>
                </div>
                
                <div className="grid grid-2 gap-md">
                  <div>
                    <div className="data-label">📍 Current Location</div>
                    <div className="data-value">{train.currentLocation}</div>
                  </div>
                  
                  <div>
                    <div className="data-label">🕒 Next Station ETA</div>
                    <div className="data-value">{train.eta} min</div>
                  </div>
                  
                  <div>
                    <div className="data-label">📍 Next Station</div>
                    <div className="data-value">{train.nextStation}</div>
                  </div>
                  
                  <div>
                    <div className="data-label">👥 Capacity</div>
                    <div className="data-value">{train.capacity}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-xl text-center">
          <div className="btn-group">
            <button 
              onClick={() => window.history.back()}
              className="btn btn-secondary flex-1"
            >
              ← Back
            </button>
            <button 
              onClick={fetchTrainData}
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner" style={{ width: '20px', height: '20px' }}></div>
              ) : (
                '🔄 Refresh'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainStatus;
