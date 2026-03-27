import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShoppingBag, 
  Ticket,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/animations/PageTransition';

const Perks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Perks');

  const tabs = ['All Perks', 'Pro Shop', 'Travel', 'Events'];

  const partnerships = [
    {
      title: 'Custom Fitting',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=600&auto=format&fit=crop',
      description: 'Complimentary professional club fitting session at any partner location nationwide.',
      cta: 'Book Session',
      active: true,
    },
    {
      title: 'Private Air Credit',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop',
      description: '$500 credit toward your first private charter through NetJets partnership.',
      cta: 'Claim Credit',
      active: true,
    },
    {
      title: 'Concierge Dining',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop',
      description: 'Priority table bookings and complimentary aperitifs at Michelin-star restaurants.',
      cta: 'Request Table',
      active: true,
    },
  ];

  return (
    <PageTransition className="p-6 lg:p-10 space-y-12 max-w-7xl mx-auto">

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-[2.5rem] overflow-hidden h-[340px] group"
      >
        <img
          src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2670&auto=format&fit=crop"
          alt="Golf course panorama"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002819]/90 via-[#002819]/70 to-transparent"></div>

        <div className="absolute inset-0 p-10 lg:p-14 flex flex-col justify-center max-w-lg">
          <span className="text-[9px] font-black bg-[#fed65b] text-[#002819] px-3 py-1.5 rounded-full uppercase tracking-[0.2em] w-fit mb-6">
            Exclusive Rewards
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
            The Perks of<br />Partnership.
          </h1>
          <p className="text-sm text-white/85 font-medium leading-relaxed mb-8 max-w-sm">
            Unlock a world of curated benefits designed for the modern golfer. From elite gear to global luxury luxury travel, your membership transcends the fairway.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3.5 bg-[#fed65b] text-[#002819] rounded-xl font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-lg">
              Explore All Benefits
            </button>
            <button className="px-6 py-3.5 bg-[#002819] text-white rounded-xl font-bold text-xs border border-white/10 hover:bg-white/10 transition-all">
              View Partner Map
            </button>
          </div>
        </div>
      </motion.section>

      {/* Category Tabs */}
      <div className="flex gap-8 border-b border-black/[0.06] pb-0">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === tab
                ? 'text-[#002819]'
                : 'text-on-surface-variant/70 hover:text-on-surface-variant/90'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="perksTab"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#002819] rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Large Travel Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 lg:row-span-2 rounded-[2rem] overflow-hidden relative group h-[420px] cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2574&auto=format&fit=crop"
            alt="St Andrews"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-10 space-y-4">
            <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.25em]">Elite Travel Tier</span>
            <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
              Luxury Travel: St. Andrews<br />Escape
            </h3>
            <p className="text-xs text-white/50 font-medium max-w-sm">
              Enjoy 3-night stay at the Old Course Hotel with guaranteed tee times. Exclusive to Masters Members.
            </p>
            <button className="mt-2 px-5 py-3 bg-white text-[#002819] rounded-xl text-xs font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg">
              Claim Now
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Pro Shop Discounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-black/[0.03] shadow-[0_15px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-11 h-11 bg-[#fed65b]/20 rounded-xl flex items-center justify-center">
              <ShoppingBag size={20} className="text-[#c9a820]" />
            </div>
            <h4 className="text-lg font-black text-[#002819] tracking-tight">Pro Shop Discounts</h4>
            <p className="text-xs text-on-surface-variant/80 font-medium leading-relaxed">
              Save up to 25% on premium labels including Callaway, Titleist, and Galvin Green through our member portal.
            </p>
          </div>
          <button className="text-xs font-bold text-[#002819] flex items-center gap-1.5 mt-6 hover:gap-3 transition-all group">
            Browse Catalog
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Early Event Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-[#002819] rounded-[2rem] p-8 text-white flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-11 h-11 bg-white/[0.08] rounded-xl flex items-center justify-center">
              <Ticket size={20} className="text-[#fed65b]" />
            </div>
            <h4 className="text-lg font-black text-white tracking-tight">Early Event Access</h4>
            <p className="text-xs text-white/80 font-medium leading-relaxed">
              Be the first to secure tickets for the Masters and The Open championships.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <Sparkles size={12} className="text-[#fed65b]" />
            <span className="text-[9px] font-black text-[#fed65b] uppercase tracking-[0.2em]">3 New Events Added</span>
          </div>
        </motion.div>
      </div>

      {/* Premium Partnerships */}
      <section className="space-y-8 pt-4">
        <h2 className="text-2xl font-black text-[#002819] tracking-tight">Premium Partnerships</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerships.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-black/[0.03] shadow-[0_15px_30px_rgba(0,0,0,0.03)]"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7 space-y-4">
                <div className="flex items-center gap-3">
                  <h4 className="text-sm font-black text-[#002819]">{p.title}</h4>
                  {p.active && (
                    <span className="text-[8px] font-black bg-[#fed65b] text-[#002819] px-2.5 py-1 rounded-full uppercase tracking-widest">Active</span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant/80 font-medium leading-relaxed">
                  {p.description}
                </p>
                <button className="w-full py-3.5 border border-black/[0.06] rounded-xl text-xs font-bold text-[#002819] hover:bg-[#f5f5f5] transition-colors">
                  {p.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upgrade CTA Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#002819] rounded-[2rem] p-10 lg:p-14 flex flex-col md:flex-row justify-between items-center gap-8"
      >
        <div className="space-y-3 max-w-lg">
          <h3 className="text-2xl font-black text-white tracking-tight">Upgrade to Platinum Tier</h3>
          <p className="text-sm text-white/50 font-medium leading-relaxed">
            Unlock the most prestigious perks including exclusive access to the Augusta National experience and personalized gear management.
          </p>
        </div>
        <button
          onClick={() => navigate('/subscribe')}
          className="px-10 py-5 bg-[#fed65b] text-[#002819] rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg flex-shrink-0"
        >
          Upgrade Now
        </button>
      </motion.section>
    </PageTransition>
  );
};

export default Perks;
