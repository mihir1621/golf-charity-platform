import { motion } from 'framer-motion';
import { 
  Sprout, 
  Droplets, 
  Sun, 
  ArrowRight, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/animations/PageTransition';

const ImpactReports = () => {
  const navigate = useNavigate();

  return (
    <PageTransition className="p-6 lg:p-10 max-w-7xl mx-auto space-y-14">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center"
      >
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Live Impact Dashboard</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#002819] tracking-tight leading-[1.05]">
            12,400+<br />Trees Planted
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant/80 font-medium leading-relaxed max-w-md">
            The Clubhouse has reached a historic milestone, championing biodiversity and securing carbon offsets for future generations.
          </p>
          <div className="flex items-end gap-4 sm:gap-6 pt-2">
            <div>
              <span className="text-3xl sm:text-4xl font-black text-primary tracking-tight">90%</span>
              <p className="text-[8px] sm:text-[9px] font-black text-on-surface-variant/70 uppercase tracking-[0.2em] mt-1">Goal Reached</p>
            </div>
            <div className="h-10 sm:h-12 w-px bg-black/[0.06]"></div>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-[#002819] tracking-tight">$2.1M</span>
              <p className="text-[8px] sm:text-[9px] font-black text-on-surface-variant/70 uppercase tracking-[0.2em] mt-1">Total Mobilized</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2.5rem] overflow-hidden h-[380px] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2574&auto=format&fit=crop"
            alt="Trees planted impact"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </motion.section>

      {/* Stats Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-6 border-y border-black/[0.04]">
        <p className="text-sm text-on-surface-variant/50 font-medium">
          Powered by <span className="text-[#002819] font-bold">5,200+</span> members and their monthly contributions.
        </p>
        <button className="text-xs font-bold text-[#002819] flex items-center gap-2 hover:gap-3 transition-all group">
          View Archive
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bento Project Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Scholarship Fund Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 bg-white rounded-[2.5rem] p-10 border border-black/[0.03] shadow-[0_15px_30px_rgba(0,0,0,0.03)] space-y-6"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-[#002819] tracking-tight">Green Scholarship Fund</h3>
              <span className="text-[9px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-md uppercase tracking-[0.2em] inline-block">Launched</span>
            </div>
            <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
              <Sprout size={20} className="text-primary" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-center gap-4">
              <span className="text-[9px] sm:text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Fund Progress</span>
              <span className="text-xs sm:text-sm font-bold text-[#002819] whitespace-nowrap">$45k / $60k</span>
            </div>
            <div className="h-2.5 w-full bg-[#f0f0f0] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '75%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary rounded-full"
              ></motion.div>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant/50 font-medium leading-relaxed">
            Supporting the next generation of environmental leaders through fully-funded university placements in sustainable agriculture.
          </p>

          <button className="text-[10px] font-black text-[#002819] uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all group">
            Explore Program
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Irrigation Project Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-[#002819] rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[280px]"
        >
          <div className="relative z-10 space-y-4">
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.25em]">Water</span>
            <h3 className="text-xl font-black text-white tracking-tight">
              Irrigation Project<br />Completion
            </h3>
          </div>
          <div className="relative z-10 space-y-4 md:space-y-6 mt-6">
            <p className="text-[11px] sm:text-xs text-white/50 font-medium leading-relaxed">
              450 hectares of farmland now utilize 100% recycled water systems.
            </p>
            <button className="px-5 py-3 bg-[#fed65b] text-[#002819] rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all w-full sm:w-auto">
              Read Impact
            </button>
          </div>
          <Droplets className="absolute -bottom-4 -right-4 text-white/[0.04] w-32 h-32" />
        </motion.div>

        {/* Solar Grid Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-black/[0.03] shadow-[0_15px_30px_rgba(0,0,0,0.03)] space-y-6"
        >
          <div className="w-11 h-11 bg-[#fed65b]/15 rounded-xl flex items-center justify-center">
            <Sun size={20} className="text-[#c9a820]" />
          </div>
          <div>
            <h4 className="text-lg font-black text-[#002819] tracking-tight mb-2">Solar Grid Expansion</h4>
            <p className="text-xs text-on-surface-variant/50 font-medium leading-relaxed">
              The Clubhouse is now 100% off-grid, powered entirely by our new solar array on the south ridge.
            </p>
          </div>
          <div className="pt-2">
            <span className="text-[9px] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">Efficiency Increase</span>
            <p className="text-3xl font-black text-primary tracking-tight mt-1">+24%</p>
          </div>
        </motion.div>

        {/* Story Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 bg-white rounded-[2.5rem] overflow-hidden border border-black/[0.03] shadow-[0_15px_30px_rgba(0,0,0,0.03)]"
        >
          <div className="h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop"
              alt="Sustainable fairways"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-on-surface-variant/70 uppercase tracking-[0.2em]">Newsroom</span>
              <span className="text-[9px] text-on-surface-variant/60">—</span>
              <span className="text-[9px] font-medium text-on-surface-variant/70">Oct 12, 2024</span>
            </div>
            <h4 className="text-lg font-black text-[#002819] tracking-tight">The Future of Sustainable Fairways</h4>
            <p className="text-xs text-on-surface-variant/50 font-medium leading-relaxed">
              How we are using drone technology to monitor soil health and reduce fertilizer usage by 60%.
            </p>
            <button className="text-xs font-bold text-[#002819] flex items-center gap-2 hover:gap-3 transition-all group">
              Read more
              <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#002819] rounded-[2.5rem] p-12 lg:p-16 text-center space-y-6"
      >
        <h2 className="text-3xl font-black text-[#fed65b] tracking-tight">
          Want to make an even bigger impact?
        </h2>
        <p className="text-sm text-white/50 font-medium max-w-lg mx-auto leading-relaxed">
          Your monthly membership directly funds these initiatives. Join 5,000+ members building a greener legacy.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/subscribe')}
            className="px-8 py-4 bg-[#fed65b] text-[#002819] rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            Join the Fund
          </button>
          <button
            onClick={() => navigate('/charities')}
            className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-sm border border-white/10 hover:bg-white/20 transition-all"
          >
            Donate Now
          </button>
        </div>
      </motion.section>
    </PageTransition>
  );
};

export default ImpactReports;
