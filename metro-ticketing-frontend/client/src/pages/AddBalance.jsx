import React, { useState } from 'react';
import axios from 'axios';
import '../components/AddBalance.css';

const AddBalance = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleTopUp = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/user/topup',
        { amount: parseInt(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ type: 'success', text: '✅ Balance added successfully!' });
      setAmount('');
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.error || '❌ Failed to add balance.',
      });
    }
  };

  return (
    <div className="addbalance-wrapper">
      <div className="addbalance-card animated-slide">
        <h2>💳 Add Balance</h2>
        <p className="secure-note">🔒 Secured Payment with <strong>PKASH</strong></p>

        {message.text && (
          <p className={`addbalance-message ${message.type}`}>{message.text}</p>
        )}

        <form onSubmit={handleTopUp}>
          <input
            type="number"
            min="1"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit">Add Funds</button>
        </form>
      </div>
    </div>
  );
};

export default AddBalance;
