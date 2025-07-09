import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import '../components/GlobalStyles.css';

const EntryPass = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        setError('Failed to fetch user information');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <div className="card">
          <div className="loading-spinner"></div>
          <p className="text-center mt-md">Loading your metro pass...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="card">
          <div className="alert alert-error">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary btn-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="page-title">📱 Metro Entry Pass</h1>
        <p className="page-subtitle">Show this code to enter the metro station</p>

        <div className="alert alert-info mb-lg">
          🔒 This QR code contains your identity info securely
        </div>

        {userData && (
          <>
            <div className="qr-container">
              <QRCodeCanvas
                value={JSON.stringify({
                  id: userData.id,
                  name: `${userData.firstName} ${userData.lastName}`,
                  email: userData.email,
                  phone: userData.phone,
                  balance: userData.balance,
                  timestamp: new Date().toISOString()
                })}
                size={200}
                level="M"
                includeMargin={true}
              />
            </div>

            <div className="mt-lg">
              <div className="grid grid-2 gap-md">
                <div className="data-item">
                  <div className="data-label">👤 Passenger</div>
                  <div className="data-value">{userData.firstName} {userData.lastName}</div>
                </div>

                <div className="data-item">
                  <div className="data-label">💰 Balance</div>
                  <div className="data-value">৳{userData.balance}</div>
                </div>

                <div className="data-item">
                  <div className="data-label">📧 Email</div>
                  <div className="data-value">{userData.email}</div>
                </div>

                <div className="data-item">
                  <div className="data-label">📱 Phone</div>
                  <div className="data-value">{userData.phone}</div>
                </div>
              </div>
            </div>

            <div className="mt-lg">
              <div className="status-indicator status-online mx-auto" style={{ display: 'inline-flex' }}>
                🟢 Pass Valid
              </div>
            </div>
          </>
        )}

        <div className="mt-xl text-center">
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

export default EntryPass;
