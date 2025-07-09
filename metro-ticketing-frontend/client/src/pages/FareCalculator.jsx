import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/fareCalculator.css';

const stations = ["Motijheel", "Shahbag", "Kawran Bazar", "Farmgate"];

const FareCalculator = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fare, setFare] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFare = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/fares/calculate?from=${from}&to=${to}`);
      setFare(res.data.fare);
      setError('');
    } catch (err) {
      setFare(null);
      setError('Fare not found. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (from && to && from !== to) {
      fetchFare();
    }
  }, [from, to]);

  const swapStations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="fare-calculator-container">
      <div className="calculator-header">
        <h1 className="calculator-title">💰 Fare Calculator</h1>
        <p className="calculator-subtitle">Find your journey cost instantly</p>
      </div>

      <div className="form-group">
        <label htmlFor="from" className="form-label">From Station</label>
        <select
          id="from"
          className="form-select"
          value={from}
          onChange={e => setFrom(e.target.value)}
          disabled={loading}
        >
          <option value="">Select Origin</option>
          {stations.map((station, i) => (
            <option key={i} value={station}>{station}</option>
          ))}
        </select>
      </div>

      <div className="swap-container">
        <button
          className="swap-btn"
          onClick={swapStations}
          disabled={!from || !to || from === to || loading}
          aria-label="Swap stations"
          title="Swap origin and destination"
        >
          ⇄
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="to" className="form-label">To Station</label>
        <select
          id="to"
          className="form-select"
          value={to}
          onChange={e => setTo(e.target.value)}
          disabled={loading}
        >
          <option value="">Select Destination</option>
          {stations.map((station, i) => (
            <option key={i} value={station}>{station}</option>
          ))}
        </select>
      </div>

      <div className="results-container">
        {loading && (
          <div className="loading-spinner" role="status" aria-label="Loading fare"></div>
        )}
        
        {from && to && from === to && !loading && (
          <div className="warning-message">
            Origin and destination cannot be the same
          </div>
        )}
        
        {!loading && fare !== null && (
          <div className="fare-result">
            <div className="fare-amount">৳ {fare}</div>
            <div className="fare-label">Total Fare</div>
          </div>
        )}
        
        {!loading && error && (
          <div className="error-message">{error}</div>
        )}
      </div>
    </div>
  );
};

export default FareCalculator;
