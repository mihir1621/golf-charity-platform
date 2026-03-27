import { motion } from 'framer-motion';
import { 
  Check, 
  ArrowRight, 
  FileText, 
  Share2,
  HelpCircle,
  TreePine,
  Droplets
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import PageTransition from '../../components/animations/PageTransition';

const Success = () => {
  const navigate = useNavigate();

  return (
    <PageTransition className="min-h-screen bg-[#f8f9f8] flex flex-col selection:bg-primary/20">
      {/* Header */}
      <header className="px-12 py-8 flex justify-between items-center relative z-10">
        <Link to="/" className="text-xl font-black text-[#002819] italic tracking-tighter hover:opacity-80 transition-opacity">
          Fairway Fund
        </Link>
        <button className="w-8 h-8 bg-[#002819] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
          <HelpCircle size={16} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 lg:px-16 py-8 pb-16">
        <div className="w-full max-w-5xl space-y-12">

          {/* Hero Celebration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            {/* Check Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 150 }}
              className="w-20 h-20 bg-[#002819] rounded-full flex items-center justify-center mx-auto shadow-[0_16px_40px_rgba(0,40,25,0.25)]"
            >
              <Check size={36} className="text-white" strokeWidth={3} />
            </motion.div>

            <h1 className="text-5xl font-black text-[#002819] tracking-tight italic">
              You're All Set!
            </h1>
            <p className="text-base text-on-surface-variant/85 font-medium leading-relaxed max-w-md mx-auto">
              Your membership is now active. Welcome to the exclusive circle of the Digital Clubhouse.
            </p>
          </motion.div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Action Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-black/[0.03] p-10 space-y-6"
            >
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">
                Action Summary
              </h3>

              <div className="space-y-0 divide-y divide-black/[0.04]">
                <div className="flex justify-between items-center py-4">
                  <span className="text-sm text-on-surface-variant/60 font-medium">Membership Tier</span>
                  <span className="text-[10px] font-black text-white bg-primary px-3 py-1.5 rounded-full uppercase tracking-widest">Masters Elite</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-sm text-on-surface-variant/60 font-medium">Billing Cycle</span>
                  <span className="text-sm font-bold text-[#002819]">Annual</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-sm text-on-surface-variant/60 font-medium">Activation Date</span>
                  <span className="text-sm font-bold text-[#002819]">Oct 24, 2024</span>
                </div>
              </div>

              <div className="border-t border-black/[0.06] pt-5 flex justify-between items-center">
                <span className="text-sm font-bold text-[#002819]">Total Contribution</span>
                <span className="text-2xl font-black text-[#002819] tracking-tight">$1,200.00</span>
              </div>
            </motion.div>

            {/* Lifetime Impact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#002819] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,40,25,0.15)] p-10 text-white space-y-8"
            >
              <h3 className="text-xl font-black text-white tracking-tight">
                Lifetime Impact
              </h3>

              {/* Impact Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.12] rounded-2xl p-6 border border-white/[0.08] space-y-3">
                  <TreePine size={20} className="text-primary-fixed/80" />
                  <p className="text-3xl font-black tracking-tight">142</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80">Trees Planted</p>
                </div>
                <div className="bg-white/[0.12] rounded-2xl p-6 border border-white/[0.08] space-y-3">
                  <Droplets size={20} className="text-primary-fixed/80" />
                  <p className="text-3xl font-black tracking-tight">8.4k</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80">Liters Provided</p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white/70">Next Milestone: Silver Guardian</span>
                  <span className="text-xs font-bold text-white/40">85%</span>
                </div>
                <div className="h-2.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#fed65b] to-[#c9a820] rounded-full"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Utility Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
          >
            <button className="bg-white rounded-2xl p-6 flex items-center gap-5 border border-black/[0.03] shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-[#f5f5f5] rounded-xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                <FileText size={20} className="text-on-surface-variant/50" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#002819]">Download Receipt</p>
                <p className="text-[11px] text-on-surface-variant/40 font-medium">PDF format (2.4MB)</p>
              </div>
            </button>
            <button className="bg-white rounded-2xl p-6 flex items-center gap-5 border border-black/[0.03] shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-[#f5f5f5] rounded-xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                <Share2 size={20} className="text-on-surface-variant/50" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#002819]">Share Success</p>
                <p className="text-[11px] text-on-surface-variant/40 font-medium">Invite your network</p>
              </div>
            </button>
          </motion.div>

          {/* CTA + Support */}
          <div className="text-center space-y-5">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-14 py-5 bg-[#002819] text-white rounded-2xl font-bold text-sm shadow-[0_16px_40px_rgba(0,40,25,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-3"
            >
              Enter The Vault
              <ArrowRight size={18} />
            </button>
            <p className="text-sm text-on-surface-variant/85 font-medium">
              Need help?{' '}
              <button className="text-[#002819] font-bold hover:underline">Contact Clubhouse Support</button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-12 py-10 border-t border-black/[0.04] flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-lg font-black text-[#002819] italic tracking-tighter">Fairway Fund</span>
        <div className="flex items-center gap-8">
          {['Support', 'Privacy Policy', 'Terms of Service'].map(link => (
            <button key={link} className="text-xs font-medium text-primary/60 hover:text-primary transition-colors">
              {link}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-medium text-on-surface-variant/40 italic">
          © 2024 Fairway Fund. The Digital Clubhouse.
        </span>
      </footer>
    </PageTransition>
  );
};

export default Success;
