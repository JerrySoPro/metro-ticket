import React, { useState } from 'react';
import axios from 'axios';
import '../components/GlobalStyles.css';

const AddBalance = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleTopUp = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/user/topup',
        { amount: parseInt(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: 'success', text: `✅ ৳${amount} added successfully!` });
      setAmount('');
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.error || '❌ Failed to add balance.',
      });
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [100, 200, 500, 1000];

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="page-title">💳 Add Balance</h1>
        <p className="page-subtitle">Top up your metro account</p>

        <div className="alert alert-info mb-lg">
          🔒 Secured Payment with <strong>PKASH</strong>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleTopUp}>
          <div className="form-group">
            <label htmlFor="amount" className="form-label">Amount (৳)</label>
            <input
              type="number"
              id="amount"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="10"
              max="10000"
              disabled={loading}
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-lg">
            <p className="data-label mb-sm">Quick Select</p>
            <div className="grid grid-2 gap-sm">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setAmount(quickAmount.toString())}
                  disabled={loading}
                >
                  ৳{quickAmount}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading || !amount}
          >
            {loading ? (
              <div className="loading-spinner" style={{ width: '20px', height: '20px' }}></div>
            ) : (
              `💰 Add ৳${amount || '0'}`
            )}
          </button>
        </form>

        <div className="mt-lg text-center">
          <button 
            onClick={() => window.history.back()}
            className="btn btn-secondary"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBalance;
