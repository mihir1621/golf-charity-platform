import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useSidebar } from './context/SidebarContext';
import { useAuth } from './context/AuthContext';

// Real Pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Charities from './pages/charities/Charities';
import CharityProfile from './pages/charities/CharityProfile';
import Billing from './pages/subscription/Billing';
import Subscribe from './pages/subscription/Subscribe';
import Scores from './pages/scores/Scores';
import Draws from './pages/draws/Draws';
import Admin from './pages/admin/Admin';
import DrawSimulatorAdmin from './pages/admin/DrawSimulatorAdmin';
import Profile from './pages/profile/Profile';
import LogScore from './pages/scores/LogScore';
import Success from './pages/subscription/Success';
import PaymentFailed from './pages/subscription/PaymentFailed';
import ForgotPassword from './pages/auth/ForgotPassword';
import Perks from './pages/perks/Perks';
import Notifications from './pages/notifications/Notifications';
import ImpactReports from './pages/impact/ImpactReports';
import Leaderboard from './pages/leaderboard/Leaderboard';
import WinnerVerification from './pages/draws/WinnerVerification';
import DrawSimulator from './pages/draws/DrawSimulator';
import Privacy from './pages/support/Privacy';
import Terms from './pages/support/Terms';
import Support from './pages/support/Support';

const AppContent: React.FC = () => {
  const { isSidebarOpen } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();

  const hideNavFooter = ['/login', '/signup', '/forgot-password', '/success', '/payment-failed', '/verification', '/winner-proof'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-on-background font-sans selection:bg-charity-500/30 selection:text-white flex flex-col overflow-x-hidden w-full">
      {!hideNavFooter && <Navbar />}
      {!hideNavFooter && <Sidebar />}
      
      <main className={`flex-grow ${!hideNavFooter ? 'pt-16' : ''} transition-all duration-300 w-full max-w-full overflow-x-hidden ${!hideNavFooter && user && isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
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
            <Route path="/admin/draw-simulator" element={<DrawSimulatorAdmin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verification" element={<WinnerVerification />} />
            <Route path="/winner-proof" element={<WinnerVerification />} />
            <Route path="/draw-simulator" element={<DrawSimulator />} />
            <Route path="/charity/:id" element={<CharityProfile />} />
            <Route path="/billing" element={<Billing />} />
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
      
      <AnimatePresence>
        {!hideNavFooter && <Footer />}
      </AnimatePresence>
    </div>
  );
};

export default AppContent;
