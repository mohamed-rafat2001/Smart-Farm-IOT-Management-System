import api from '../../../shared/utils/api';

// Get all users in the system
export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

// Get top 20 recent users
export const getTopUsers = async () => {
  const response = await api.get('/admin/top-20-users');
  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

// Create new user
export const createUser = async (userData) => {
  const response = await api.post('/admin/users', userData);
  return response.data;
};

// Update user
export const updateUser = async (id, userData) => {
  const response = await api.patch(`/admin/users/${id}`, userData);
  return response.data;
};

// Delete/Deactivate user
export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

// Get all farms
export const getAllFarms = async () => {
  const response = await api.get('/admin/farms');
  return response.data;
};

// Delete farm
export const deleteFarm = async (id) => {
  const response = await api.delete(`/admin/farms/${id}`);
  return response.data;
};

// Get system statistics (custom endpoint -  may need to be added to backend)
export const getSystemStats = async () => {
  try {
    const [usersResponse, farmsResponse] = await Promise.all([
      api.get('/admin/users'),
      api.get('/admin/farms'),
    ]);

    const users = usersResponse.data.data?.docs || [];
    const farms = farmsResponse.data.data?.docs || [];

    return {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.active).length,
      totalFarms: farms.length,
      activeFarms: farms.filter((f) => f.active).length,
      recentUsers: users.slice(0, 5),
      recentFarms: farms.slice(0, 5),
    };
  } catch (error) {
    console.error('Error fetching system stats:', error);
    throw error;
  }
};

