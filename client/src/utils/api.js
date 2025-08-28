import axios from 'axios';

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
      status: error.response.data.status,
      message: error.response.data.message,
    };
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request error:', error.request);

    return {
      message: 'No response from server',
      status: 500,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message:', error.message);

    return {
      message: error.message || 'An error occurred',
      status: 500,
    };
  }
};

// Get API URL from environment variables
const getApiUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return apiUrl.endsWith('/api/v1') ? apiUrl : `${apiUrl}/api/v1`;
  }
  return 'http://localhost:3000/api/v1';
};

const api = axios.create({
  baseURL: getApiUrl(),
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
      config.headers.authorization = `Bearer ${token}`;
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
