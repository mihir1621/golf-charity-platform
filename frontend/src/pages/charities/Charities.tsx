import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  Backpack,
  ChevronRight
} from 'lucide-react';
import apiClient from '../../api/apiClient';
import PageTransition from '../../components/animations/PageTransition';

const ICON_MAP: Record<string, any> = {
  'education': <Backpack size={20} />,
  'environment': <Sprout size={20} />,
  'veterans': <ShieldCheck size={20} />,
  'water': <Droplets size={20} />,
  'health': <Stethoscope size={20} />,
  'default': <Heart size={20} />
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
    } catch (err: any) {
      console.error(`Error updating charity: ${err.message}`);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <PageTransition className="px-6 sm:px-8 py-8 md:py-16 max-w-7xl mx-auto space-y-12 md:space-y-24 overflow-x-hidden">
      {/* Header & Feature Spotlight - Fully Responsive */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-10 md:gap-16 px-2 lg:px-0">
        <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-10">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block italic shadow-sm w-max px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
              Global Ecosystem
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-[#002819] tracking-tighter mb-6 leading-none italic uppercase">
              Impact <br className="hidden md:block" />
              <span className="text-primary underline decoration-secondary/20 underline-offset-[12px]">Partners.</span>
            </h1>
          </div>
          <p className="text-on-surface-variant text-base md:text-xl font-medium leading-relaxed opacity-70 italic max-w-2xl">
            At Clubhouse, every subscription fuels high-impact giving. From restoring habitats to empowering youth development, your membership drives verified positive change across the globe.
          </p>
        </div>

        {featured && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-[#002819] text-white p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden shadow-[0_40px_80px_rgba(0,40,25,0.2)] group"
          >
            <div className="relative z-10 space-y-8 md:space-y-12">
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Trophy size={20} className="text-[#fed65b] animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] italic text-[#fed65b]">Featured Partner Cycle</span>
                  </div>
                  <Sparkles size={24} className="text-[#fed65b]/30" />
               </div>
               
               <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">{featured.name}</h2>
                  <p className="text-sm md:text-lg font-medium italic opacity-50 leading-relaxed max-w-md">{featured.description}</p>
               </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleSelect(featured.id)}
                    className="flex items-center justify-center gap-4 py-5 px-8 bg-[#fed65b] text-[#002819] rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:scale-[1.03] active:scale-95 transition-all italic"
                  >
                     {selectedCharity === featured.id ? 'Active Selection' : 'Set as Impact Target'}
                     {selectedCharity === featured.id ? <CheckCircle2 size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <Link 
                    to={`/charity/${featured.id}`}
                    className="flex items-center justify-center gap-4 py-5 px-8 bg-white/5 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all italic border border-white/10"
                  >
                     Explore Impact
                  </Link>
                </div>
             </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#fed65b]/5 rounded-full blur-[100px] group-hover:bg-[#fed65b]/10 transition-colors duration-1000"></div>
          </motion.div>
        )}
      </div>

      {/* Grid of Partners - Fully Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14 px-2 lg:px-0">
        {charities.map((charity) => (
          <motion.div
            key={charity.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border transition-all duration-500 group ${
              selectedCharity === charity.id 
              ? 'border-primary ring-2 ring-primary/10 shadow-[0_30px_60px_rgba(0,40,25,0.08)]' 
              : 'border-black/[0.03] shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] hover:-translate-y-2'
            }`}
          >
            {/* High Fidelity Image Section */}
            <div className="h-64 md:h-80 relative overflow-hidden">
               <img 
                 className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                 src={charity.image || 'https://images.unsplash.com/photo-1541271696563-3be2f99a3e13?q=80&w=2574&auto=format&fit=crop'} 
                 alt={charity.name} 
                 id={`charity-img-${charity.id}`}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#002819]/60 via-transparent to-transparent opacity-60"></div>
               
               {selectedCharity === charity.id && (
                 <div className="absolute top-6 right-6 bg-[#fed65b] text-[#002819] px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] flex items-center shadow-2xl border border-primary/10 italic">
                    <CheckCircle2 size={12} className="mr-2" />
                    My Impact Target
                 </div>
               )}
               
               <div className="absolute bottom-6 left-6 flex items-center gap-4">
                  <div className="p-4 bg-white/10 backdrop-blur-3xl rounded-2xl border border-white/20 text-white shadow-xl">
                     {ICON_MAP[charity.category] || ICON_MAP.default}
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic drop-shadow-md">{charity.category || 'Global Cause'}</span>
               </div>
            </div>

            {/* Content Section - Refined Typography */}
            <div className="p-10 md:p-14 flex-1 flex flex-col space-y-8 md:space-y-10">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-2xl md:text-3xl font-black text-[#002819] italic uppercase tracking-tighter leading-none flex-1 truncate">{charity.name}</h3>
                <div className="flex flex-col items-end">
                   <p className="text-[10px] font-black text-primary uppercase italic tracking-widest">{charity.matchRate || '5%'} Share</p>
                   {charity.featured && <Sparkles size={14} className="text-[#fed65b] mt-1" />}
                </div>
              </div>
              
              <p className="text-sm md:text-base font-medium text-on-surface-variant/70 leading-relaxed opacity-80 italic h-20 overflow-hidden line-clamp-3">
                  {charity.description}
              </p>
               
               <div className="pt-8 border-t border-surface-container/30 flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-on-surface-variant/40 uppercase italic tracking-widest">Aggregate Value Raised</p>
                    <p className="text-2xl md:text-3xl font-black text-[#002819] italic tracking-tighter leading-none">{formatCurrency(charity.totalRaised || 0)}</p>
                  </div>
                  <Link
                    to={`/charity/${charity.id}`}
                    className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded-2xl text-[#002819] hover:bg-primary hover:text-white transition-all group/arrow shadow-sm"
                  >
                    <ArrowRight size={20} className="group-hover/arrow:translate-x-1 transition-transform" />
                  </Link>
               </div>
              
              <button 
                onClick={() => handleSelect(charity.id)}
                className={`w-full py-5 md:py-6 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 italic ${
                  selectedCharity === charity.id 
                  ? 'bg-primary text-[#fed65b] shadow-2xl shadow-primary/20 scale-[1.02]' 
                  : 'bg-surface-container-low text-on-surface-variant/60 hover:bg-surface-container-high border border-black/[0.03]'
                }`}
              >
                {selectedCharity === charity.id ? (
                  <>
                    <CheckCircle2 size={16} />
                    Current Priority
                  </>
                ) : (
                  'Prioritize This Cause'
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center pb-12 opacity-20 text-[10px] font-black uppercase tracking-[0.5em] italic">
         Official Impact Registry // Clubhouse Distributed Philanthropy Network
      </div>
    </PageTransition>
  );
};

export default Charities;
