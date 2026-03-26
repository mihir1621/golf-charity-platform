import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Key } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-4 min-h-[60vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-dark-800 border border-slate-700/50 rounded-3xl shadow-2xl p-10 relative"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-charity-600/20 text-charity-500 rounded-2xl mb-6">
            <Key size={30} fill="currentColor" opacity={0.8} />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Back in the Game</h2>
          <p className="text-slate-400 mt-2 font-medium tracking-wide uppercase text-xs">Unlock Your Impact Dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-2xl text-sm mb-6 flex items-center space-x-2">
            <span className="shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Member Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-charity-500 transition-colors" size={18} />
              <input
                type="email"
                required
                className="input-field pl-12 h-12"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1 flex justify-between">
              <span>Password</span>
              <span className="text-charity-500 text-xs hover:text-charity-400 cursor-pointer font-bold uppercase transition-colors">Forgot?</span>
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-charity-500 transition-colors" size={18} />
              <input
                type="password"
                required
                className="input-field pl-12 h-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary h-14 relative overflow-hidden flex items-center justify-center group"
          >
            {loading ? <Loader2 className="animate-spin text-white" size={28} /> : (
              <>
                <span className="text-lg font-bold tracking-tight uppercase">Enter Dashboard</span>
                <ArrowRight className="ml-3 group-hover:translate-x-1.5 transition-transform" size={20} />
              </>
            )}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[100%] transition-all duration-700"></div>
          </button>
        </form>

        <div className="text-center mt-12 py-6 border-t border-slate-700/50">
          <p className="text-slate-400 font-medium">
            New around here? {' '}
            <Link to="/signup" className="text-charity-400 hover:text-charity-300 font-bold transition-all px-1 decoration-slate-800 underline underline-offset-4 decoration-2">
              Join Membership
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
