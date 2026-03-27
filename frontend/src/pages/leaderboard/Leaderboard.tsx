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
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <PageTransition className="px-6 lg:px-10 py-8 md:py-16 max-w-7xl mx-auto space-y-10 md:space-y-20 overflow-x-hidden">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8"
      >
        <div className="space-y-4 md:space-y-6 flex-1 px-2">
          <span className="text-[9px] font-black bg-[#fed65b] text-[#002819] px-4 py-2 rounded-full uppercase tracking-[0.2em] inline-block italic shadow-lg">
            Season Live Standings
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-[#002819] tracking-tighter italic uppercase leading-none">
            Global <span className="text-primary underline decoration-secondary/20 underline-offset-[12px]">Leaders.</span>
          </h1>
          <p className="text-sm md:text-xl text-on-surface-variant/80 font-medium leading-relaxed max-w-xl italic">
            The standard of excellence is set here. Every round logged contributes to your standing in the global clubhouse hierarchy.
          </p>
        </div>

        {/* Your Rank Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-auto bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-center lg:min-w-[280px] group transition-all"
        >
          <span className="text-[10px] md:text-xs font-black text-[#745c00] uppercase tracking-[0.3em] italic opacity-60">Your Global Rank</span>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Trophy className="text-[#fed65b]" size={24} />
            <p className="text-5xl md:text-7xl font-black text-[#002819] tracking-tighter italic leading-none">#{myRank || '--'}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Search Bar - Responsive */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center px-2 md:px-0">
        <div className="relative group flex-1 max-w-xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/20 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search golfers or clubs..."
            className="w-full h-16 md:h-20 pl-16 pr-8 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-black/[0.06] text-sm md:text-lg font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all italic placeholder:text-on-surface-variant/30"
          />
        </div>
      </div>

      {/* Leaderboard Table - Fully Responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[2.5rem] md:rounded-[4rem] border border-black/[0.03] shadow-[0_30px_60px_rgba(0,0,0,0.03)] overflow-hidden"
      >
        {/* Responsive Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-8 px-12 md:px-20 py-10 border-b border-black/[0.04] bg-[#fafafa]">
          <div className="col-span-1">
            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] italic">Rank</span>
          </div>
          <div className="col-span-5">
            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] italic">Golfer / Clubhouse</span>
          </div>
          <div className="col-span-3">
            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] italic">Season Points</span>
          </div>
          <div className="col-span-3 text-right">
            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] italic">Performance Avg</span>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-black/[0.03]">
          {filteredEntries.length > 0 ? filteredEntries.map((entry) => (
            <div
              key={entry.userId}
              className={`flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8 px-8 sm:px-12 md:px-20 py-8 md:py-12 items-center transition-all ${
                entry.isYou
                  ? 'bg-primary/[0.02] relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-primary'
                  : 'hover:bg-[#fafafa]'
              }`}
            >
              {/* Rank - Mobile Centered */}
              <div className="col-span-1 w-full md:w-auto flex items-center justify-between md:justify-start gap-4 mb-4 md:mb-0">
                <div className="flex items-center gap-3">
                  <span className={`text-3xl md:text-4xl font-black tracking-tighter italic ${entry.rank <= 3 ? 'text-[#fed65b]' : 'text-[#002819]/40'}`}>
                    #{String(entry.rank).padStart(2, '0')}
                  </span>
                  {entry.rank === 1 && <Crown size={20} className="text-[#fed65b] animate-bounce" />}
                </div>
                {entry.isYou && (
                  <span className="md:hidden bg-primary text-white text-[8px] font-black px-3 py-1 rounded-full uppercase italic tracking-widest">You</span>
                )}
              </div>

              {/* Player - Mobile Top */}
              <div className="col-span-5 w-full flex items-center gap-6">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl overflow-hidden border-2 flex-shrink-0 bg-primary/5 transition-transform group-hover:scale-105 ${entry.isYou ? 'border-primary' : 'border-black/5 shadow-sm'}`}>
                  <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-xl md:text-2xl font-black italic uppercase tracking-tighter truncate leading-tight ${entry.isYou ? 'text-primary underline decoration-primary/10' : 'text-[#002819]'}`}>
                    {entry.name}
                  </h3>
                  <p className="text-[10px] md:text-sm text-on-surface-variant/40 font-black uppercase italic tracking-widest mt-1 truncate">{entry.club || 'Elite Clubhouse'}</p>
                </div>
              </div>

              {/* Points - Mobile Spaced */}
              <div className="col-span-3 w-full flex md:block items-center justify-between mt-4 md:mt-0 p-4 md:p-0 bg-surface-container-low/30 md:bg-transparent rounded-2xl">
                <span className="md:hidden text-[9px] font-black text-on-surface-variant/30 uppercase italic tracking-widest">Season Points</span>
                <p className={`text-xl md:text-3xl font-black italic tracking-tighter leading-none ${entry.isYou ? 'text-primary' : 'text-[#002819]'}`}>
                  {entry.totalPoints} <span className="text-[10px] md:text-xs opacity-40 uppercase ml-1">Pts</span>
                </p>
              </div>

              {/* Avg Score */}
              <div className="col-span-3 w-full md:text-right flex md:block items-center justify-between p-4 md:p-0">
                <span className="md:hidden text-[9px] font-black text-on-surface-variant/30 uppercase italic tracking-widest">Efficiency Rating</span>
                <p className={`text-xl md:text-3xl font-black italic tracking-tighter leading-none ${entry.isYou ? 'text-primary' : 'text-on-surface-variant/80'}`}>
                  {entry.avgScore}
                </p>
              </div>
            </div>
          )) : (
            <div className="p-20 md:p-40 text-center space-y-6">
              <Loader2 className="mx-auto text-primary/20 animate-spin" size={40} />
              <p className="text-sm md:text-xl text-on-surface-variant/30 font-black uppercase italic tracking-[0.2em]">Synchronizing clubhouse leader data...</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Promotion Cards - Fully Responsive Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-14 px-2 md:px-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-3 bg-[#002819] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-white relative overflow-hidden group shadow-2xl"
        >
          <div className="relative z-10 space-y-6 md:space-y-10 max-w-lg">
            <h3 className="text-3xl md:text-5xl font-black text-[#fed65b] italic tracking-tighter uppercase leading-none">
              Season Final <br /> Invitations.
            </h3>
            <p className="text-sm md:text-lg text-white/50 font-medium italic leading-relaxed">
              Top 10 golfers earn an exclusive, all-expenses-paid trip to our Season Final at St. Andrews. Secure your spot in the history of the fund.
            </p>
            <button
              onClick={() => navigate('/subscribe')}
              className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-6 bg-[#fed65b] text-[#002819] rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl italic"
            >
              Elevate Your Ranking
            </button>
          </div>
          <Trophy className="absolute -bottom-20 -right-20 text-white/[0.03] w-64 h-64 md:w-96 md:h-96 rotate-12 group-hover:rotate-0 transition-all duration-1000" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-8">
            <Users size={32} className="text-primary" />
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-black text-[#002819] tracking-tighter uppercase italic leading-none">Active <br /> Community</h4>
            <div className="flex items-baseline gap-4 mt-6">
               <p className="text-5xl md:text-7xl font-black text-primary italic tracking-tighter leading-none">{entries.length}</p>
               <span className="text-[10px] md:text-xs font-black text-on-surface-variant/40 uppercase italic tracking-widest leading-none">Global Members</span>
            </div>
            <p className="text-[10px] text-secondary font-black uppercase italic tracking-[0.2em] mt-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Live Growth Sync Active
            </p>
          </div>
        </motion.div>
      </div>
      
      <div className="text-center pb-8 opacity-20 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] italic">
         Official Standings Terminal 4.0 // Clubhouse Ecosystem
      </div>
    </PageTransition>
  );
};

export default Leaderboard;
