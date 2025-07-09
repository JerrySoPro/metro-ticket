import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../components/GlobalStyles.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useUser();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Use the context login function which calls your loginUser service
    const result = await login(form.email, form.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="page-title">🔐 Welcome Back</h1>
        <p className="page-subtitle">Sign in to your metro account</p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
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
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center mt-lg">
          Don't have an account? <button 
            onClick={() => navigate('/register')}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', minWidth: 'auto' }}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
