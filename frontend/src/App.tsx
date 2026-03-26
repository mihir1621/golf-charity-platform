import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Real Pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Charities from './pages/charities/Charities';
import Subscribe from './pages/subscription/Subscribe';
import Scores from './pages/scores/Scores';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark-900 text-slate-100 font-sans selection:bg-charity-500/30 selection:text-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/charities" element={<Charities />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/scores" element={<Scores />} />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/winner-proof" element={<div className="p-10 text-center font-black text-4xl mt-20 text-slate-700 uppercase tracking-tighter italic">Proof of Win <br/> Verification <span className="text-charity-500 underline underline-offset-8">Pending.</span></div>} />
              </Route>
            </Routes>
          </main>
          
          <footer className="border-t border-slate-800/50 py-20 bg-dark-950 px-4 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Golf Charity <span className="text-charity-600">Platform</span></h3>
                <p className="text-slate-500 text-sm font-medium tracking-tight">The world's leading impact-driven golfer community.</p>
              </div>
              <div className="flex space-x-10 text-slate-500 text-xs font-black uppercase tracking-widest">
                <a href="#" className="hover:text-charity-500 transition-colors">Privacy</a>
                <a href="#" className="hover:text-charity-500 transition-colors">Terms</a>
                <a href="#" className="hover:text-charity-500 transition-colors">Support</a>
              </div>
              <div className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
                &copy; {new Date().getFullYear()} G.C.P International
              </div>
            </div>
            <div className="mt-14 text-center max-w-2xl mx-auto opacity-20 pointer-events-none italic text-[10px] text-slate-400 font-medium">
              Disclaimer: Participants must follow local golf rules and regulations. This platform is not gambling but a charity-based sweepstakes. 100% of contributions are processed through verified financial gateways for maximum security and transparency.
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
