import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Download, 
  Eye, 
  ChevronDown, 
  TrendingUp,
  Loader2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import PageTransition from '../../components/animations/PageTransition';

interface DrawItem {
  id: string;
  monthYear: string;
  winningNumbers: string[];
  totalPrizePool: number;
  status: string;
  executedAt: any;
  rolloverAdded?: number;
}

const Draws = () => {
  const navigate = useNavigate();
  const [latestDraw, setLatestDraw] = useState<DrawItem | null>(null);
  const [history, setHistory] = useState<DrawItem[]>([]);
  const [stats, setStats] = useState({ rolloverAmount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrawData();
  }, []);

  const fetchDrawData = async () => {
    try {
      const [latestRes, historyRes, statsRes] = await Promise.all([
        apiClient.get('/draw/latest'),
        apiClient.get('/draw/history'),
        apiClient.get('/draw/stats')
      ]);
      setLatestDraw(latestRes.data);
      setHistory(historyRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Failed to fetch draw data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[80vh] bg-transparent">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  const displayJackpot = formatCurrency(2450000 + (stats.rolloverAmount || 0));

  return (
    <PageTransition className="px-6 md:px-12 py-10 md:py-20 max-w-[1600px] mx-auto space-y-20 md:space-y-32 overflow-x-hidden">
      {/* Immersive Hero Architecture */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 md:gap-14">
        {/* Jackpot Terminal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-8 bg-[#002819] rounded-[3.5rem] p-10 md:p-16 lg:p-24 text-white relative overflow-hidden shadow-[0_40px_100px_rgba(0,40,25,0.3)] group"
        >
          <div className="relative z-10 space-y-12 md:space-y-16">
             <div className="flex items-center gap-4 text-[#fed65b] bg-white/5 px-4 py-2 rounded-full w-max border border-white/10">
                <Sparkles size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Active Accumulator Cycle</span>
             </div>
             
             <div className="space-y-6">
                <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase">
                   {displayJackpot}
                </h1>
                <p className="text-lg md:text-2xl text-white/50 font-medium leading-relaxed max-w-2xl italic group-hover:text-white/80 transition-colors">
                   The Digital Clubhouse prize pool has synchronized. Your next performance could trigger a massive restoration event.
                </p>
             </div>
             
             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-8 md:gap-14 pt-4">
                <div className="space-y-2">
                   <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">Draw Cadence</span>
                   <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-[#fed65b]" />
                      <span className="text-xl md:text-3xl font-black italic uppercase tracking-tighter">Monthly Ops</span>
                   </div>
                </div>
                
                <button 
                  onClick={() => navigate('/subscribe')}
                  className="px-10 py-6 md:px-16 md:py-8 bg-[#fed65b] text-[#002819] rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xs md:text-sm uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.05] active:scale-95 transition-all italic border-b-4 border-black/20"
                >
                  Authorize Entry Point
                </button>
             </div>
          </div>
          
          <Trophy className="absolute -bottom-20 -right-20 text-white/[0.03] w-64 h-64 md:w-[600px] md:h-[600px] rotate-12 group-hover:rotate-0 transition-transform duration-[3000ms]" />
          <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
             <div className="w-[800px] h-[800px] border-[100px] border-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </motion.div>

        {/* Aggregate Metrics Panel */}
        <motion.div 
           initial={{ opacity: 0, x: 40 }}
           animate={{ opacity: 1, x: 0 }}
           className="xl:col-span-4 bg-[#fafafa] rounded-[3.5rem] p-10 md:p-14 border border-black/[0.03] shadow-[0_40px_80px_rgba(0,0,0,0.03)] flex flex-col justify-between group"
        >
          <div className="space-y-12">
            <div className="flex justify-between items-center">
               <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em] italic">Global Telemetry</span>
               <Layers size={20} className="text-primary/40" />
            </div>
            
            <div className="space-y-12">
               <div className="space-y-4 group/item">
                  <p className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.3em] italic">Accumulated Rollover</p>
                  <p className="text-4xl font-black text-[#002819] italic tracking-tighter transition-all group-hover/item:text-primary leading-none">
                     {formatCurrency(stats.rolloverAmount)}
                  </p>
                  <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                     <div className="h-full bg-primary/20 w-full animate-shimmer"></div>
                  </div>
               </div>
               
               <div className="space-y-4 group/item">
                  <p className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.3em] italic">Verified Draw Cycles</p>
                  <div className="flex items-baseline gap-4">
                     <p className="text-4xl font-black text-[#002819] italic tracking-tighter leading-none">{history.length}</p>
                     <span className="text-[10px] font-black text-primary uppercase tracking-widest italic font-bold">Completed Ops</span>
                  </div>
               </div>

               <div className="space-y-4 group/item">
                  <p className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.3em] italic">Historical Payouts</p>
                  <p className="text-4xl font-black text-[#002819] italic tracking-tighter leading-none">${(history.length * 2850).toLocaleString()}+</p>
               </div>
            </div>
          </div>
          
          <div className="mt-16 bg-primary p-8 rounded-[2rem] shadow-2xl shadow-primary/20 flex items-center gap-6 relative overflow-hidden group/alert">
            <TrendingUp size={24} className="text-[#fed65b] shrink-0" />
            <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em] leading-relaxed italic z-10">
               Live reward vectors synchronized with <span className="text-white">Fairway Fund</span> protocols.
            </p>
            <div className="absolute right-[-20%] bottom-[-20%] w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover/alert:scale-150 transition-transform duration-1000"></div>
          </div>
        </motion.div>
      </div>

      {/* Tertiary View: Latest Snapshot & Winner Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        {/* Latest Results Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-12 xl:col-span-8 bg-white rounded-[4rem] p-10 md:p-16 lg:p-24 border border-black/[0.03] shadow-[0_40px_100px_rgba(0,0,0,0.04)] relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-24 relative z-10">
            <div className="space-y-4 px-2">
               <div className="flex items-center gap-4 text-primary">
                  <ShieldCheck size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Verified Results Archive</span>
               </div>
               <h2 className="text-4xl md:text-7xl font-black text-[#002819] italic uppercase tracking-tighter leading-none pt-2">
                  System <br />
                  <span className="text-primary underline decoration-secondary decoration-4 underline-offset-8">Output.</span>
               </h2>
            </div>
            <div className="space-y-2 text-right">
               <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] italic">Cycle Timestamp</span>
               <p className="text-xl md:text-2xl font-black text-[#002819] italic leading-none">
                 {latestDraw ? new Date(latestDraw.executedAt?._seconds * 1000 || latestDraw.executedAt).toLocaleDateString('en-GB', { dateStyle: 'long' }) : 'Awaiting Deployment'}
               </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 md:gap-8 mb-20 md:mb-32">
            {latestDraw?.winningNumbers.map((num, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square rounded-[1.5rem] md:rounded-[2.5rem] bg-[#002819] flex items-center justify-center text-3xl md:text-5xl font-black italic text-[#fed65b] border-2 border-black/5 shadow-2xl shadow-primary/30 hover:rotate-6 transition-transform cursor-pointer"
              >
                {num}
              </motion.div>
            )) || <div className="col-span-full py-10 opacity-20 text-center uppercase tracking-[0.5em] font-black italic">Awaiting Cycle Distribution Loop...</div>}
          </div>
          
          <div className="space-y-6">
             {[
               { tier: 'Strategic Match-5', status: 'Authorized', amount: 2000, color: 'bg-primary' },
               { tier: 'Deployment Match-4', status: 'Pending', amount: 500, color: 'bg-[#fed65b]' },
               { tier: 'Operation Match-3', status: 'Distributed', amount: 100, color: 'bg-black/5' }
             ].map((t) => (
               <div key={t.tier} className="flex flex-col sm:flex-row items-center justify-between p-8 md:p-12 bg-[#fafafa] rounded-[2.5rem] border border-black/[0.03] transition-all hover:bg-white hover:shadow-2xl group/tier cursor-default gap-6 md:gap-10">
                  <div className="flex items-center gap-6 md:gap-10">
                    <div className={`w-4 h-4 rounded-full ${t.color} shrink-0 shadow-lg`}></div>
                    <div className="space-y-1">
                       <h4 className="text-lg md:text-2xl font-black text-[#002819] italic uppercase tracking-tighter leading-none">{t.tier}</h4>
                       <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] italic">{t.status} Distribution</span>
                    </div>
                  </div>
                  <span className="text-3xl md:text-5xl font-black text-[#002819] italic tracking-tighter transition-colors group-hover/tier:text-primary leading-none">{formatCurrency(t.amount)}</span>
               </div>
             ))}
          </div>

          <div className="absolute top-[-10%] left-[-10%] w-full h-full opacity-[0.02] pointer-events-none">
             <Trophy size={800} />
          </div>
        </motion.div>

        {/* Global Winner Registry - Dynamic Mobile Sidebar */}
        <motion.div 
           initial={{ opacity: 0, x: 40 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="lg:col-span-12 xl:col-span-4 bg-[#002819] rounded-[4rem] overflow-hidden shadow-2xl flex flex-col group relative"
        >
          <div className="h-[300px] md:h-[450px] w-full relative">
             <img 
               className="w-full h-full object-cover grayscale opacity-50 transition-all duration-2000 group-hover:grayscale-0 group-hover:scale-105" 
               src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2670&auto=format&fit=crop" 
               alt="Winner Profile"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#002819] via-[#002819]/40 to-transparent"></div>
             <div className="absolute bottom-12 left-12 space-y-4">
                <span className="text-[10px] font-black text-[#fed65b] uppercase tracking-[0.4em] italic leading-none block">Member Network Spotlight</span>
                <h4 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.85]">Thomas <br /> Rutherford.</h4>
             </div>
          </div>
          
          <div className="p-10 md:p-14 flex-1 flex flex-col justify-between space-y-14">
             <div className="space-y-6 border-l-4 border-primary pl-8 italic">
                <p className="text-base md:text-lg font-medium text-white/60 leading-relaxed group-hover:text-white/90 transition-colors">
                   "The Fairway Fund provides a unique utility for competitive golfers. Knowing that every subscription entry directly restores ecosystems while creating life-changing prizes is the ultimate win."
                </p>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block">Member ID: FF-4022-X</span>
             </div>
             
             <div className="space-y-8">
                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center gap-6">
                   <div className="w-14 h-14 rounded-2xl bg-[#fed65b] flex items-center justify-center text-[#002819] shrink-0 shadow-2xl">
                      <ShieldCheck size={28} />
                   </div>
                   <div className="space-y-1">
                      <p className="text-xl md:text-2xl font-black text-[#fed65b] italic uppercase tracking-tighter leading-none">Verified Winner</p>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] italic">Net Yield: £50,000</p>
                   </div>
                </div>
                
                <button 
                  onClick={() => navigate('/subscribe')}
                  className="w-full py-6 md:py-8 bg-[#fed65b] text-[#002819] rounded-[2rem] flex items-center justify-center gap-6 font-black text-xs md:text-sm uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.05] active:scale-95 transition-all italic border-b-4 border-black/20"
                >
                   Authorize My Access
                   <ArrowRight size={24} />
                </button>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Forensic Audit Log: Historical Archive */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[4rem] overflow-hidden border border-black/[0.03] shadow-[0_60px_120px_rgba(0,0,0,0.05)]"
      >
        <div className="p-10 md:p-20 border-b border-black/[0.03] flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12">
           <div className="space-y-4">
             <div className="flex items-center gap-4 text-primary">
                <Search size={24} />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Network Ledger</span>
             </div>
             <h3 className="text-4xl md:text-6xl font-black text-[#002819] italic uppercase tracking-tighter leading-none">Historical <br /> Registry.</h3>
           </div>
           
           <div className="flex flex-wrap gap-4 w-full xl:w-auto">
              {['Audit Logs', 'Export CSV', 'Filter Cycles'].map(tag => (
                <button key={tag} className="px-6 py-4 bg-[#fafafa] text-on-surface-variant font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] italic hover:bg-black/5 transition-all border border-black/[0.03] flex items-center gap-3">
                   {tag === 'Export CSV' && <Download size={14} />}
                   {tag}
                </button>
              ))}
           </div>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide selection:bg-primary/10">
          <table className="w-full border-collapse min-w-[1200px]">
            <thead>
              <tr className="text-left text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant/30 border-b border-black/[0.03] bg-[#fafafa]/50">
                <th className="px-12 md:px-20 py-12">Execution Cycle</th>
                <th className="px-12 md:px-20 py-12">System Output</th>
                <th className="px-12 md:px-20 py-12">Allocated Pool</th>
                <th className="px-12 md:px-20 py-12">Rollover Factor</th>
                <th className="px-12 md:px-20 py-12">Registry State</th>
                <th className="px-12 md:px-20 py-12 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.03]">
              <AnimatePresence>
                {history.length > 0 ? history.map((draw) => (
                  <motion.tr 
                    key={draw.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="group hover:bg-[#fafafa] transition-all cursor-default"
                  >
                    <td className="px-12 md:px-20 py-12">
                      <div className="space-y-2">
                        <p className="text-xl font-black text-[#002819] uppercase italic tracking-tighter leading-none">
                          {new Date(draw.executedAt?._seconds * 1000 || draw.executedAt).toLocaleDateString('en-GB')}
                        </p>
                        <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] italic opacity-40">{draw.monthYear}</p>
                      </div>
                    </td>
                    <td className="px-12 md:px-20 py-12">
                      <div className="flex gap-3">
                         {draw.winningNumbers.map(n => (
                           <span key={n} className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white text-[#002819] flex items-center justify-center text-sm md:text-lg font-black italic border border-black/[0.03] shadow-sm transform group-hover:rotate-6 transition-transform">
                             {n}
                           </span>
                         ))}
                      </div>
                    </td>
                    <td className="px-12 md:px-20 py-12">
                      <p className="text-2xl font-black text-[#002819] italic tracking-tighter leading-none">{formatCurrency(draw.totalPrizePool || 0)}</p>
                    </td>
                    <td className="px-12 md:px-20 py-12">
                      <span className="text-sm font-black text-on-surface-variant/40 italic uppercase">{formatCurrency(draw.rolloverAdded || 0)}</span>
                    </td>
                    <td className="px-12 md:px-20 py-12">
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${draw.status === 'completed' ? 'bg-primary' : 'bg-secondary'} shadow-lg`}></div>
                          <span className="text-[10px] font-black uppercase tracking-widest italic text-[#002819]">
                             {draw.status}
                          </span>
                       </div>
                    </td>
                    <td className="px-12 md:px-20 py-12 text-right">
                       <button className="w-14 h-14 bg-[#002819] text-[#fed65b] rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl hover:bg-primary group-hover:rotate-3">
                          <Eye size={20} />
                       </button>
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-12 py-32 text-center">
                      <div className="flex flex-col items-center gap-8 opacity-10">
                        <Loader2 className="animate-spin" size={60} />
                        <p className="text-sm font-black uppercase tracking-[0.5em] italic">Deciphering forensic audit stream...</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
          
          <div className="p-16 text-center border-t border-black/[0.03] bg-[#fafafa]/30">
            <button className="text-[11px] font-black text-[#002819] uppercase tracking-[0.5em] italic flex items-center justify-center gap-6 mx-auto hover:text-primary transition-all group">
               Retrieve Legacy Cycles
               <ChevronDown size={24} className="group-hover:translate-y-2 transition-transform" />
            </button>
          </div>
        </div>
      </motion.section>
      
      {/* Background Ambience Enhancer */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-primary/[0.01] to-transparent pointer-events-none -z-10"></div>
    </PageTransition>
  );
};

export default Draws;
