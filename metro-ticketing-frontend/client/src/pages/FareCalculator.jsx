import React, { useState, useEffect } from 'react';
import axios from 'axios';

const stations = ["Motijheel", "Shahbag", "Kawran Bazar", "Farmgate"];

const FareCalculator = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fare, setFare] = useState(null);
  const [error, setError] = useState('');

  const fetchFare = async () => {
    try {
      const res = await axios.get(`/api/fares/calculate?from=${from}&to=${to}`);
      setFare(res.data.fare);
      setError('');
    } catch (err) {
      setFare(null);
      setError('Fare not found.');
    }
  };

  useEffect(() => {
    if (from && to && from !== to) {
      fetchFare();
    }
  }, [from, to]);

  return (
    <div className="container text-center mt-5">
      <h2>💰 Fare Calculator</h2>
      <div className="row justify-content-center mt-4">
        <div className="col-md-3">
          <select className="form-select" value={from} onChange={e => setFrom(e.target.value)}>
            <option value="">Select Origin</option>
            {stations.map((station, i) => (
              <option key={i} value={station}>{station}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={to} onChange={e => setTo(e.target.value)}>
            <option value="">Select Destination</option>
            {stations.map((station, i) => (
              <option key={i} value={station}>{station}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        {from && to && from === to && (
          <p className="text-warning">Origin and destination cannot be the same.</p>
        )}
        {fare !== null && (
          <h4 className="text-success">Total Fare: ৳ {fare}</h4>
        )}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default FareCalculator;
