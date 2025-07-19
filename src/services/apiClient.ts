import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api', // intercepted by Axios-Mock-Adapter
  timeout: 5_000,
});

// Add Authorization header when JWT present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});