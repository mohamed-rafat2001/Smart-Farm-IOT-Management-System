import api from '../utils/api';

// get user by add id
export const getUserById = async (id) => {
  const response = await api.post(`/user`, id);

  return response.data;
};

// get user by id params
export const userByIdParam = async (id) => {
  const response = await api.get(`/user/${id}`);

  return response.data;
};
// get user profile
export const getMe = async () => {
  const response = await api.get('/user');

  return response.data.data;
};

// delete user by him self
export const deleteMyAccount = async () => {
  const response = await api.delete('/user');

  return response.data;
};

// update my account data

export const updateMyAccData = async (data) => {
  const response = await api.patch('/user', data);

  return response.data;
};

// upload userImg
export const userImg = async (data, options = {}) => {
  // Ensure we have FormData
  if (!(data instanceof FormData)) {
    throw new Error('Data must be FormData');
  }

  // Validate that photo field exists
  const photo = data.get('photo');
  if (!photo) {
    throw new Error('No photo file found in FormData');
  }

  try {
    // Add timeout configuration for this specific request
    const response = await api.patch('/user/userImg', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 120 seconds for image upload (increased)
      onUploadProgress: options.onUploadProgress,
    });

    return response.data;
  } catch (error) {
    // Provide more specific error messages
    if (error.code === 'ECONNABORTED') {
      throw new Error(
        'Upload timeout - please try again with a smaller image or check your connection'
      );
    }

    if (error.response?.status === 413) {
      throw new Error('File too large - please select an image under 5MB');
    }

    if (error.response?.status === 400) {
      throw new Error('Invalid file type - please select an image file');
    }

    throw new Error(error.message || 'Upload failed - please try again');
  }
};
