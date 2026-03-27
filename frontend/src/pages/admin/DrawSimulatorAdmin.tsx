import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dice5, 
  Settings2, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Download,
  UploadCloud,
  Plus
} from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const DrawSimulatorAdmin: React.FC = () => {
  const [showToast, setShowToast] = useState(true);

  const simulationResults = [
    { tier: 'Grand Prize', memberId: '#FF-98210', probability: '0.0042%', change: 'up', prize: '$250,000' },
    { tier: 'Elite Runner', memberId: '#FF-11204', probability: '0.0152%', change: 'up', prize: '$100,000' },
    { tier: 'Impact Select', memberId: '#FF-55091', probability: '0.0210%', change: 'neutral', prize: '$50,000' },
    { tier: 'Club Circle', memberId: '#FF-00441', probability: '0.0098%', change: 'up', prize: '$25,000' }
  ];

  return (
    <PageTransition className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 space-y-12 pb-24 relative">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter italic uppercase leading-none">
            Draw Simulation <br/>& Logic
          </h1>
          <p className="text-on-surface-variant text-lg font-medium italic opacity-85 max-w-2xl leading-relaxed mt-4">
            Configure algorithm weighting and verify distribution fairness before publishing.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex -space-x-4">
              <img src="https://i.pravatar.cc/100?u=1" className="w-12 h-12 rounded-full border-4 border-white shadow-xl" alt="avatar" />
              <img src="https://i.pravatar.cc/100?u=2" className="w-12 h-12 rounded-full border-4 border-white shadow-xl" alt="avatar" />
              <div className="w-12 h-12 rounded-full bg-surface-container-high border-4 border-white flex items-center justify-center text-xs font-black text-on-surface-variant shadow-xl">
                 +4
              </div>
           </div>
           <button className="p-4 bg-white border border-outline-variant/10 rounded-2xl text-on-surface-variant relative shadow-sm hover:shadow-xl transition-all">
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <Plus size={20} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Logic Config */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] space-y-10 group">
             <div className="flex items-center gap-6">
                <div className="p-4 bg-[#002819] rounded-2xl text-secondary shadow-lg">
                   <Settings2 size={24} />
                </div>
                <div>
                   <h2 className="text-2xl font-black italic uppercase tracking-tight text-on-surface">Engine Configuration</h2>
                </div>
             </div>

             <div className="space-y-8">
                <div className="space-y-4">
                   <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic px-2">Draw Mode</p>
                   <div className="flex p-1 bg-surface-container-low rounded-2xl border border-outline-variant/10 gap-1">
                      <button className="flex-1 py-3 bg-white shadow-md rounded-xl text-[10px] font-black uppercase tracking-widest italic text-on-surface-variant">Random</button>
                      <button className="flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest italic text-on-surface-variant opacity-40 hover:opacity-100 transition-opacity">Algorithm</button>
                   </div>
                </div>

                <div className="space-y-6">
                   <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic px-2">Logic Weighting</p>
                   <div className="space-y-6 px-2">
                      {[
                        { label: 'Membership Seniority', weight: 65 },
                        { label: 'Previous Contribution', weight: 20 },
                        { label: 'Community Impact', weight: 15 }
                      ].map((logic, i) => (
                        <div key={i} className="space-y-3">
                           <div className="flex justify-between text-[9px] font-black uppercase italic tracking-tighter">
                              <span className="text-on-surface-variant opacity-70">{logic.label}</span>
                              <span className="text-on-surface">{logic.weight}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-on-surface rounded-full transition-all duration-1000 ease-out group-hover:bg-primary shadow-sm"
                                style={{ width: `${logic.weight}%` }}
                              ></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <button 
                  onClick={() => {}}
                  className="w-full py-6 bg-[#002819] text-white rounded-[2rem] font-black uppercase tracking-widest italic flex items-center justify-center gap-4 hover:bg-primary hover:scale-[1.02] shadow-2xl transition-all active:scale-95"
                >
                   <Dice5 size={20} />
                   Simulate Draw
                </button>
             </div>
          </div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#002819] p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl group shadow-primary/20"
          >
             <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em] mb-12 italic">Current Snapshot</p>
             <div className="space-y-2 mb-10">
                <h3 className="text-7xl font-black italic uppercase tracking-tighter leading-none">14,282</h3>
                <p className="text-xs font-medium text-white/60 italic tracking-wide">Eligible Members for Draw #24-A</p>
             </div>
             
             <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-[#fed65b] italic">
                <TrendingUp size={14} />
                Last updated: Today, 08:42 AM
             </div>
             
             <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                <Globe size={180} />
             </div>
          </motion.div>
        </div>

        {/* Right Column: Simulation Results */}
        <div className="lg:col-span-8 space-y-10">
           <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
              <h2 className="text-4xl font-black italic uppercase tracking-tight text-on-surface">Simulation Results</h2>
              <div className="flex gap-4">
                 <button className="px-8 py-4 bg-surface-container-low border border-outline-variant/10 rounded-2xl font-black text-[10px] uppercase tracking-widest italic flex items-center gap-3 hover:bg-white hover:shadow-lg transition-all">
                    <Download size={16} />
                    Export CSV
                 </button>
                 <button className="px-8 py-4 bg-secondary text-primary rounded-2xl font-black text-[10px] uppercase tracking-widest italic flex items-center gap-3 shadow-xl hover:scale-105 transition-all">
                    <UploadCloud size={16} />
                    Publish Final Results
                 </button>
              </div>
           </div>

           <div className="bg-white rounded-[4rem] border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col group">
              <div className="p-10 border-b border-surface-container flex flex-col md:flex-row justify-between items-center bg-surface-container-low/20 gap-10">
                 <div className="flex gap-12 text-center md:text-left">
                    <div>
                       <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-3 opacity-60 italic">Total Prize Pool</p>
                       <p className="text-3xl font-black italic tracking-tighter">$450,000</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-3 opacity-60 italic">Winners Seeded</p>
                       <p className="text-3xl font-black italic tracking-tighter text-center">12</p>
                    </div>
                 </div>
                 <div className="px-6 py-2.5 bg-primary/10 border border-primary/20 text-primary text-[9px] font-black rounded-full uppercase tracking-widest italic flex items-center gap-3">
                    <ShieldCheck size={14} />
                    Fairness Audit Passed
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full border-collapse">
                    <thead>
                       <tr className="text-left text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 border-b border-surface-container bg-surface-container-low/10">
                          <th className="px-10 py-8">Winner Tier</th>
                          <th className="px-10 py-8">Member ID</th>
                          <th className="px-10 py-8">Probability Score</th>
                          <th className="px-10 py-8">Prize Amount</th>
                          <th className="px-10 py-8 text-right underline underline-offset-4 decoration-outline-variant/20">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container/30">
                       {simulationResults.map((result, i) => (
                         <tr key={i} className="group hover:bg-surface-container-low/50 transition-all">
                            <td className="px-10 py-8">
                               <div className="flex items-center gap-6">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-black italic ${i === 0 ? 'bg-secondary text-primary' : 'bg-surface-container text-on-surface-variant opacity-40'}`}>
                                     {i + 1}
                                  </div>
                                  <span className="text-sm font-black italic text-on-surface uppercase tracking-tight leading-none">{result.tier}</span>
                               </div>
                            </td>
                            <td className="px-10 py-8">
                               <span className="text-xs font-black text-on-surface-variant italic opacity-70 tracking-widest uppercase">{result.memberId}</span>
                            </td>
                            <td className="px-10 py-8">
                               <div className="flex items-center gap-3 text-sm font-black italic text-on-surface tracking-tight">
                                  {result.probability}
                                  <TrendingUp size={14} className={result.change === 'up' ? 'text-primary' : 'text-on-surface-variant opacity-30'} />
                                </div>
                            </td>
                            <td className="px-10 py-8">
                               <span className="text-xl font-black italic text-primary tracking-tighter">{result.prize}</span>
                            </td>
                            <td className="px-10 py-8 text-right">
                               <span className="px-4 py-1.5 bg-primary text-secondary text-[8px] font-black rounded-lg uppercase tracking-widest italic shadow-sm">Simulated</span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
                 <div className="p-8 text-center border-t border-surface-container">
                    <button className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic group-hover:text-primary transition-colors flex items-center justify-center gap-4 mx-auto group/expand">
                       View All Simulated Participants
                       <Plus size={14} className="group-hover/expand:rotate-90 transition-transform" />
                    </button>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-10 rounded-[4rem] border border-outline-variant/10 shadow-sm flex items-center gap-10">
                 <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-surface-container-high" />
                       <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="301.59" strokeDashoffset="45" className="text-on-surface" />
                    </svg>
                    <span className="absolute text-2xl font-black italic tracking-tighter">85%</span>
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-black italic uppercase tracking-tight text-on-surface leading-tight">Algorithm Bias Check</h3>
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic opacity-60">Entropy Score</p>
                    <p className="text-[11px] font-medium text-on-surface-variant italic opacity-85 leading-relaxed pt-2">High distribution variance confirmed.</p>
                 </div>
              </div>

              <div className="bg-white p-10 rounded-[4rem] border border-outline-variant/10 shadow-sm space-y-8">
                 <h3 className="text-[11px] font-black text-on-surface-variant uppercase tracking-[.3em] italic px-2">Regional Spread</h3>
                 <div className="space-y-6 px-2">
                    {[
                      { region: 'North America', value: 42, color: 'bg-on-surface' },
                      { region: 'Europe & UK', value: 31, color: 'bg-primary' }
                    ].map((area, i) => (
                      <div key={i} className="flex items-center justify-between gap-10 group/row">
                         <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${area.color}`}></div>
                            <span className="text-sm font-black italic text-on-surface uppercase tracking-tight">{area.region}</span>
                         </div>
                         <span className="text-sm font-black italic text-on-surface tracking-tighter transition-transform group-hover/row:scale-125">{area.value}%</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 bg-[#002819] text-white px-8 py-5 rounded-[2rem] shadow-2xl z-[100] border border-white/10 flex items-center gap-10 min-w-[450px]"
          >
             <div className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                <p className="text-[11px] font-black uppercase tracking-widest italic">Draw #24-A simulation ready for review.</p>
             </div>
             <button 
               onClick={() => setShowToast(false)}
               className="ml-auto text-white/50 hover:text-white transition-colors uppercase text-[9px] font-black tracking-widest"
             >
               Dismiss
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default DrawSimulatorAdmin;
