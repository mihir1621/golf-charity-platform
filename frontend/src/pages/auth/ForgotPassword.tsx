import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  HelpCircle, 
  Mail, 
  ArrowRight, 
  Lock,
  ChevronLeft,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import PageTransition from '../../components/animations/PageTransition';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Reset error:', err);
      setError(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-[#f8f9f8] flex flex-col selection:bg-primary/20">
      {/* Dynamic Header */}
      <header className="px-12 py-10 flex justify-between items-center relative z-10">
        <Link to="/" className="text-2xl font-black text-[#002819] italic tracking-tighter hover:opacity-80 transition-opacity">
          Fairway Fund
        </Link>
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-xs font-black text-on-surface uppercase tracking-widest italic hover:text-primary transition-colors"
        >
          Back to Login
          <HelpCircle size={16} className="text-on-surface-variant/80" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        {/* Background Decos */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-2xl w-full space-y-16 relative z-10">
          {/* Main Content Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-outline-variant/5 text-center relative overflow-hidden"
          >
             {/* Card Top Glow */}
             <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

             {!submitted ? (
               <div className="space-y-10">
                 <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Lock size={28} className="text-primary" />
                 </div>
                 
                 <div className="space-y-4">
                    <h1 className="text-4xl font-black text-[#002819] italic tracking-tighter uppercase">Reset your access</h1>
                    <p className="text-on-surface-variant text-sm font-medium italic opacity-85 max-w-sm mx-auto leading-relaxed">
                      Enter the email address associated with your Fairway Fund account and we'll send you a secure link to reset your password.
                    </p>
                 </div>

                 {error && (
                   <div className="bg-error/5 text-error text-[10px] font-black p-4 rounded-xl italic uppercase tracking-widest border border-error/10">
                      {error}
                   </div>
                 )}

                 <form onSubmit={handleSubmit} className="space-y-8 text-left">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] ml-2">Email Address</label>
                       <div className="relative group">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors" size={20} />
                          <input 
                            required
                            type="email" 
                            placeholder="name@clubhouse.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-16 pl-14 pr-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/10 italic text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          />
                       </div>
                    </div>

                    <button 
                      disabled={loading}
                      className="w-full h-20 bg-[#002819] text-white rounded-2xl font-black italic uppercase tracking-widest text-sm flex items-center justify-center gap-4 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : (
                        <>
                          Send Reset Link
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                 </form>

                 <div className="pt-6 border-t border-outline-variant/5">
                    <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.15em] italic">
                       Remembered your password? <Link to="/login" className="text-primary hover:underline">Log in here</Link>
                    </p>
                 </div>
               </div>
             ) : (
               <div className="space-y-8 py-10">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                     <CheckCircle2 size={40} className="text-primary" />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase text-[#002819]">Email Sent!</h3>
                  <p className="text-sm font-medium italic opacity-60 leading-relaxed max-w-sm mx-auto">
                    We've sent a password reset link to <span className="text-primary font-black underline underline-offset-4">{email}</span>. Please check your inbox.
                  </p>
                  <button 
                    onClick={() => navigate('/login')}
                    className="mt-10 px-12 py-5 bg-[#002819] text-white rounded-xl font-black italic uppercase tracking-widest text-xs inline-flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
                  >
                    Return to Login
                    <ChevronLeft size={16} className="-translate-x-1" />
                  </button>
               </div>
             )}
          </motion.div>

          {/* Footer Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-8">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 }}
               className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-outline-variant/5 flex gap-6"
             >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} className="text-primary" />
                </div>
                <div className="space-y-2">
                   <h4 className="text-[11px] font-black uppercase italic tracking-widest text-[#002819]">Secure Clubhouse</h4>
                   <p className="text-[10px] font-medium italic opacity-50 leading-relaxed">
                      Your account security is our priority. We use industry-standard encryption to protect your data.
                   </p>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-outline-variant/5 flex gap-6 relative group overflow-hidden"
             >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <HelpCircle size={22} className="text-primary" />
                </div>
                <div className="space-y-2 relative z-10">
                   <h4 className="text-[11px] font-black uppercase italic tracking-widest text-[#002819]">Need Assistance?</h4>
                   <p className="text-[10px] font-medium italic opacity-50 leading-relaxed">
                      Our support team is available 24/7 for members. Contact the concierge desk for immediate help.
                   </p>
                </div>
                
                {/* Decorative Circular Golf Image */}
                <div className="absolute right-[-20%] bottom-[-20%] w-32 h-32 rounded-full overflow-hidden grayscale opacity-10 group-hover:opacity-30 transition-opacity">
                   <img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2670&auto=format&fit=crop" alt="Golf" className="w-full h-full object-cover" />
                </div>
             </motion.div>
          </div>
        </div>
      </main>

      {/* Corporate Footer */}
      <footer className="px-12 py-12 border-t border-outline-variant/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
           <span className="text-lg font-black text-[#002819] italic tracking-tighter">Fairway Fund</span>
           <span className="text-[9px] font-bold text-on-surface-variant/70 uppercase tracking-widest italic">© 2024 Fairway Fund. The Digital Clubhouse.</span>
        </div>
        <div className="flex items-center gap-8">
           {['Support', 'Privacy Policy', 'Terms of Service'].map(link => (
             <button key={link} className="text-[9px] font-black uppercase text-on-surface-variant/60 hover:text-primary transition-all tracking-[0.2em] italic">
                {link}
             </button>
           ))}
        </div>
      </footer>
    </PageTransition>
  );
};

export default ForgotPassword;
