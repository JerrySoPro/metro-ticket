import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/TopupHistory.css'; // ✅ Reusing styling pattern

const TopupHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data);
      } catch (err) {
        setError('Failed to load transaction history.');
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="history-container">
      <div className="history-card">
        <h2>📜 Top-Up History</h2>

        {error && <p className="history-error">{error}</p>}

        {history.length === 0 ? (
          <p className="history-empty">No top-up records found.</p>
        ) : (
          <ul className="history-list">
            {history.map((item, index) => (
              <li key={index} className="history-item">
                <span className="amount">৳ {item.amount}</span>
                <span className="date">
                  {item.createdAt ? formatDate(item.createdAt) : 'Unknown date'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopupHistory;
