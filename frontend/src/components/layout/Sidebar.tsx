import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Trophy, 
  Heart, 
  User as UserIcon,
  ShieldAlert,
  Wallet,
  Gift,
  Bell,
  Leaf,
  Medal,
  X 
} from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, closeSidebar]);

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', active: location.pathname === '/dashboard' },
    { name: 'Impact', icon: <Leaf size={20} />, path: '/impact', active: location.pathname === '/impact' },
    { name: 'Scores', icon: <BarChart3 size={20} />, path: '/scores', active: location.pathname === '/scores' },
    { name: 'Leaderboard', icon: <Medal size={20} />, path: '/leaderboard', active: location.pathname === '/leaderboard' },
    { name: 'Draws', icon: <Trophy size={20} />, path: '/draws', active: location.pathname === '/draws' },
    { name: 'Subscription', icon: <Wallet size={20} />, path: '/subscribe', active: location.pathname === '/subscribe' },
    { name: 'Charity', icon: <Heart size={20} />, path: '/charities', active: location.pathname === '/charities' },
    { name: 'Perks', icon: <Gift size={20} />, path: '/perks', active: location.pathname === '/perks' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/notifications', active: location.pathname === '/notifications' },
    { name: 'Profile', icon: <UserIcon size={20} />, path: '/profile', active: location.pathname === '/profile' },
    { name: 'Admin', icon: <ShieldAlert size={20} />, path: '/admin', active: location.pathname === '/admin' },
  ];

  if (!user) return null;

  return (
    <>
      {/* Overlay for mobile outside-click closing */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden" />
      )}
      
      <aside 
        ref={sidebarRef}
        className={`flex flex-col w-64 bg-surface-container-low border-r border-outline-variant/10 p-6 fixed left-0 top-0 h-screen z-[70] transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-10">
          <Link 
            to="/" 
            onClick={closeSidebar}
            className="text-xl font-black tracking-tighter text-primary uppercase italic"
          >
            Digital <span className="text-secondary underline underline-offset-4 decoration-2">Clubhouse</span>
          </Link>
          <button 
            onClick={closeSidebar}
            className="lg:hidden p-2 text-primary hover:bg-surface-container-high rounded-xl"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-3 py-1 bg-primary/5 rounded-full border border-primary/10 mb-8 inline-flex items-center gap-2 w-max">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
          <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">Premium Access</span>
        </div>

        <nav className="space-y-1 flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => { if (window.innerWidth < 1024) closeSidebar(); }}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                item.active 
                ? 'bg-primary text-white shadow-xl shadow-primary/20 font-bold scale-[1.02]' 
                : 'text-on-surface-variant hover:bg-surface-container-high font-medium'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Link
            to="/subscribe"
            onClick={() => { if (window.innerWidth < 1024) closeSidebar(); }}
            className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-secondary/20 transition-all flex items-center justify-center gap-2 active:scale-95 italic"
          >
            <Trophy size={16} fill="currentColor" />
            Join the Fund
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
