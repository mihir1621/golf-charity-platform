import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  CheckCircle2, 
  Sparkles,
  Droplets,
  Sprout,
  Stethoscope,
  ShieldCheck,
  Loader2,
  Trophy,
  ArrowRight,
  Backpack
} from 'lucide-react';
import apiClient from '../../api/apiClient';

const ICON_MAP: Record<string, any> = {
  'education': <Backpack size={18} />,
  'environment': <Sprout size={18} />,
  'veterans': <ShieldCheck size={18} />,
  'water': <Droplets size={18} />,
  'health': <Stethoscope size={18} />,
  'default': <Heart size={18} />
};

const Charities: React.FC = () => {
  const [charities, setCharities] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [charList, featuredRes, profileRes] = await Promise.all([
        apiClient.get('/charities'),
        apiClient.get('/charities/featured'),
        apiClient.get('/user/profile')
      ]);
      setCharities(charList.data);
      setFeatured(featuredRes.data);
      setSelectedCharity(profileRes.data.selectedCharityId);
    } catch (err) {
      console.error('Charity fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (id: string) => {
    try {
      await apiClient.post('/user/update-charity', { charityId: id });
       setSelectedCharity(id);
       alert('Contribution target updated successfully!');
    } catch (err: any) {
      alert(`Error updating charity: ${err.response?.data?.error || err.message}`);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Header & Feature Spotlight */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-12">
        <div className="max-w-2xl flex flex-col justify-center">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block italic">Our Ecosystem</span>
          <h1 className="text-5xl md:text-6xl font-black text-on-surface tracking-tighter mb-6 leading-none italic uppercase">Impact <span className="text-secondary underline underline-offset-8 decoration-primary/20">Partners</span></h1>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed opacity-70 italic">
            At Clubhouse, every subscription fuels high-impact giving. From youth development to environmental restoration, your membership drives positive change across the globe.
          </p>
        </div>

        {featured && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-primary text-secondary p-10 rounded-[3rem] relative overflow-hidden shadow-2xl group"
          >
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                  <Trophy size={20} className="text-[#fed65b]" />
                  <span className="text-[10px] font-black uppercase tracking-widest italic opacity-60">Featured Partner of the Month</span>
               </div>
               <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">{featured.name}</h2>
               <p className="text-sm font-medium italic opacity-80 leading-relaxed mb-10 max-w-md">{featured.description}</p>
               <button 
                 onClick={() => handleSelect(featured.id)}
                 className="flex items-center gap-4 py-4 px-8 bg-[#fed65b] text-[#002819] rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all italic"
               >
                  {selectedCharity === featured.id ? 'Currently Supporting' : 'Set as My Impact Target'}
                  <ArrowRight size={14} />
               </button>
            </div>
            <Sparkles size={160} className="absolute -bottom-20 -right-20 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
          </motion.div>
        )}
      </div>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {charities.map((charity) => (
          <motion.div
            key={charity.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={`flex flex-col bg-white rounded-[2.5rem] overflow-hidden border transition-all duration-300 group ${
              selectedCharity === charity.id 
              ? 'border-primary ring-1 ring-primary shadow-2xl' 
              : 'border-outline-variant/10 shadow-[0_10px_30px_rgba(0,0,0,0.02)]'
            }`}
          >
            {/* Image Section */}
            <div className="h-56 relative overflow-hidden">
               <img 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                 src={charity.image || 'https://images.unsplash.com/photo-1541271696563-3be2f99a3e13?q=80&w=2574&auto=format&fit=crop'} 
                 alt={charity.name} 
                 id={`charity-img-${charity.id}`}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
               
               {selectedCharity === charity.id && (
                 <div className="absolute top-4 right-4 bg-[#fed65b] text-[#002819] px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center shadow-xl border border-primary/10">
                    <CheckCircle2 size={10} className="mr-2" />
                    My Priority
                 </div>
               )}
               
               <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 text-white">
                     {ICON_MAP[charity.category] || ICON_MAP.default}
                  </div>
               </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black text-on-surface italic uppercase tracking-tight">{charity.name}</h3>
                <span className="text-[9px] font-black bg-primary/5 text-primary px-2.5 py-1 rounded-md uppercase tracking-widest leading-none border border-primary/5 italic">5% Sub Share</span>
              </div>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed mb-6 opacity-60 italic h-16 overflow-hidden">
                 {charity.description}
              </p>
              
              <div className="mb-8 pt-6 border-t border-surface-container/50 flex justify-between items-end">
                <div>
                   <p className="text-[8px] font-black text-on-surface-variant uppercase italic opacity-40 mb-1">Total Impact Value</p>
                   <p className="text-lg font-black text-on-surface italic tracking-tight">${charity.totalRaised || 0}</p>
                </div>
                {charity.featured && <Sparkles size={16} className="text-[#fed65b]" />}
              </div>
              
              <button 
                onClick={() => handleSelect(charity.id)}
                className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 italic ${
                  selectedCharity === charity.id 
                  ? 'bg-primary text-secondary shadow-xl shadow-primary/20' 
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {selectedCharity === charity.id ? (
                  <>
                    <CheckCircle2 size={14} />
                    Current Selection
                  </>
                ) : (
                  'Prioritize This Cause'
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center pb-12 opacity-30 text-[9px] font-black uppercase tracking-[0.3em] italic">
         © 2026 Clubhouse Impact Network. All contributions are subject to external audit.
      </div>
    </div>
  );
};

export default Charities;
