import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Users,
  Crown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LeaderboardEntry {
  rank: number;
  name: string;
  club: string;
  region: string;
  totalImpact: string;
  scoreAvg: number;
  avatar: string;
  isYou?: boolean;
  isPremium?: boolean;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState('Global');

  const regions = ['Global', 'North America', 'Europe', 'Asia Pacific'];

  const entries: LeaderboardEntry[] = [
    { rank: 1, name: 'Alister Mackenzie', club: 'Royal St. Georges', region: 'Europe', totalImpact: '$124,500', scoreAvg: 68.4, avatar: 'https://i.pravatar.cc/80?u=alister' },
    { rank: 2, name: 'Sorenstam Annika', club: 'Lake Nona GC', region: 'North America', totalImpact: '$98,200', scoreAvg: 69.1, avatar: 'https://i.pravatar.cc/80?u=annika' },
    { rank: 42, name: 'You', club: 'Pebble Beach Links', region: 'North America', totalImpact: '$12,400', scoreAvg: 74.2, avatar: 'https://i.pravatar.cc/80?u=jameson', isYou: true, isPremium: true },
    { rank: 43, name: 'Gene Sarazen', club: 'Oakmont Country Club', region: 'North America', totalImpact: '$11,950', scoreAvg: 74.5, avatar: 'https://i.pravatar.cc/80?u=gene' },
    { rank: 44, name: 'Kathy Whitworth', club: 'River Oaks', region: 'North America', totalImpact: '$10,200', scoreAvg: 75.1, avatar: 'https://i.pravatar.cc/80?u=kathy' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start gap-8"
      >
        <div className="space-y-4">
          <span className="text-[9px] font-black bg-[#fed65b] text-[#002819] px-3 py-1.5 rounded-full uppercase tracking-[0.2em] inline-block">
            Community Standings
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-[#002819] tracking-tight italic">
            Global Leaders
          </h1>
          <p className="text-base text-on-surface-variant/50 font-medium leading-relaxed max-w-lg">
            Celebrating the champions of the fairway and the stewards of the green. Your impact ripples across every course.
          </p>
        </div>

        {/* Your Rank Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] p-8 border border-black/[0.03] shadow-[0_20px_40px_rgba(0,0,0,0.04)] text-center min-w-[160px]"
        >
          <span className="text-[9px] font-black text-[#c9a820] uppercase tracking-[0.25em]">Your Rank</span>
          <p className="text-5xl font-black text-[#002819] tracking-tight mt-2">#42</p>
        </motion.div>
      </motion.div>

      {/* Search + Region Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative group flex-1 max-w-lg">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search golfers by name or club..."
            className="w-full h-14 pl-13 pr-6 bg-white rounded-2xl border border-black/[0.06] text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-5 py-3.5 rounded-xl text-xs font-bold transition-all ${
                activeRegion === region
                  ? 'bg-[#002819] text-white shadow-lg'
                  : 'bg-white text-[#002819] border border-black/[0.06] hover:bg-[#f5f5f5]'
              }`}
            >
              {region}
            </button>
          ))}
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
        <div className="grid grid-cols-12 gap-4 px-10 py-5 border-b border-black/[0.04] bg-[#fafafa]">
          <div className="col-span-1">
            <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Rank</span>
          </div>
          <div className="col-span-3">
            <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Player</span>
          </div>
          <div className="col-span-3">
            <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Regional</span>
          </div>
          <div className="col-span-3">
            <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Total Impact</span>
          </div>
          <div className="col-span-2 text-right">
            <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Score Avg</span>
          </div>
        </div>

        {/* Rows */}
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className={`grid grid-cols-12 gap-4 px-10 py-6 items-center border-b border-black/[0.03] last:border-b-0 transition-colors ${
              entry.isYou
                ? 'bg-[#002819]/[0.04] hover:bg-[#002819]/[0.06]'
                : 'hover:bg-[#fafafa]'
            }`}
          >
            {/* Rank */}
            <div className="col-span-1 flex items-center gap-2">
              <span className={`text-lg font-black tracking-tight ${entry.isYou ? 'text-[#002819]' : 'text-on-surface-variant/40'}`}>
                {String(entry.rank).padStart(2, '0')}
              </span>
              {entry.rank === 1 && <Crown size={14} className="text-[#c9a820]" />}
            </div>

            {/* Player */}
            <div className="col-span-3 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-full overflow-hidden border-2 flex-shrink-0 ${entry.isYou ? 'border-primary' : 'border-transparent'}`}>
                <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${entry.isYou ? 'text-[#002819]' : 'text-[#002819]/80'}`}>
                    {entry.name}
                  </span>
                  {entry.isPremium && (
                    <span className="text-[7px] font-black bg-[#fed65b] text-[#002819] px-2 py-0.5 rounded uppercase tracking-wider">Premium</span>
                  )}
                </div>
                <span className="text-[11px] text-on-surface-variant/40 font-medium">{entry.club}</span>
              </div>
            </div>

            {/* Regional */}
            <div className="col-span-3">
              <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md ${
                entry.region === 'Europe'
                  ? 'bg-[#002819]/10 text-[#002819]'
                  : 'bg-primary/10 text-primary'
              }`}>
                {entry.region}
              </span>
            </div>

            {/* Total Impact */}
            <div className="col-span-3">
              <span className={`text-base font-bold ${entry.isYou ? 'text-[#002819]' : 'text-[#002819]/70'}`}>
                {entry.totalImpact}
              </span>
            </div>

            {/* Score Avg */}
            <div className="col-span-2 text-right">
              <span className={`text-base font-bold ${entry.isYou ? 'text-[#002819]' : 'text-on-surface-variant/50'}`}>
                {entry.scoreAvg}
              </span>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="px-10 py-5 flex justify-between items-center border-t border-black/[0.04] bg-[#fafafa]">
          <span className="text-xs font-medium text-on-surface-variant/40">
            Showing 42-46 of 1,284 golfers
          </span>
          <div className="flex gap-2">
            <button className="w-10 h-10 border border-black/[0.06] rounded-xl flex items-center justify-center text-on-surface-variant/40 hover:bg-white hover:text-[#002819] transition-all">
              <ChevronLeft size={16} />
            </button>
            <button className="w-10 h-10 border border-black/[0.06] rounded-xl flex items-center justify-center text-on-surface-variant/40 hover:bg-white hover:text-[#002819] transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Impact Season Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 bg-[#002819] rounded-[2.5rem] p-10 lg:p-12 text-white relative overflow-hidden"
        >
          <div className="relative z-10 space-y-5 max-w-sm">
            <h3 className="text-2xl font-black text-[#fed65b] italic tracking-tight">
              Impact Season Ends in 4 Days
            </h3>
            <p className="text-sm text-white/50 font-medium leading-relaxed">
              Top 50 golfers receive invitations to the Founders Invitational at St. Andrews.
            </p>
            <button
              onClick={() => navigate('/perks')}
              className="px-6 py-3.5 bg-[#fed65b] text-[#002819] rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              View Prizes
            </button>
          </div>
          <Trophy className="absolute -bottom-6 -right-6 text-white/[0.04] w-40 h-40 rotate-12" />
        </motion.div>

        {/* Community Growth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-black/[0.03] shadow-[0_15px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
            <Users size={22} className="text-primary" />
          </div>
          <div>
            <h4 className="text-base font-black text-[#002819] tracking-tight mb-1">Community Growth</h4>
            <p className="text-4xl font-black text-primary tracking-tight mt-3">+12%</p>
            <p className="text-[11px] text-on-surface-variant/40 font-medium mt-1">New members this month</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
