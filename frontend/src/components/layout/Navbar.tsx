import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth as firebaseAuth } from '../../config/firebase';
import { Menu, X, LogOut, User as UserIcon, Bell, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../../context/SidebarContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/80 dark:bg-[#191c1e]/80 backdrop-blur-xl shadow-[0px_12px_32px_rgba(25,28,30,0.06)] h-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-8">
        <div className="flex items-center gap-6 md:gap-10">
          <div className="flex items-center gap-4">
             {user && (
               <button 
                 onClick={toggleSidebar}
                 className="p-2 hover:bg-surface-container rounded-xl transition-all text-primary"
               >
                 {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
               </button>
             )}
             
             {/* Only show Navbar logo if sidebar is CLOSED or user is NOT logged in */}
             {(!user || !isSidebarOpen) && (
               <Link to="/" className="flex items-center space-x-3 group">
                 <span className="text-lg font-black tracking-tighter text-[#002819] dark:text-white uppercase transition-all duration-300">
                   Digital <span className="text-secondary underline decoration-[#735c00] decoration-2 underline-offset-4">Clubhouse</span>
                 </span>
               </Link>
             )}
          </div>
          <div className="hidden md:flex gap-8 items-center font-sans text-sm font-semibold">
            {menuItems.map((item) => (
              !item.hidden && (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-on-surface-variant hover:text-primary transition-all relative group py-1"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            ))}
          </div>

          {/* Search Bar - Only on Dashboard for authenticated users */}
          {user && isDashboard && (
            <div className="hidden lg:flex items-center gap-4 ml-10">
              <div className="relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-hover:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search members or events..."
                  className="bg-surface-container-low border-none rounded-full pl-12 pr-6 py-2.5 text-sm w-80 focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-on-surface-variant/30"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          {user && isDashboard && (
            <div className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest italic leading-none">Elite Member</span>
            </div>
          )}

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigate('/notifications')}
              className="text-on-surface-variant p-2 hover:bg-surface-container rounded-xl transition-all relative"
            >
              <Bell size={20} className="text-on-surface-variant/80" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-[1px] bg-outline-variant/30"></div>
          </div>

          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                 <div className="flex items-center space-x-2 bg-surface-container rounded-full px-5 py-2 border border-outline-variant/10 shadow-sm">
                    <UserIcon size={14} className="text-primary" />
                    <span className="text-xs font-black uppercase text-primary tracking-tight">{user.displayName || user.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-on-surface-variant hover:text-error hover:bg-error/5 rounded-full transition-all"
                  >
                    <LogOut size={20} />
                  </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-on-surface-variant hover:text-primary px-4 py-2 text-sm font-black uppercase tracking-tight"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase hover:opacity-90 shadow-lg transition-all active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-on-surface-variant hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-dark-900 border-b border-outline-variant/20 shadow-2xl overflow-hidden"
          >
            <div className="px-6 pt-6 pb-10 space-y-4">
              {menuItems.map((item) => (
                !item.hidden && (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-bold text-on-surface hover:text-primary py-2 border-b border-outline-variant/10"
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="pt-6 flex flex-col gap-4">
                {!user && (
                   <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-4 text-on-surface-variant font-black uppercase tracking-widest">Login</Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Join Now</Link>
                   </>
                )}
                {user && (
                  <button onClick={handleLogout} className="w-full text-center py-4 text-error font-black uppercase tracking-widest bg-error/5 rounded-2xl">Logout</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
