import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { NotificationContext } from './useNotifications';

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notif) => {
    const newNotif = {
      id: Date.now(),
      time: new Date(),
      isRead: false,
      ...notif
    };

    setNotifications(prev => [newNotif, ...prev].slice(0, 50)); 
    
    // Trigger Toast
    const toastIcon = notif.type === 'critical' ? '🚨' : notif.type === 'warning' ? '⚠️' : '✅';
    console.log(`[NotificationProvider] Adding notification:`, newNotif);
    
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
        zIndex: 999999999, // Ensure it's above everything
      },
      duration: 6000
    });
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    console.log(`[NotificationProvider] Marking all notifications as read.`);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllAsRead, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
