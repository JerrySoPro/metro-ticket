import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/GlobalStyles.css';

const TopupHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="app-container">
        <div className="card">
          <div className="loading-spinner"></div>
          <p className="text-center mt-md">Loading transaction history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card card-wide">
        <h1 className="page-title">📊 Transaction History</h1>
        <p className="page-subtitle">View all your top-up transactions</p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {history.length === 0 ? (
          <div className="mt-xl text-center">
            <div className="alert alert-info">
              📝 No top-up records found
            </div>
            <button 
              onClick={() => window.history.back()}
              className="btn btn-secondary mt-lg"
            >
              ← Back to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="data-list mt-lg">
              {history.map((transaction, index) => (
                <div key={index} className="data-item">
                  <div className="flex-between">
                    <div>
                      <div className="data-label">💰 Amount</div>
                      <div className="data-value">৳{transaction.amount}</div>
                    </div>
                    <div>
                      <div className="data-label">📅 Date</div>
                      <div className="data-value">{formatDate(transaction.createdAt)}</div>
                    </div>
                    <div>
                      <div className="status-indicator status-online">
                        ✅ Completed
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-xl text-center">
              <div className="btn-group">
                <button 
                  onClick={() => window.history.back()}
                  className="btn btn-secondary flex-1"
                >
                  ← Back
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn btn-primary flex-1"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopupHistory;
