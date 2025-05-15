import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile } from '../services/userService';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        setProfile(null);
      }
    };

    fetchData();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setProfile(null);
    navigate('/');       
  };


  return (
    <div>
      {/* ✅ Navigation Bar */}
      <nav style={{
  background: '#f0f0f0',
  padding: '15px 25px',
  borderBottom: '1px solid #ccc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}}>
  {/* Left side links */}
  <div style={{ display: 'flex', gap: '20px' }}>
    <Link to="/">Home</Link>
    {!profile && (
      <>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </>
    )}
  </div>

  {/* Right side balance + logout */}
  {profile && (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span>
            <strong>Balance:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>৳{profile.balance}</span>
        </span>
      <button
        onClick={handleLogout}
        style={{
          background: 'crimson',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  )}
</nav>



      {/* ✅ Main Content */}
      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <h1>🚇 Metro Ticket App is Running!</h1>
        <p>Welcome to the Metro Ticket System.</p>

        {profile ? (
          <div>
            <h3><strong>Welcome, {profile.firstName} {profile.lastName}</strong></h3>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
            <p>Role: {profile.role}</p>
          </div>
        ) : (
          <p><em>You are not logged in.</em></p>
        )}
      </div>
    </div>
  );
};

export default Home;
