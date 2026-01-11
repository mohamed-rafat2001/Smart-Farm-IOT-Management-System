import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { NotificationContext } from '../hooks/useNotifications';
import * as notificationService from '../services/notificationService';
import api from '../../../shared/utils/api';

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch notifications from backend on mount
  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await notificationService.getMyNotifications();
      if (data.status === 'success') {
        // Map database notifications to local format if needed
        const mapped = data.data.notifications.map((n) => ({
          ...n,
          id: n._id, // Use _id as id
          time: new Date(n.createdAt),
        }));
        setNotifications(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch if we have a token (simple check)
    const token = localStorage.getItem('token');
    if (token) {
      fetchNotifications();
    }
  }, [fetchNotifications]);

  const addNotification = useCallback(async (notif) => {
    const newNotif = {
      id: Date.now(),
      time: new Date(),
      isRead: false,
      ...notif,
    };

    setNotifications((prev) => [newNotif, ...prev].slice(0, 50));

    // Trigger Toast
    const toastIcon =
      notif.type === 'critical' ? '🚨' : notif.type === 'warning' ? '⚠️' : '✅';

    toast(`${notif.title ? notif.title + ': ' : ''}${notif.message}`, {
      icon: toastIcon,
      style: {
        borderRadius: '20px',
        background: '#1b2127',
        color: '#fff',
        border: `2px solid ${notif.type === 'critical' ? '#ef4444' : '#3b82f6'}`,
        fontSize: '15px',
        fontWeight: 'bold',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
        zIndex: 999999999,
      },
      duration: 6000,
    });

    // Option: Persist to DB if needed immediately
    // Note: Usually background processes or sensors create DB notifications,
    // but we can persist explicit UI notifications here too.
  }, []);

  const markAsRead = useCallback(async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    try {
      await notificationService.markAsRead(id);
    } catch (err) {
      console.error('Failed to mark notification as read on server:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await notificationService.markAllAsRead();
    } catch (err) {
      console.error('Failed to mark all notifications as read on server:', err);
    }
  }, []);

  const removeNotification = useCallback(async (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await notificationService.deleteNotification(id);
    } catch (err) {
      console.error('Failed to delete notification on server:', err);
    }
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        isLoading,
        fetchNotifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
