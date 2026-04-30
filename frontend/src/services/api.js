import axios from 'axios';

// Ensure this matches the Base URL from our .env
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true, // Send cookies for session auth
});

// Helpful to catch holistic errors (like server down)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export const pokeApi = {
  getPokemonList: (page = 1, limit = 20) => api.get(`/pokemon?page=${page}&limit=${limit}`),
  getPokemonDetails: (name) => api.get(`/pokemon/${name}`),
  getPokemonByType: (type) => api.get(`/type/${type}`),
};

export const favApi = {
  getFavorites: () => api.get('/favorites'),
  addFavorite: (data) => api.post('/favorites', data),
  removeFavorite: (id) => api.delete(`/favorites/${id}`),
};

export const authApi = {
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export default api;
