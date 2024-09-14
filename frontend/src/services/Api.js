import axios from 'axios';

const api = axios.create({
  baseURL: 'https://synaptica-backend.vercel.app/',

});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Auth token set:', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log('Auth token removed');
  }
};

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response ? error.response.status : error.message);
    return Promise.reject(error);
  }
);

export default api;