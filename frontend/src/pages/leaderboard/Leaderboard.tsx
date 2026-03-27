import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Trophy, 
  Users,
  Crown,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import PageTransition from '../../components/animations/PageTransition';

interface LeaderboardEntry {
  userId: string;
  rank: number;
  name: string;
  club: string;
  totalPoints: number;
  avgScore: number;
  avatar: string;
  isYou?: boolean;
}

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const [lbRes, profileRes] = await Promise.all([
        apiClient.get('/scores/leaderboard'),
        apiClient.get('/user/profile')
      ]);
      
      const mappedEntries = lbRes.data.map((entry: any, index: number) => ({
        ...entry,
        rank: index + 1,
        isYou: entry.userId === profileRes.data.uid
      }));

      setEntries(mappedEntries);
      const myEntry = mappedEntries.find((e: any) => e.isYou);
      if (myEntry) setMyRank(myEntry.rank);
      
    } catch (err) {
      console.error('Leaderboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = entries.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.club.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <PageTransition className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start gap-8"
      >
        <div className="space-y-4">
          <span className="text-[9px] font-black bg-[#fed65b] text-[#002819] px-3 py-1.5 rounded-full uppercase tracking-[0.2em] inline-block italic">
            Season Standings
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-[#002819] tracking-tight italic uppercase">
            Global <span className="text-primary underline decoration-secondary/20 underline-offset-8">Leaders</span>
          </h1>
          <p className="text-base text-on-surface-variant/80 font-medium leading-relaxed max-w-lg italic">
            The standard of excellence is set here. Every round logged contributes to your standing in the clubhouse ecosystem.
          </p>
        </div>

        {/* Your Rank Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] p-8 border border-black/[0.03] shadow-[0_20px_40px_rgba(0,0,0,0.04)] text-center min-w-[200px] group hover:bg-primary/5 transition-colors"
        >
          <span className="text-[9px] font-black text-[#c9a820] uppercase tracking-[0.25em] italic">Your Global Rank</span>
          <p className="text-5xl font-black text-[#002819] tracking-tight mt-2 italic">#{myRank || '--'}</p>
        </motion.div>
      </motion.div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative group flex-1 max-w-lg">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search golfers by name or club..."
            className="w-full h-14 pl-13 pr-6 bg-white rounded-2xl border border-black/[0.06] text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all italic placeholder:text-on-surface-variant/70"
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[2.5rem] border border-black/[0.03] shadow-[0_20px_40px_rgba(0,0,0,0.03)] overflow-hidden"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-10 py-6 border-b border-black/[0.04] bg-[#fafafa]">
          <div className="col-span-1">
            <span className="text-[9px] font-black text-on-surface-variant/70 uppercase tracking-[0.2em] italic">Rank</span>
          </div>
          <div className="col-span-4">
            <span className="text-[9px] font-black text-on-surface-variant/80 uppercase tracking-[0.2em] italic">Player / Club</span>
          </div>
          <div className="col-span-4">
            <span className="text-[9px] font-black text-on-surface-variant/80 uppercase tracking-[0.2em] italic">Monthly points</span>
          </div>
          <div className="col-span-3 text-right">
            <span className="text-[9px] font-black text-on-surface-variant/80 uppercase tracking-[0.2em] italic">Avg / Round</span>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-black/[0.03]">
          {filteredEntries.length > 0 ? filteredEntries.map((entry) => (
            <div
              key={entry.userId}
              className={`grid grid-cols-12 gap-4 px-10 py-7 items-center transition-colors ${
                entry.isYou
                  ? 'bg-primary/[0.03] hover:bg-primary/[0.05]'
                  : 'hover:bg-[#fafafa]'
              }`}
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center gap-2">
                <span className={`text-xl font-black tracking-tighter italic ${entry.rank <= 3 ? 'text-secondary' : 'text-[#002819]/80'}`}>
                  {String(entry.rank).padStart(2, '0')}
                </span>
                {entry.rank === 1 && <Crown size={14} className="text-[#c9a820]" />}
              </div>

              {/* Player */}
              <div className="col-span-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full overflow-hidden border-2 flex-shrink-0 bg-primary/5 ${entry.isYou ? 'border-primary' : 'border-black/5'}`}>
                  <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-black italic uppercase tracking-tight ${entry.isYou ? 'text-primary' : 'text-[#002819]'}`}>
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant/70 font-black uppercase italic tracking-widest">{entry.club}</span>
                </div>
              </div>

              {/* Points */}
              <div className="col-span-4">
                <span className={`text-lg font-black italic tracking-tighter ${entry.isYou ? 'text-primary' : 'text-[#002819]/70'}`}>
                  {entry.totalPoints} PTS
                </span>
              </div>

              {/* Avg Score */}
              <div className="col-span-3 text-right">
                <span className={`text-lg font-black italic tracking-tighter ${entry.isYou ? 'text-primary' : 'text-on-surface-variant/80'}`}>
                  {entry.avgScore}
                </span>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center text-on-surface-variant/80 italic font-medium">No results found matching your search.</div>
          )}
        </div>
      </motion.div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Promotion Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 bg-[#002819] rounded-[3rem] p-10 lg:p-14 text-white relative overflow-hidden group border border-primary/20"
        >
          <div className="relative z-10 space-y-6 max-w-md">
            <h3 className="text-3xl font-black text-[#fed65b] italic tracking-tighter uppercase">
              Clubhouse Invitations
            </h3>
            <p className="text-base text-white/85 font-medium italic leading-relaxed">
              Top 10 golfers on the Global Leaderboard at the end of every quarter earn an all-expenses-paid trip to our Season Final at Pebble Beach.
            </p>
            <button
              onClick={() => navigate('/subscribe')}
              className="px-8 py-4 bg-[#fed65b] text-[#002819] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl italic"
            >
              Boost Your Ranking
            </button>
          </div>
          <Trophy className="absolute -bottom-10 -right-10 text-white/[0.05] w-64 h-64 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
        </motion.div>

        {/* Global Impact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-[3rem] p-10 lg:p-14 border border-black/[0.03] shadow-[0_15px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between"
        >
          <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
            <Users size={28} className="text-primary" />
          </div>
          <div>
            <h4 className="text-xl font-black text-[#002819] tracking-tighter uppercase italic mb-1">Global Community</h4>
            <div className="flex items-baseline gap-3 mt-4">
               <p className="text-5xl font-black text-primary italic tracking-tighter">{entries.length}</p>
               <span className="text-[10px] font-black text-on-surface-variant/80 uppercase italic tracking-widest">Active Golfers</span>
            </div>
            <p className="text-[11px] text-secondary font-black uppercase italic tracking-widest mt-4">+12% growth since last draw</p>
          </div>
        </motion.div>
      </div>
      
      <div className="text-center pb-8 opacity-85 text-[9px] font-black uppercase tracking-[0.4em] italic">
         © 2026 Clubhouse. Global Standings Terminal.
      </div>
    </PageTransition>
  );
};

export default Leaderboard;
