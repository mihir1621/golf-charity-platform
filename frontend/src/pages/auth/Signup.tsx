import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
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
  const navigate = useNavigate();

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
    <PageTransition className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-primary-fixed/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[30rem] h-[30rem] rounded-full bg-secondary-fixed/10 blur-[100px] pointer-events-none"></div>

      <main className="w-full max-w-[420px] z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black tracking-tighter text-primary mb-2">The Fairway Fund</h1>
          <p className="text-on-surface-variant font-medium text-sm text-balance">Elevating Impact Through Every Swing</p>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest rounded-3xl shadow-[0px_12px_32px_rgba(25,28,30,0.06)] overflow-hidden relative"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-primary to-[#06402b]"></div>
          <div className="p-7 md:p-9">
            <header className="mb-8 text-center sm:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-on-surface">Create Your Account</h2>
              <p className="text-sm text-on-surface-variant mt-1">Join the digital clubhouse of elite philanthropy.</p>
            </header>

            {error && (
              <div className="bg-red-50/50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-bold mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="mb-8">
                <button
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-2xl font-semibold text-on-surface border border-outline-variant/10 shadow-sm disabled:opacity-50"
                  type="button"
                >
                  <img alt="Google Logo" className="w-5 h-5 shadow-sm rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOllVJ4kIxy0afqaV5sBYnwcW3rNO75qeSc1DmbHiDuja2fRwig7isH7cdBFt6U01pLyc98kKJatXVkq_UZabNZ73I769Vv1snVp86Si2heXsmwhhneHVQYXHfmEqPshWoD9OPJ3grpRPc-_C4wOxxvtEO0CbfykopwOMwfq6C1m9gQhd6z-cpaV4QsijDKqoNVCwQGUF0H7UGKZ_jsT0_8VEgtv9XWuM5gyT7jMyyuTCrfjSetFhdSL0Vr0bjR3Y547aDPsSw5foz" />
                  <span>Continue with Google</span>
                </button>
                <div className="relative flex py-6 items-center">
                  <div className="flex-grow border-t border-outline-variant/20"></div>
                  <span className="flex-shrink mx-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Or register with email</span>
                  <div className="flex-grow border-t border-outline-variant/20"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[10px] font-black tracking-widest text-on-surface-variant uppercase mb-2 ml-1" htmlFor="displayName">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px] z-10 pointer-events-none"></span>
                    <input
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/10 transition-all rounded-2xl text-on-surface placeholder:text-on-surface-variant/50 outline-none font-medium text-sm relative"
                      id="displayName"
                      name="displayName"
                      required
                      placeholder="Enter your full name"
                      type="text"
                      value={formData.displayName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black tracking-widest text-on-surface-variant uppercase mb-2 ml-1" htmlFor="email">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px] z-10 pointer-events-none"></span>
                    <input
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/10 transition-all rounded-2xl text-on-surface placeholder:text-on-surface-variant/50 outline-none font-medium text-sm relative"
                      id="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black tracking-widest text-on-surface-variant uppercase mb-2 ml-1" htmlFor="password">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px] z-10 pointer-events-none"></span>
                    <input
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/10 transition-all rounded-2xl text-on-surface placeholder:text-on-surface-variant/70 outline-none font-medium text-sm relative"
                      id="password"
                      name="password"
                      required
                      placeholder="••••••••"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black tracking-widest text-on-surface-variant uppercase mb-2 ml-1" htmlFor="charityId">Select Primary Charity</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px] z-10 pointer-events-none"></span>
                    <select
                      className="w-full h-14 bg-surface-container-low border border-transparent focus:border-primary/20 hover:bg-surface-container-high transition-all rounded-2xl text-on-surface cursor-pointer outline-none font-bold text-sm relative px-10 appearance-none text-center"
                      id="charityId"
                      name="charityId"
                      required
                      value={formData.charityId}
                      onChange={handleChange}
                      style={{ textAlignLast: 'center' }}
                    >
                      <option value="" disabled>Choose a cause to support ^</option>
                      {charities.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none"></span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <div className="mt-0.5">
                  <input className="w-4 h-4 text-primary bg-surface-container-high border-none rounded focus:ring-primary/20" id="terms" type="checkbox" required />
                </div>
                <label className="text-xs text-on-surface-variant leading-relaxed font-medium" htmlFor="terms">
                  I agree to the <Link className="text-primary font-bold hover:underline" to="/">Terms of Service</Link> and <Link className="text-primary font-bold hover:underline" to="/">Privacy Policy</Link> of the Fairway Fund.
                </label>
              </div>

              <button 
                disabled={loading}
                className="w-full py-5 px-8 bg-gradient-to-br from-primary via-[#043321] to-[#06402b] text-on-primary font-black uppercase tracking-[0.15em] text-xs rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,40,25,0.4)] hover:shadow-[0_25px_60px_-12px_rgba(0,40,25,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group mt-8 relative overflow-hidden border-t border-white/10" 
                type="submit"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : (
                  <>
                    <span>Join the Fund</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </button>
            </form>
          </div>

          <footer className="bg-surface-container-low p-6 text-center border-t border-outline-variant/10">
            <p className="text-sm text-on-surface-variant font-medium">
              Already a member?
              <Link className="text-primary font-bold hover:underline ml-1" to="/login">Sign in here</Link>
            </p>
          </footer>
        </motion.section>

        <div className="mt-8 flex justify-center items-center gap-8 opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="text-[10px] font-black tracking-widest uppercase">Bank-Grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="text-[10px] font-black tracking-widest uppercase">Verified Nonprofit</span>
          </div>
        </div>
      </main>

      <div className="fixed bottom-10 right-10">
        <button className="w-14 h-14 bg-surface-container-lowest text-primary rounded-full shadow-2xl flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all group overflow-hidden border border-outline-variant/10">
          <span className="material-symbols-outlined">help_outline</span>
          <span className="absolute right-full mr-5 bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Need Help?</span>
        </button>
      </div>
    </PageTransition>
  );
};

export default Signup;
