import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const token = res.data.token;
      localStorage.setItem('token', token);
      alert('Login successful!');
      navigate('/'); // Redirect to home/dashboard
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div><input type="email" name="email" placeholder="Email" required onChange={handleChange} /></div>
        <div><input type="password" name="password" placeholder="Password" required onChange={handleChange} /></div>
        <div><button type="submit">Login</button></div>
      </form>
    </div>
  );
};

export default Login;
