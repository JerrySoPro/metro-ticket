import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../components/GlobalStyles.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useUser();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Use the context register function which calls your registerUser service
    const result = await register(form);
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="app-container">
      <div className="card card-wide">
        <h1 className="page-title">📝 Create Account</h1>
        <p className="page-subtitle">Join the metro network today</p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
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

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Create a strong password"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner" style={{ width: '20px', height: '20px' }}></div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center mt-lg">
          Already have an account? <button 
            onClick={() => navigate('/login')}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', minWidth: 'auto' }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
