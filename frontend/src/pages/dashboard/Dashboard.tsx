import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/apiClient';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Plus, CreditCard, Heart, ArrowUpRight } from 'lucide-react';

interface Score {
  id: string;
  value: number;
  date: any;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState<Score[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddScore, setShowAddScore] = useState(false);
  const [newScore, setNewScore] = useState({ value: 18, date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, scoresRes] = await Promise.all([
          apiClient.get('/user/profile'),
          apiClient.get('/scores'),
        ]);
        setProfile(profileRes.data);
        setScores(scoresRes.data);
      } catch (err) {
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddScore = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/scores', newScore);
      const scoresRes = await apiClient.get('/scores');
      setScores(scoresRes.data);
      setShowAddScore(false);
    } catch (err) {
      console.error('Add score error:', err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-charity-500/20 border-t-charity-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Welcome back, {user?.displayName || 'Golfer'}!</h1>
          <p className="text-slate-400 mt-1 font-medium italic">Impact Score: {profile?.charityContributionPercent}% of your wins go to {profile?.charityId ? 'Global Impact Fund' : 'your selected charity'}.</p>
        </div>
        <div className="flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 pr-10">
          <div className="w-12 h-12 bg-charity-600/20 text-charity-500 flex items-center justify-center rounded-xl font-bold text-xl">
            {profile?.subscriptionStatus === 'active' ? '✓' : '!'}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-0.5">Membership Status</p>
            <p className={`text-lg font-bold capitalize ${profile?.subscriptionStatus === 'active' ? 'text-charity-500' : 'text-orange-400'}`}>
              {profile?.subscriptionStatus}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Scores */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-800/50 border border-slate-700/50 rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center space-x-3">
                <Trophy className="text-charity-500" size={24} />
                <h3 className="text-2xl font-bold">Latest Rounds</h3>
              </div>
              <button 
                onClick={() => setShowAddScore(!showAddScore)}
                className="bg-charity-600/10 hover:bg-charity-600/20 text-charity-500 p-2.5 rounded-xl transition-all"
              >
                <Plus size={20} className={`transform transition-transform ${showAddScore ? 'rotate-45' : ''}`} />
              </button>
            </div>

            {showAddScore && (
              <motion.form 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                onSubmit={handleAddScore} 
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Stableford Score</label>
                  <input 
                    type="number" 
                    min="1" max="45"
                    className="input-field h-11"
                    value={newScore.value}
                    onChange={(e) => setNewScore({...newScore, value: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Round Date</label>
                  <input 
                    type="date" 
                    className="input-field h-11"
                    value={newScore.date}
                    onChange={(e) => setNewScore({...newScore, date: e.target.value})}
                  />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="btn-primary w-full h-11 py-0 uppercase font-bold tracking-tight text-sm">Save Round</button>
                </div>
              </motion.form>
            )}

            <div className="space-y-4">
              {scores.length > 0 ? (
                scores.map((score: any) => (
                  <div key={score.id} className="flex justify-between items-center p-5 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-charity-500/50 transition-all group/item">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center font-extrabold text-2xl text-charity-500">
                        {score.value}
                      </div>
                      <div>
                        <p className="font-bold text-lg">Stableford Points</p>
                        <div className="flex items-center space-x-2 text-slate-500 text-sm mt-0.5">
                          <Calendar size={14} />
                          <span>{new Date(score.date?._seconds ? score.date._seconds * 1000 : score.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${score.value > 30 ? 'bg-charity-500/10 text-charity-500' : 'bg-slate-700/50 text-slate-400'}`}>
                        {score.value > 30 ? 'Top Tier' : 'Standard'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-dashed border-slate-700">
                  <p className="text-slate-500 font-medium">No rounds tracked yet. Add your first score to start contributing!</p>
                </div>
              )}
            </div>
            
            <p className="text-[10px] text-slate-600 mt-6 uppercase tracking-[0.2em] font-bold text-center italic">Only your last 5 qualifying rounds are maintained</p>
          </motion.div>
        </div>

        {/* Right Column: Sidebar Stats */}
        <div className="space-y-8">
          {/* Subscription Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-charity-600 to-charity-800 rounded-3xl p-8 text-white shadow-2xl shadow-charity-600/20 border border-charity-500/20 relative overflow-hidden group"
          >
            <CreditCard className="absolute -bottom-6 -right-6 text-white/10" size={140} />
             <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-2">Foundation Plan</h3>
               <p className="text-white/80 font-medium mb-10 leading-snug">Empower charities while you compete. Active subscriptions unlock prize pools.</p>
               
               <button className="w-full bg-white text-charity-700 font-extrabold h-14 rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center text-lg shadow-xl uppercase tracking-tight">
                  {profile?.subscriptionStatus === 'active' ? 'Manage Billing' : 'Unlock Priority Membership'}
                  <ArrowUpRight className="ml-2" size={20} />
               </button>
             </div>
          </motion.div>

          {/* Charity Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800/50 border border-slate-700/50 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="text-red-500" size={24} fill="currentColor" />
              <h3 className="text-xl font-bold">Your Impact</h3>
            </div>
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Contributions</p>
              <p className="text-3xl font-black text-white">$145.20 <span className="text-charity-500 text-sm font-bold">+12%</span></p>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Target Charity</span>
                <span className="text-white font-bold">Ocean Cleanup Proj.</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Split Percentage</span>
                <span className="text-charity-500 font-bold">{profile?.charityContributionPercent}%</span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border border-slate-700 hover:bg-slate-750 transition-all rounded-xl text-sm font-bold uppercase tracking-widest text-slate-300">
              Change Charity
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
