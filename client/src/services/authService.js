import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      password
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};

export default authService;
