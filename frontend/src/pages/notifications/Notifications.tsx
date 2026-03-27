import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  TreePine, 
  Award, 
  Megaphone,
  Settings,
  CheckCheck,
  Loader2,
  Inbox
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import PageTransition from '../../components/animations/PageTransition';

interface NotificationItem {
  id: string;
  type: 'draw' | 'impact' | 'membership' | 'general';
  title: string;
  description: string;
  unread: boolean;
  createdAt: any;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await apiClient.get('/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    try {
      await apiClient.post('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'draw': return { icon: <Trophy size={18} className="text-[#c9a820]" />, bg: 'bg-[#fed65b]/15' };
      case 'impact': return { icon: <TreePine size={18} className="text-primary" />, bg: 'bg-primary/10' };
      case 'membership': return { icon: <Award size={18} className="text-[#c9a820]" />, bg: 'bg-[#fed65b]/10' };
      case 'general': default: return { icon: <Megaphone size={18} className="text-on-surface-variant/50" />, bg: 'bg-surface-container-high' };
    }
  };

  const getTimeAgo = (date: any) => {
    if (!date) return '';
    const d = new Date(date._seconds * 1000 || date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <PageTransition className="p-6 lg:p-10 max-w-4xl mx-auto space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-black text-[#002819] tracking-tight">Notification Center</h1>
          <p className="text-sm text-on-surface-variant/80 font-medium mt-2 max-w-md leading-relaxed">
            Stay updated on your membership status, impact goals, and exclusive clubhouse updates.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button 
            onClick={markAllRead}
            className="px-6 py-3.5 border border-black/[0.08] rounded-xl text-xs font-bold text-[#002819] hover:bg-[#f5f5f5] transition-colors flex items-center gap-2"
          >
            <CheckCheck size={15} />
            Mark all as read
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="px-6 py-3.5 bg-[#002819] text-white rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg"
          >
            <Settings size={15} />
            Settings
          </button>
        </div>
      </motion.div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => {
            const { icon, bg } = getIcon(notif.type);
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => markAsRead(notif.id)}
                className={`bg-white rounded-2xl p-6 border border-black/[0.03] shadow-sm hover:shadow-md transition-all cursor-pointer group relative ${
                  notif.unread ? 'border-l-4 border-l-primary bg-primary/[0.01]' : ''
                }`}
              >
                <div className="flex gap-4 sm:gap-5">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl ${bg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm border border-black/5`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-3 sm:gap-4 mb-1.5 sm:mb-2 ml-0.5">
                       <h4 className={`text-xs sm:text-sm font-black italic uppercase tracking-tight ${notif.unread ? 'text-primary' : 'text-[#002819]'}`}>
                        {notif.title}
                       </h4>
                       <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-on-surface-variant/30 shrink-0">{getTimeAgo(notif.createdAt)}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-on-surface-variant/70 font-medium leading-relaxed italic pr-2 sm:pr-0">
                      {notif.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 opacity-40">
            <Inbox size={64} strokeWidth={1} />
            <p className="font-bold italic uppercase tracking-widest text-xs">The Digital Clubhouse is quiet today.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Notifications;
