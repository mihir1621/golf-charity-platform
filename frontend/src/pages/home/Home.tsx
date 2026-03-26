import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Heart, Shield, Globe, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] antialiased font-sans selection:bg-[#fed65b] selection:text-[#002819] overflow-x-hidden">
      <main className="pt-0">
        {/* --- HERO SECTION --- Fully Responsive --- */}
        <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden bg-white pt-16">
          <div className="absolute inset-0 z-0">
             <img 
               alt="Illustrative Golf Course" 
               className="w-full h-full object-cover select-none" 
               src="/hero-illustration.png"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-[#b8860b]/5 via-transparent to-[#002819]/40 mix-blend-multiply"></div>
             <div className="absolute inset-0 bg-[#002819]/5 backdrop-blur-[1.2px]"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full py-10 md:py-12">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="max-w-4xl"
            >
              <div className="inline-block bg-[#fed65b] text-[#745c00] px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase mb-6 md:mb-8 shadow-lg border border-white/20">
                The Fairway Fund
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-[7.5rem] font-black text-white leading-[1.0] md:leading-[0.9] tracking-tighter mb-6 md:mb-8 italic uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
                Play Golf.<br/>
                Win Rewards.<br className="hidden md:block" />
                Support <br className="hidden md:block" />
                Charity.
              </h1>
              <p className="text-base md:text-xl text-white/90 leading-relaxed mb-8 md:mb-10 max-w-lg font-medium drop-shadow-md">
                Experience the prestige of a digital clubhouse. Enter exclusive draws, track your impact, and transform your passion for the game into global good.
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <Link to="/signup" className="flex-1 sm:flex-none text-center bg-[#fed65b] text-[#002819] px-6 md:px-10 py-4 md:py-5 rounded-xl font-black text-base md:text-xl hover:scale-[1.05] shadow-2xl transition-all active:scale-95 uppercase tracking-tighter">
                  Get Started
                </Link>
                <Link to="/draws" className="flex-1 sm:flex-none text-center bg-[#002819]/40 backdrop-blur-md text-white border border-white/20 px-6 md:px-10 py-4 md:py-5 rounded-xl font-black text-base md:text-xl hover:bg-[#002819]/60 transition-all uppercase tracking-tighter">
                  View Draws
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- THE MASTER PLAN --- Responsive Bento --- */}
        <section className="py-16 md:py-32 px-6 md:px-8 max-w-7xl mx-auto">
          <div className="mb-12 md:mb-24 relative pl-4">
            <h2 className="text-3xl md:text-5xl font-black text-[#191c1e] tracking-tighter italic uppercase">The Master Plan</h2>
            <div className="absolute -bottom-2 md:-bottom-4 left-0 h-1 md:h-1.5 w-24 md:w-32 bg-[#002819] rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {/* Step 01 */}
            <motion.div whileHover={{ y: -8 }} className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden shadow-sm border border-[#c0c9c1]/20 group">
              <div className="absolute -top-6 md:-top-10 -right-6 md:-right-10 text-7xl md:text-[10rem] font-black text-[#191c1e]/5 select-none uppercase italic">01</div>
              <div className="mb-6 md:mb-10 w-12 h-12 md:h-16 md:w-16 bg-[#eceef0] rounded-xl md:rounded-2xl flex items-center justify-center text-[#002819] group-hover:bg-[#fed65b] transition-colors">
                 <Shield size={24} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#002819] mb-3 md:mb-5 italic uppercase tracking-tighter">Join the Fund</h3>
              <p className="text-[#404943] leading-relaxed text-sm md:text-lg font-medium italic">Choose your membership tier and gain immediate access to our exclusive ecosystem of draws.</p>
            </motion.div>
            
            {/* Step 02 */}
            <motion.div whileHover={{ y: -8 }} className="bg-[#002819] text-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <div className="absolute -top-6 md:-top-10 -right-6 md:-right-10 text-7xl md:text-[10rem] font-black text-white/5 select-none uppercase italic">02</div>
              <div className="mb-6 md:mb-10 w-12 h-12 md:h-16 md:w-16 bg-[#fed65b] rounded-xl md:rounded-2xl flex items-center justify-center text-[#745c00]">
                 <ArrowRight size={24} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#fed65b] mb-3 md:mb-5 italic uppercase tracking-tighter">Enter the Arena</h3>
              <p className="text-white/80 leading-relaxed text-sm md:text-lg font-medium italic">Submit your scores or enter global draws. Win premium rewards and once-in-a-lifetime trips.</p>
            </motion.div>
            
            {/* Step 03 */}
            <motion.div whileHover={{ y: -8 }} className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden shadow-sm border border-[#c0c9c1]/20 group">
              <div className="absolute -top-6 md:-top-10 -right-6 md:-right-10 text-7xl md:text-[10rem] font-black text-[#191c1e]/5 select-none uppercase italic">03</div>
              <div className="mb-6 md:mb-10 w-12 h-12 md:h-16 md:w-16 bg-[#eceef0] rounded-xl md:rounded-2xl flex items-center justify-center text-[#002819] group-hover:bg-[#fed65b] transition-colors">
                 <Heart size={24} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#002819] mb-3 md:mb-5 italic uppercase tracking-tighter">Drive Real Change</h3>
              <p className="text-[#404943] leading-relaxed text-sm md:text-lg font-medium italic">A significant portion of every subscription goes directly to our featured charities. Play the game.</p>
            </motion.div>
          </div>
        </section>

        {/* --- IMPACT SECTION --- Mobile Optimized --- */}
        <section className="bg-[#eceef0] py-16 md:py-32 overflow-hidden border-y border-[#c0c9c1]/20">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 md:gap-24">
            <div className="relative group px-4 md:px-0">
               <div className="w-full aspect-[4/5] bg-[#002819] rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden relative rotate-1 md:rotate-2">
                  <div className="absolute inset-4 sm:inset-8 top-12 bottom-12 border border-white/10 rounded-[2rem] flex items-center justify-center">
                      <div className="w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-3xl shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                          <Trophy size={64} className="text-white/20 md:w-24 md:h-24" />
                      </div>
                  </div>
                  <div className="absolute bottom-6 md:bottom-10 inset-x-6 md:inset-x-10 text-center">
                     <p className="text-white/30 font-black tracking-[0.2em] text-[8px] md:text-[10px] uppercase italic">Shaping our world impact through golf</p>
                  </div>
               </div>
               <div className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-6 bg-[#735c00] p-6 md:p-10 rounded-2xl md:rounded-3xl z-20 shadow-2xl border border-white/10 flex flex-col items-center">
                  <p className="text-white font-black text-3xl md:text-5xl mb-1 tracking-tighter italic">2.4M+</p>
                  <p className="text-white/60 text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap italic">Impact Raised</p>
               </div>
            </div>
            
            <div className="space-y-8 md:space-y-12">
              <h2 className="text-4xl md:text-7xl font-black text-[#002819] italic leading-[1.05] tracking-tighter uppercase">Your passion fuels global change.</h2>
              <p className="text-lg md:text-xl text-[#404943] leading-relaxed font-medium">We believe golf is more than a sport; it's a community with the power to solve real-world problems. Your membership directly impacts lives.</p>
              
              <div className="space-y-4 md:space-y-6">
                 {[
                   { title: 'Green Initiatives', desc: 'Restoring habitats in over 40 countries.', color: 'bg-[#002819]', icon: <Globe size={20} /> },
                   { title: 'Youth Empowerment', desc: 'Bringing the game to underprivileged communities.', color: 'bg-[#fed65b]', icon: <Users size={20} /> }
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-[#c0c9c1]/10 shadow-sm">
                      <div className={`w-10 h-10 md:w-12 md:h-12 ${item.color} rounded-lg md:rounded-xl flex items-center justify-center ${idx === 1 ? 'text-[#745c00]' : 'text-[#fed65b]'}`}>
                         {item.icon}
                      </div>
                      <div>
                         <h4 className="font-bold text-base md:text-xl text-[#002819] italic">{item.title}</h4>
                         <p className="text-xs md:text-sm text-[#404943] font-medium opacity-80">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- PRICING --- Responsive Grid --- */}
        <section className="py-20 md:py-40 px-6 md:px-8 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-black text-[#191c1e] mb-4 md:mb-6 italic tracking-tighter uppercase">Select Your Tier</h2>
          <p className="text-[#404943] mb-12 md:mb-24 max-w-2xl mx-auto text-base md:text-xl font-medium">Choose the membership that fits your lifestyle. Upgrade at any time.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 items-center">
            {/* Member */}
            <div className="p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] bg-white border border-[#c0c9c1]/30 flex flex-col items-center">
              <h3 className="text-xl md:text-2xl font-black mb-1 md:mb-2 uppercase italic">Member</h3>
              <div className="text-4xl md:text-5xl font-black mb-8 md:mb-12 text-[#191c1e] tracking-tighter italic">$29<span className="text-lg font-medium text-[#404943]/50">/mo</span></div>
              <ul className="space-y-4 md:space-y-6 mb-10 md:mb-16 text-[#404943] text-xs md:text-sm text-left w-full pt-8 md:pt-10 border-t border-[#eceef0]">
                {['1 Monthly Draw Entry', 'Basic Score Tracking', 'Clubhouse Access'].map((t, idx) => (
                   <li key={idx} className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#002819] rounded-full"></span> {t}</li>
                ))}
              </ul>
              <Link to="/signup" className="w-full py-4 rounded-xl md:rounded-2xl font-black uppercase text-xs md:text-sm border-2 border-[#191c1e]/5 hover:bg-[#191c1e] hover:text-white transition-all">Choose Plan</Link>
            </div>
            
            {/* Elite - Highlighted */}
            <div className="p-10 md:p-16 rounded-[2.5rem] md:rounded-[3rem] bg-[#002819] text-white flex flex-col items-center relative z-10 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fed65b] text-[#745c00] px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap">Most Popular</div>
              <h3 className="text-xl md:text-2xl font-black mb-1 md:mb-2 uppercase italic text-[#fed65b]">Elite</h3>
              <div className="text-5xl md:text-6xl font-black mb-8 md:mb-12 text-white tracking-tighter italic">$79<span className="text-lg font-medium text-white/30">/mo</span></div>
              <ul className="space-y-4 md:space-y-6 mb-10 md:mb-16 text-white text-xs md:text-sm text-left w-full pt-8 md:pt-10 border-t border-white/10">
                {['5 Monthly Draw Entries', 'Advanced Analytics', 'Priority Support', 'Partner Discounts'].map((t, idx) => (
                   <li key={idx} className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#fed65b] rounded-full"></span> {t}</li>
                ))}
              </ul>
              <Link to="/signup" className="w-full py-5 rounded-xl md:rounded-2xl font-black uppercase text-xs md:text-sm bg-[#fed65b] text-[#002819] hover:scale-105 transition-all shadow-xl">Join the Elite</Link>
            </div>
            
            {/* Masters */}
            <div className="p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] bg-white border border-[#c0c9c1]/30 flex flex-col items-center">
              <h3 className="text-xl md:text-2xl font-black mb-1 md:mb-2 uppercase italic">Masters</h3>
              <div className="text-4xl md:text-5xl font-black mb-8 md:mb-12 text-[#191c1e] tracking-tighter italic">$199<span className="text-lg font-medium text-[#404943]/50">/mo</span></div>
              <ul className="space-y-4 md:space-y-6 mb-10 md:mb-16 text-[#404943] text-xs md:text-sm text-left w-full pt-8 md:pt-10 border-t border-[#eceef0]">
                {['Unlimited Entries', 'Personal Concierge', 'VIP Invitations', 'Apparel Pack'].map((t, idx) => (
                   <li key={idx} className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#002819] rounded-full"></span> {t}</li>
                ))}
              </ul>
              <Link to="/signup" className="w-full py-4 rounded-xl md:rounded-2xl font-black uppercase text-xs md:text-sm border-2 border-[#191c1e]/5 hover:bg-[#191c1e] hover:text-white transition-all">Go Masters</Link>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- Responsive Banner --- */}
        <section className="py-12 md:py-24 px-4 md:px-8 mb-12 md:mb-24 max-w-[85rem] mx-auto">
          <div className="bg-[#002819] rounded-[2rem] md:rounded-[4rem] p-10 md:p-24 text-center shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl md:text-[8rem] font-black text-white italic tracking-tighter mb-8 md:mb-10 leading-[1.1] uppercase">Ready to tee off?</h2>
                <p className="text-white/60 text-base md:text-2xl max-w-2xl mx-auto mb-10 md:mb-16 font-medium italic">Join thousands of golfers worldwide turning birdies into breakthroughs.</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10">
                   <Link to="/signup" className="w-full sm:w-auto bg-[#fed65b] text-[#002819] px-10 md:px-14 py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase italic">Join the Fund</Link>
                   <Link to="/charities" className="text-white/80 hover:text-white transition-colors font-black uppercase text-sm md:text-xl tracking-tighter underline underline-offset-8 italic">Contact Sales</Link>
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- Mobile Stacking --- */}
      <footer className="bg-white py-16 md:py-32 px-10 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          <div className="col-span-1">
             <span className="text-2xl md:text-3xl font-black tracking-tight text-[#002819] uppercase mb-6 md:mb-8 block italic">The Fairway</span>
             <p className="text-[#404943] text-base md:text-lg font-medium leading-relaxed mb-8 md:mb-12">Elevating the game through impact, community, and competition.</p>
          </div>
          {['Platform', 'Charity', 'Company'].map((title, idx) => (
             <div key={idx} className="space-y-6 md:space-y-10">
               <h4 className="font-black uppercase text-[9px] md:text-[10px] tracking-[0.3em] text-[#191c1e]/40">{title}</h4>
               <ul className="space-y-3 md:space-y-5 font-bold text-xs md:text-sm">
                  {title === 'Platform' && ['Draws', 'Leaderboards', 'Clubhouse'].map(l => <li key={l}><Link to={l === 'Draws' ? '/draws' : l === 'Leaderboards' ? '/leaderboard' : '/dashboard'} className="hover:text-[#745c00]">{l}</Link></li>)}
                  {title === 'Charity' && ['Partners', 'Impact', 'Apply'].map(l => <li key={l}><Link to={l === 'Partners' ? '/charities' : l === 'Impact' ? '/impact' : '/signup'} className="hover:text-[#745c00]">{l}</Link></li>)}
                  {title === 'Company' && ['About', 'Support', 'Legal'].map(l => <li key={l}><Link to="/" className="hover:text-[#745c00]">{l}</Link></li>)}
               </ul>
             </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto pt-10 md:pt-20 mt-12 md:mt-24 border-t border-[#eceef0] flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] md:text-[10px] text-[#191c1e]/40 font-black tracking-widest uppercase">
           <p>© 2026 Digital Clubhouse. All rights reserved.</p>
           <div className="flex gap-6 md:gap-10">
              <Link to="/">Privacy</Link>
              <Link to="/">Terms</Link>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
