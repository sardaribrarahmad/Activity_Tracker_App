import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:4080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Logs API
export const logsAPI = {
  getLogs: async (params = {}) => {
    const response = await api.get('/logs', { params });
    return response.data;
  },
  createLog: async (logData) => {
    const response = await api.post('/logs', logData);
    return response.data;
  },
};

// Stats API
export const statsAPI = {
  getSummary: async () => {
    const response = await api.get('/stats/summary');
    return response.data;
  },
};

export default api;

