import React, { useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Dice5,
  Settings,
  HelpCircle,
  LogOut,
  X 
} from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isAdminPath = location.pathname.startsWith('/admin');

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

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    closeSidebar();
  };

  const navItems = isAdminPath ? [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin', active: location.pathname === '/admin' },
    { name: 'Draw Simulator', icon: <Dice5 size={20} />, path: '/admin/draw-simulator', active: location.pathname === '/admin/draw-simulator' },
    { name: 'Verification', icon: <ShieldAlert size={20} />, path: '/admin/verification', active: location.pathname === '/admin/verification' },
    { name: 'Charity Partners', icon: <Heart size={20} />, path: '/admin/charity-partners', active: location.pathname === '/admin/charity-partners' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings', active: location.pathname === '/admin/settings' },
  ] : (user ? [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', active: location.pathname === '/dashboard' },
    { name: 'Draw Simulator', icon: <Dice5 size={20} />, path: '/draw-simulator', active: location.pathname === '/draw-simulator' },
    { name: 'Verification', icon: <ShieldAlert size={20} />, path: '/verification', active: location.pathname === '/verification' || location.pathname === '/winner-proof' },
    { name: 'Impact', icon: <Leaf size={20} />, path: '/impact', active: location.pathname === '/impact' },
    { name: 'Scores', icon: <BarChart3 size={20} />, path: '/scores', active: location.pathname === '/scores' },
    { name: 'Leaderboard', icon: <Medal size={20} />, path: '/leaderboard', active: location.pathname === '/leaderboard' },
    { name: 'Draws', icon: <Trophy size={20} />, path: '/draws', active: location.pathname === '/draws' },
    { name: 'Billing', icon: <Wallet size={20} />, path: '/billing', active: location.pathname === '/billing' },
    { name: 'Subscription', icon: <Gift size={20} />, path: '/subscribe', active: location.pathname === '/subscribe' },
    { name: 'Charity', icon: <Heart size={20} />, path: '/charities', active: location.pathname === '/charities' },
    { name: 'Perks', icon: <Gift size={20} />, path: '/perks', active: location.pathname === '/perks' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/notifications', active: location.pathname === '/notifications' },
    { name: 'Profile', icon: <UserIcon size={20} />, path: '/profile', active: location.pathname === '/profile' },
  ] : [
    { name: 'Home', icon: <LayoutDashboard size={20} />, path: '/', active: location.pathname === '/' },
    { name: 'Impact', icon: <Leaf size={20} />, path: '/impact', active: location.pathname === '/impact' },
    { name: 'Leaderboard', icon: <Medal size={20} />, path: '/leaderboard', active: location.pathname === '/leaderboard' },
    { name: 'Perks', icon: <Gift size={20} />, path: '/perks', active: location.pathname === '/perks' },
    { name: 'Charities', icon: <Heart size={20} />, path: '/charities', active: location.pathname === '/charities' },
  ]);

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
            {isAdminPath ? 'Admin' : 'Digital'} <span className="text-secondary underline underline-offset-4 decoration-2">Clubhouse</span>
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

        <nav className="space-y-1 flex-grow overflow-y-auto pr-2 custom-scrollbar">
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

        <div className="mt-auto space-y-4 pt-8 border-t border-outline-variant/10">
          <Link
            to="/support"
            onClick={closeSidebar}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl text-on-surface-variant hover:bg-surface-container-high font-medium transition-all"
          >
            <HelpCircle size={20} />
            <span className="text-sm">Support</span>
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-error hover:bg-error/5 font-medium transition-all"
            >
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          ) : (
            <div className="space-y-3 pt-2">
              <Link
                to="/login"
                onClick={closeSidebar}
                className="w-full flex items-center justify-center py-4 text-primary font-black uppercase tracking-widest text-xs border-2 border-primary/20 rounded-2xl hover:bg-primary/5 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeSidebar}
                className="w-full flex items-center justify-center py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
              >
                Join Now
              </Link>
            </div>
          )}
          {isAdminPath && (
            <button 
              onClick={() => navigate('/admin/draw-simulator')}
              className="w-full bg-[#fed65b] text-[#002819] py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 italic"
            >
               Simulate Draw
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
