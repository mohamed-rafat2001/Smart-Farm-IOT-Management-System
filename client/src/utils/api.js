import axios from 'axios';

// Log the API URL being used
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
console.log('🔄 API URL being used:', apiUrl);

const handleApiError = (error) => {
  // Handle timeout errors specifically
  if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
    console.error('Request timeout error:', error.message);
    return {
      status: 408,
      message:
        'Request timeout - server took too long to respond. Please try again.',
    };
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response error data:', error.response.data);
    console.error('Response error status:', error.response.status);
    console.error('Response error headers:', error.response.headers);

    return {
      status: error.response.status,
      message: error.response.data?.message || 'Server error occurred',
      error: error.response.data
    };
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network error - no response received:', error.request);
    console.error('Request URL:', error.config?.url);
    console.error('Request method:', error.config?.method);
    
    return {
      message: 'Network error - unable to connect to server. Please check your internet connection.',
      status: 503,
      isNetworkError: true
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message:', error.message);

    return {
      message: error.message || 'An unexpected error occurred',
      status: 500,
    };
  }
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  withCredentials: true,
  timeout: 30000, // Increased from 10000ms to 30000ms
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
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Adding auth token to request:', config.url);
    } else {
      console.warn('⚠️ No auth token found for request:', config.url);
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

      try {
        // Try to refresh token or redirect to login
        window.location.href = '/login';
        return Promise.reject(error);
      } catch {
        // Removed unused variable 'refreshError'
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
