import api from '../../../shared/utils/api';

// create new response
export const signUp = async (data) => {
  const response = await api.post('/auth/signUp', data);

  // Return both user and token
  return {
    ...response.data.data.user,
    token: response.data.data.token,
  };
};

// response login func
export const login = async (data) => {
  const response = await api.post('/auth/login', data);

  // Return both user and token
  return {
    ...response.data.data.user,
    token: response.data.data.token,
  };
};
// log out user
export const logOut = async () => {
  const response = await api.post('/auth/logOut');

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

