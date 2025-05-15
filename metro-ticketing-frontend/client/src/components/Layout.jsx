import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const [balance, setBalance] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch balance unless on Home page
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (token && location.pathname !== '/') {
          const res = await axios.get('/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBalance(res.data.balance);
        } else {
          setBalance(null);
        }
      } catch {
        setBalance(null);
      }
    };
    fetchBalance();
  }, [location.pathname, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">🚇 MetroTickets</Link>
        </div>

        <div className="navbar-right">
          {token && location.pathname !== '/' && (
            <span className="balance-badge">৳ {balance ?? '...'}</span>
          )}

          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <div className="dropdown">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle">
                👤 Account ▾
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile">👤 Profile</Link>

                  <Link to="/add-balance">💳 Add Balance</Link>
                  <Link to="/topup-history">📜 Top-Up History</Link>
                  <Link to="/tickets">🎫 Book Tickets</Link>
                  <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <p>Built with ❤️ by Metro Dev Team • © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
};

export default Layout;
