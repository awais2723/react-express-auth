import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Adjust the base URL as needed
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Retrieved Token from Local Storage:', token); // Debug log
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization Header Attached:', config.headers); // Debug log
  }
  return config;
});

export default axiosInstance;
