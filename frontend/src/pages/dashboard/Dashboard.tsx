import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/apiClient';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  ChevronRight, 
  History,
  PlusCircle,
  Heart,
  Loader2,
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowRight,
  Target
} from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

interface Score {
  id: string;
  value: number;
  date: any;
  courseName?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scores, setScores] = useState<Score[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');
        if (sessionId) {
          await apiClient.get(`/subscribe/verify?sessionId=${sessionId}`);
          navigate('/dashboard', { replace: true });
        }

        const [profileRes, scoresRes, resultsRes] = await Promise.all([
          apiClient.get('/user/profile'),
          apiClient.get('/scores'),
          apiClient.get('/draw/results')
        ]);
        setProfile(profileRes.data);
        setScores(scoresRes.data);
        setResults(resultsRes.data);
      } catch (err) {
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const totalWinnings = results.reduce((acc, curr) => acc + (curr.prizeAmount || 0), 0);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[80vh] bg-transparent">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <PageTransition className="px-6 md:px-12 py-10 md:py-20 max-w-[1600px] mx-auto space-y-16 md:space-y-24 overflow-x-hidden">
      {/* Dynamic Command Header */}
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-12">
        <div className="max-w-4xl space-y-6 md:space-y-8">
           <div className="flex items-center gap-4 text-primary bg-primary/5 px-4 py-2 rounded-full w-max border border-primary/10">
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Active Session Verified</span>
           </div>
           <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#002819] tracking-tighter leading-[0.85] italic uppercase">
            Terminal: <span className="text-primary">{profile?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Member'}.</span>
           </h1>
           <p className="text-lg md:text-2xl text-on-surface-variant/70 font-medium italic max-w-2xl leading-relaxed">
            Your resources are currently deployed to <span className="font-black text-[#002819] underline decoration-secondary decoration-4 underline-offset-8">{profile?.charityName || 'Global Impact Corridors'}</span>.
           </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full xl:w-auto">
           <button 
             onClick={() => navigate('/impact')}
             className="px-8 py-5 md:px-12 md:py-7 bg-white border-2 border-black/5 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xs md:text-sm uppercase tracking-[0.3em] italic shadow-xl transition-all hover:bg-black/5 active:scale-95 flex items-center justify-center gap-6 group"
           >
              Impact Report
              <Target size={18} className="text-primary group-hover:rotate-12 transition-transform" />
           </button>
           <button 
             onClick={() => navigate('/scores/new')}
             className="px-8 py-5 md:px-12 md:py-7 bg-[#002819] text-[#fed65b] rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xs md:text-sm uppercase tracking-[0.3em] italic shadow-2xl transition-all hover:scale-[1.05] active:scale-95 flex items-center justify-center gap-6 border-b-4 border-black/20"
           >
              New Round
              <PlusCircle size={18} />
           </button>
        </div>
      </section>

      {/* KPI Architecture - Bento System */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
         {/* Membership Node */}
         <motion.div 
           whileHover={{ y: -8 }}
           className="bg-white p-10 rounded-[3rem] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden group"
         >
            <div className="space-y-8 relative z-10">
               <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em] italic">Access State</span>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${profile?.subscriptionStatus === 'active' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-error/10 text-error border border-error/20'}`}>
                     <div className={`w-1.5 h-1.5 rounded-full ${profile?.subscriptionStatus === 'active' ? 'bg-primary' : 'bg-error'} animate-pulse`}></div>
                     <span className="text-[9px] font-black uppercase tracking-widest">{profile?.subscriptionStatus || 'INACTIVE'}</span>
                  </div>
               </div>
               <h3 className="text-4xl font-black text-[#002819] italic uppercase tracking-tighter leading-none">
                  {profile?.subscriptionStatus === 'active' ? 'Verified\nMember' : 'Restricted\nAccess'}
               </h3>
            </div>
            <div className="mt-12 pt-6 border-t border-black/[0.03] relative z-10">
               <p className="text-[10px] font-black text-primary italic uppercase tracking-widest">Full Network Enabled</p>
            </div>
            
            <div className="absolute right-0 bottom-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
               <Trophy size={150} />
            </div>
         </motion.div>

         {/* Impact Node */}
         <motion.div 
           whileHover={{ y: -8 }}
           className="bg-[#002819] p-10 rounded-[3rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group"
         >
            <div className="space-y-8 relative z-10">
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic opacity-60">Deployed Capital</span>
               <div className="space-y-2">
                  <p className="text-6xl font-black text-[#fed65b] tracking-tighter italic leading-none">${profile?.totalCharityDonated || 0}</p>
                  <div className="flex items-center gap-3 text-primary">
                     <TrendingUp size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest italic">{profile?.charityContributionPercent || 10}% Yield</span>
                  </div>
               </div>
            </div>
            <div className="mt-12 pt-6 border-t border-white/10 relative z-10">
               <p className="text-[10px] font-black text-white/40 italic uppercase tracking-widest">Verified by Blockchain</p>
            </div>
            <Heart className="absolute -right-12 -bottom-12 text-primary/10 rotate-12 transition-transform duration-[2000ms] group-hover:rotate-0" size={200} />
         </motion.div>

         {/* Participation Node */}
         <motion.div 
           whileHover={{ y: -8 }}
           className="bg-white p-10 rounded-[3rem] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between group"
         >
            <div className="space-y-8">
               <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em] italic">Telemetry Log</span>
               <div className="space-y-4">
                  <div className="flex items-baseline gap-4">
                     <span className="text-6xl font-black text-[#002819] tracking-tighter italic leading-none">{scores.length}</span>
                     <span className="text-2xl font-black text-on-surface-variant/20 italic tracking-widest">/ 5</span>
                  </div>
                  <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden p-0.5">
                     <div 
                       className="h-full bg-primary rounded-full transition-all duration-1000" 
                       style={{ width: `${(scores.length / 5) * 100}%` }}
                     ></div>
                  </div>
               </div>
            </div>
            <div className="mt-12 pt-6 border-t border-black/[0.03]">
               <p className="text-[10px] font-black text-on-surface-variant/40 italic uppercase tracking-widest">Active Draw Eligibility</p>
            </div>
         </motion.div>

         {/* Winnings Node */}
         <motion.div 
           whileHover={{ y: -8 }}
           onClick={() => navigate('/draws')}
           className="bg-[#fed65b] p-10 rounded-[3rem] text-[#002819] shadow-2xl shadow-secondary/20 relative overflow-hidden group cursor-pointer"
         >
            <div className="space-y-8 relative z-10">
               <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em] italic leading-none">Net Recovery</span>
               <p className="text-6xl font-black tracking-tighter italic leading-none">${totalWinnings}</p>
            </div>
            <div className="mt-12 pt-6 border-t border-[#002819]/10 relative z-10 flex justify-between items-center group/btn">
               <p className="text-[10px] font-black italic uppercase tracking-widest">Archived Results</p>
               <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
            </div>
            <div className="absolute right-[-10%] top-[-10%] w-32 h-32 rounded-full border-[20px] border-[#002819]/5"></div>
         </motion.div>
      </div>

      {/* Primary Analytics & Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
         {/* Score Registry */}
         <div className="lg:col-span-8 space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start md:items-end gap-6 border-b border-black/[0.03] pb-10">
               <div className="space-y-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Historical Performance</span>
                  <h2 className="text-4xl md:text-5xl font-black text-[#002819] italic tracking-tighter uppercase leading-none">Recent <br className="sm:hidden" /> Activity.</h2>
               </div>
               <button 
                 onClick={() => navigate('/scores')}
                 className="flex items-center gap-4 text-[11px] font-black text-[#002819] uppercase tracking-[0.3em] italic group"
               >
                  Full Archive
                  <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </div>

            <div className="space-y-6">
               {scores.length > 0 ? (
                 scores.slice(0, 4).map((score, i) => (
                   <motion.div 
                     key={score.id}
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     viewport={{ once: true }}
                     className="bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] flex items-center gap-4 sm:gap-6 md:gap-10 group hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] transition-all border border-black/[0.03] cursor-pointer"
                   >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#002819] flex flex-col items-center justify-center text-white shrink-0 shadow-xl group-hover:rotate-3 group-hover:bg-primary transition-all">
                         <span className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">PTS</span>
                         <span className="text-2xl md:text-3xl font-black italic tracking-tighter">{score.value}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-3 mb-2">
                            <MapPin size={12} className="text-primary" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">Verified Hub</span>
                         </div>
                         <h4 className="text-lg md:text-2xl font-black text-[#002819] italic uppercase tracking-tighter leading-none truncate">
                            Stableford Execution
                         </h4>
                         <div className="flex items-center gap-6 mt-4 opacity-40">
                            <div className="flex items-center gap-2">
                               <History size={12} />
                               <span className="text-[9px] font-black uppercase tracking-widest">{new Date(score.date?._seconds ? score.date._seconds * 1000 : score.date).toLocaleDateString()}</span>
                            </div>
                         </div>
                      </div>
                      <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                         <span className="text-[10px] font-black text-[#002819] uppercase tracking-[0.3em] italic">82% Perf.</span>
                         <div className="w-24 h-1.5 bg-black/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[82%] rounded-full shadow-lg"></div>
                         </div>
                      </div>
                   </motion.div>
                 ))
               ) : (
                 <div className="bg-[#fafafa] p-20 rounded-[4rem] border-4 border-dashed border-black/[0.03] flex flex-col items-center text-center space-y-8">
                    <div className="w-20 h-20 bg-black/[0.02] rounded-full flex items-center justify-center">
                       <PlusCircle size={32} className="text-on-surface-variant/20" />
                    </div>
                    <div className="space-y-4">
                       <p className="text-sm font-black text-on-surface-variant uppercase tracking-[0.3em] italic leading-none">No Performance Data</p>
                       <p className="text-xs font-medium italic opacity-40 max-w-xs">Your Clubhouse terminal is awaiting initial score synchronization.</p>
                    </div>
                    <button onClick={() => navigate('/scores/new')} className="px-10 py-5 bg-[#002819] text-[#fed65b] rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] italic shadow-xl hover:scale-105 active:scale-95 transition-all">
                       Initialize System
                    </button>
                 </div>
               )}
            </div>
         </div>

         {/* Sidebar Feed */}
         <div className="lg:col-span-4 space-y-12">
            <div className="bg-white p-10 md:p-14 rounded-[4rem] border border-black/[0.03] shadow-[0_40px_80px_rgba(0,0,0,0.04)] space-y-12 relative overflow-hidden group">
               <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                     <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[#002819]">Draw Feed</h3>
                     <span className="w-3 h-3 rounded-full bg-error animate-pulse shadow-[0_0_15px_rgba(255,0,0,0.4)]"></span>
                  </div>
                  <p className="text-[10px] font-black text-on-surface-variant/40 italic uppercase tracking-[0.3em]">Live Regional Telemetry</p>
               </div>

               <div className="space-y-12 relative z-10">
                  {results.length > 0 ? (
                    results.slice(0, 3).map((win, i) => (
                      <div key={i} className="flex gap-6 items-start group/win items-center">
                         <div className="w-12 h-12 rounded-2xl bg-[#fed65b]/20 flex items-center justify-center text-[#745c00] shadow-sm transform transition-all group-hover/win:rotate-12 group-hover/win:scale-110">
                            <Trophy size={18} />
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                               <h4 className="text-sm font-black text-[#002819] italic underline decoration-secondary/30 underline-offset-4 uppercase tracking-tight truncate">{win.matchTier}</h4>
                               <span className="text-sm font-black text-[#002819] tracking-tighter italic leading-none">${win.prizeAmount}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                               <div className={`w-1.5 h-1.5 rounded-full ${win.paymentStatus === 'paid' ? 'bg-primary' : 'bg-secondary'}`}></div>
                               <span className={`text-[10px] font-black uppercase tracking-widest ${win.paymentStatus === 'paid' ? 'text-primary' : 'text-secondary'} italic`}>
                                  {win.paymentStatus}
                               </span>
                            </div>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 opacity-40">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Awaiting Distribution</p>
                    </div>
                  )}
               </div>

               <div className="pt-10 border-t border-black/[0.03] relative z-10">
                  <div className="bg-[#002819] p-8 rounded-[3rem] text-center space-y-6 shadow-2xl relative overflow-hidden group/card shadow-primary/20">
                     <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic mb-2">Impact Anchor</p>
                     <h5 className="text-white text-md font-black italic uppercase tracking-tighter leading-tight truncate px-4">
                        {profile?.charityName || 'Global Conservation'}
                     </h5>
                     <button 
                       onClick={() => navigate('/charities')}
                       className="w-full py-4 bg-white text-[#002819] rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all hover:bg-primary hover:text-white"
                     >
                        Deploy Elsewhere
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Persistent FAB */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/scores/new')}
        className="fixed bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-[#fed65b] to-[#735c00] text-[#002819] rounded-[2.5rem] shadow-[0_30px_60px_rgba(115,92,0,0.4)] flex items-center justify-center z-[100] group active:scale-95 transition-all border-b-4 border-black/20"
      >
        <PlusCircle size={32} className="transition-transform group-hover:rotate-90" />
      </motion.button>
    </PageTransition>
  );
};

export default Dashboard;
