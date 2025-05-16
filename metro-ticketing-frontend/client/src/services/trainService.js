import axios from 'axios';

export const getTrainStatuses = () => {
  return axios.get('/api/trains/status');
};
