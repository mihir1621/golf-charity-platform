import React from 'react';
import { Mail, MessageCircle, HelpCircle, ArrowRight, Zap, Target } from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const Support: React.FC = () => {
  return (
    <PageTransition className="max-w-6xl mx-auto px-6 py-20 space-y-24">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10 mb-6">
          <HelpCircle size={14} className="text-primary" />
          <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">Clubhouse Support</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-on-surface tracking-tighter italic uppercase leading-none">
          Always In <br/><span className="text-primary underline decoration-secondary/20 underline-offset-8">Play.</span>
        </h1>
        <p className="text-on-surface-variant text-xl font-medium italic opacity-85 max-w-2xl mx-auto leading-relaxed">
          Need assistance with your membership, score verification, or draw results? 
          Our concierge team is standing by to assist with your mission.
        </p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: <Mail />, title: 'Email Support', desc: 'Direct access to our dedicated assistance team for complex clubhouse matters.', action: 'support@clubhouse.io' },
          { icon: <MessageCircle />, title: 'Live Priority Support', desc: 'Elite and Masters members get real-time concierge help via secure messaging.', action: 'Open Chat' },
          { icon: <HelpCircle />, title: 'Knowledge Base', desc: 'Explore our library of documentation on impact tracking and draw auditing.', action: 'Explore Guides' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-sm flex flex-col items-center text-center group hover:bg-primary/5 transition-all">
             <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
               {item.icon}
             </div>
             <h3 className="text-2xl font-black italic uppercase tracking-tight text-on-surface mb-4">{item.title}</h3>
             <p className="text-[#404943] text-sm font-medium italic opacity-80 leading-relaxed mb-10">{item.desc}</p>
             <button className="mt-auto px-8 py-4 bg-white border border-outline-variant/10 rounded-2xl font-black text-[10px] uppercase tracking-widest italic flex items-center gap-3 hover:bg-primary hover:text-white transition-all group/btn">
               {item.action}
               <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
             </button>
          </div>
        ))}
      </div>

      {/* FAQ Banner */}
      <div className="bg-[#002819] rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden group">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight">Fastest <br/> Response.</h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: <Zap />, label: 'Average Response Time: < 2 Hours' },
                { icon: <Target />, label: 'Verified Integrity: 100% Guaranteed' }
              ].map((b, idx) => (
                <div key={idx} className="flex items-center gap-4 text-[#fed65b] font-black uppercase text-[10px] tracking-widest italic bg-white/5 p-4 rounded-2xl border border-white/10">
                  {b.icon}
                  {b.label}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 space-y-8">
            <p className="text-white/85 text-lg font-medium italic leading-relaxed">
              "We're here to ensure your focus remains on the game and your impact. Our priority is transparency and your peace of mind."
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <div className="w-12 h-12 rounded-full border-2 border-[#fed65b] overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=support" alt="support head" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-black italic uppercase tracking-widest text-[#fed65b] text-sm leading-none mb-1">Marcus Vane</p>
                <p className="text-[10px] font-bold text-white/50 uppercase italic tracking-[0.2em]">Director of Member Experience</p>
              </div>
            </div>
          </div>
        </div>
        <HelpCircle className="absolute -top-10 -right-10 text-white/5 w-64 h-64 rotate-12 group-hover:rotate-0 transition-transform duration-1000" size={160} />
      </div>

      <div className="text-center pt-10">
        <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em] italic leading-relaxed">
          © 2026 Clubhouse Network • Performance Support Operations <br/> Based in Pebble Beach, CA
        </p>
      </div>
    </PageTransition>
  );
};

export default Support;
