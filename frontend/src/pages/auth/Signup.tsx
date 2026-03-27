import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Loader2, 
  User, 
  Mail, 
  Lock, 
  Heart, 
  ChevronRight, 
  ArrowLeft,
  ShieldCheck,
  Trophy
} from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const charities = [
  { id: 'youth', name: 'Junior Golf Development' },
  { id: 'env', name: 'Environmental Stewardship' },
  { id: 'vet', name: 'Veteran Support Programs' },
  { id: 'edu', name: 'Educational Scholarships' }
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
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'charityContributionPercent' ? Number(value) : value,
    }));
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/auth/social-sync`, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google signup error:', err);
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.charityId) {
        throw new Error('Please select a charity to support.');
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/auth/signup`, formData);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Signup error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred during signup.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Column: Brand Hero - Hidden on Mobile */}
      <div className="hidden lg:flex w-1/2 bg-[#002819] relative overflow-hidden flex-col justify-between p-24 text-white">
         <div className="relative z-10">
            <Link to="/" className="flex items-center gap-4 group w-max">
               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl group-hover:rotate-6 transition-transform">
                  <Trophy size={24} className="text-[#fed65b]" />
               </div>
               <span className="text-3xl font-black italic tracking-tighter uppercase">Digital <span className="text-primary underline decoration-secondary decoration-2">Clubhouse</span></span>
            </Link>
         </div>

         <div className="relative z-10 space-y-8">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none border-l-8 border-primary pl-12">
               Elevate <br />
               Every <br />
               <span className="text-[#fed65b]">Swing.</span>
            </h2>
            <p className="text-xl font-medium italic text-white/50 max-w-lg leading-relaxed">
               Join the world's most exclusive clubhouse for golfers who play for impact. One subscription, global change.
            </p>
         </div>

         <div className="relative z-10 flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] italic opacity-40">
            <span>© 2026 G.C.P International</span>
            <div className="flex gap-8">
               <Link to="/privacy">Privacy</Link>
               <Link to="/terms">Terms</Link>
            </div>
         </div>

         {/* Abstract Decos */}
         <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[150%] h-[150%] border-[40px] border-white/10 rounded-full"></div>
            <div className="absolute -bottom-1/4 -left-1/4 w-[100%] h-[100%] border-[20px] border-white/5 rounded-full"></div>
         </div>
      </div>

      {/* Right Column: Registration Form - Responsive */}
      <div className="flex-1 min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 bg-[#fafafa]">
         <div className="w-full max-w-xl space-y-12">
            <div>
               <Link to="/" className="lg:hidden flex items-center gap-3 mb-10 text-primary group">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Return Home</span>
               </Link>
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block italic">Enlistment Portal</span>
               <h1 className="text-4xl md:text-6xl font-black text-[#002819] italic tracking-tighter uppercase leading-none">
                  Establish Your <br />
                  <span className="text-primary underline decoration-secondary/20 underline-offset-[10px]">Credential.</span>
               </h1>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-error/5 border border-error/10 text-error px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest italic"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
               {/* Google Integration */}
               <button
                 onClick={handleGoogleSignup}
                 disabled={loading}
                 className="w-full flex items-center justify-center gap-6 py-6 bg-white hover:bg-black/5 transition-all rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] italic border-2 border-black/5 shadow-xl shadow-black/5 disabled:opacity-50"
                 type="button"
               >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                 </svg>
                 Synchronize with Google
               </button>

               <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-black/5"></div>
                  <span className="flex-shrink mx-6 text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.5em] italic leading-none">Registration Path B</span>
                  <div className="flex-grow border-t border-black/5"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2 italic">Professional Name</label>
                     <div className="relative group">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/20 group-focus-within:text-primary transition-all shadow-sm" size={20} />
                        <input
                          id="displayName"
                          name="displayName"
                          required
                          placeholder="Tiger Woods"
                          type="text"
                          value={formData.displayName}
                          onChange={handleChange}
                          className="w-full h-18 pl-14 pr-6 bg-white rounded-2xl border border-black/5 italic text-sm font-black uppercase tracking-tight transition-all focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2 italic">Secure Email</label>
                     <div className="relative group">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/20 group-focus-within:text-primary transition-all shadow-sm" size={20} />
                        <input
                          id="email"
                          name="email"
                          required
                          placeholder="tiger@clubhouse.com"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full h-18 pl-14 pr-6 bg-white rounded-2xl border border-black/5 italic text-sm font-black uppercase tracking-tight transition-all focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2 italic">Cipher Password</label>
                     <div className="relative group">
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/20 group-focus-within:text-primary transition-all shadow-sm" size={20} />
                        <input
                          id="password"
                          name="password"
                          required
                          placeholder="••••••••"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full h-18 pl-14 pr-6 bg-white rounded-2xl border border-black/5 italic text-sm font-black uppercase tracking-tight transition-all focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2 italic">Impact Strategy</label>
                     <div className="relative group">
                        <Heart className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/20 group-focus-within:text-primary transition-all shadow-sm" size={20} />
                        <select
                          id="charityId"
                          name="charityId"
                          required
                          value={formData.charityId}
                          onChange={handleChange}
                          className="w-full h-18 pl-14 pr-10 bg-white rounded-2xl border border-black/5 italic text-[11px] font-black uppercase tracking-tight transition-all focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Deploy Resources To...</option>
                          {charities.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant/20 rotate-90" size={16} />
                     </div>
                  </div>
               </div>

               <div className="flex items-start gap-4 pt-4">
                  <input className="w-5 h-5 mt-0.5 accent-primary cursor-pointer" id="terms" type="checkbox" required />
                  <label className="text-[10px] md:text-[11px] font-medium text-on-surface-variant/60 italic leading-relaxed" htmlFor="terms">
                     I acknowledge the <Link className="text-primary font-black underline underline-offset-4" to="/terms">Terms of Membership</Link> and authorize <Link className="text-primary font-black underline underline-offset-4" to="/privacy">Identity Protocols</Link>.
                  </label>
               </div>

               <button 
                 disabled={loading}
                 className="w-full group bg-[#002819] text-white py-8 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xs md:text-sm uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-6 italic mt-4 border-b-4 border-black/20"
                 type="submit"
               >
                 {loading ? <Loader2 className="animate-spin" size={28} /> : (
                   <>
                     Authorize Membership
                     <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                   </>
                 )}
               </button>

               <div className="text-center pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] italic">
                  <span className="opacity-40">Previously Authorized?</span>
                  <Link className="text-primary underline decoration-[#fed65b] decoration-2 underline-offset-4" to="/login">Access Terminal</Link>
               </div>
            </form>

            <div className="flex flex-wrap justify-center gap-10 opacity-20 text-[8px] font-black uppercase tracking-[0.4em] italic pt-12">
               <div className="flex items-center gap-2">
                  <ShieldCheck size={14} />
                  Tier-1 Encryption
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-xs">2FA</span>
                  Protocol Enabled
               </div>
            </div>
         </div>
      </div>
    </PageTransition>
  );
};

export default Signup;
