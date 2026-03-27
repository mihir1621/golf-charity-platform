import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Globe, 
  ShieldCheck, 
  Trees,
  CloudRain,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  MapPin,
  ExternalLink
} from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const CharityProfile: React.FC = () => {
  const { id: _id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
    <PageTransition className="space-y-0 overflow-x-hidden">
      {/* Dynamic Hero Section - Responsive Height */}
      <div className="relative min-h-[70vh] md:h-[85vh] w-full overflow-hidden flex items-end">
        <img 
          src={charity.heroImage} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-105" 
          alt={charity.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002819] via-[#002819]/40 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full pb-16 md:pb-24 space-y-8 md:space-y-12">
           <button 
             onClick={() => navigate(-1)}
             className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full w-max flex items-center gap-4 group hover:bg-white/20 transition-all shadow-2xl scale-90 md:scale-100 origin-left"
           >
              <ChevronLeft size={18} className="text-white group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Back to Partners</span>
           </button>
           
           <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-4 text-[#fed65b]">
                 <ShieldCheck size={24} className="opacity-80" />
                 <span className="text-xs md:text-sm font-black uppercase tracking-[0.4em] italic shadow-sm">Verified Strategic Partner</span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.85] max-w-5xl">
                 {charity.name}
              </h1>
              <p className="text-lg md:text-3xl text-white/70 font-medium italic max-w-3xl leading-relaxed tracking-tight">
                 {charity.tagline}
              </p>
           </div>
        </div>
      </div>

      {/* Narrative Section - Responsive Grid */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
           
           {/* Primary Content Column */}
           <div className="lg:col-span-7 space-y-16 md:space-y-24">
              <div className="space-y-10 md:space-y-14">
                 <div className="space-y-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block italic opacity-40">Core Objectives</span>
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#002819] leading-tight">The Mission Protocol.</h2>
                 </div>
                 <div className="space-y-8 text-base md:text-xl font-medium text-on-surface-variant/80 leading-relaxed italic border-l-4 border-primary/20 pl-8 md:pl-12 py-4">
                    <p>{charity.mission}</p>
                    <p>{charity.missionDetail}</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                 <div className="relative h-[350px] md:h-[500px] overflow-hidden rounded-[2.5rem] md:rounded-[4rem] group shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2613&auto=format&fit=crop" 
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                      alt="Operations" 
                    />
                    <div className="absolute inset-0 bg-[#002819]/20 group-hover:bg-transparent transition-colors"></div>
                 </div>
                 <div className="relative h-[350px] md:h-[500px] overflow-hidden rounded-[2.5rem] md:rounded-[4rem] group shadow-2xl sm:mt-12">
                    <img 
                      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2541&auto=format&fit=crop" 
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                      alt="Biodiversity" 
                    />
                    <div className="absolute inset-0 bg-[#002819]/20 group-hover:bg-transparent transition-colors"></div>
                 </div>
              </div>
           </div>

           {/* Sticky Analytics Sidebar - Fully Responsive */}
           <div className="lg:col-span-5 w-full">
              <div className="lg:sticky lg:top-32 bg-[#fafafa] p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] border border-black/[0.03] shadow-[0_40px_80px_rgba(0,0,0,0.04)] space-y-12">
                 <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[#002819]">Member Impact Registry</h3>
                    <p className="text-xs md:text-sm font-medium text-on-surface-variant/40 italic">Aggregated data from your 'Clubhouse' contributions.</p>
                 </div>
                 
                 <div className="space-y-10">
                    {charity.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-6 md:gap-8 group">
                         <div className={`p-6 rounded-[1.8rem] md:rounded-[2.2rem] ${stat.color} transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm`}>
                            {stat.icon}
                         </div>
                         <div className="space-y-1">
                            <p className="text-3xl md:text-4xl font-black italic text-[#002819] tracking-tighter leading-none">{stat.value}</p>
                            <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] italic">{stat.label}</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-4 pt-4 border-t border-black/[0.03]">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase italic tracking-[0.2em]">
                       <span className="opacity-40 text-on-surface-variant">Regional Goal Authorization</span>
                       <span className="text-primary bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">82% Verified</span>
                    </div>
                    <div className="h-2.5 w-full bg-black/[0.03] rounded-full overflow-hidden p-0.5">
                       <div className="h-full bg-primary rounded-full shadow-lg" style={{ width: '82%' }}></div>
                    </div>
                 </div>

                 <button className="w-full py-6 md:py-8 bg-[#002819] text-[#fed65b] rounded-[1.5rem] md:rounded-[2.5rem] font-black uppercase tracking-[0.3em] italic flex items-center justify-center gap-6 hover:scale-[1.03] shadow-2xl transition-all active:scale-95 border-b-4 border-black/20">
                    Amplify My Impact
                    <Sparkles size={20} className="animate-pulse" />
                 </button>

                 <div className="flex items-center justify-center gap-4 text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.4em] italic pt-4">
                    <ShieldCheck size={18} />
                    Certified Fairway Partner
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Global Deployment Map Section - Responsive Feed */}
      <div className="bg-[#002819] py-24 md:py-40 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 md:space-y-24 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
               <div className="max-w-3xl space-y-6">
                  <span className="text-[10px] font-black text-[#fed65b] uppercase tracking-[0.5em] block italic opacity-60">Global Reach Network</span>
                  <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.9]">Distributed <br/> Resources.</h2>
                  <p className="text-white/40 text-base md:text-xl font-medium italic leading-relaxed max-w-2xl">
                     We operate in 12 distinct wildlife corridors. Every donation is pooled within the Clubhouse ecosystem to maximize purchasing power for endemic saplings across diverse biomes.
                  </p>
               </div>
               <div className="flex gap-4">
                  <button className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-full border border-white/10 text-white flex items-center justify-center transition-all hover:bg-[#fed65b] hover:text-[#002819] shadow-2xl">
                     <ChevronLeft size={28} />
                  </button>
                  <button className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-full border border-white/10 text-white flex items-center justify-center transition-all hover:bg-[#fed65b] hover:text-[#002819] shadow-2xl">
                     <ChevronRight size={28} />
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
               {charity.projects.map((project, i) => (
                  <div key={i} className="group relative h-[500px] md:h-[650px] rounded-[3rem] md:rounded-[4.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
                     <img 
                       src={project.image} 
                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                       alt={project.name} 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#002819] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
                     
                     <div className="absolute top-10 right-10 flex">
                        <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 text-[#fed65b] shadow-xl">
                           <MapPin size={24} />
                        </div>
                     </div>

                     <div className="absolute bottom-16 left-12 space-y-6">
                        <div className="space-y-2">
                           <span className="text-[10px] font-black text-[#fed65b] uppercase tracking-[0.4em] italic drop-shadow-lg">{project.country}</span>
                           <h4 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">{project.name}</h4>
                        </div>
                        <button className="flex items-center gap-4 text-[10px] font-black text-white uppercase tracking-[0.3em] italic opacity-0 group-hover:opacity-100 transition-all -translate-y-4 group-hover:translate-y-0">
                           View Coordinates
                           <ArrowRight size={16} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="pt-12 md:pt-20 flex flex-col items-center gap-6">
               <button className="px-12 py-6 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-xs md:text-sm uppercase tracking-[0.4em] italic hover:bg-white hover:text-[#002819] transition-all shadow-2xl flex items-center gap-6 group">
                  Global Impact Map
                  <ExternalLink size={18} className="opacity-40 group-hover:opacity-100 transition-opacity" />
               </button>
               <p className="text-[10px] md:text-[11px] font-black text-white/20 uppercase tracking-[0.6em] italic text-center">
                  Live Telemetry Active // Tracking Cycle 4022-X
               </p>
            </div>
         </div>
         
         {/* Background Visual Enhancer */}
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      </div>
    </PageTransition>
  );
};

export default CharityProfile;
