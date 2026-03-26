import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, ShieldCheck, Globe, TrendingUp, Sparkles, Award } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-charity-600/10 rounded-full blur-[120px] -mr-[400px] -mt-[400px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-charity-900/10 rounded-full blur-[100px] -ml-[300px] -mb-[300px] pointer-events-none opacity-40"></div>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center space-x-3 bg-charity-600/10 text-charity-500 font-black text-[10px] md:text-sm uppercase tracking-[0.4em] px-6 py-2 rounded-full border border-charity-500/20 mb-8 backdrop-blur-md">
            <Trophy size={18} />
            <span>The Premier Impact-Driven Golf Membership</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl">
            PLAY WITH <br/> <span className="text-charity-600">PURPOSE.</span>
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-12">
            The platform where every handicap entry transforms into global charity support. Win prizes, track your game, and join a worldwide movement of impact-driven athletes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/signup" className="btn-primary px-12 h-16 text-lg font-black uppercase tracking-tighter shadow-2xl shadow-charity-600/30 flex items-center group">
              <span>Join Membership</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link to="/charities" className="px-12 h-16 text-slate-300 font-black hover:text-white transition-all uppercase tracking-widest text-sm flex items-center border border-slate-800 rounded-2xl hover:bg-slate-800 shadow-xl">
              Explore Charities
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Impact Numbers Section */}
      <section className="py-24 border-y border-slate-800 bg-dark-950/50 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
           <div className="text-center group">
              <p className="text-5xl font-black text-white mb-2 group-hover:text-charity-500 transition-colors">$1.4M+</p>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Total Charity Impact</p>
           </div>
           <div className="text-center group border-x border-slate-800/50">
              <p className="text-5xl font-black text-white mb-2 group-hover:text-charity-500 transition-colors">12.5k</p>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Active Global Members</p>
           </div>
           <div className="text-center group">
              <p className="text-5xl font-black text-white mb-2 group-hover:text-charity-500 transition-colors">$450k</p>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Monthly Prize Pools</p>
           </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Engineered for Your <span className="text-charity-600 underline decoration-slate-900 underline-offset-8">Best Game.</span></h2>
            <p className="text-slate-400 font-medium text-lg italic">Combining world-class sports tracking with zero-fee charity infrastructure.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: <Globe size={40} />, title: "Global Reach", desc: "Select from over 100+ verified charities worldwide to support with your game." },
               { icon: <Award size={40} />, title: "Monthly Draws", desc: "Every qualifying entry automatically enters you into the monthly high-stakes lottery." },
               { icon: <ShieldCheck size={40} />, title: "Full Transparency", desc: "100% impact delivery. We maintain real-time verification of all donation flows." },
               { icon: <TrendingUp size={40} />, title: "Handicap Tracking", desc: "Modern, professional stableford tracking designed by pros for dedicated golfers." }
             ].map((feature, idx) => (
               <motion.div 
                 key={idx}
                 whileHover={{ y: -10 }}
                 className="bg-dark-800/40 p-10 rounded-[40px] border border-slate-800 hover:border-charity-600/30 transition-all shadow-xl hover:shadow-charity-600/10 group"
               >
                  <div className="w-16 h-16 bg-slate-900 border border-slate-700/50 rounded-2xl flex items-center justify-center text-charity-500 mb-8 group-hover:bg-charity-600 group-hover:text-white group-hover:border-charity-600 transition-all font-black rotate-3 group-hover:rotate-0">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{feature.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Action CTA */}
      <section className="py-32 px-4">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-7xl mx-auto bg-gradient-to-br from-charity-600 to-charity-800 rounded-[60px] p-20 text-center relative overflow-hidden shadow-2xl shadow-charity-600/20"
        >
           {/* Glossy overlay */}
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30"></div>
           
           <div className="relative z-10">
              <Sparkles className="mx-auto text-white/50 mb-8" size={64} fill="currentColor" />
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">READY TO MAKE AN <br/> IMPACT ON THE GREEN?</h2>
              <Link to="/signup" className="inline-flex h-20 px-20 bg-white text-charity-800 rounded-3xl items-center justify-center font-black text-xl hover:bg-slate-50 transition-all shadow-2xl hover:scale-105 active:scale-95 uppercase tracking-tighter">
                Register Your Swing
              </Link>
              <p className="mt-8 text-white/60 font-black uppercase text-xs tracking-widest">Join 12,000+ athletes making a world of difference</p>
           </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
