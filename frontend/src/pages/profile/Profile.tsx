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
  Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/animations/PageTransition';

const Profile = () => {
  const { user } = useAuth();
  
  // Define default values if user data is missing
  const profileName = user?.displayName || "Jameson Sterling";
  const profileEmail = user?.email || "j.sterling@clubhouse.io";

  return (
    <PageTransition className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block italic">Account Executive</span>
          <h1 className="text-5xl font-black text-on-surface tracking-tighter mb-4 italic uppercase">Profile Settings</h1>
          <p className="text-on-surface-variant text-lg font-medium italic opacity-85 max-w-2xl leading-relaxed">
            Manage your digital identity, subscription preferences, and charitable impact within the Fairway ecosystem.
          </p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-white border border-outline-variant/10 rounded-2xl text-[11px] font-black uppercase tracking-widest italic shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
          <Edit3 size={16} className="group-hover:text-primary transition-colors" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Main User Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] relative overflow-hidden group"
          >
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
               <div className="relative group/avatar">
                 <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container shadow-xl">
                    <img src="https://i.pravatar.cc/150?u=jameson" alt={profileName} className="w-full h-full object-cover transition-transform group-hover/avatar:scale-110" />
                 </div>
                 <button className="absolute bottom-0 right-0 p-3 bg-primary text-secondary rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Camera size={16} />
                 </button>
               </div>
               
               <div className="text-center md:text-left">
                  <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-75 italic">Full Name</p>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-on-surface mb-6">{profileName}</h2>
                  
                  <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-75 italic">Email Address</p>
                  <p className="text-lg font-black italic text-on-surface tracking-tight mb-8">{profileEmail}</p>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                     <span className="px-4 py-2 bg-primary/5 text-primary text-[9px] font-black rounded-lg uppercase tracking-widest italic border border-primary/10 flex items-center gap-2">
                        <ShieldCheck size={12} />
                        Verified Member
                     </span>
                     <span className="px-4 py-2 bg-secondary/10 text-[#745c00] text-[9px] font-black rounded-lg uppercase tracking-widest italic border border-secondary/10 flex items-center gap-2">
                        Founder's Circle
                     </span>
                  </div>
               </div>
            </div>
            
            {/* Decos */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          </motion.div>

          {/* Security & Privacy Section */}
          <div className="space-y-6">
             <h3 className="text-2xl font-black italic uppercase tracking-tight text-on-surface px-4">Security & Privacy</h3>
             <div className="bg-white rounded-[3rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-surface-container">
                <div className="p-8 flex items-center justify-between group hover:bg-surface-container-low transition-colors px-10">
                   <div className="flex items-center gap-6">
                      <div className="p-4 bg-primary/5 rounded-2xl text-primary"><Lock size={20} /></div>
                      <div>
                         <h4 className="text-sm font-black italic uppercase tracking-tight text-on-surface">Account Password</h4>
                         <p className="text-[10px] font-bold text-on-surface-variant italic opacity-85 uppercase tracking-widest">Last updated 4 months ago</p>
                      </div>
                   </div>
                   <button className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic hover:text-primary transition-colors underline decoration-outline-variant/30 underline-offset-4">Update Password</button>
                </div>

                <div className="p-8 flex items-center justify-between group hover:bg-surface-container-low transition-colors px-10">
                   <div className="flex items-center gap-6">
                      <div className="p-4 bg-primary/5 rounded-2xl text-primary"><ShieldCheck size={20} /></div>
                      <div>
                         <h4 className="text-sm font-black italic uppercase tracking-tight text-on-surface">Two-Factor Authentication</h4>
                         <p className="text-[10px] font-bold text-on-surface-variant italic opacity-85 uppercase tracking-widest">Recommended for elite security</p>
                      </div>
                   </div>
                   <div className="w-12 h-6 bg-surface-container-highest rounded-full relative p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Info Cards */}
        <div className="space-y-12">
          {/* Current Subscription Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#002819] p-10 rounded-[3.5rem] text-white relative overflow-hidden group shadow-2xl shadow-primary/30"
          >
             <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-8 italic">Current Subscription</p>
             <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-4 text-[#fed65b]">Gold Tier</h3>
             <p className="text-sm font-medium text-white/85 italic mb-10 tracking-wide">Annual Membership</p>
             
             <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 space-y-4 border border-white/10">
                <div className="flex justify-between items-center text-[10px] font-black uppercase italic text-white/80">
                   <span>Next Payment</span>
                   <span className="text-white/95">Oct 24, 2024</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase italic text-white/80">
                   <span>Amount</span>
                   <span className="text-xl text-white tracking-tighter opacity-100">$1,200.00</span>
                </div>
             </div>
             
             <Link to="/billing" className="w-full flex items-center justify-center gap-2 py-4 text-[10px] font-black text-[#fed65b] uppercase tracking-widest italic hover:text-white transition-colors border border-[#fed65b]/20 rounded-2xl mt-8">
                Manage Billing
             </Link>
             
             <div className="absolute -bottom-10 -right-10 opacity-10 text-white w-40 h-40">
                <CreditCard size={160} />
             </div>
          </motion.div>

          {/* Philanthropy Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] relative overflow-hidden group">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black italic uppercase tracking-tight text-on-surface">Philanthropy</h3>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest italic hover:underline">Manage</button>
             </div>
             
              <div className="bg-surface-container-low p-8 rounded-[2rem] space-y-6">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary text-secondary flex items-center justify-center">
                       <Heart size={24} fill="currentColor" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-80 mb-1">Active Contribution</p>
                       <h4 className="text-md font-black italic uppercase tracking-tight text-on-surface">Green Greens Foundation</h4>
                    </div>
                 </div>
                 
                 <div className="space-y-2 pt-4 border-t border-surface-container">
                    <div className="flex justify-between text-[8px] font-black text-on-surface-variant uppercase italic opacity-85">
                       <span>Lifetime Impact</span>
                       <span className="text-primary opacity-100">$4,850.00 Raised</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                       <div className="h-full bg-[#745c00] w-[75%] rounded-full shadow-[0_0_10px_rgba(116,92,0,0.3)]"></div>
                    </div>
                 </div>
              </div>
          </div>

          {/* Quick Actions Buttons */}
          <div className="flex gap-4">
             <button className="flex-1 bg-white p-6 rounded-[2rem] border border-outline-variant/10 flex flex-col items-center gap-3 group hover:bg-primary/5 transition-all">
                <FileText size={20} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-[9px] font-black uppercase tracking-widest italic text-on-surface-variant">Tax Receipts</span>
             </button>
             <button className="flex-1 bg-white p-6 rounded-[2rem] border border-outline-variant/10 flex flex-col items-center gap-3 group hover:bg-primary/5 transition-all">
                <Gift size={20} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-[9px] font-black uppercase tracking-widest italic text-on-surface-variant">My Perks</span>
             </button>
          </div>
        </div>
      </div>


      <div className="pt-20 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-10 opacity-85">
         <div className="text-center md:text-left space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest italic">Account created September 12, 2022 • Member ID: #FF-99201</p>
         </div>
         <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest italic">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
         </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
