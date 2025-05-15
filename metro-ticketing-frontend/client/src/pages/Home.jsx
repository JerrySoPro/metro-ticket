import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch {
        setProfile(null);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.8rem', marginBottom: '10px' }}>🚇 Metro Ticket System</h1>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>Roam around dhaka without any hassle</p>

      {profile ? (
        <div style={{ marginTop: '40px', background: '#f9f9f9', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2>Welcome, {profile.firstName} {profile.lastName}</h2>
          {/* <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Role:</strong> {profile.role}</p> */}
          <p><strong>Available Balance:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>৳{profile.balance}</span></p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '25px' }}>
            <button onClick={() => navigate('/add-balance')} style={btnStyle}>💳 Add Balance</button>
            <button onClick={() => navigate('/topup-history')} style={btnStyle}>📜 Top-Up History</button>
            <button onClick={() => navigate('/book')} style={btnStyle}>🎫 Book Tickets</button>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '40px' }}>
          <p style={{ fontSize: '1.1rem' }}><em>You are not logged in.</em></p>
          <button onClick={() => navigate('/login')} style={btnStyle}>🔐 Login</button>
        </div>
      )}
    </div>
  );
};

const btnStyle = {
  padding: '12px 24px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out'
};

export default Home;