import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useSidebar } from './context/SidebarContext';
import { useAuth } from './context/AuthContext';

// Real Pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Charities from './pages/charities/Charities';
import Subscribe from './pages/subscription/Subscribe';
import Scores from './pages/scores/Scores';
import Draws from './pages/draws/Draws';
import Admin from './pages/admin/Admin';
import Profile from './pages/profile/Profile';
import LogScore from './pages/scores/LogScore';
import Success from './pages/subscription/Success';
import PaymentFailed from './pages/subscription/PaymentFailed';
import ForgotPassword from './pages/auth/ForgotPassword';
import Perks from './pages/perks/Perks';
import Notifications from './pages/notifications/Notifications';
import ImpactReports from './pages/impact/ImpactReports';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Privacy from './pages/support/Privacy';
import Terms from './pages/support/Terms';
import Support from './pages/support/Support';

const AppContent: React.FC = () => {
  const { isSidebarOpen } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-on-background font-sans selection:bg-charity-500/30 selection:text-white flex flex-col">
      <Navbar />
      <Sidebar />
      
      <main className={`flex-grow pt-16 transition-all duration-300 ${user && isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/charities" element={<Charities />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/support" element={<Support />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/scores/new" element={<LogScore />} />
            <Route path="/draws" element={<Draws />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/success" element={<Success />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/perks" element={<Perks />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/impact" element={<ImpactReports />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/winner-proof" element={<div className="p-10 text-center font-black text-4xl mt-20 text-slate-700 uppercase tracking-tighter italic">Proof of Win <br/> Verification <span className="text-charity-500 underline underline-offset-8">Pending.</span></div>} />
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
              <h1 className="text-8xl font-black text-on-surface/10 tracking-tighter italic">404</h1>
              <p className="text-2xl font-black text-on-surface tracking-tight mt-4 italic uppercase">Page Not Found</p>
              <p className="text-on-surface-variant/50 mt-2 font-medium">The page you're looking for doesn't exist in the clubhouse.</p>
              <Link to="/" className="mt-8 px-8 py-4 bg-[#002819] text-white rounded-2xl font-bold text-sm hover:scale-[1.02] transition-all shadow-lg">Return Home</Link>
            </div>
          } />

        </Routes>
        </AnimatePresence>
      </main>
      
      <footer className={`border-t border-slate-800/50 py-20 bg-dark-950 text-slate-400 px-4 mt-auto transition-all duration-300 ${user && isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Golf Charity <span className="text-charity-600">Platform</span></h3>
            <p className="text-slate-500 text-sm font-medium tracking-tight">The world's leading impact-driven golfer community.</p>
          </div>
          <div className="flex space-x-10 text-slate-500 text-xs font-black uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-charity-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-charity-500 transition-colors">Terms</Link>
            <Link to="/support" className="hover:text-charity-500 transition-colors">Support</Link>
          </div>
          <div className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} G.C.P International
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppContent;
