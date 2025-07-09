import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/GlobalStyles.css';

const Profile = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setForm({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phone: res.data.phone
        });
      } catch {
        setMessage({ type: 'error', text: 'Failed to load profile' });
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.put('/api/user/profile', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage({ type: 'success', text: '✅ Profile updated successfully!' });
    } catch {
      setMessage({ type: 'error', text: '❌ Update failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card card-wide">
        <h1 className="page-title">👤 Profile Settings</h1>
        <p className="page-subtitle">Update your account information</p>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="grid grid-2 gap-md">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-input"
                value={form.firstName}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Enter first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-input"
                value={form.lastName}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              value={form.phone}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="btn-group">
            <button 
              type="submit" 
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner" style={{ width: '20px', height: '20px' }}></div>
              ) : (
                '💾 Save Changes'
              )}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary flex-1"
              onClick={() => window.history.back()}
            >
              ← Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
