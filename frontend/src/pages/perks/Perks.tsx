import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShoppingBag, 
  Ticket,
  Loader2,
  Gift
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import PageTransition from '../../components/animations/PageTransition';

interface PerkItem {
  id: string;
  title: string;
  image: string;
  description: string;
  cta: string;
  category: string;
  active: boolean;
}

const Perks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Perks');
  const [perks, setPerks] = useState<PerkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerks();
  }, []);

  const fetchPerks = async () => {
    try {
      const res = await apiClient.get('/perks');
      setPerks(res.data);
    } catch (err) {
      console.error('Failed to fetch perks:', err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = ['All Perks', 'Pro Shop', 'Travel', 'Events'];

  const filteredPerks = activeTab === 'All Perks' 
    ? perks 
    : perks.filter(p => p.category === activeTab);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <PageTransition className="p-6 lg:p-10 space-y-12 max-w-7xl mx-auto">

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-[2.5rem] overflow-hidden h-[340px] group"
      >
        <img
          src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23ae?q=80&w=2670&auto=format&fit=crop"
          alt="Golf course panorama"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002819]/90 via-[#002819]/70 to-transparent"></div>

        <div className="absolute inset-0 p-10 lg:p-14 flex flex-col justify-center max-w-lg">
          <span className="text-[9px] font-black bg-[#fed65b] text-[#002819] px-3 py-1.5 rounded-full uppercase tracking-[0.2em] w-fit mb-6">
            Exclusive Rewards
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5 uppercase italic">
            The Perks of<br />Membership.
          </h1>
          <p className="text-sm text-white/85 font-medium leading-relaxed mb-8 max-w-sm italic">
            Unlock a world of curated benefits designed for the modern golfer. From elite gear to global luxury luxury travel, your membership transcends the fairway.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3.5 bg-[#fed65b] text-[#002819] rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg italic">
              Explore All Benefits
            </button>
            <button className="px-6 py-3.5 bg-[#002819] text-white rounded-xl font-black uppercase text-[10px] tracking-widest border border-white/10 hover:bg-white/10 transition-all italic">
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
            className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative italic ${
              activeTab === tab
                ? 'text-[#002819]'
                : 'text-on-surface-variant/40 hover:text-on-surface-variant/90'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="perksTab"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPerks.length > 0 ? filteredPerks.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-black/[0.03] shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="h-56 overflow-hidden relative">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 right-6">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl text-primary shadow-lg border border-white/20">
                    {p.category === 'Pro Shop' ? <ShoppingBag size={20} /> : p.category === 'Travel' ? <Ticket size={20} /> : <Gift size={20} />}
                </div>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <h4 className="text-xl font-black text-[#002819] italic tracking-tight uppercase">{p.title}</h4>
                <span className="text-[8px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-full uppercase tracking-widest">{p.category}</span>
              </div>
              <p className="text-xs text-on-surface-variant/80 font-medium leading-relaxed italic">
                {p.description}
              </p>
              <button className="w-full py-4 border border-black/[0.08] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#002819] hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm group-hover:shadow-md italic flex items-center justify-center gap-2">
                {p.cta}
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full py-24 text-center">
             <Gift size={64} className="mx-auto text-primary opacity-20 mb-6" strokeWidth={1} />
             <p className="font-black italic uppercase tracking-widest text-xs opacity-50">No exclusive perks found for this category.</p>
          </div>
        )}
      </div>

      {/* Upgrade Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#002819] rounded-[3.5rem] p-12 lg:p-20 flex flex-col md:flex-row justify-between items-center gap-10 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.05] blur-[100px] rounded-full pointer-events-none group-hover:bg-primary/[0.1] transition-all duration-1000"></div>
        
        <div className="space-y-4 max-w-lg relative z-10">
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter italic uppercase underline decoration-primary/20 underline-offset-8">Scale Your Ambition.</h3>
          <p className="text-base text-white/50 font-medium leading-relaxed italic">
            Unlock the most prestigious perks including exclusive access to the Augusta National experience and personalized gear management. Upgrade your membership tier for elite status.
          </p>
        </div>
        <button
          onClick={() => navigate('/subscribe')}
          className="px-10 py-5 bg-[#fed65b] text-[#002819] rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.05] active:scale-[0.95] transition-all shadow-2xl flex-shrink-0 italic shadow-primary/20"
        >
          Upgrade Now
        </button>
      </motion.section>
    </PageTransition>
  );
};

export default Perks;
