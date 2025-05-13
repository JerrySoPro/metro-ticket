import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div><input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} /></div>
        <div><input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} /></div>
        <div><input type="email" name="email" placeholder="Email" required onChange={handleChange} /></div>
        <div><input type="tel" name="phone" placeholder="Phone" required onChange={handleChange} /></div>
        <div><input type="password" name="password" placeholder="Password" required onChange={handleChange} /></div>
        <div><button type="submit">Register</button></div>
      </form>
    </div>
  );
};

export default Register;
