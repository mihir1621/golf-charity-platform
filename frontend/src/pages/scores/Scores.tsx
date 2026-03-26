import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Plus, Info, ChevronRight, Award } from 'lucide-react';

interface Score {
  id: string;
  value: number;
  date: any;
  createdAt: any;
}

const Scores: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newScore, setNewScore] = useState({ value: 36, date: new Date().toISOString().split('T')[0] });

  const fetchScores = async () => {
    try {
      const response = await apiClient.get('/scores');
      setScores(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/scores', newScore);
      fetchScores();
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-charity-500/20 border-t-charity-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
      >
        <div>
           <div className="flex items-center space-x-3 text-charity-500 mb-4 bg-charity-600/10 px-4 py-1.5 rounded-full border border-charity-500/20 w-max">
             <Trophy size={18} />
             <span className="text-xs font-black uppercase tracking-[0.2em]">Record History</span>
           </div>
           <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">Your <span className="text-charity-600">Stableford</span> Rounds</h1>
           <p className="text-slate-400 mt-4 text-lg font-medium max-w-xl italic">The platform maintains your most recent 5 qualifying rounds. Performance is calculated based on these entries.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-primary px-8 h-14 font-black uppercase tracking-widest text-xs flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add New Round</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.form 
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="mb-16 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-10 rounded-[40px] shadow-2xl overflow-hidden shadow-black/40"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
               <div>
                 <label className="text-sm font-black text-slate-300 uppercase tracking-widest mb-4 block ml-1">Stableford Score (1-45)</label>
                 <input 
                    type="number" 
                    min="1" max="45"
                    required
                    className="input-field h-14 bg-dark-900 border-slate-700 text-2xl font-black text-charity-500 text-center"
                    value={newScore.value}
                    onChange={(e) => setNewScore({...newScore, value: parseInt(e.target.value)})}
                 />
               </div>
               <div>
                  <label className="text-sm font-black text-slate-300 uppercase tracking-widest mb-4 block ml-1">Round Date Recorded</label>
                  <input 
                    type="date" 
                    required
                    className="input-field h-14 bg-dark-900 border-slate-700 font-bold uppercase tracking-widest px-8"
                    value={newScore.date}
                    onChange={(e) => setNewScore({...newScore, date: e.target.value})}
                  />
               </div>
            </div>
            <div className="flex justify-end space-x-4">
               <button 
                 type="button" 
                 onClick={() => setShowForm(false)}
                 className="px-8 h-14 font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest text-xs"
               >
                 Cancel
               </button>
               <button type="submit" className="btn-primary px-12 h-14 font-black tracking-widest uppercase text-xs">Confirm Entry</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {scores.length > 0 ? (
          scores.map((score: any, index: number) => (
            <motion.div 
               key={score.id}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.05 * index }}
               className="group relative bg-dark-800/40 backdrop-blur-sm border border-slate-800/80 rounded-[35px] hover:border-charity-600/30 transition-all hover:bg-dark-800 flex flex-col md:flex-row items-center justify-between p-8 overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-2 h-full bg-charity-600/20 group-hover:bg-charity-600 transition-colors"></div>

               <div className="flex items-center space-x-10 mb-6 md:mb-0 relative z-10 w-full md:w-auto">
                 <div className="w-20 h-20 bg-slate-900 border border-slate-700/50 rounded-3xl flex items-center justify-center font-black text-4xl text-charity-500 shadow-2xl group-hover:scale-110 transition-transform">
                    {score.value}
                 </div>
                 <div>
                    <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-charity-400 transition-colors">Stableford Round</h3>
                    <div className="flex items-center space-x-3 mt-1.5 opacity-60">
                       <Calendar size={16} />
                       <span className="text-xs font-bold uppercase tracking-widest">{new Date(score.date?._seconds ? score.date._seconds * 1000 : score.date).toLocaleDateString()}</span>
                    </div>
                 </div>
               </div>

               <div className="flex items-center space-x-10 relative z-10 w-full md:w-auto pl-28 md:pl-0">
                  <div className="hidden lg:flex items-center space-x-2 text-slate-600">
                    <Award size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Qualified Entry</span>
                  </div>
                  <div className="h-10 w-[1px] bg-slate-800 hidden md:block"></div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Status</p>
                    <p className="text-charity-500/80 font-black text-sm uppercase">Active</p>
                  </div>
                  <ChevronRight className="text-slate-800 group-hover:text-charity-600 transition-colors hidden md:block" />
               </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-slate-800/20 border border-dashed border-slate-700/50 rounded-[50px] py-28 text-center px-10">
             <div className="w-20 h-20 bg-slate-800/50 rounded-[30px] mx-auto mb-8 flex items-center justify-center opacity-40">
                <Trophy size={40} />
             </div>
             <p className="text-slate-500 font-bold text-xl mb-2">No qualified handicap data found.</p>
             <p className="text-slate-600 font-medium max-w-md mx-auto italic uppercase text-[10px] tracking-widest">Add your first stableford round to begin participating in the prize pools.</p>
          </div>
        )}
      </div>

      <div className="mt-20 flex items-start space-x-6 p-8 bg-slate-900 border border-slate-800/80 rounded-[40px] opacity-70 hover:opacity-100 transition-opacity">
         <Info className="text-charity-500 shrink-0 mt-1" size={24} />
         <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-2">Technical Information</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Our system utilizes an automated cleanup logic. When you register a 6th round, the oldest entry in your history is purged. This ensures your impact calculation is always based on your most recent performance data.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Scores;
