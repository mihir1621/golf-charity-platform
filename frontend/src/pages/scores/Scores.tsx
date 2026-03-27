import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  TrendingUp, 
  ArrowRight,
  History,
  MapPin,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';

const Scores: React.FC = () => {
  const navigate = useNavigate();
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
      // Sort scores by date descending
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
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Mock global rank
  const globalRank = 42;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="max-w-2xl">
          <span className="text-secondary font-black tracking-[0.3em] text-[9px] uppercase mb-3 block italic">Performance Tracking</span>
          <h2 className="text-5xl md:text-6xl font-black text-on-surface tracking-tighter leading-tight italic uppercase">Score <br/> Management</h2>
          <p className="text-on-surface-variant mt-4 text-base leading-relaxed font-medium max-w-xl">Log your latest performance. Only the five most recent scores contribute to your 'Fairway Fund' ranking.</p>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="flex-1 lg:min-w-[150px] bg-white p-6 rounded-[2rem] shadow-[0_15px_30px_rgba(0,0,0,0.03)] border border-outline-variant/5 flex flex-col items-center">
            <span className="text-[9px] text-on-surface-variant font-black uppercase tracking-widest mb-2 opacity-40">Current Avg</span>
            <span className="text-4xl font-black text-primary tracking-tighter italic">{calculateAvg()}</span>
          </div>
          <div className="flex-1 lg:min-w-[150px] bg-primary text-white p-6 rounded-[2rem] shadow-[0_20px_40px_rgba(0,40,25,0.15)] flex flex-col items-center">
            <span className="text-[9px] text-primary-fixed font-black uppercase tracking-widest mb-2 opacity-40">Global Rank</span>
            <span className="text-4xl font-black tracking-tighter italic">#{globalRank}</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Input Form Column */}
        <div className="md:col-span-12 lg:col-span-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.05)] relative overflow-hidden border border-outline-variant/5"
           >
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/5 rounded-full blur-[50px]"></div>
              <h3 className="text-xl font-black text-on-surface mb-8 flex items-center gap-3 italic uppercase text-primary tracking-tight">
                <PlusCircle size={24} />
                Log New Round
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-2">Score (Points 1–45)</label>
                  <input 
                    required
                    type="number"
                    min="1"
                    max="45"
                    placeholder="e.g. 38"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-2xl py-5 px-6 text-2xl font-black tracking-tight text-primary transition-all placeholder:text-primary/10" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-2">Golf Course</label>
                  <input 
                    required
                    type="text"
                    placeholder="Club name..."
                    value={formData.courseName}
                    onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                    className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-2xl py-5 px-6 text-sm font-bold transition-all" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-2">Date Played</label>
                  <input 
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-2xl py-5 px-6 text-sm font-bold uppercase transition-all" 
                  />
                </div>
                
                <button 
                  disabled={submitting}
                  className="w-full bg-gradient-to-br from-primary to-[#06402b] text-white py-5 rounded-2xl font-black text-base uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 italic"
                >
                  {submitting ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                       Submit Score
                       <ArrowRight size={20} />
                    </>
                  )}
                </button>
                <p className="text-[9px] text-center text-on-surface-variant/40 font-black uppercase tracking-[0.1em] mt-6 italic leading-relaxed">Submitting a 6th round will replace <br/> your oldest verified data point.</p>
              </form>
           </motion.div>
        </div>

        {/* Scores Table Column */}
        <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-10">
           <div className="bg-white rounded-[3rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-outline-variant/5">
              <div className="px-10 py-8 border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
                <h3 className="text-2xl font-black text-on-surface italic uppercase tracking-tight">Active Scorecard</h3>
                <div className="flex items-center gap-2 bg-secondary/10 px-4 py-1.5 rounded-full">
                   <History size={14} className="text-secondary" />
                   <span className="text-[10px] font-black text-secondary uppercase tracking-[0.15em]">Top 5 Recent</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left text-[9px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40 border-b border-surface-container/50 bg-surface-container-lowest">
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6">Date</th>
                      <th className="px-10 py-6">Course Name</th>
                      <th className="px-10 py-6 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container/30">
                    {scores.length > 0 ? scores.slice(0, 5).map((score, idx) => (
                       <motion.tr 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         key={score.id} 
                         className={`group transition-all hover:bg-surface-container-low/50 ${idx === 4 ? 'bg-error/5' : ''}`}
                       >
                          <td className="px-10 py-7">
                             <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-primary animate-pulse' : (idx === 4 ? 'bg-error' : 'bg-outline-variant/30')}`}></div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${idx === 0 ? 'text-primary' : (idx === 4 ? 'text-error' : 'text-on-surface-variant/50')}`}>
                                   {idx === 0 ? 'Newest' : (idx === 4 ? 'Next to be Replaced' : 'Active')}
                                </span>
                             </div>
                          </td>
                          <td className="px-10 py-7 text-sm font-bold text-on-surface/80">{getDayMonth(score.date)}</td>
                          <td className="px-10 py-7 text-sm font-black text-primary/70 italic uppercase tracking-tight">{score.courseName || 'St. Andrews (Old)'}</td>
                          <td className="px-10 py-7 text-right">
                             <span className={`text-2xl font-black italic tracking-tighter ${idx === 4 ? 'text-error/30' : 'text-primary'}`}>{score.value}</span>
                          </td>
                       </motion.tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-10 py-20 text-center text-on-surface-variant/40 font-bold italic">No scores logged yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
           </div>

           {/* Sub-cards Info area */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-primary text-white p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <History size={24} className="text-secondary" />
                  </div>
                  <h4 className="text-xl font-black mb-4 flex items-center gap-3 italic uppercase text-secondary">Replacement Logic</h4>
                  <p className="text-sm text-primary-fixed/80 leading-relaxed font-medium">
                     Your ranking is calculated using a rolling average of your last 5 submissions. New logs automatically archive the oldest entries to keep performance data fresh.
                  </p>
                </div>
                <History className="absolute -bottom-6 -right-6 text-white/5 w-48 h-48 rotate-12 group-hover:rotate-0 transition-transform duration-700" size={120} />
              </div>
              
              <div className="bg-[#fed65b] p-10 rounded-[2.5rem] shadow-xl shadow-secondary/10 border border-secondary/20 group">
                <h4 className="text-xl font-black text-[#745c00] mb-8 flex items-center gap-3 italic uppercase">
                   <TrendingUp className="text-[#745c00]" size={24} />
                   Impact Analytics
                </h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-[#745c00]/60">
                    <span>Current Avg</span>
                    <span>Potential Boost</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-black text-[#002819] italic tracking-tighter leading-none">{calculateAvg()}</span>
                    <ArrowRight className="text-[#002819] mb-1" size={24} />
                    <span className="text-5xl font-black text-[#002819] italic tracking-tighter leading-none">{(parseFloat(calculateAvg()) + 0.8).toFixed(1)}</span>
                  </div>
                  <div className="h-2 w-full bg-white/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      className="h-full bg-primary"
                    ></motion.div>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Course Spotlight */}
      <section className="mt-16 pt-12 border-t border-outline-variant/10">
        <div className="bg-surface-container-low/50 rounded-[3rem] p-3 flex flex-col md:flex-row gap-6 items-center border border-white">
           <div className="md:w-1/2 h-[350px] w-full relative group overflow-hidden rounded-[2.5rem]">
              <img 
                alt="St. Andrews" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2670&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10">
                <div className="flex items-center gap-3 text-[#fed65b] mb-4">
                   <MapPin size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest italic">Scotland, UK</span>
                </div>
                <h5 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">St. Andrews Links</h5>
                <p className="text-white/60 font-medium italic">The Home of Golf.</p>
              </div>
           </div>
           
           <div className="md:w-1/2 p-14 space-y-10">
              <div className="space-y-4">
                <span className="text-secondary font-black tracking-[0.3em] text-[10px] uppercase block italic">Recommendations</span>
                <h3 className="text-5xl font-black text-on-surface tracking-tighter italic uppercase leading-none">Master the <br/> Links style.</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed font-medium">
                   Based on your recent scores of 38 and 42, you're performing 15% better on links-style courses. We recommend booking your next round at a similar venue to maximize your Fairway Fund potential.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all italic">Explore Courses</button>
                <button className="bg-transparent text-on-surface px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-primary/10 hover:bg-white transition-all italic">View Deep Dive</button>
              </div>
           </div>
        </div>
      </section>

      {/* Mobile Floating Action Button */}
      <button 
        onClick={() => navigate('/scores/new')}
        className="fixed lg:hidden bottom-8 right-8 w-16 h-16 bg-[#fed65b] text-[#002819] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        <PlusCircle size={28} />
      </button>
    </div>
  );
};

export default Scores;
