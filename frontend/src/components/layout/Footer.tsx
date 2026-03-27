import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';

const Footer: React.FC = () => {
  const { user } = useAuth();
  const { isSidebarOpen } = useSidebar();
  
  return (
    <footer className={`bg-white py-16 md:py-32 px-10 md:px-24 border-t border-[#eceef0] transition-all duration-300 w-full ${user && isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
        <div className="col-span-1">
           <Link to="/" className="text-2xl md:text-3xl font-black tracking-tight text-[#002819] uppercase mb-6 md:mb-8 block italic">
             Digital <span className="text-primary underline decoration-secondary decoration-2 underline-offset-4">Clubhouse</span>
           </Link>
           <p className="text-[#404943] text-base md:text-lg font-medium leading-relaxed mb-8 md:mb-12 opacity-70">
             Elevating the game through impact, global community, and high-stakes competition.
           </p>
        </div>

        <div className="space-y-6 md:space-y-10">
           <h4 className="font-black uppercase text-[9px] md:text-[10px] tracking-[0.4em] text-[#191c1e]/40 italic">Clubhouse</h4>
           <ul className="space-y-3 md:space-y-5 font-bold text-xs md:text-sm text-on-surface-variant/70">
              <li><Link to="/draws" className="hover:text-primary transition-colors">Digital Draws</Link></li>
              <li><Link to="/leaderboard" className="hover:text-primary transition-colors">Global Standings</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Member Hub</Link></li>
              <li><Link to="/perks" className="hover:text-primary transition-colors">Elite Perks</Link></li>
           </ul>
        </div>

        <div className="space-y-6 md:space-y-10">
           <h4 className="font-black uppercase text-[9px] md:text-[10px] tracking-[0.4em] text-[#191c1e]/40 italic">Global Impact</h4>
           <ul className="space-y-3 md:space-y-5 font-bold text-xs md:text-sm text-on-surface-variant/70">
              <li><Link to="/charities" className="hover:text-primary transition-colors">Impact Partners</Link></li>
              <li><Link to="/impact" className="hover:text-primary transition-colors">Live Reports</Link></li>
              <li><Link to="/signup" className="hover:text-primary transition-colors">Join the Cause</Link></li>
              <li><Link to="/support" className="hover:text-primary transition-colors">Partner With Us</Link></li>
           </ul>
        </div>

        <div className="space-y-6 md:space-y-10">
           <h4 className="font-black uppercase text-[9px] md:text-[10px] tracking-[0.4em] text-[#191c1e]/40 italic">Institutional</h4>
           <ul className="space-y-3 md:space-y-5 font-bold text-xs md:text-sm text-on-surface-variant/70">
              <li><Link to="/support" className="hover:text-primary transition-colors">Concierge Support</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Usage Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Protocol</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors">Operations</Link></li>
           </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 md:pt-20 mt-12 md:mt-24 border-t border-[#eceef0] flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] md:text-[10px] text-[#191c1e]/30 font-black tracking-[0.5em] uppercase italic">
         <p>© 2026 G.C.P International. All rights reserved.</p>
         <div className="flex gap-6 md:gap-14">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/support" className="hover:text-primary transition-colors">Support</Link>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
