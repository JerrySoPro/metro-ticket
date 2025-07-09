import React, { createContext, useState, useContext, useEffect } from 'react';
// Import your exact services
import { registerUser, loginUser } from '../services/authService';
import { getTrainStatuses } from '../services/trainService';
import { getProfile } from '../services/userService';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user using your existing getProfile service
  const fetchUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Use your existing getProfile function
      const response = await getProfile();
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setError('Failed to load user data');
      
      // Clear invalid token
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Login using your existing loginUser service
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use your existing loginUser function
      const response = await loginUser({ email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        await fetchUser(); // Fetch user data after successful login
        return { success: true };
      } else {
        return { success: false, error: 'No token received' };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { 
        success: false, 
        error: err.response?.data?.error || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Register using your existing registerUser service
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use your existing registerUser function
      const response = await registerUser(userData);
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Registration error:', err);
      return { 
        success: false, 
        error: err.response?.data?.error || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  // Update user data locally (for immediate UI updates)
  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  // Update balance locally and refresh from server
  const updateBalance = (newBalance) => {
    setUser(prevUser => ({
      ...prevUser,
      balance: newBalance
    }));
    
    // Refresh from server after a short delay to ensure consistency
    setTimeout(() => fetchUser(), 1000);
  };

  // Refresh user data
  const refreshUser = () => {
    fetchUser();
  };

  // Get train statuses using your existing service
  const getTrainData = async () => {
    try {
      return await getTrainStatuses();
    } catch (err) {
      console.error('Failed to fetch train data:', err);
      throw err;
    }
  };

  // Initial load
  useEffect(() => {
    fetchUser();
  }, []);

  // Listen for storage changes (multi-tab support)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        fetchUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    updateBalance,
    refreshUser,
    fetchUser,
    getTrainData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
