import axios from 'axios';

// API URL configuration
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const handleApiError = (error) => {
  // Handle timeout errors specifically
  if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
    return {
      status: 408,
      message:
        'Request timeout - server took too long to respond. Please try again.',
    };
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      status: error.response.status,
      message: error.response.data?.message || 'Server error occurred',
      error: error.response.data
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: 'Network error - unable to connect to server. Please check your internet connection.',
      status: 503,
      isNetworkError: true
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message || 'An unexpected error occurred',
      status: 500,
    };
  }
};

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  timeout: 60000, // Increased from 30000ms to 60000ms
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // For FormData, always remove Content-Type to let axios set the correct boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    // Using withCredentials: true to automatically send cookies with requests
    // Also add Authorization header with token from cookies for APIs that expect it
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle request timeout
    if (error.code === 'ECONNABORTED') {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        return api(originalRequest);
      }
    }

    // Handle 401 unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
