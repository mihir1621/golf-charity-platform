import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, User as UserIcon, Bell, Search } from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';
import { useNotifications } from '../../hooks/useNotifications';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const { unreadCount } = useNotifications();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', hidden: !user },
    { name: 'Impact', path: '/impact', hidden: false },
    { name: 'Perks', path: '/perks', hidden: false },
    { name: 'Leaderboard', path: '/leaderboard', hidden: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#002819] backdrop-blur-xl shadow-[0px_12px_32px_rgba(0,40,25,0.25)] h-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6 md:px-8">
        <div className="flex items-center gap-2 sm:gap-6 md:gap-10">
          <div className="flex items-center gap-2">
             <button 
               onClick={toggleSidebar}
               className="p-2 hover:bg-white/10 rounded-xl transition-all text-white"
               aria-label="Toggle Menu"
             >
               {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
             
             {!isSidebarOpen && (
               <Link to="/" className="flex items-center space-x-3 group min-w-max">
                 <span className="text-sm sm:text-base md:text-lg font-black tracking-tighter text-white uppercase transition-all duration-300">
                   Digital <span className="text-[#fed65b] underline decoration-[#fed65b]/30 decoration-2 underline-offset-4">Clubhouse</span>
                 </span>
               </Link>
             )}
          </div>
          
          <div className="hidden md:flex gap-4 lg:gap-8 items-center font-sans text-sm font-semibold">
            {menuItems.map((item) => (
              !item.hidden && (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white/80 hover:text-[#fed65b] transition-all relative group py-1 whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fed65b] group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            ))}
          </div>

          {user && isDashboard && (
            <div className="hidden lg:flex items-center gap-4 ml-10">
              <div className="relative group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-[#fed65b] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="bg-white/10 border-none rounded-full pl-10 pr-4 py-2 text-xs w-64 lg:w-80 focus:ring-2 focus:ring-[#fed65b]/20 transition-all font-medium placeholder:text-white/20 text-white"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-4">
            <button 
              onClick={() => navigate('/notifications')}
              className="text-white/80 p-2 hover:bg-white/10 rounded-xl transition-all relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-black italic text-white shadow-lg ring-2 ring-[#002819] -translate-y-1/2 translate-x-1/2">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>

          <div className="hidden sm:block">
            {user ? (
              <div className="flex items-center space-x-2 md:space-x-4">
                 <div className="hidden md:flex items-center space-x-2 bg-white/10 rounded-full px-5 py-2 border border-white/10">
                    <UserIcon size={14} className="text-[#fed65b]" />
                    <span className="text-xs font-black uppercase text-white tracking-tight">{user.displayName || user.email?.split('@')[0]}</span>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all">
                    <LogOut size={20} />
                  </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white/80 hover:text-[#fed65b] px-4 py-2 text-xs md:text-sm font-black uppercase tracking-tight">Login</Link>
                <Link to="/signup" className="bg-[#fed65b] text-[#002819] px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-black tracking-widest uppercase shadow-lg">Join</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
