import { motion } from 'framer-motion';
import { 
  Trophy, 
  Download, 
  Eye, 
  ChevronDown, 
  CheckCircle2,
  TrendingUp,
  PlusCircle
} from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const Draws = () => {
  const latestNumbers = ['08', '15', '23', '31', '42'];
  const bonusNumber = '12';

  const historicalDraws = [
    { date: 'May 12, 2024', numbers: ['04', '19', '22', '36', '48'], bonus: '02', jackpot: '£1,842,000', winners: '412', status: 'ROLLOVER' },
    { date: 'May 05, 2024', numbers: ['11', '14', '25', '33', '45'], bonus: '09', jackpot: '£1,225,000', winners: '1 (Jackpot)', status: 'WON' },
    { date: 'Apr 28, 2024', numbers: ['07', '12', '21', '29', '40'], bonus: '05', jackpot: '£850,000', winners: '385', status: 'ROLLOVER' },
  ];

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
            <h1 className="text-6xl md:text-7xl font-black italic tracking-tighter mb-4 leading-none">£2,450,000</h1>
            <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md mb-12 italic transition-opacity group-hover:text-white/80">
              The pot has rolled over for 3 consecutive weeks. The next draw could be the life-changer.
            </p>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
              <div className="space-y-3">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Next Draw In</span>
                <div className="flex items-center gap-4 text-4xl font-black italic tracking-tighter">
                   <span>02<small className="text-xs uppercase ml-1 opacity-10">d</small></span>
                   <span className="opacity-20">:</span>
                   <span>14<small className="text-xs uppercase ml-1 opacity-10">h</small></span>
                   <span className="opacity-20">:</span>
                   <span>45<small className="text-xs uppercase ml-1 opacity-10">m</small></span>
                </div>
              </div>
              
              <button className="bg-[#fed65b] text-[#002819] px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all italic mt-4 md:mt-0">
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
            <h3 className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40 italic">Rollover History</h3>
            
            <div className="space-y-10">
               <div className="flex justify-between items-end border-b border-surface-container pb-6">
                  <div>
                    <p className="text-md font-black italic text-on-surface uppercase tracking-tight">May 12 Draw</p>
                  </div>
                  <p className="text-md font-black text-primary italic">£1.8M Rollover</p>
               </div>
               
               <div className="flex justify-between items-end border-b border-surface-container pb-6">
                  <div>
                    <p className="text-md font-black italic text-on-surface uppercase tracking-tight">May 05 Draw</p>
                  </div>
                  <p className="text-md font-black text-primary italic">£1.2M Rollover</p>
               </div>
            </div>
          </div>
          
          <div className="mt-12 bg-primary/5 p-6 rounded-2xl border border-primary/5 flex items-center gap-4">
            <TrendingUp className="text-primary" size={20} />
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.1em] leading-relaxed italic">Projected to reach £3M by <br/> next weekend if unclaimed.</p>
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
              <p className="text-[10px] font-black text-on-surface-variant/70 uppercase tracking-widest">Sunday, May 19 • Draw #452</p>
            </div>
            <div className="px-4 py-1.5 bg-primary text-secondary text-[9px] font-black rounded-full uppercase tracking-widest border border-primary">
              Official
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-16">
            {latestNumbers.map((num) => (
              <div 
                key={num} 
                className="w-16 h-16 rounded-full border-2 border-on-surface flex items-center justify-center text-2xl font-black italic text-on-surface group hover:bg-on-surface hover:text-white transition-all duration-300"
              >
                {num}
              </div>
            ))}
            <div className="w-16 h-16 rounded-full bg-[#fed65b] flex items-center justify-center text-2xl font-black italic text-on-surface shadow-lg shadow-secondary/20">
              {bonusNumber}
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="flex items-center justify-between p-6 bg-surface-container-low/30 rounded-2xl border border-transparent hover:border-outline-variant/10 transition-all">
                <div className="flex items-center gap-6">
                   <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-black rounded-md uppercase tracking-widest italic">5 Match</span>
                   <span className="text-sm font-black text-on-surface/80 uppercase">1 Winner</span>
                </div>
                <span className="text-xl font-black text-primary italic">£50,000.00</span>
             </div>
             
             <div className="flex items-center justify-between p-6 bg-surface-container-low/30 rounded-2xl border border-transparent hover:border-outline-variant/10 transition-all">
                <div className="flex items-center gap-6">
                   <span className="px-3 py-1 bg-surface-container-high text-on-surface/70 text-[9px] font-black rounded-md uppercase tracking-widest italic">4 Match</span>
                   <span className="text-sm font-black text-on-surface/80 uppercase">24 Winners</span>
                </div>
                <span className="text-xl font-black text-on-surface/80 italic">£2,450.00</span>
             </div>

             <div className="flex items-center justify-between p-6 bg-surface-container-low/30 rounded-2xl border border-transparent hover:border-outline-variant/10 transition-all">
                <div className="flex items-center gap-6">
                   <span className="px-3 py-1 bg-surface-container-high text-on-surface/70 text-[9px] font-black rounded-md uppercase tracking-widest italic">3 Match</span>
                   <span className="text-sm font-black text-on-surface/80 uppercase">582 Winners</span>
                </div>
                <span className="text-xl font-black text-on-surface/80 italic">£25.00</span>
             </div>
          </div>
        </motion.div>

        {/* Winner Spotlight Card */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="bg-white rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col group"
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
                "I've been a member of The Fairway for two years. Winning the 5-match prize last Sunday was a dream come true for my family and the local junior golf program I support."
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
                
                <button className="w-full py-4 bg-on-surface text-white rounded-2xl flex items-center justify-center group overflow-hidden relative">
                   <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <PlusCircle size={20} className="relative z-10" />
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
                <th className="px-12 py-10">Jackpot Size</th>
                <th className="px-12 py-10">Winners</th>
                <th className="px-12 py-10">Status</th>
                <th className="px-12 py-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/30">
              {historicalDraws.map((draw) => (
                <tr key={draw.date} className="group hover:bg-surface-container-low/50 transition-all">
                  <td className="px-12 py-10 text-sm font-black text-on-surface uppercase italic tracking-tight">{draw.date}</td>
                  <td className="px-12 py-10">
                    <div className="flex gap-2">
                       {draw.numbers.map(n => (
                         <span key={n} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-[11px] font-black italic">{n}</span>
                       ))}
                       <span className="w-8 h-8 rounded-full bg-[#fed65b]/20 text-secondary border border-secondary flex items-center justify-center text-[11px] font-black italic">{draw.bonus}</span>
                    </div>
                  </td>
                  <td className="px-12 py-10 text-sm font-black text-primary italic tracking-tight">{draw.jackpot}</td>
                  <td className="px-12 py-10 text-xs font-bold text-on-surface-variant leading-none">{draw.winners}</td>
                  <td className="px-12 py-10">
                     <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest italic ${draw.status === 'WON' ? 'bg-primary text-secondary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                        {draw.status}
                     </span>
                  </td>
                  <td className="px-12 py-10 text-right">
                     <button className="p-3 bg-on-surface text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg opacity-0 group-hover:opacity-100">
                        <Eye size={16} />
                     </button>
                  </td>
                </tr>
              ))}
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
