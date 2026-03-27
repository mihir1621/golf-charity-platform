import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Search, 
  Loader2,
  CheckCircle2,
  Trophy,
  History,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import PageTransition from '../../components/animations/PageTransition';

const LogScore: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(18);
  const [courseName, setCourseName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [recentScores, setRecentScores] = useState<any[]>([]);

  useEffect(() => {
    fetchRecentScores();
  }, []);

  const fetchRecentScores = async () => {
    try {
      const res = await apiClient.get('/scores');
      setRecentScores(res.data.slice(0, 5));
    } catch (err) {
      console.error('Error fetching scores:', err);
    }
  };

  const handleScoreChange = (delta: number) => {
    setScore(prev => Math.max(1, Math.min(45, prev + delta)));
  };

  const handleSubmit = async () => {
    if (!courseName) return;
    setSubmitting(true);
    try {
      await apiClient.post('/scores', {
        value: score,
        courseName: courseName,
        date: new Date().toISOString()
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2500);
    } catch (err: any) {
      console.error('Logging error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-white overflow-hidden">
      <motion.div 
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 10 }}
        className="text-[#002819] mb-12 bg-primary/10 p-10 rounded-[3rem] relative shadow-2xl"
      >
        <CheckCircle2 size={120} className="relative z-10" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"
        />
      </motion.div>
      <h2 className="text-4xl md:text-6xl font-black text-[#002819] uppercase italic tracking-tighter mb-4 leading-none">Score <br className="md:hidden" /> Synchronized.</h2>
      <p className="text-on-surface-variant font-medium opacity-70 italic max-w-sm">Your round has been verified and added to the 'Clubhouse' draw pool. Redirecting to your terminal...</p>
    </div>
  );

  return (
    <PageTransition className="px-6 sm:px-8 py-8 md:py-16 max-w-6xl mx-auto space-y-12 md:space-y-20 overflow-x-hidden">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 px-2 lg:px-0">
        <div className="space-y-4">
           <button 
             onClick={() => navigate(-1)}
             className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant/40 hover:text-primary transition-all group italic"
           >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Profile
           </button>
           <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-[#002819] tracking-tighter leading-none italic uppercase">
             Direct <br />
             <span className="text-primary underline decoration-secondary/20 underline-offset-[12px]">Submission.</span>
           </h1>
        </div>
        
        <div className="hidden md:flex flex-col items-end gap-2 text-right">
           <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em] italic">Member Access</span>
           <div className="flex items-center gap-4">
              <p className="text-2xl font-black text-[#002819] italic tracking-tight uppercase">G.C.P Internal Terminal</p>
              <div className="w-12 h-12 rounded-2xl bg-[#fed65b] border-2 border-[#002819] flex items-center justify-center text-[#002819] font-black italic shadow-lg">
                GC
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
        {/* Visualized Score Entry - Premium Design */}
        <div className="bg-[#002819] text-white p-12 md:p-20 rounded-[3.5rem] md:rounded-[5rem] shadow-[0_40px_80px_rgba(0,40,25,0.2)] relative overflow-hidden group">
           <div className="relative z-10 text-center space-y-12">
              <span className="text-[10px] font-black text-[#fed65b] uppercase tracking-[0.5em] mb-4 block italic opacity-60">Stableford Points Protocol</span>
              
              <div className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={score}
                    initial={{ scale: 0.5, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0, y: -30 }}
                    className="text-[100px] sm:text-[180px] font-black leading-none text-white italic tracking-tighter drop-shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                  >
                    {score}
                  </motion.div>
                </AnimatePresence>
                <div className="absolute -right-8 md:-right-16 bottom-10 md:bottom-20 flex flex-col items-start">
                   <span className="text-[10px] font-black text-[#fed65b] uppercase italic tracking-[0.3em]">Points</span>
                   <Trophy size={32} className="text-[#fed65b] mt-2 opacity-40" />
                </div>
              </div>

              <div className="flex justify-center gap-8">
                 <button 
                   onClick={() => handleScoreChange(-1)}
                   className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-4xl font-black text-white hover:bg-[#fed65b] hover:text-[#002819] transition-all active:scale-90 shadow-2xl backdrop-blur-3xl"
                 >
                    -
                 </button>
                 <button 
                   onClick={() => handleScoreChange(1)}
                   className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-4xl font-black text-white hover:bg-[#fed65b] hover:text-[#002819] transition-all active:scale-90 shadow-2xl backdrop-blur-3xl"
                 >
                    +
                 </button>
              </div>
              
              <p className="text-[10px] font-black text-white/30 uppercase italic tracking-[0.4em]">Minimum entry: 1 // Cap ceiling: 45</p>
           </div>
           
           {/* Abstract Background Elements */}
           <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -top-32 -left-32 w-128 h-128 border-2 border-white/[0.03] rounded-full"
           />
           <div className="absolute inset-0 bg-gradient-to-br from-[#fed65b]/5 to-transparent pointer-events-none"></div>
        </div>

        {/* Detailed Form Column */}
        <div className="space-y-12">
           <div className="space-y-10">
              <div className="space-y-4">
                 <h3 className="text-sm font-black text-[#002819] italic uppercase tracking-[0.3em] flex items-center gap-4">
                   <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                   Course Identification
                 </h3>
                 <div className="relative group">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-all duration-300" size={24} />
                    <input 
                      type="text" 
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="Identify the course..."
                      className="w-full h-24 pl-20 pr-10 bg-[#fafafa] rounded-[2rem] border-2 border-transparent focus:border-primary/20 focus:bg-white italic text-lg md:text-xl font-black uppercase tracking-tight transition-all shadow-inner outline-none"
                    />
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex justify-between items-center px-4">
                    <h3 className="text-sm font-black text-[#002819] italic uppercase tracking-[0.3em] flex items-center gap-4">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Recent Synchronized Rounds
                    </h3>
                    <Sparkles size={16} className="text-[#fed65b]" />
                 </div>
                 
                 <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide">
                    {recentScores.length > 0 ? recentScores.map((s, i) => (
                       <motion.div 
                         key={i} 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.1 }}
                         className="flex-shrink-0 w-32 md:w-40 p-10 rounded-[2.5rem] flex flex-col items-center justify-center bg-white border border-black/[0.03] shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:-translate-y-2 transition-all cursor-default"
                       >
                          <span className="text-[9px] font-black text-on-surface-variant/30 uppercase italic mb-6 tracking-widest leading-none">Verified</span>
                          <span className="text-3xl md:text-5xl font-black italic tracking-tighter text-[#002819] leading-none">{s.value}</span>
                       </motion.div>
                    )) : (
                      <div className="w-full py-10 rounded-[2.5rem] bg-[#fafafa] border border-black/[0.03] flex items-center justify-center gap-4 opacity-30">
                         <History size={20} />
                         <p className="text-[10px] font-black uppercase italic tracking-[0.2em]">Synchronizing Archive...</p>
                      </div>
                    )}
                 </div>
              </div>
           </div>

           <div className="pt-8 border-t border-black/[0.03] space-y-8">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={submitting || !courseName}
                className="w-full group bg-primary text-[#fed65b] py-8 md:py-10 rounded-[2rem] md:rounded-[3rem] font-black text-xs md:text-sm uppercase tracking-[0.3em] italic flex items-center justify-center gap-6 shadow-[0_40px_80px_rgba(0,40,25,0.15)] disabled:opacity-30 border-b-4 border-black/20"
              >
                 {submitting ? <Loader2 className="animate-spin" size={28} /> : (
                   <>
                     <span>Authorize & Synchronize</span>
                     <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                   </>
                 )}
              </motion.button>
              <p className="text-[10px] text-center text-on-surface-variant/30 font-black uppercase tracking-[0.2em] italic leading-relaxed">
                 By synchronizing, you confirm the provided stableford <br /> metrics are verified according to R&A standards.
              </p>
           </div>
        </div>
      </div>

      <div className="text-center pb-12 opacity-20 text-[10px] font-black uppercase tracking-[0.6em] italic">
         Terminal Entry Point GCP-LOG-B // System: GCP-STABLEFORD-V1
      </div>
    </PageTransition>
  );
};

export default LogScore;
