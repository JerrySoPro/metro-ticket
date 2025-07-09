import axios from 'axios';

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  return axios.get('/api/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Add these additional functions
export const updateProfile = async (userData) => {
  const token = localStorage.getItem('token');
  return axios.put('/api/user/profile', userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const addBalance = async (amount) => {
  const token = localStorage.getItem('token');
  return axios.post('/api/user/topup', { amount }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getTransactions = async () => {
  const token = localStorage.getItem('token');
  return axios.get('/api/user/transactions', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
