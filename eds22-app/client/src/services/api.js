import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Créer une instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  getUsers: () => api.get('/auth/users'),
  createUser: (userData) => api.post('/auth/users', userData),
  updateUser: (id, userData) => api.put(`/auth/users/${id}`, userData)
};

// Clients API
export const clientsAPI = {
  getAll: (params) => api.get('/clients', { params }),
  getById: (id) => api.get(`/clients/${id}`),
  create: (data) => api.post('/clients', data),
  update: (id, data) => api.put(`/clients/${id}`, data),
  delete: (id) => api.delete(`/clients/${id}`),
  export: () => api.get('/clients/export', { responseType: 'blob' })
};

// Interventions API
export const interventionsAPI = {
  getAll: (params) => api.get('/interventions', { params }),
  getById: (id) => api.get(`/interventions/${id}`),
  create: (data) => api.post('/interventions', data),
  update: (id, data) => api.put(`/interventions/${id}`, data),
  delete: (id) => api.delete(`/interventions/${id}`),
  addPiece: (id, data) => api.post(`/interventions/${id}/pieces`, data),
  getDashboardStats: () => api.get('/interventions/dashboard-stats')
};

// Pièces API
export const piecesAPI = {
  getAll: (params) => api.get('/pieces', { params }),
  getById: (id) => api.get(`/pieces/${id}`),
  create: (data) => api.post('/pieces', data),
  update: (id, data) => api.put(`/pieces/${id}`, data),
  delete: (id) => api.delete(`/pieces/${id}`),
  adjustStock: (id, data) => api.post(`/pieces/${id}/ajuster-stock`, data),
  getMouvements: (params) => api.get('/pieces/mouvements', { params }),
  getAlertes: () => api.get('/pieces/alertes')
};

export default api;
