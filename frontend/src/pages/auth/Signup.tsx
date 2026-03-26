import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Heart, Percent, ArrowRight, Loader2, Info } from 'lucide-react';

const charities = [
  { id: '1', name: 'Golf for Kids' },
  { id: '2', name: 'Cancer Research' },
  { id: '3', name: 'Ocean Clean Up' },
  { id: '4', name: 'Food Support Network' }
];

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    charityId: '',
    charityContributionPercent: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'charityContributionPercent' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.charityContributionPercent < 10) {
        throw new Error('Minimum charity contribution is 10%.');
      }

      // 1. Call Backend API to create user record in Firebase Auth + Firestore + Stripe Customer
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/auth/signup`, formData);

      // 2. Sign in the user on the client side using Firebase Auth
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Signup error:', err);
      // Detailed error extractor
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred during signup.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-dark-800 border border-slate-700/50 rounded-3xl shadow-2xl p-10 relative overflow-hidden"
      >
        {/* Abstract background highlight */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-charity-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-charity-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-charity-600/20 text-charity-500 rounded-2xl mb-6">
            <Heart size={36} fill="currentColor" />
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Join the Mission</h2>
          <p className="text-slate-400 mt-2 font-medium tracking-wide uppercase text-xs">Track Scores • Win Big • Change Lives</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-2xl text-sm mb-8 flex items-start space-x-3 backdrop-blur-sm"
          >
            <Info size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-charity-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="displayName"
                  required
                  className="input-field pl-12 h-12"
                  placeholder="John Doe"
                  value={formData.displayName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-charity-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="input-field pl-12 h-12"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Secure Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-charity-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                required
                className="input-field pl-12 h-12"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Choose Global Impact</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-charity-500 transition-colors">
                  <Heart size={18} />
                </div>
                <select
                  name="charityId"
                  required
                  className="input-field pl-12 h-12 appearance-none bg-slate-800"
                  value={formData.charityId}
                  onChange={handleChange}
                >
                  <option value="">Select Target</option>
                  {charities.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1 flex justify-between items-center">
                <span>Contribution</span>
                <span className="text-charity-500 text-xs font-bold uppercase">{formData.charityContributionPercent}%</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-charity-500 transition-colors">
                  <Percent size={18} />
                </div>
                <input
                  type="number"
                  name="charityContributionPercent"
                  min="10"
                  max="100"
                  required
                  className="input-field pl-12 h-12"
                  value={formData.charityContributionPercent}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">Minimum contribution of 10% is required per win</p>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary h-14 relative overflow-hidden flex items-center justify-center group"
          >
            {loading ? (
              <Loader2 className="animate-spin text-white" size={28} />
            ) : (
              <>
                <span className="text-lg font-bold tracking-tight uppercase">Launch My Membership</span>
                <ArrowRight className="ml-3 group-hover:translate-x-1.5 transition-transform" size={20} />
              </>
            )}
            {/* Glossy overlay effect for premium feel */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
          </button>
        </form>

        <div className="text-center mt-10 pt-8 border-t border-slate-700/50">
          <p className="text-slate-400 font-medium">
            Member already? {' '}
            <Link to="/login" className="text-charity-400 hover:text-charity-300 font-bold transition-all px-1 decoration-slate-800 underline underline-offset-4 decoration-2">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
