import axios from 'axios';

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  return axios.get('/api/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
