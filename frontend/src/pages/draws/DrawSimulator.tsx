import React from 'react';
import { Trophy, Dice5, History, Sparkles } from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const DrawSimulator: React.FC = () => {
  return (
    <PageTransition className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block italic">Testing Environment</span>
          <h1 className="text-5xl font-black text-on-surface tracking-tighter mb-4 italic uppercase">Draw Simulator</h1>
          <p className="text-on-surface-variant text-lg font-medium italic opacity-85 max-w-2xl leading-relaxed">
            Test your luck across different draw tiers. This simulator uses our official random generation engine to preview potential outcomes.
          </p>
        </div>
        <div className="flex gap-4">
           <button className="px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest italic shadow-xl flex items-center gap-3">
              <Dice5 size={18} />
              Run Simulation
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { label: 'Weekly Draw', prize: '$5,000', color: 'bg-white' },
          { label: 'Monthly Major', prize: '$50,000', color: 'bg-[#002819] text-white' },
          { label: 'Quarterly Final', prize: 'Pebble Beach Trip', color: 'bg-white' }
        ].map((sim, i) => (
          <div key={i} className={`${sim.color} p-10 rounded-[3rem] border border-outline-variant/10 shadow-sm flex flex-col gap-8 group hover:shadow-2xl transition-all`}>
             <div className="flex justify-between items-start">
               <span className="text-[9px] font-black uppercase tracking-widest italic opacity-70">{sim.label}</span>
               <div className="p-3 bg-primary/10 rounded-xl text-primary"><Trophy size={18} /></div>
             </div>
             <p className="text-3xl font-black italic tracking-tighter uppercase">{sim.prize}</p>
             <button className="w-full py-4 border border-outline-variant/20 rounded-2xl text-[9px] font-black uppercase tracking-widest italic group-hover:bg-primary group-hover:text-white transition-all">Select Model</button>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-low p-12 rounded-[4rem] border border-outline-variant/10 text-center space-y-8">
         <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
            <Sparkles size={32} />
         </div>
         <h2 className="text-2xl font-black italic uppercase tracking-tight text-on-surface">Simulation Results</h2>
         <div className="bg-white p-20 rounded-[3rem] border border-dashed border-outline-variant/30 flex flex-col items-center justify-center space-y-4">
            <History size={48} className="text-on-surface-variant/20" />
            <p className="text-on-surface-variant font-medium italic opacity-50 uppercase tracking-widest text-xs">No simulation data recorded yet.</p>
         </div>
      </div>
    </PageTransition>
  );
};

export default DrawSimulator;
