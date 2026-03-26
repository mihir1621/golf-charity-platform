import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Search, 
  Calendar, 
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LogScore = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(18);
  const [selectedCourse, setSelectedCourse] = useState('Augusta National');
  const [dateType, setDateType] = useState<'today' | 'custom'>('today');

  const recentScores = [
    { date: '22 Oct', pts: 32, current: true },
    { date: '15 Oct', pts: 28 },
    { date: '08 Oct', pts: 35 },
    { date: '01 Oct', pts: 30 },
    { date: '24 Sep', pts: 26, status: 'OUT' },
  ];

  const handleScoreChange = (delta: number) => {
    setScore(prev => Math.max(0, Math.min(60, prev + delta)));
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col max-w-md mx-auto relative shadow-2xl">
      {/* Mobile Top App Bar */}
      <div className="p-6 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/5">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-surface-container rounded-full transition-colors"
        >
           <ChevronLeft size={24} className="text-on-surface" />
        </button>
        <span className="text-sm font-black italic uppercase tracking-[0.2em] text-on-surface">Log Score</span>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
           <img src="https://i.pravatar.cc/100?u=jameson" alt="user" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Score Selector Section */}
        <section className="p-8 text-center bg-gradient-to-b from-white to-transparent">
          <p className="text-[10px] font-black text-[#745c00] uppercase tracking-[0.3em] mb-12 italic">Current Round Performance</p>
          
          <div className="relative inline-flex items-center justify-center mb-8">
             <motion.div 
               key={score}
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-[140px] font-black leading-none text-[#002819] italic tracking-tighter"
             >
                {score}
             </motion.div>
             <span className="text-sm font-black text-on-surface-variant/40 ml-4 italic absolute -right-12 bottom-8">PTS</span>
          </div>

          <div className="flex justify-center gap-6 mb-10">
             <button 
               onClick={() => handleScoreChange(-1)}
               className="w-14 h-14 rounded-2xl bg-white border border-outline-variant/10 shadow-sm flex items-center justify-center text-xl font-black text-on-surface hover:bg-primary hover:text-white transition-all active:scale-90"
             >
                -
             </button>
             <button 
               onClick={() => handleScoreChange(1)}
               className="w-14 h-14 rounded-2xl bg-white border border-outline-variant/10 shadow-sm flex items-center justify-center text-xl font-black text-on-surface hover:bg-primary hover:text-white transition-all active:scale-90"
             >
                +
             </button>
          </div>
          
          <p className="text-xs font-medium text-on-surface-variant italic opacity-60">Adjust score for today's Stableford points</p>
        </section>

        {/* Course Selection Section */}
        <section className="p-8 space-y-6">
           <h3 className="text-sm font-black text-on-surface italic uppercase tracking-tight">Course Location</h3>
           <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search golf course..."
                className="w-full h-16 pl-14 pr-6 bg-white rounded-2xl border border-outline-variant/10 italic text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
              />
           </div>
           
           <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {['Augusta National', 'St Andrews', 'Pebble Beach'].map(course => (
                 <button
                   key={course}
                   onClick={() => setSelectedCourse(course)}
                   className={`px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest italic flex-shrink-0 transition-all ${
                     selectedCourse === course 
                     ? 'bg-primary text-secondary shadow-lg' 
                     : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                   }`}
                 >
                    {course}
                 </button>
              ))}
           </div>
        </section>

        {/* Date Selection Section */}
        <section className="p-8 space-y-6">
           <h3 className="text-sm font-black text-on-surface italic uppercase tracking-tight">Date Played</h3>
           <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setDateType('today')}
                className={`flex items-center justify-center gap-3 h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest italic transition-all ${
                  dateType === 'today'
                  ? 'bg-[#002819] text-white shadow-xl'
                  : 'bg-white border border-outline-variant/10 text-on-surface-variant'
                }`}
              >
                 <Calendar size={18} />
                 Today
              </button>
              <button 
                onClick={() => setDateType('custom')}
                className={`flex items-center justify-center gap-3 h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest italic transition-all ${
                  dateType === 'custom'
                  ? 'bg-[#002819] text-white shadow-xl'
                  : 'bg-white border border-outline-variant/10 text-on-surface-variant'
                }`}
              >
                 <Calendar size={18} />
                 Select Date
              </button>
           </div>
        </section>

        {/* Recent Scores Rolling Section */}
        <section className="p-8 space-y-6">
           <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-on-surface italic uppercase tracking-tight">Recent Scores</h3>
              <span className="text-[8px] font-black text-error uppercase tracking-[0.2em] italic">Rolling Last 5</span>
           </div>
           
           <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {recentScores.map((s, i) => (
                 <div 
                   key={i} 
                   className={`flex-shrink-0 w-24 p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all ${
                     s.status === 'OUT' 
                     ? 'border-2 border-dashed border-error/30 bg-white' 
                     : 'bg-white border border-outline-variant/10 shadow-sm'
                   }`}
                 >
                    {s.status === 'OUT' && (
                       <div className="absolute top-0 right-0 bg-error text-white text-[7px] font-black px-1.5 py-0.5 rounded-bl-lg uppercase tracking-widest italic">OUT</div>
                    )}
                    <span className="text-[8px] font-black text-on-surface-variant/40 uppercase italic mb-3 text-center leading-tight">{s.date}</span>
                    <span className={`text-2xl font-black italic tracking-tighter ${s.status === 'OUT' ? 'text-error/40' : 'text-on-surface'}`}>{s.pts}</span>
                    
                    {s.current && (
                       <div className="absolute bottom-0 left-0 w-full h-1 bg-primary"></div>
                    )}
                 </div>
              ))}
           </div>
           
           <p className="text-[9px] font-bold text-on-surface-variant text-center italic opacity-40">
              New score will replace your 26pt round from Sept 24th
           </p>
        </section>
      </div>

      {/* Floating Submit Button */}
      <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/90 to-transparent">
         <motion.button 
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           className="w-full bg-[#002819] text-white h-20 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] italic flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,40,25,0.2)]"
         >
            <span>Submit Round</span>
            <Send size={18} className="translate-x-1 -translate-y-1" />
         </motion.button>
      </div>
    </div>
  );
};

export default LogScore;
