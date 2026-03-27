import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Mail, 
  ChevronRight, 
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Trophy
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
      setError('Unauthorized request. Please verify your email identity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Column: Brand Hero - High Fidelity */}
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
               Recovery <br />
               & Access <br />
               <span className="text-[#fed65b]">Protocols.</span>
            </h2>
            <p className="text-xl font-medium italic text-white/50 max-w-lg leading-relaxed">
               Secure identity recovery for Fairway Fund members. We'll synchronize a recovery link to your registered terminal.
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
         <div className="absolute bottom-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -bottom-1/4 -right-1/4 w-[120%] h-[120%] border-[60px] border-white/5 rounded-full"></div>
         </div>
      </div>

      {/* Right Column: Recovery Form - Responsive */}
      <div className="flex-1 min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 bg-[#fafafa]">
         <div className="w-full max-w-md space-y-12">
            <div>
               <Link to="/login" className="flex items-center gap-3 mb-10 text-primary group">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Back to Terminal</span>
               </Link>
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block italic">Identity Verification</span>
               <h1 className="text-4xl md:text-6xl font-black text-[#002819] italic tracking-tighter uppercase leading-none">
                  Credential <br />
                  <span className="text-primary underline decoration-secondary/20 underline-offset-[10px]">Restoration.</span>
               </h1>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-[3rem] border-2 border-primary/20 shadow-2xl text-center space-y-8"
              >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                     <CheckCircle2 size={40} className="text-primary" />
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-2xl font-black italic uppercase text-[#002819]">Link Dispatched</h3>
                     <p className="text-xs font-medium italic opacity-60 leading-relaxed max-w-xs mx-auto uppercase tracking-wider">
                        A secure restoration link has been synchronized to <span className="text-primary font-black underline">{email}</span>.
                     </p>
                  </div>
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full py-6 bg-[#002819] text-white rounded-2xl font-black italic uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-xl"
                  >
                    Return to Access Point
                    <ChevronRight size={16} />
                  </button>
              </motion.div>
            ) : (
              <div className="space-y-10">
                <p className="text-xs font-medium italic opacity-60 leading-relaxed uppercase tracking-[0.15em]">
                  Please enter the email address associated with your Clubhouse credentials.
                </p>

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
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2 italic">Registered Email</label>
                      <div className="relative group">
                         <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/20 group-focus-within:text-primary transition-all shadow-sm" size={20} />
                         <input
                           id="email"
                           required
                           placeholder="tiger@clubhouse.com"
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-full h-18 pl-14 pr-6 bg-white rounded-2xl border border-black/5 italic text-sm font-black uppercase tracking-tight transition-all focus:ring-2 focus:ring-primary/20 outline-none"
                         />
                      </div>
                   </div>

                   <button 
                     disabled={loading}
                     className="w-full group bg-[#002819] text-white py-8 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xs md:text-sm uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-6 italic mt-4 border-b-4 border-black/20"
                     type="submit"
                   >
                     {loading ? <Loader2 className="animate-spin" size={28} /> : (
                       <>
                         Dispatch Recovery Link
                         <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                       </>
                     )}
                   </button>
                </form>

                <div className="text-center pt-8 border-t border-black/5 flex flex-col items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] italic">
                   <span className="opacity-40">Require Assistance?</span>
                   <button className="text-primary underline decoration-[#fed65b] decoration-2 underline-offset-4">Contact Concierge Desk</button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-10 opacity-20 text-[8px] font-black uppercase tracking-[0.4em] italic pt-12">
               <div className="flex items-center gap-2">
                  <Key size={14} />
                  RSA-4096 Secure
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-xs">SMTP</span>
                  Encrypted Relay
               </div>
            </div>
         </div>
      </div>
    </PageTransition>
  );
};

export default ForgotPassword;
