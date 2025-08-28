import api from '../utils/api';

// create new response
export const signUp = async (data) => {
  try {
    const response = await api.post('/auth/signup', data);
    return response.data.data.user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// response login func
export const login = async (data) => {
  const response = await api.post('/auth/login', data);

  return response.data.data.user;
};
// log out user
export const logOut = async () => {
  const response = await api.get('/auth/logOut');

  return response.data;
};
// forget password
export const forgotPassword = async (data) => {
  const response = await api.post('/auth/forgotPassword', data);

  return response.data;
};

// reset password
export const resetPassword = async (data) => {
  const response = await api.patch('/auth/resetPassword', data);

  return response.data;
};

// update password
export const updatePassword = async (data) => {
  const response = await api.patch('/auth/updatePassword', data);

  return response.data;
};
