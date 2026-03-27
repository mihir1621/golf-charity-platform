import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Edit3, 
  Camera, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Gift, 
  CreditCard,
  Heart,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/animations/PageTransition';

const Profile = () => {
  const { user } = useAuth();
  
  const profileName = user?.displayName || "Jameson Sterling";
  const profileEmail = user?.email || "j.sterling@clubhouse.io";

  return (
    <PageTransition className="px-6 sm:px-8 py-8 md:py-16 max-w-7xl mx-auto space-y-10 md:space-y-20 overflow-x-hidden">
      {/* Header Section - Responsive */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 md:gap-12 px-2">
        <div className="flex-1">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block italic shadow-sm w-max px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
            Account Executive
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-on-surface tracking-tighter mb-6 leading-none italic uppercase">
            Member <span className="text-primary underline decoration-secondary/20 underline-offset-[12px]">Profile.</span>
          </h1>
          <p className="text-on-surface-variant text-base md:text-xl font-medium italic opacity-70 max-w-2xl leading-relaxed">
            Manage your digital identity, subscription preferences, and charitable impact within the global Fairway ecosystem.
          </p>
        </div>
        <button className="w-full lg:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white border border-outline-variant/10 rounded-2xl md:rounded-3xl text-[11px] font-black uppercase tracking-widest italic shadow-xl hover:-translate-y-1 transition-all group">
          <Edit3 size={18} className="group-hover:text-primary transition-colors" />
          Edit Identity
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
        <div className="lg:col-span-2 space-y-10 md:space-y-16">
          {/* Main User Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border border-outline-variant/10 shadow-[0_30px_60px_rgba(0,0,0,0.03)] relative overflow-hidden group"
          >
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
               <div className="relative group/avatar shrink-0">
                 <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border-4 border-surface-container shadow-2xl relative">
                    <img src={`https://i.pravatar.cc/300?u=${user?.uid || 'temp'}`} alt={profileName} className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                 </div>
                 <button className="absolute -bottom-4 -right-4 p-4 md:p-5 bg-primary text-[#fed65b] rounded-2xl md:rounded-3xl shadow-2xl hover:scale-110 transition-all border-4 border-white">
                    <Camera size={20} />
                 </button>
               </div>
               
               <div className="text-center md:text-left space-y-6 flex-1">
                  <div>
                    <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] mb-2 italic">Full Legal Name</p>
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-on-surface leading-none">{profileName}</h2>
                  </div>
                  
                  <div>
                    <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] mb-2 italic">Communications Endpoint</p>
                    <p className="text-lg md:text-2xl font-black italic text-primary tracking-tight truncate">{profileEmail}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                     <span className="px-5 py-2.5 bg-primary text-[#fed65b] text-[9px] font-black rounded-xl uppercase tracking-widest italic border border-primary flex items-center gap-3 shadow-lg">
                        <ShieldCheck size={14} />
                        Verified Member
                     </span>
                     <span className="px-5 py-2.5 bg-secondary/10 text-[#745c00] text-[9px] font-black rounded-xl uppercase tracking-widest italic border border-secondary/20 flex items-center gap-3">
                        Founder's Circle
                     </span>
                  </div>
               </div>
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-[100px] opacity-50"></div>
          </motion.div>

          {/* Security & Privacy Section */}
          <div className="space-y-6 md:space-y-10 px-2 md:px-0">
             <h3 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-on-surface">Security & Privacy</h3>
             <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] border border-outline-variant/10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-surface-container/30">
                <div className="p-8 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:bg-surface-container-low/50 transition-colors">
                   <div className="flex items-center gap-6 md:gap-8 w-full sm:w-auto">
                      <div className="p-5 bg-primary/5 rounded-2xl md:rounded-3xl text-primary border border-primary/5"><Lock size={24} /></div>
                      <div>
                         <h4 className="text-base md:text-xl font-black italic uppercase tracking-tight text-on-surface">Account Passcode</h4>
                         <p className="text-[10px] md:text-xs font-bold text-on-surface-variant/40 italic uppercase tracking-widest mt-1">Last synchronized 4 months ago</p>
                      </div>
                   </div>
                   <button className="w-full sm:w-auto text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.2em] italic hover:text-[#745c00] transition-colors underline decoration-primary/20 underline-offset-8">Update Protocol</button>
                </div>

                <div className="p-8 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:bg-surface-container-low/50 transition-colors">
                   <div className="flex items-center gap-6 md:gap-8 w-full sm:w-auto">
                      <div className="p-5 bg-primary/5 rounded-2xl md:rounded-3xl text-primary border border-primary/5"><ShieldCheck size={24} /></div>
                      <div>
                         <h4 className="text-base md:text-xl font-black italic uppercase tracking-tight text-on-surface">2-Factor Shield</h4>
                         <p className="text-[10px] md:text-xs font-bold text-on-surface-variant/40 italic uppercase tracking-widest mt-1">Industrial grade authentication</p>
                      </div>
                   </div>
                   <div className="w-14 h-8 bg-primary rounded-full relative p-1.5 cursor-pointer shadow-inner">
                      <div className="w-5 h-5 bg-[#fed65b] rounded-full shadow-lg absolute right-1.5 top-1.5"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Info Cards - Responsive Column */}
        <div className="space-y-10 md:space-y-16">
          {/* Current Subscription Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#002819] p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] text-white relative overflow-hidden group shadow-2xl shadow-primary/20"
          >
             <p className="text-[10px] font-black text-[#fed65b] uppercase tracking-[0.4em] mb-10 italic opacity-80">Syncing Subscription</p>
             <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-white leading-none">Masters <br /> Tier.</h3>
             <p className="text-base font-medium text-white/50 italic mb-12 tracking-wide font-sans">Institutional Annual Cycle</p>
             
             <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 space-y-6 border border-white/10 shadow-inner">
                <div className="flex justify-between items-center text-[10px] font-black uppercase italic text-white/40 tracking-widest">
                   <span>Next Cycle</span>
                   <span className="text-white">Oct 24, 2026</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase italic text-white/40 tracking-widest">
                   <span>Value</span>
                   <span className="text-3xl text-[#fed65b] tracking-tighter leading-none italic font-black">£2,400</span>
                </div>
             </div>
             
             <button className="w-full flex items-center justify-center gap-4 py-6 text-[10px] font-black text-[#fed65b] uppercase tracking-widest italic hover:bg-[#fed65b] hover:text-[#002819] transition-all border-2 border-[#fed65b]/30 rounded-2xl md:rounded-3xl mt-12 bg-transparent">
                Manage Billing Cycle
                <ChevronRight size={16} />
             </button>
             
             <div className="absolute -bottom-16 -right-16 opacity-[0.03] text-white w-64 h-64 rotate-12 group-hover:rotate-0 transition-all duration-1000">
                <CreditCard size={256} />
             </div>
          </motion.div>

          {/* Philanthropy Card */}
          <div className="bg-white p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] border border-outline-variant/10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden group">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-on-surface">Philanthropy</h3>
                <Link to="/charities" className="text-[10px] font-black text-primary uppercase tracking-widest italic hover:underline underline-offset-8">Switch Cause</Link>
             </div>
             
              <div className="bg-surface-container-low/50 p-8 md:p-10 rounded-[2.5rem] space-y-8 border border-surface-container/50">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-primary text-[#fed65b] flex items-center justify-center shadow-xl">
                       <Heart size={28} fill="currentColor" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mb-1 italic">Active Allocation</p>
                       <h4 className="text-lg md:text-xl font-black italic uppercase tracking-tight text-[#002819] leading-tight">Green Greens <br /> Foundation</h4>
                    </div>
                 </div>
                 
                 <div className="space-y-4 pt-6 border-t border-surface-container">
                    <div className="flex justify-between items-end">
                       <span className="text-[9px] font-black text-on-surface-variant/40 uppercase italic tracking-widest">Contribution Value</span>
                       <span className="text-xl font-black text-primary italic tracking-tighter leading-none">£8,450.00</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden p-0.5">
                       <div className="h-full bg-primary w-[75%] rounded-full shadow-[0_0_15px_rgba(0,40,25,0.2)]"></div>
                    </div>
                 </div>
              </div>
          </div>

          {/* Quick Actions Buttons - Grid for Mobile */}
          <div className="grid grid-cols-2 gap-6 px-2 md:px-0">
             <button className="flex-1 bg-white p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/10 flex flex-col items-center gap-4 group hover:bg-primary/5 transition-all shadow-sm hover:shadow-xl">
                <FileText size={24} className="text-on-surface-variant/30 group-hover:text-primary transition-colors" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] italic text-on-surface-variant/60 text-center">Export <br /> Documentation</span>
             </button>
             <button className="flex-1 bg-white p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/10 flex flex-col items-center gap-4 group hover:bg-primary/5 transition-all shadow-sm hover:shadow-xl">
                <Gift size={24} className="text-on-surface-variant/30 group-hover:text-primary transition-colors" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] italic text-on-surface-variant/60 text-center">Exclusive <br /> Rewards</span>
             </button>
          </div>
        </div>
      </div>


      <div className="pt-20 md:pt-32 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-10 opacity-40">
         <div className="text-center md:text-left space-y-1">
            <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] italic">Member Record Established Sept 2022 • Authentication ID: #CL-092-FF881</p>
         </div>
         <div className="flex gap-10 text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] italic">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Protocol</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Usage Terms</Link>
         </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
