import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const taskService = {
  getAllTasks: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.search) params.append('search', filters.search);

    const response = await axios.get(`${API_URL}/tasks?${params}`, getAuthHeaders());
    return response.data;
  },

  getTask: async (id) => {
    const response = await axios.get(`${API_URL}/tasks/${id}`, getAuthHeaders());
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData, getAuthHeaders());
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, getAuthHeaders());
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
    return response.data;
  },

  getTaskStats: async () => {
    const response = await axios.get(`${API_URL}/tasks/stats/overview`, getAuthHeaders());
    return response.data;
  }
};

export default taskService;
