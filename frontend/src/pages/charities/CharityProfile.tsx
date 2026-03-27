import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Globe, 
  ShieldCheck, 
  Trees,
  CloudRain,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const CharityProfile: React.FC = () => {
  const { id: _id } = useParams<{ id: string }>();

  // Mock data for "The Canopy Collective"
  const charity = {
    name: 'The Canopy Collective',
    tagline: 'Restoring global biodiversity through the strategic reforestation of critical wildlife corridors.',
    mission: 'Since our inception in 2018, The Canopy Collective has focused on more than just planting trees. We rebuild entire ecosystems. By partnering with local indigenous communities, we ensure that every sapling planted is a step toward sustainable, long-term environmental healing.',
    missionDetail: 'Our current project focuses on the Atlantic Forest in Brazil—one of the most endangered biomes on the planet. Your contributions directly fund the nursery operations, soil preparation, and five years of maintenance for every single tree planted.',
    heroImage: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2664&auto=format&fit=crop',
    stats: [
      { label: 'Trees Planted By You', value: '1,248', icon: <Trees size={24} />, color: 'text-[#002819] bg-primary/10' },
      { label: 'Liters of Water Saved', value: '4.2M', icon: <CloudRain size={24} />, color: 'text-[#745c00] bg-secondary/10' },
      { label: 'Tons of CO2 Absorbed', value: '850', icon: <Globe size={24} />, color: 'text-[#002819] bg-primary/5' },
    ],
    projects: [
      { name: 'Atlantic Forest Hub', country: 'Brazil', image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2574&auto=format&fit=crop' },
      { name: 'Sumatra Corridor', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop' },
      { name: 'Mau Reforestry', country: 'Kenya', image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop' },
    ]
  };

  return (
    <PageTransition className="space-y-0 pb-0">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden flex items-end">
        <img 
          src={charity.heroImage} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Forest backdrop" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-8 w-full pb-20 space-y-8">
           <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-max flex items-center gap-3">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic">Verified Partner</span>
              <ShieldCheck size={14} className="text-[#fed65b]" />
           </div>
           
           <div className="space-y-4">
              <h1 className="text-7xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-none">
                 {charity.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-medium italic max-w-3xl leading-relaxed tracking-tight">
                 {charity.tagline}
              </p>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-20">
           {/* Left: The Mission */}
           <div className="lg:col-span-7 space-y-16">
              <div className="space-y-10">
                 <h2 className="text-4xl font-black italic uppercase tracking-tighter text-on-surface">The Mission</h2>
                 <div className="space-y-8 text-lg font-medium text-on-surface-variant leading-relaxed opacity-85 italic">
                    <p>{charity.mission}</p>
                    <p>{charity.missionDetail}</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <img 
                   src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2613&auto=format&fit=crop" 
                   className="w-full h-[400px] object-cover rounded-[3rem] shadow-xl hover:scale-[1.02] transition-all" 
                   alt="Mission support" 
                 />
                 <img 
                   src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2541&auto=format&fit=crop" 
                   className="w-full h-[400px] object-cover rounded-[3rem] shadow-xl hover:scale-[1.02] transition-all" 
                   alt="Mission result" 
                 />
              </div>
           </div>

           {/* Right: Impact Card */}
           <div className="lg:col-span-5 relative">
              <div className="sticky top-32 bg-white p-12 rounded-[4rem] border border-outline-variant/10 shadow-[0_40px_80px_rgba(0,0,0,0.06)] space-y-12">
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter text-on-surface">Our Collective Impact</h3>
                 
                 <div className="space-y-8">
                    {charity.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-8 group">
                         <div className={`p-5 rounded-[2rem] ${stat.color} transition-transform group-hover:scale-110`}>
                            {stat.icon}
                         </div>
                         <div>
                            <p className="text-3xl font-black italic text-on-surface tracking-tighter">{stat.value}</p>
                            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic opacity-60">{stat.label}</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-4 pt-4 border-t border-surface-container">
                    <div className="flex justify-between text-[10px] font-black uppercase italic tracking-widest">
                       <span className="opacity-40 text-on-surface-variant">Project Goal: Phase 4</span>
                       <span className="text-primary">82%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                       <div className="h-full bg-primary rounded-full shadow-sm" style={{ width: '82%' }}></div>
                    </div>
                 </div>

                 <button className="w-full py-6 bg-[#002819] text-white rounded-[2rem] font-black uppercase tracking-widest italic flex items-center justify-center gap-4 hover:bg-primary shadow-2xl transition-all active:scale-95">
                    Increase My Contribution
                    <Sparkles size={18} />
                 </button>

                 <div className="flex items-center justify-center gap-3 text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic opacity-40">
                    <ShieldCheck size={14} />
                    Certified Fairway Partner
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Where Your Fund Goes Section */}
      <div className="bg-surface-container-low/30 py-32">
         <div className="max-w-7xl mx-auto px-8 space-y-16">
            <div className="flex justify-between items-end">
               <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-on-surface">Where Your Fund Goes</h2>
                  <p className="text-on-surface-variant font-medium italic opacity-70">We operate in 12 distinct wildlife corridors. Every donation is pooled to maximize purchasing power for endemic saplings.</p>
               </div>
               <div className="flex gap-4">
                  <button className="p-4 bg-white rounded-full border border-outline-variant/10 text-on-surface-variant hover:bg-primary hover:text-white transition-all shadow-sm">
                     <ChevronLeft size={24} />
                  </button>
                  <button className="p-4 bg-white rounded-full border border-outline-variant/10 text-on-surface-variant hover:bg-primary hover:text-white transition-all shadow-sm">
                     <ChevronRight size={24} />
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {charity.projects.map((project, i) => (
                  <div key={i} className="group relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl">
                     <img 
                       src={project.image} 
                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                       alt={project.name} 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                     <div className="absolute bottom-12 left-10 space-y-2">
                        <span className="text-[10px] font-black text-white/60 uppercase tracking-widest italic">{project.country}</span>
                        <h4 className="text-2xl font-black text-white italic uppercase tracking-tight leading-none">{project.name}</h4>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Premium Profile Footer (matching app design) */}
      <div className="bg-[#002819] py-32 text-white/50 px-8">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="md:col-span-2 space-y-10">
               <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">FairwayFund</h3>
               <p className="max-w-md text-lg font-medium italic leading-relaxed">The world's most transparent platform for high-impact philanthropy. Join the clubhouse of global change-makers.</p>
            </div>
            
            <div className="space-y-8">
               <p className="text-[11px] font-black text-white uppercase tracking-[0.3em] italic">Explore</p>
               <ul className="space-y-4 text-sm font-bold uppercase tracking-widest italic pt-2">
                  <li className="hover:text-primary transition-colors cursor-pointer">Find Charities</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Impact Reports</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Partner with Us</li>
               </ul>
            </div>

            <div className="space-y-8">
               <p className="text-[11px] font-black text-white uppercase tracking-[0.3em] italic">Membership</p>
               <ul className="space-y-4 text-sm font-bold uppercase tracking-widest italic pt-2">
                  <li className="hover:text-primary transition-colors cursor-pointer">The Green Tier</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">The Masters Tier</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Corporate Gifting</li>
               </ul>
            </div>
         </div>
         
         <div className="max-w-7xl mx-auto pt-32 mt-32 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[10px] font-black uppercase tracking-widest">© 2026 FairwayFund International. All Rights Reserved.</p>
            <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest">
               <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
               <span className="hover:text-white transition-colors cursor-pointer">Terms of Play</span>
            </div>
         </div>
      </div>
    </PageTransition>
  );
};

export default CharityProfile;
