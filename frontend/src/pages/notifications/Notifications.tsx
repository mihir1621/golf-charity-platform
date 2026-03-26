import { motion } from 'framer-motion';
import { 
  Trophy, 
  TreePine, 
  Award, 
  Lock, 
  Megaphone,
  Settings,
  CheckCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotificationItem {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  badges?: { label: string; variant: 'green' | 'dark' }[];
  unread?: boolean;
}

interface NotificationSection {
  category: string;
  accentColor: string;
  items: NotificationItem[];
}

const Notifications = () => {
  const navigate = useNavigate();

  const sections: NotificationSection[] = [
    {
      category: 'Draw Results',
      accentColor: 'bg-[#fed65b]',
      items: [
        {
          icon: <Trophy size={18} className="text-[#c9a820]" />,
          iconBg: 'bg-[#fed65b]/15',
          title: 'Quarterly Founders Draw',
          description: "Congratulations! You've secured a spot in the Top 50 participants for the Summer Gala. Check your dash for details.",
          time: '2h ago',
          badges: [
            { label: 'Winner', variant: 'green' },
            { label: 'Founder Tier', variant: 'dark' },
          ],
        },
      ],
    },
    {
      category: 'Impact Alerts',
      accentColor: 'bg-[#002819]',
      items: [
        {
          icon: <TreePine size={18} className="text-primary" />,
          iconBg: 'bg-primary/10',
          title: 'Forest Restoration Project',
          description: 'Your contributions helped plant over 500 indigenous trees this month. View the project gallery now.',
          time: 'Yesterday',
          unread: true,
        },
      ],
    },
    {
      category: 'Membership Updates',
      accentColor: 'bg-on-surface-variant/20',
      items: [
        {
          icon: <Award size={18} className="text-[#c9a820]" />,
          iconBg: 'bg-[#fed65b]/10',
          title: 'Tier Upgrade Available',
          description: "You're only $250 away from reaching 'Elite Clubhouse' status. Unlock new perks today.",
          time: '3 days ago',
        },
        {
          icon: <Lock size={18} className="text-on-surface-variant/50" />,
          iconBg: 'bg-surface-container-high',
          title: 'Security Notice',
          description: "A new login was detected from London, UK. If this wasn't you, please reset your password.",
          time: 'Last week',
        },
      ],
    },
    {
      category: 'General',
      accentColor: 'bg-on-surface-variant/20',
      items: [
        {
          icon: <Megaphone size={18} className="text-on-surface-variant/50" />,
          iconBg: 'bg-surface-container-high',
          title: 'Digital Clubhouse v2.0',
          description: "We've updated our interface to provide a smoother, faster experience for all members.",
          time: 'Oct 12',
        },
      ],
    },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-10">

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-black text-[#002819] tracking-tight">Notification Center</h1>
          <p className="text-sm text-on-surface-variant/50 font-medium mt-2 max-w-md leading-relaxed">
            Stay updated on your membership status, impact goals, and exclusive clubhouse updates.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button className="px-6 py-3.5 border border-black/[0.08] rounded-xl text-xs font-bold text-[#002819] hover:bg-[#f5f5f5] transition-colors flex items-center gap-2">
            <CheckCheck size={15} />
            Mark all as read
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="px-6 py-3.5 bg-[#002819] text-white rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg"
          >
            <Settings size={15} />
            Notification Settings
          </button>
        </div>
      </motion.div>

      {/* Notification Sections */}
      <div className="space-y-10">
        {sections.map((section, si) => (
          <motion.section
            key={section.category}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.08 }}
            className="space-y-4"
          >
            {/* Section Header */}
            <div className="flex items-center gap-3">
              <div className={`w-6 h-[3px] rounded-full ${section.accentColor}`}></div>
              <h3 className="text-[10px] font-black text-[#002819] uppercase tracking-[0.25em]">
                {section.category}
              </h3>
            </div>

            {/* Notification Items */}
            <div className="space-y-3">
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  className={`bg-white rounded-2xl p-6 border border-black/[0.03] shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-shadow cursor-pointer group relative ${
                    si === 0 && ii === 0 ? 'border-l-4 border-l-[#fed65b]' : ''
                  } ${
                    item.unread ? 'border-l-4 border-l-[#002819]' : ''
                  }`}
                >
                  <div className="flex gap-5">
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4 mb-1.5">
                        <h4 className="text-sm font-bold text-[#002819] group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[11px] font-medium text-on-surface-variant/40">{item.time}</span>
                          {item.unread && (
                            <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant/50 font-medium leading-relaxed">
                        {item.description}
                      </p>

                      {/* Badges */}
                      {item.badges && (
                        <div className="flex gap-2 mt-3">
                          {item.badges.map(badge => (
                            <span
                              key={badge.label}
                              className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md ${
                                badge.variant === 'green'
                                  ? 'bg-primary text-white'
                                  : 'bg-[#002819] text-white'
                              }`}
                            >
                              {badge.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
