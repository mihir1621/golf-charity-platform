import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Search, 
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';

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
      setRecentScores(res.data);
    } catch (err) {
      console.error('Error fetching scores:', err);
    }
  };

  const handleScoreChange = (delta: number) => {
    // PRD Section 06: Points range: 1–45
    setScore(prev => Math.max(1, Math.min(45, prev + delta)));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await apiClient.post('/scores', {
        value: score,
        courseName: courseName || 'Local Course',
        date: new Date().toISOString()
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err: any) {
      alert(`Error logging score: ${err.response?.data?.error || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#f0fff4] to-white">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-primary mb-8"
      >
        <CheckCircle2 size={120} />
      </motion.div>
      <h2 className="text-4xl font-black text-on-surface uppercase italic tracking-tighter mb-4" id="score-verified-title">Score Verified!</h2>
      <p className="text-on-surface-variant font-medium opacity-60">Your round has been added to the monthly draw pool. Redirecting to your clubhouse...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col max-w-md mx-auto relative shadow-2xl">
      {/* Mobile Top App Bar */}
      <div className="p-6 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/5">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-surface-container rounded-full transition-colors"
        >
           <ChevronLeft size={24} className="text-on-surface" />
        </button>
        <span className="text-sm font-black italic uppercase tracking-[0.2em] text-on-surface">Log Score</span>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/5 flex items-center justify-center text-primary font-black uppercase italic text-xs">
           GL
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Score Selector Section */}
        <section className="p-8 text-center bg-gradient-to-b from-white to-transparent">
          <p className="text-[10px] font-black text-[#745c00] uppercase tracking-[0.3em] mb-12 italic">Target Stableford Points</p>
          
          <div className="relative inline-flex items-center justify-center mb-8">
             <motion.div 
               key={score}
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-[140px] font-black leading-none text-[#002819] italic tracking-tighter"
             >
                {score}
             </motion.div>
             <span className="text-sm font-black text-on-surface-variant/40 ml-4 italic absolute -right-12 bottom-8">PTS</span>
          </div>

          <div className="flex justify-center gap-6 mb-10">
             <button 
               onClick={() => handleScoreChange(-1)}
               className="w-14 h-14 rounded-2xl bg-white border border-outline-variant/10 shadow-sm flex items-center justify-center text-xl font-black text-on-surface hover:bg-primary hover:text-white transition-all active:scale-90"
             >
                -
             </button>
             <button 
               onClick={() => handleScoreChange(1)}
               className="w-14 h-14 rounded-2xl bg-white border border-outline-variant/10 shadow-sm flex items-center justify-center text-xl font-black text-on-surface hover:bg-primary hover:text-white transition-all active:scale-90"
             >
                +
             </button>
          </div>
          
          <p className="text-xs font-medium text-on-surface-variant italic opacity-60">Points must be within valid 1-45 range</p>
        </section>

        {/* Course Selection Section */}
        <section className="p-8 space-y-6">
           <h3 className="text-sm font-black text-on-surface italic uppercase tracking-tight">Course Name</h3>
           <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter golf course name..."
                id="course-input"
                className="w-full h-16 pl-14 pr-6 bg-white rounded-2xl border border-outline-variant/10 italic text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
              />
           </div>
        </section>

        {/* Recent Activity Mini-Feed */}
        <section className="p-8 space-y-6">
           <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-on-surface italic uppercase tracking-tight">Last 5 Rounds</h3>
              <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em] italic">Active Pool</span>
           </div>
           
           <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {recentScores.length > 0 ? recentScores.map((s, i) => (
                 <div 
                   key={i} 
                   className="flex-shrink-0 w-24 p-5 rounded-2xl flex flex-col items-center justify-center bg-white border border-outline-variant/10 shadow-sm"
                 >
                    <span className="text-[8px] font-black text-on-surface-variant/40 uppercase italic mb-3 text-center leading-tight">Verified</span>
                    <span className="text-2xl font-black italic tracking-tighter text-on-surface">{s.value}</span>
                 </div>
              )) : (
                <div className="text-center w-full py-4 opacity-40 text-[10px] font-black uppercase italic">No history yet</div>
              )}
           </div>
        </section>
      </div>

      {/* Floating Submit Button */}
      <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/90 to-transparent">
         <motion.button 
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           onClick={handleSubmit}
           disabled={submitting}
           id="submit-score-btn"
           className="w-full bg-[#002819] text-white h-20 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] italic flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,40,25,0.2)] disabled:opacity-50"
         >
            {submitting ? <Loader2 className="animate-spin" size={24} /> : (
              <>
                <span>Submit & Verify</span>
                <Send size={18} className="translate-x-1 -translate-y-1" />
              </>
            )}
         </motion.button>
      </div>
    </div>
  );
};

export default LogScore;
