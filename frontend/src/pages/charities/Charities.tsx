import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  CheckCircle2, 
  Sparkles,
  Droplets,
  Sprout,
  Users,
  Backpack,
  Stethoscope,
  ShieldCheck
} from 'lucide-react';

const charities = [
  {
    id: 'junior-fairways',
    name: 'Junior Fairways',
    percentage: '5% Sub',
    description: 'Providing golf equipment and professional coaching to underprivileged youth, fostering discipline and opportunity through the sport.',
    image: 'https://images.unsplash.com/photo-1541271696563-3be2f99a3e13?q=80&w=2574&auto=format&fit=crop', // Golf related
    icon: <Backpack size={18} />
  },
  {
    id: 'green-links',
    name: 'Green Links Trust',
    percentage: '5% Sub',
    description: 'Focusing on sustainable turf management and local wildlife habitat restoration within golf course ecosystems.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop', // Nature
    icon: <Sprout size={18} />
  },
  {
    id: 'vets-tee',
    name: 'Vets on the Tee',
    percentage: '5% Sub',
    description: 'Utilizing golf as a therapeutic tool for veterans\' mental health and physical rehabilitation through community tournaments.',
    image: 'https://images.unsplash.com/photo-1628173491957-3023ef078f44?q=80&w=2670&auto=format&fit=crop', // Veteran support
    icon: <ShieldCheck size={18} />
  },
  {
    id: 'fairway-well',
    name: 'Fairway Well',
    percentage: '5% Sub',
    description: 'Partnering with global initiatives to provide clean water access to communities in developing nations.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2626&auto=format&fit=crop', // Water
    icon: <Droplets size={18} />
  },
  {
    id: 'caddie-scholars',
    name: 'Caddie Scholars',
    percentage: '5% Sub',
    description: 'Funding full university scholarships for hardworking caddies who demonstrate academic excellence and leadership.',
    image: 'https://images.unsplash.com/photo-1523050335102-c6744729ea14?q=80&w=2670&auto=format&fit=crop', // Education
    icon: <Users size={18} />
  },
  {
    id: 'health-fore-all',
    name: 'Health Fore All',
    percentage: '5% Sub',
    description: 'Donating to high-impact cancer research and patient support services through national health networks.',
    image: 'https://images.unsplash.com/photo-1581056323606-d886bc607730?q=80&w=2670&auto=format&fit=crop', // Health
    icon: <Stethoscope size={18} />
  }
];

const Charities = () => {
  const [selectedCharity, setSelectedCharity] = useState('junior-fairways');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Header & Contribution Card */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
        <div className="max-w-2xl">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block italic">Giving Back</span>
          <h1 className="text-5xl md:text-6xl font-black text-on-surface tracking-tighter mb-6 leading-none italic uppercase">Choose Your <span className="text-secondary underline underline-offset-8 decoration-primary/20">Impact</span></h1>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed opacity-70 italic">
            Every swing counts. A portion of your premium membership is directed to a cause of your choice. Select a partner charity below to begin your contribution.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex items-center gap-8 group hover:shadow-2xl transition-all"
        >
          <div className="text-right">
             <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest mb-1 opacity-40">Your Monthly Contribution</p>
             <p className="text-4xl font-black text-on-surface italic tracking-tighter">$25.00</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-primary text-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
             <Heart size={32} fill="currentColor" />
          </div>
        </motion.div>
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
                 src={charity.image} 
                 alt={charity.name} 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
               
               {selectedCharity === charity.id && (
                 <div className="absolute top-4 right-4 bg-[#fed65b] text-[#002819] px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center shadow-xl border border-primary/10">
                    <CheckCircle2 size={10} className="mr-2" />
                    Currently Selected
                 </div>
               )}
               
               <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 text-white">
                     {charity.icon}
                  </div>
               </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black text-on-surface italic uppercase tracking-tight">{charity.name}</h3>
                <span className="text-[9px] font-black bg-primary/5 text-primary px-2.5 py-1 rounded-md uppercase tracking-widest leading-none border border-primary/5 italic">{charity.percentage}</span>
              </div>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed mb-10 opacity-60 italic h-16 overflow-hidden">
                 {charity.description}
              </p>
              
              <button 
                onClick={() => setSelectedCharity(charity.id)}
                className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 italic ${
                  selectedCharity === charity.id 
                  ? 'bg-primary text-secondary shadow-xl shadow-primary/20' 
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {selectedCharity === charity.id ? (
                  <>
                    <CheckCircle2 size={14} />
                    Selected
                  </>
                ) : (
                  'Select Charity'
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upgrade CTA Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-[#002819] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden group border border-primary-fixed-dim/20"
      >
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
           <div className="max-w-xl">
             <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-6 underline decoration-[#fed65b]/20 underline-offset-[12px]">Want to Split Your Impact?</h2>
             <p className="text-white/60 font-medium italic leading-relaxed text-lg">
                Upgrade to our Diamond Membership to support up to three different charities simultaneously and receive exclusive quarterly impact reports.
             </p>
           </div>
           
           <button className="bg-[#fed65b] text-[#002819] px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_rgba(254,214,91,0.2)] hover:scale-105 active:scale-95 transition-all italic border-b-4 border-[#745c00]">
              Upgrade for More Impact
           </button>
        </div>
        
        {/* Subtle Decos */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>
        <Sparkles size={120} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
      </motion.section>
      
      <div className="text-center pb-12 opacity-30 text-[9px] font-black uppercase tracking-[0.3em] italic">
         © 2024 Digital Clubhouse. The Fairway Fund is a registered non-profit initiative.
      </div>
    </div>
  );
};

export default Charities;
