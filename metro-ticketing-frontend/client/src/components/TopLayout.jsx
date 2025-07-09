import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './GlobalStyles.css';

const TopLayout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { user, loading, logout, refreshUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserDropdownOpen(false);
      setIsMobileMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Refresh user data periodically
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        refreshUser();
      }, 60000); // Refresh every minute

      return () => clearInterval(interval);
    }
  }, [user, refreshUser]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/fare-calculator', label: 'Fare Calculator', icon: '💰' },
    { path: '/train-status', label: 'Train Status', icon: '🚊' },
    { path: '/entry-pass', label: 'Entry Pass', icon: '📱' },
  ];

  const userMenuItems = [
    { path: '/profile', label: 'Profile Settings', icon: '👤' },
    { path: '/add-balance', label: 'Add Balance', icon: '💳' },
    { path: '/topup-history', label: 'Transaction History', icon: '📊' },
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="app-layout">
        <header className="top-header">
          <div className="header-container">
            <Link to="/" className="header-brand">
              <div className="brand-logo">🚇</div>
              <span className="brand-text">Metro</span>
            </Link>
            <div className="loading-spinner" style={{ width: '24px', height: '24px' }}></div>
          </div>
        </header>
        <main className="app-content">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <header className={`top-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Brand/Logo */}
          <Link to="/" className="header-brand">
            <div className="brand-logo">🚇</div>
            <span className="brand-text">Metro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-menu">
            {navigationItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </nav>

          {/* User Section */}
          <div className="header-user">
            {user ? (
              <>
                {/* Balance Display */}
                <div className="user-balance">
                  ৳{user.balance || 0}
                </div>

                {/* User Dropdown */}
                <div 
                  className={`user-dropdown ${isUserDropdownOpen ? 'open' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                  }}
                >
                  <button className="user-trigger">
                    <div className="user-avatar">
                      {user.firstName?.charAt(0) || ''}
                      {user.lastName?.charAt(0) || ''}
                    </div>
                    <div className="user-info">
                      <div className="user-name">
                        {user.firstName || ''} {user.lastName || ''}
                      </div>
                      <div className="user-role">{user.role || 'User'}</div>
                    </div>
                    <span className="dropdown-arrow">▼</span>
                  </button>

                  <div className="dropdown-menu">
                    {userMenuItems.map((item) => (
                      <Link key={item.path} to={item.path} className="dropdown-item">
                        <span>{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                    <button 
                      className="dropdown-item danger"
                      onClick={handleLogout}
                      style={{ 
                        width: '100%', 
                        border: 'none', 
                        background: 'none', 
                        textAlign: 'left' 
                      }}
                    >
                      <span>🚪</span>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="btn-group" style={{ gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', minWidth: 'auto' }}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', minWidth: 'auto' }}>
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}></div>
      <nav className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navigationItems.map((item) => (
            <li key={item.path} className="mobile-nav-item">
              <Link
                to={item.path}
                className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {user && (
          <div className="mobile-user-section">
            <div className="mobile-user-info">
              <div className="user-avatar">
                {user.firstName?.charAt(0) || ''}
                {user.lastName?.charAt(0) || ''}
              </div>
              <div>
                <div className="user-name">
                  {user.firstName || ''} {user.lastName || ''}
                </div>
                <div className="user-balance">Balance: ৳{user.balance || 0}</div>
              </div>
            </div>

            <ul className="mobile-nav-list">
              {userMenuItems.map((item) => (
                <li key={item.path} className="mobile-nav-item">
                  <Link
                    to={item.path}
                    className="mobile-nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mobile-nav-item">
                <button
                  className="mobile-nav-link danger"
                  onClick={handleLogout}
                  style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left' }}
                >
                  <span>🚪</span>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="app-content">
        {children}
      </main>
    </div>
  );
};

export default TopLayout;
