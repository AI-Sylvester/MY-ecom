import axios from 'axios';

// Function to determine the base URL dynamically
const getBaseUrl = () => {
  const isLocalhost = window.location.hostname === 'localhost';

  // Use environment variable in production
  if (!isLocalhost) {
    return process.env.REACT_APP_API_URL; // Set this in Netlify settings
  }

  // Default to local backend during development
  return 'http://localhost:3000';
};

// Create an axios instance with dynamic base URL
const instance = axios.create({
  baseURL: getBaseUrl(),
});

// Request interceptor to attach JWT token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
