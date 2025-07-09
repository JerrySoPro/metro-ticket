import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import '../components/GlobalStyles.css';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <div className="card">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card card-wide">
        <h1 className="page-title">🚇 Metro Dashboard</h1>
        <p className="page-subtitle">Roam around Dhaka without any hassle</p>

        {profile ? (
          <div className="mt-xl">
            <div className="alert alert-success mb-lg">
              ✅ Welcome back, {profile.firstName}!
            </div>

            <div className="grid grid-2 gap-md">
              <div className="data-item">
                <div className="data-label">👤 Full Name</div>
                <div className="data-value">{profile.firstName} {profile.lastName}</div>
              </div>

              <div className="data-item">
                <div className="data-label">📧 Email</div>
                <div className="data-value">{profile.email}</div>
              </div>

              <div className="data-item">
                <div className="data-label">📱 Phone</div>
                <div className="data-value">{profile.phone}</div>
              </div>

              <div className="data-item">
                <div className="data-label">👥 Role</div>
                <div className="data-value">{profile.role}</div>
              </div>
            </div>

            <div className="mt-xl text-center">
              <div className="data-label mb-sm">💰 Available Balance</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38a169' }}>
                ৳{profile.balance}
              </div>
            </div>

            <div className="btn-group mt-xl">
              <button 
                onClick={() => navigate('/add-balance')}
                className="btn btn-primary flex-1"
              >
                💳 Add Balance
              </button>
              <button 
                onClick={() => navigate('/entry-pass')}
                className="btn btn-secondary flex-1"
              >
                📱 Entry Pass
              </button>
            </div>

            <div className="btn-group">
              <button 
                onClick={() => navigate('/fare-calculator')}
                className="btn btn-success flex-1"
              >
                🧮 Calculate Fare
              </button>
              <button 
                onClick={() => navigate('/train-status')}
                className="btn btn-info flex-1"
              >
                🚊 Train Status
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-xl">
            <div className="alert alert-warning mb-lg">
              ⚠️ You are not logged in
            </div>
            
            <div className="btn-group">
              <button 
                onClick={() => navigate('/login')}
                className="btn btn-primary flex-1"
              >
                🔐 Login
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="btn btn-secondary flex-1"
              >
                📝 Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
