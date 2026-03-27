import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export const useNotifications = () => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    if (!user) return;
    try {
      const res = await apiClient.get('/notifications');
      const unread = res.data.filter((n: any) => n.unread).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error('Failed to fetch unread count:', err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    
    // Simple polling for "real-time" feel without WebSockets
    const interval = setInterval(fetchUnreadCount, 60000); // 1 minute
    return () => clearInterval(interval);
  }, [user]);

  return { unreadCount, refreshNotifications: fetchUnreadCount };
};
