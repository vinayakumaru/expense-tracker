import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});