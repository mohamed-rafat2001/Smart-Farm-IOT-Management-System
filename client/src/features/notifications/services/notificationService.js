import api from '../../../shared/utils/api';

export const getMyNotifications = async () => {
  const response = await api.get('/notification/my-notifications');
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await api.patch(`/notification/${id}/mark-read`);
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await api.patch('/notification/mark-all-read');
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/notification/${id}`);
  return response.data;
};
