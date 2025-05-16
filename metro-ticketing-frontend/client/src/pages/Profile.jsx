import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/Profile.css'; 


const Profile = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') }` }
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
    try {
      await axios.put('/api/user/profile', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Update failed. Please try again.' });
    }
  };

  return (
    <div className="profile-container">
      
      <form className="profile-card" onSubmit={handleUpdate}>
        <h2>👤 Update Profile</h2>

        {message.text && (
          <p className={`profile-message ${message.type}`}>{message.text}</p>
        )}

        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          type="tel"
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
