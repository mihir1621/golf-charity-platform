import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/apiClient';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  TrendingUp, 
  ChevronRight, 
  Megaphone,
  Sparkles,
  History,
  PlusCircle,
  Heart,
  Loader2
} from 'lucide-react';

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
  const [loading, setLoading] = useState(true);

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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-surface">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto space-y-12">
      {/* Hero Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-on-surface tracking-tighter mb-4 leading-none italic uppercase"
          >
            Welcome back, <span className="text-primary">{user?.displayName || user?.email?.split('@')[0] || 'Golfer'}.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-on-surface-variant text-lg leading-relaxed font-medium"
          >
            Your current contributions have helped maintain <span className="font-bold text-primary">42 youth scholarships</span> this month.
          </motion.p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/impact')} className="px-8 py-4 bg-surface-container-highest text-on-surface font-black rounded-2xl transition-all hover:bg-surface-container-high uppercase tracking-widest text-xs italic">
            View Impact
          </button>
          <button onClick={() => navigate('/scores/new')} className="px-8 py-4 bg-gradient-to-br from-primary to-[#06402b] text-white font-black rounded-2xl shadow-2xl hover:opacity-90 transition-all uppercase tracking-widest text-xs italic">
            New Contribution
          </button>
        </div>
      </section>

      {/* Summary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Membership Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_30px_rgba(0,0,0,0.03)] border border-outline-variant/10 flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40">Membership</span>
              <span className={`px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest`}>
                {profile?.subscriptionStatus?.toUpperCase() || 'ACTIVE'}
              </span>
            </div>
            <p className="text-3xl font-black text-on-surface tracking-tighter italic uppercase">Founder's <br/> Circle</p>
          </div>
          <div className="mt-12 pt-6 border-t border-outline-variant/5">
            <p className="text-[9px] text-on-surface-variant uppercase tracking-[0.2em] mb-2 font-black opacity-40">Next Billing Date</p>
            <p className="text-sm font-black text-primary italic uppercase tracking-tight">October 14, 2026</p>
          </div>
        </motion.div>

        {/* Charity Impact */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_30px_rgba(0,0,0,0.03)] border border-outline-variant/10 relative overflow-hidden group"
        >
          <div className="relative z-10">
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-6 block opacity-40">Charity Impact</span>
            <p className="text-5xl font-black text-primary tracking-tighter italic leading-none">$12,450</p>
            <div className="mt-4 flex items-center gap-2 text-secondary font-black">
              <TrendingUp size={16} />
              <span className="text-xs uppercase tracking-widest italic tracking-tight">+12% from last year</span>
            </div>
          </div>
          <Heart className="absolute -right-6 -bottom-6 text-primary/5 w-40 h-40 rotate-12 group-hover:rotate-0 transition-transform duration-700 shadow-xl" size={120} />
        </motion.div>

        {/* Current Draw */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-primary p-8 rounded-[2.5rem] shadow-2xl shadow-primary/20 text-white relative overflow-hidden group"
        >
          <span className="text-[10px] font-black text-primary-fixed uppercase tracking-[0.2em] mb-6 block opacity-40">Next Draw In</span>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-black tracking-tighter italic leading-none">04</span>
            <span className="text-xs font-black opacity-40 tracking-widest uppercase italic">Days</span>
            <span className="text-5xl font-black tracking-tighter italic leading-none ml-2">18</span>
            <span className="text-xs font-black opacity-40 tracking-widest uppercase italic">Hrs</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              className="h-full bg-secondary"
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Participating with 15 entries</p>
        </motion.div>

        {/* Winnings */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-[#fed65b] p-8 rounded-[2.5rem] shadow-2xl shadow-secondary/10 text-on-secondary-container relative overflow-hidden group"
        >
          <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-6 block">Total Winnings</span>
          <p className="text-5xl font-black tracking-tighter italic leading-none text-[#002819]">$2,800</p>
          <button className="mt-12 text-[10px] font-black flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-[0.2em] text-[#002819]">
            View Statement 
            <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>

      {/* Main Content Area: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
        {/* Activity Section */}
        <section className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter text-on-surface italic uppercase leading-none">Recent Activity</h2>
            <button onClick={() => navigate('/scores')} className="text-xs font-black text-primary hover:underline hover:text-secondary transition-colors uppercase tracking-[0.2em]">View All</button>
          </div>
          
          <div className="space-y-6">
            {/* Real Top Round If exists */}
            {scores.length > 0 ? scores.slice(0, 1).map((score) => (
              <motion.div 
                key={score.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-[2.5rem] flex items-center gap-8 group hover:shadow-2xl transition-all border border-outline-variant/10"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary text-white flex flex-col items-center justify-center flex-shrink-0 shadow-xl group-hover:bg-secondary group-hover:text-primary transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Pts</span>
                  <span className="text-3xl font-black italic tracking-tighter">{score.value}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-black text-secondary uppercase tracking-[0.2em] mb-2 italic">Performance Log</p>
                  <h3 className="text-xl font-black text-on-surface leading-tight mb-2 italic uppercase tracking-tight">Round at {score.courseName || 'The Old Course'}</h3>
                  <div className="flex items-center gap-4 text-[11px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">
                    <History size={14} />
                    <span>{new Date(score.date?._seconds ? score.date._seconds * 1000 : score.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right hidden sm:block px-6">
                  <p className="text-xl font-black text-on-surface italic leading-none tracking-tighter uppercase underline decoration-primary/20 underline-offset-4">Verified</p>
                  <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-widest mt-2">{score.value > 30 ? 'TOP TIER' : 'STANDARD'}</p>
                </div>
              </motion.div>
            )) : (
              <div className="bg-surface-container-low/30 rounded-[2.5rem] p-12 border-2 border-dashed border-outline-variant/20 text-center">
                 <p className="text-on-surface-variant font-black italic uppercase tracking-widest opacity-40">No verified activity found.</p>
              </div>
            )}

            {/* Mock Items for fidelity */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-[2.5rem] flex items-center gap-8 group hover:shadow-2xl transition-all border border-outline-variant/10"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl group-hover:rotate-1 transition-transform border border-outline-variant/10">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src="https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2670&auto=format&fit=crop"
                  alt="Impact"
                />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2 italic">Charity Grant</p>
                <h3 className="text-xl font-black text-on-surface leading-tight mb-2 italic uppercase tracking-tight">Impact: 5 new membership grants.</h3>
                <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">Your Q4 subscription was successfully allocated.</p>
              </div>
              <div className="text-right hidden sm:block px-6">
                <p className="text-3xl font-black text-primary italic leading-none tracking-tighter">+$1,200</p>
                <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-widest mt-2">Yesterday</p>
              </div>
            </motion.div>

            {/* Activity Item 3: Mock Prize */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-[2.5rem] flex items-center gap-8 group hover:shadow-2xl transition-all border border-outline-variant/10"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#fed65b] flex flex-col items-center justify-center flex-shrink-0 shadow-lg text-[#002819] transform transition-transform group-hover:scale-110">
                <Trophy size={32} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-[#745c00] uppercase tracking-[0.2em] mb-2 italic">Prize Award</p>
                <h3 className="text-xl font-black text-on-surface leading-tight mb-2 italic uppercase tracking-tight">Weekly Clubhouse Bonus</h3>
                <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">Congratulations! You were selected in the pool.</p>
              </div>
              <div className="text-right hidden sm:block px-6">
                <p className="text-3xl font-black text-secondary italic leading-none tracking-tighter">+$250</p>
                <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-widest mt-2">OCT 22</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Announcements Section */}
        <section className="space-y-10">
          <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-10 border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black tracking-tight text-on-surface italic uppercase">Announcements</h2>
              <div className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></div>
            </div>
            
            <div className="space-y-10">
              <div className="flex gap-6 items-start group/ann">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0 text-[#745c00] shadow-sm transform transition-transform group-hover/ann:scale-110">
                  <Megaphone size={18} />
                </div>
                <div>
                  <h4 className="text-md font-black text-on-surface italic uppercase tracking-tight">New Charity Partner</h4>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed font-medium opacity-60 italic">We've added 'Green Earth Links' to our preference list.</p>
                  <p className="text-[10px] text-primary font-black mt-3 cursor-pointer uppercase tracking-widest hover:text-secondary p-1 -ml-1 transition-colors">See Details</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group/ann">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary shadow-sm transform transition-transform group-hover/ann:scale-110">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-md font-black text-on-surface italic uppercase tracking-tight">Annual Member Gala</h4>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed font-medium opacity-60 italic">Save the date! Dec 15th at St. Andrews Lounge.</p>
                  <p className="text-[10px] text-primary font-black mt-3 cursor-pointer uppercase tracking-widest hover:text-secondary p-1 -ml-1 transition-colors">RSVP Early</p>
                </div>
              </div>
            </div>

            <div className="mt-14 pt-10 border-t border-outline-variant/10">
              <div className="bg-primary p-8 rounded-[2.5rem] text-center shadow-2xl shadow-primary/30 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-3 italic">Member Referral</p>
                  <p className="text-white text-md mb-6 leading-tight font-black uppercase italic">Invite a friend & get 5 draw entries.</p>
                  <button className="bg-white text-primary text-[10px] font-black px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all uppercase tracking-widest italic shadow-xl">
                    Invite Friend
                  </button>
                </div>
                <TrendingUp className="absolute -right-6 -bottom-6 opacity-10 text-white w-32 h-32 rotate-12" size={120} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/scores/new')}
        className="fixed bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-[#fed65b] to-[#735c00] text-[#002819] rounded-[2.5rem] shadow-[0_20px_40px_rgba(115,92,0,0.3)] flex items-center justify-center z-50 group hover:shadow-[0_25px_50px_rgba(115,92,0,0.4)] transition-all"
      >
        <PlusCircle size={32} />
      </motion.button>
    </div>
  );
};

export default Dashboard;
