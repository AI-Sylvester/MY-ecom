import axios from 'axios';

// Function to determine the base URL dynamically
const getBaseUrl = () => {
  const isLocalhost = window.location.hostname === 'localhost'; // Check if on localhost

  // For local development, use localhost
  if (isLocalhost) {
    return 'http://localhost:3000'; // Local development on the same machine
  }

  // For production or non-local environments, use the production URL
  return 'https://my-ecom-hdyc.onrender.com'; // Production URL
};

// Create an axios instance with dynamic base URL
const instance = axios.create({
  baseURL: getBaseUrl(), // Dynamically set the base URL
});

// Request interceptor to add the Authorization token (if it exists in localStorage)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

// Optionally, you can add a response interceptor to handle specific errors, etc.
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle response errors
//     return Promise.reject(error);
//   }
// );

export default instance;
