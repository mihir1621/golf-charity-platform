import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, Eye, EyeOff, Trophy } from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      console.error('Google login error:', err);
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="bg-[#f8f9f8] text-on-surface min-h-screen flex flex-col relative overflow-hidden selection:bg-primary/20">
      {/* Background Decorative Blurs */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[80px] pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="relative z-10 px-8 lg:px-16 py-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#002819] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Trophy size={18} className="text-[#fed65b]" />
          </div>
          <span className="text-xl font-black text-[#002819] tracking-tight">Fairway Fund</span>
        </Link>

        {/* Social Proof Badge */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden md:flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {['JD', 'AS', 'MK'].map((initials, i) => (
              <div 
                key={initials}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-black text-white border-2 border-[#f8f9f8] ${
                  i === 0 ? 'bg-[#002819]' : i === 1 ? 'bg-primary/70' : 'bg-[#fed65b] text-[#002819]'
                }`}
              >
                {initials}
              </div>
            ))}
          </div>
          <span className="text-xs font-bold text-on-surface-variant/60 italic">Joined the Clubhouse today</span>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[480px]"
        >
          <div className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-black/[0.03] overflow-hidden">
            <div className="p-10 md:p-14">
              {/* Welcome Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-[#002819] tracking-tight mb-3">Welcome Back</h2>
                <p className="text-sm text-on-surface-variant/80 font-medium leading-relaxed max-w-xs mx-auto">
                  Access your digital clubhouse and impact dashboard.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-3.5 rounded-xl text-xs font-bold mb-8">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-[#002819] mb-3 ml-1" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      id="email"
                      required
                      placeholder="name@fairwayfund.org"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-13 pr-5 py-4 bg-transparent border-b-2 border-black/[0.08] focus:border-primary text-[#002819] placeholder:text-on-surface-variant/70 outline-none font-medium text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-[#002819] mb-3 ml-1" htmlFor="password">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      className="w-full pl-13 pr-14 py-4 bg-transparent border-b-2 border-black/[0.08] focus:border-primary text-[#002819] placeholder:text-on-surface-variant/70 outline-none font-medium text-sm transition-colors"
                      id="password"
                      required
                      placeholder="••••••••"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30 hover:text-primary transition-colors p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me + Forgot */}
                <div className="flex justify-between items-center pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-[18px] h-[18px] border-2 border-black/10 rounded-[5px] peer-checked:bg-[#002819] peer-checked:border-[#002819] transition-all flex items-center justify-center">
                        {rememberMe && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-on-surface-variant/60 group-hover:text-on-surface-variant transition-colors">Remember Me</span>
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs font-bold text-[#002819] hover:text-primary hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <button
                  disabled={loading}
                  className="w-full py-5 bg-[#002819] text-white font-bold text-sm rounded-2xl shadow-[0_16px_40px_rgba(0,40,25,0.2)] hover:shadow-[0_20px_50px_rgba(0,40,25,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                  type="submit"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : 'Sign In'}
                </button>

                {/* Divider */}
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-black/[0.06]"></div>
                  <span className="flex-shrink mx-5 text-xs font-medium text-on-surface-variant/40">Or continue with</span>
                  <div className="flex-grow border-t border-black/[0.06]"></div>
                </div>

                {/* Google Sign In */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#f5f5f5] hover:bg-[#eeeeee] transition-colors rounded-2xl font-semibold text-[#002819] text-sm disabled:opacity-50"
                  type="button"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.26c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center mt-10">
                <p className="text-sm text-on-surface-variant/50 font-medium">
                  Not a member?{' '}
                  <Link className="text-[#002819] font-bold hover:underline" to="/signup">
                    Request an Invitation
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Bottom Avatar Decoration */}
      <div className="fixed bottom-8 left-8 z-20">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg opacity-60 hover:opacity-100 transition-opacity">
          <img src="https://i.pravatar.cc/100?u=clubhouse-member" alt="Member" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-8 lg:px-16 py-10 text-center space-y-4">
        <div className="flex justify-center gap-8">
          {['Privacy', 'Terms', 'Support'].map(link => (
            <button key={link} className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 hover:text-primary transition-colors">
              {link}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-on-surface-variant/30 font-medium leading-relaxed">
          © 2024 Fairway Fund. The Digital Clubhouse.<br />
          Supporting excellence on and off the course.
        </p>
      </footer>
    </PageTransition>
  );
};

export default Login;
