import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Download, 
  Eye, 
  ChevronDown, 
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  Loader2
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
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  const displayJackpot = formatCurrency(2450000 + (stats.rolloverAmount || 0));

  return (
    <PageTransition className="p-8 space-y-12 max-w-7xl mx-auto">
      {/* Top Section: Jackpot Hero & Rollover History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Jackpot Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20 group"
        >
          <div className="relative z-10">
            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-6 block italic">Current Jackpot Status</span>
            <h1 className="text-6xl md:text-7xl font-black italic tracking-tighter mb-4 leading-none">{displayJackpot}</h1>
            <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md mb-12 italic transition-opacity group-hover:text-white/80">
              Transform your membership into impact. Secure your spot in the next high-stakes Clubhouse draw.
            </p>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
              <div className="space-y-3">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Frequency</span>
                <div className="flex items-center gap-4 text-2xl font-black italic tracking-tighter uppercase">
                   <span>Monthly <small className="text-xs uppercase ml-1 opacity-10">Draws</small></span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/subscribe')}
                className="bg-[#fed65b] text-[#002819] px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all italic mt-4 md:mt-0"
              >
                Secure Your Entry
              </button>
            </div>
          </div>
          
          {/* Background Illustration Deco */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] -mr-40 -mt-40 group-hover:bg-white/10 transition-colors duration-1000"></div>
          <Trophy className="absolute bottom-10 right-10 text-white/5 w-64 h-64 rotate-12 group-hover:rotate-0 transition-transform duration-700" size={120} />
        </motion.div>

        {/* Rollover History */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="bg-white rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between"
        >
          <div className="space-y-8">
            <h3 className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40 italic">Global Stats</h3>
            
            <div className="space-y-10">
               <div className="flex justify-between items-end border-b border-surface-container pb-6">
                  <div>
                    <p className="text-md font-black italic text-on-surface uppercase tracking-tight">Active Rollover</p>
                  </div>
                  <p className="text-md font-black text-primary italic">{formatCurrency(stats.rolloverAmount)}</p>
               </div>
               
               <div className="flex justify-between items-end border-b border-surface-container pb-6">
                  <div>
                    <p className="text-md font-black italic text-on-surface uppercase tracking-tight">Total Draws</p>
                  </div>
                  <p className="text-md font-black text-primary italic">{history.length}</p>
               </div>
            </div>
          </div>
          
          <div className="mt-12 bg-primary/5 p-6 rounded-2xl border border-primary/5 flex items-center gap-4">
            <TrendingUp className="text-primary" size={20} />
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.1em] leading-relaxed italic">Real-time reward metrics <br/> synchronized with Clubhouse ops.</p>
          </div>
        </motion.div>
      </div>

      {/* Middle Section: Results & Winner Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
        {/* Latest Results Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white rounded-[3rem] p-12 border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
        >
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-3xl font-black text-on-surface italic uppercase tracking-tighter mb-2">Latest Draw Results</h2>
              <p className="text-[10px] font-black text-on-surface-variant/70 uppercase tracking-widest">
                {latestDraw ? new Date(latestDraw.executedAt?._seconds * 1000 || latestDraw.executedAt).toLocaleDateString('en-GB', { dateStyle: 'long' }) : 'No Draws Recorded'}
              </p>
            </div>
            <div className="px-4 py-1.5 bg-primary text-secondary text-[9px] font-black rounded-full uppercase tracking-widest border border-primary">
              Official
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-16">
            {latestDraw?.winningNumbers.map((num) => (
              <div 
                key={num} 
                className="w-16 h-16 rounded-full border-2 border-on-surface flex items-center justify-center text-2xl font-black italic text-on-surface group hover:bg-on-surface hover:text-white transition-all duration-300"
              >
                {num}
              </div>
            )) || <p className="text-xs font-black uppercase opacity-20">Awaiting inaugural draw...</p>}
          </div>
          
          <div className="space-y-6">
             {[
               { tier: 'Match-5', winners: '1 Winner', amount: 2000 },
               { tier: 'Match-4', winners: '2 Winners', amount: 500 },
               { tier: 'Match-3', winners: '5 Winners', amount: 100 }
             ].map((t) => (
               <div key={t.tier} className="flex items-center justify-between p-6 bg-surface-container-low/30 rounded-2xl border border-transparent hover:border-outline-variant/10 transition-all">
                  <div className="flex items-center gap-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-black rounded-md uppercase tracking-widest italic">{t.tier}</span>
                    <span className="text-sm font-black text-on-surface/80 uppercase">{t.winners}</span>
                  </div>
                  <span className="text-xl font-black text-primary italic">{formatCurrency(t.amount)}</span>
               </div>
             ))}
          </div>
        </motion.div>

        {/* Winner Spotlight Card */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           onClick={() => navigate('/subscribe')}
           className="bg-white rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col group cursor-pointer"
        >
          <div className="h-[200px] w-full relative">
             <img 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
               src="https://images.unsplash.com/photo-1541271696563-3be2f99a3e13?q=80&w=2574&auto=format&fit=crop" 
               alt="Winner"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
             <div className="absolute bottom-6 left-8 flex items-end gap-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-secondary uppercase tracking-widest italic leading-none">Winner Spotlight</span>
                  <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none mt-1">Thomas R.</h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 overflow-hidden">
                   <img className="w-full h-full object-cover opacity-80" src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=2574&auto=format&fit=crop" alt="golf" />
                </div>
             </div>
          </div>
          
          <div className="p-10 flex-1 flex flex-col space-y-10">
             <p className="text-sm font-medium text-on-surface-variant italic leading-relaxed text-center quote relative">
                "Winning the Match-5 prize was a dream come true. My passion for the game has finally transformed into a real impact for local junior golf programs."
             </p>
             
             <div className="mt-auto space-y-6">
                <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/5">
                   <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                      <CheckCircle2 size={18} />
                   </div>
                   <div>
                     <p className="text-md font-black text-primary leading-tight italic uppercase tracking-tight">£50,000 Winner</p>
                     <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-70">Oxfordshire Chapter</p>
                   </div>
                </div>
                
                <button 
                  onClick={() => navigate('/subscribe')}
                  className="w-full py-4 bg-on-surface text-white rounded-2xl flex items-center justify-center group overflow-hidden relative"
                >
                   <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div className="relative z-10 flex items-center gap-3">
                     <span className="text-[10px] font-black uppercase tracking-widest italic leading-none">Join the Winners</span>
                     <PlusCircle size={20} />
                   </div>
                </button>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section: Archive Table */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
      >
        <div className="p-12 pb-8 border-b border-surface-container flex flex-col md:flex-row justify-between items-center gap-8">
           <h3 className="text-3xl font-black text-on-surface italic uppercase tracking-tighter">Historical Draw Archive</h3>
           <div className="flex gap-4">
              <button className="px-6 py-3 bg-surface-container-high text-on-surface font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center gap-3 italic hover:bg-surface-container-highest transition-all">
                <Download size={14} />
                Export CSV
              </button>
              <button className="px-6 py-3 bg-surface-container-high text-on-surface font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center gap-3 italic hover:bg-surface-container-highest transition-all">
                Filter by Date
              </button>
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70 border-b border-surface-container bg-surface-container-low/20">
                <th className="px-12 py-10">Draw Date</th>
                <th className="px-12 py-10">Winning Combination</th>
                <th className="px-12 py-10">Jackpot Pool</th>
                <th className="px-12 py-10">Rollover Added</th>
                <th className="px-12 py-10">Status</th>
                <th className="px-12 py-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/30">
              {history.length > 0 ? history.map((draw) => (
                <tr key={draw.id} className="group hover:bg-surface-container-low/50 transition-all">
                  <td className="px-12 py-10 text-sm font-black text-on-surface uppercase italic tracking-tight">
                    {new Date(draw.executedAt?._seconds * 1000 || draw.executedAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-12 py-10">
                    <div className="flex gap-2">
                       {draw.winningNumbers.map(n => (
                         <span key={n} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-[11px] font-black italic">{n}</span>
                       ))}
                    </div>
                  </td>
                  <td className="px-12 py-10 text-sm font-black text-primary italic tracking-tight">{formatCurrency(draw.totalPrizePool || 0)}</td>
                  <td className="px-12 py-10 text-xs font-bold text-on-surface-variant leading-none">{formatCurrency(draw.rolloverAdded || 0)}</td>
                  <td className="px-12 py-10">
                     <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest italic ${draw.status === 'completed' ? 'bg-primary text-secondary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                        {draw.status}
                     </span>
                  </td>
                  <td className="px-12 py-10 text-right">
                     <button className="p-3 bg-on-surface text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg opacity-0 group-hover:opacity-100">
                        <Eye size={16} />
                     </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-12 py-24 text-center">
                    <p className="text-xs font-black uppercase tracking-widest opacity-30 italic">No historical draws available yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className="p-12 text-center border-t border-surface-container">
            <button className="text-xs font-black text-on-surface uppercase tracking-[0.3em] italic flex items-center justify-center gap-3 mx-auto hover:text-primary transition-all group">
              Load More History
              <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.section>
    </PageTransition>
  );
};

export default Draws;
