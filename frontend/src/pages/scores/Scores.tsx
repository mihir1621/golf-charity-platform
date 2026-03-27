import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  TrendingUp, 
  ArrowRight,
  History,
  MapPin,
  Loader2,
  ChevronRight
} from 'lucide-react';
import apiClient from '../../api/apiClient';
import PageTransition from '../../components/animations/PageTransition';

const Scores: React.FC = () => {
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    value: '',
    courseName: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchScores = async () => {
    try {
      const response = await apiClient.get('/scores');
      const sorted = response.data.sort((a: any, b: any) => 
        new Date(b.date?._seconds ? b.date._seconds * 1000 : b.date).getTime() - 
        new Date(a.date?._seconds ? a.date._seconds * 1000 : a.date).getTime()
      );
      setScores(sorted);
    } catch (err) {
      console.error('Error fetching scores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.value || !formData.courseName) return;
    
    setSubmitting(true);
    try {
      await apiClient.post('/scores', {
        value: parseInt(formData.value),
        courseName: formData.courseName,
        date: formData.date
      });
      setFormData({ value: '', courseName: '', date: new Date().toISOString().split('T')[0] });
      await fetchScores();
    } catch (err) {
      console.error('Error submitting score:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAvg = (): string => {
    if (scores.length === 0) return "0";
    const top5 = scores.slice(0, 5);
    const sum = top5.reduce((acc, curr) => acc + curr.value, 0);
    return (sum / top5.length).toFixed(1);
  };

  const getDayMonth = (dateStr: any) => {
    const d = new Date(dateStr?._seconds ? dateStr._seconds * 1000 : dateStr);
    return d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const globalRank = 42;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <PageTransition className="px-6 sm:px-8 py-8 md:py-16 max-w-7xl mx-auto space-y-12 md:space-y-20 overflow-x-hidden">
      {/* Hero Section - Responsive Stack */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 md:gap-14 px-2 lg:px-0">
        <div className="max-w-3xl space-y-6">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block italic shadow-sm w-max px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
              Performance Terminal
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-[#002819] tracking-tighter leading-none italic uppercase">
              Score <br className="hidden md:block"/> 
              <span className="text-primary underline decoration-secondary/20 underline-offset-[12px]">Management.</span>
            </h2>
          </div>
          <p className="text-on-surface-variant text-base md:text-xl font-medium leading-relaxed opacity-70 italic max-w-xl">
            Log your latest performance. Only the five most recent verified scores contribute to your global 'Clubhouse' ranking in the fund.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
          <div className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-black/[0.03] shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-center transition-all hover:bg-primary/[0.02]">
            <span className="text-[10px] md:text-xs font-black text-on-surface-variant/40 uppercase tracking-[0.3em] italic">Current Avg</span>
            <p className="text-4xl md:text-6xl font-black text-primary tracking-tighter mt-4 italic leading-none">{calculateAvg()}</p>
          </div>
          <div className="bg-[#002819] text-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_60px_rgba(0,40,25,0.2)] text-center group overflow-hidden relative">
            <span className="text-[10px] md:text-xs font-black text-[#fed65b] uppercase tracking-[0.3em] italic opacity-60">Global Rank</span>
            <p className="text-4xl md:text-6xl font-black tracking-tighter mt-4 italic leading-none text-white relative z-10">#{globalRank}</p>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start px-2 lg:px-0">
        {/* Input Form Column - Premium Styling */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-14 border border-black/[0.03] shadow-[0_40px_80px_rgba(0,0,0,0.04)] relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
              <h3 className="text-2xl font-black text-[#002819] mb-10 md:mb-14 flex items-center gap-4 italic uppercase tracking-tighter relative z-10">
                <PlusCircle size={28} className="text-primary" />
                Synchronize Round
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2 italic">Performance Score (1–45)</label>
                  <input 
                    required
                    type="number"
                    min="1"
                    max="45"
                    placeholder="38"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    className="w-full bg-surface-container-low/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[1.5rem] md:rounded-[2rem] py-6 px-8 text-4xl font-black tracking-tighter text-primary transition-all placeholder:text-primary/5 outline-none shadow-inner" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2 italic">Golfing Venue</label>
                  <input 
                    required
                    type="text"
                    placeholder="Enter club name..."
                    value={formData.courseName}
                    onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                    className="w-full bg-surface-container-low/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[1.2rem] py-5 px-8 text-base md:text-lg font-bold transition-all outline-none" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2 italic">System Date Played</label>
                  <input 
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-surface-container-low/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[1.2rem] py-5 px-8 text-sm md:text-base font-bold uppercase transition-all outline-none" 
                  />
                </div>
                
                <button 
                  disabled={submitting}
                  className="w-full group bg-[#002819] text-white py-6 md:py-8 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 italic mt-4"
                >
                  {submitting ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                       Log Verified Data
                       <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-on-surface-variant/30 font-black uppercase tracking-[0.1em] mt-10 italic leading-relaxed">
                  Integrating new metrics will automatically <br className="hidden md:block"/> archive the oldest verified data point.
                </p>
              </form>
           </motion.div>
        </div>

        {/* Scores Table Column - Responsive Grid */}
        <div className="lg:col-span-8 space-y-12">
           <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] border border-black/[0.03] shadow-[0_30px_60px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="px-10 md:px-14 py-10 md:py-14 border-b border-surface-container flex flex-col sm:flex-row justify-between items-center bg-[#fafafa] gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/5 rounded-2xl">
                    <History size={24} className="text-primary opacity-40" />
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-[#002819] italic uppercase tracking-tighter">Live Scorecard</h3>
                </div>
                <div className="flex items-center gap-3 bg-[#fed65b] px-6 py-3 rounded-2xl shadow-lg">
                   <span className="text-[10px] font-black text-[#002819] uppercase tracking-[0.2em] italic">Rolling Average: Top 5</span>
                </div>
              </div>
              
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="text-[11px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30 border-b border-surface-container bg-surface-container-low/10">
                      <th className="px-10 md:px-14 py-8 italic font-black">Archive Status</th>
                      <th className="px-10 md:px-14 py-8 italic font-black">Calendar Date</th>
                      <th className="px-10 md:px-14 py-8 italic font-black">Club Venue</th>
                      <th className="px-10 md:px-14 py-8 text-right italic font-black">Net Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container/30">
                    {scores.length > 0 ? scores.slice(0, 5).map((score, idx) => (
                       <motion.tr 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         key={score.id} 
                         className={`group hover:bg-surface-container-low/50 transition-all cursor-default ${idx === 4 ? 'bg-error/[0.02]' : ''}`}
                       >
                          <td className="px-10 md:px-14 py-10">
                             <div className="flex items-center gap-4">
                                <div className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-primary animate-pulse' : (idx === 4 ? 'bg-error shadow-[0_0_10px_rgba(255,0,0,0.5)]' : 'bg-black/10')}`}></div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] italic ${idx === 0 ? 'text-primary' : (idx === 4 ? 'text-error/60' : 'text-on-surface-variant/40')}`}>
                                   {idx === 0 ? 'Latest Sync' : (idx === 4 ? 'Next Allocation' : 'Verified Cycle')}
                                </span>
                             </div>
                          </td>
                          <td className="px-10 md:px-14 py-10">
                             <p className="text-sm md:text-lg font-black text-[#002819] italic tracking-tighter uppercase">{getDayMonth(score.date)}</p>
                          </td>
                          <td className="px-10 md:px-14 py-10">
                             <p className="text-sm md:text-xl font-black text-primary/60 italic uppercase tracking-tighter truncate max-w-[200px]">{score.courseName || 'Elite Course'}</p>
                          </td>
                          <td className="px-10 md:px-14 py-10 text-right">
                             <span className={`text-4xl md:text-6xl font-black italic tracking-tighter leading-none ${idx === 4 ? 'text-error/30' : 'text-primary'}`}>{score.value}</span>
                          </td>
                       </motion.tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="py-24 text-center">
                           <div className="flex flex-col items-center gap-6 opacity-20">
                              <Loader2 className="animate-spin-slow" size={40} />
                              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] italic">Synchronizing historical cycle archive...</p>
                           </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
           </div>

           {/* Metrics Overlay Analytics - Responsive Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
              <div className="bg-[#002819] text-white p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden group shadow-[0_40px_80px_rgba(0,40,25,0.2)]">
                <div className="relative z-10 space-y-8 md:space-y-12">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shadow-inner border border-white/5">
                    <History size={32} className="text-[#fed65b]" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white leading-none">System <br /> Synchronization.</h4>
                    <p className="text-base md:text-lg font-medium text-white/50 italic leading-relaxed">
                       The 'Clubhouse' engine calculates your standing using a global rolling average protocol. Stale entries are cleared to maintain integrity.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-20 -right-20 text-white/[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                  <History size={256} />
                </div>
              </div>
              
              <div className="bg-[#fed65b] p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-black/5 group relative overflow-hidden">
                <h4 className="text-3xl md:text-4xl font-black text-[#745c00] mb-12 flex items-center gap-6 italic uppercase tracking-tighter">
                   <TrendingUp className="text-[#745c00]" size={32} />
                   Live Outlook
                </h4>
                <div className="space-y-10">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-[#745c00]/40 italic">
                    <span>Performance Net</span>
                    <span>Potential Sync</span>
                  </div>
                  <div className="flex justify-between items-end relative z-10">
                    <span className="text-6xl md:text-8xl font-black text-[#002819] italic tracking-tighter leading-none">{calculateAvg()}</span>
                    <ArrowRight className="text-[#002819]/20 mb-1" size={32} />
                    <span className="text-7xl md:text-9xl font-black text-[#002819] italic tracking-tighter leading-none">{(parseFloat(calculateAvg()) + 0.8).toFixed(1)}</span>
                  </div>
                  <div className="h-3 w-full bg-black/5 rounded-full overflow-hidden p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-[#002819] rounded-full shadow-lg"
                    ></motion.div>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Global Venue Spotlight - Fully Responsive */}
      <section className="mt-12 md:mt-24 pt-12 md:pt-24 border-t border-black/[0.03]">
        <div className="bg-[#fafafa] rounded-[3rem] md:rounded-[5rem] overflow-hidden flex flex-col xl:flex-row items-center border border-white shadow-2xl">
           <div className="xl:w-1/2 h-[450px] md:h-[650px] w-full relative group overflow-hidden">
              <img 
                alt="Elite Venue" 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
                src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2670&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002819] via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-10 md:bottom-20 left-10 md:left-20">
                <div className="flex items-center gap-4 text-[#fed65b] mb-6">
                   <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                      <MapPin size={24} />
                   </div>
                   <span className="text-xs md:text-sm font-black uppercase tracking-[0.4em] italic shadow-sm">Scotland Heritage</span>
                </div>
                <h5 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-2 leading-none">The Old Course.</h5>
                <p className="text-lg md:text-2xl text-white/50 font-medium italic">Sanctuary of the Fairway Fund.</p>
              </div>
           </div>
           
           <div className="xl:w-1/2 p-12 md:p-24 space-y-12 md:space-y-16">
              <div className="space-y-6 md:space-y-10">
                <span className="text-secondary font-black tracking-[0.4em] text-[10px] md:text-xs uppercase block italic opacity-60">Venue Intelligence</span>
                <h3 className="text-4xl md:text-7xl font-black text-[#002819] tracking-tighter italic uppercase leading-tight">Master the <br className="hidden md:block"/> Links Protocol.</h3>
                <p className="text-on-surface-variant text-base md:text-xl leading-relaxed font-medium italic opacity-70">
                   System analytics indicate your latest submissions of 38 and 42 show a 15% efficiency increase on links-style architecture. We authorize a strategic session at our certified Scotland venues to maximize standing.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="flex-1 bg-[#002819] text-white px-10 py-6 md:py-8 rounded-2xl md:rounded-3xl font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.03] transition-all italic border-b-4 border-black/20">Explore Authorized Courses</button>
                <button className="flex-1 bg-white text-[#002819] px-10 py-6 md:py-8 rounded-2xl md:rounded-3xl font-black text-xs md:text-sm uppercase tracking-[0.2em] border-2 border-black/5 hover:bg-black/5 transition-all italic">Deep Dive Analytics</button>
              </div>
           </div>
        </div>
      </section>

      {/* Synchronized Terminal ID */}
      <div className="text-center pt-10 opacity-20 text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] italic">
         Terminal Sync ID: GCP-PERF-99201 // Performance Audit Active
      </div>

      {/* Floating Action Access - Mobile Focused */}
      <motion.button 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed lg:hidden bottom-8 right-8 w-20 h-20 bg-[#fed65b] text-[#002819] rounded-[2rem] shadow-[0_20px_50px_rgba(254,214,91,0.5)] flex flex-col items-center justify-center border-4 border-[#002819] z-50 group"
      >
        <PlusCircle size={32} />
        <span className="text-[8px] font-black uppercase tracking-tight mt-1 opacity-60">Sync</span>
      </motion.button>
    </PageTransition>
  );
};

export default Scores;
