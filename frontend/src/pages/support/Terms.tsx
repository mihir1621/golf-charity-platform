import React from 'react';
import { Gavel, Star, Activity, Award, ShieldCheck, Mail } from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const Terms: React.FC = () => {
  return (
    <PageTransition className="max-w-5xl mx-auto px-6 py-20 space-y-20">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 rounded-full border border-secondary/20">
          <Gavel size={14} className="text-secondary" />
          <span className="text-[10px] font-black text-secondary uppercase tracking-widest italic tracking-tight">Rules of Engagement</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-on-surface tracking-tighter italic uppercase leading-none">
          Terms of <br/><span className="text-secondary underline decoration-primary/20 underline-offset-8">Clubhouse.</span>
        </h1>
        <p className="text-on-surface-variant text-lg font-medium italic opacity-85 max-w-2xl mx-auto leading-relaxed">
          The following terms define our community's standards of integrity, competition, and charitable impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <ShieldCheck />, title: 'Integrity', desc: 'All scores must be verified through official club systems for draw eligibility.' },
          { icon: <Activity />, title: 'Fair Play', desc: 'Any attempt to manipulate performance data results in immediate clubhouse suspension.' },
          { icon: <Award />, title: 'Impact First', desc: 'Subscribed members acknowledge the mandatory charity contribution of every fee.' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm relative group hover:shadow-xl transition-all">
             <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:bg-secondary group-hover:text-white transition-all">
               {item.icon}
             </div>
             <h3 className="text-xl font-black italic uppercase tracking-tight text-on-surface mb-3">{item.title}</h3>
             <p className="text-on-surface-variant text-sm font-medium italic opacity-80 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[4rem] border border-outline-variant/10 p-12 md:p-20 space-y-16 shadow-2xl shadow-surface-container/20">
        <section className="space-y-8">
          <div className="flex items-center gap-4 text-secondary">
            <Star size={24} />
            <h2 className="text-3xl font-black italic uppercase tracking-tight">Draw Participation</h2>
          </div>
          <div className="space-y-4 text-on-surface-variant font-medium italic opacity-85 leading-relaxed">
            <p>
              Membership grants entry into global prize draws based on your subscription tier. Monthly draws are 
              independently audited to ensure total transparency. Winners are notified via their primary account email 
              and must undergo identity verification through Stripe before prize distribution.
            </p>
            <p>
              Prize amounts and tiers may fluctuate based on community numbers and current impact targets. All 
              rewards are subject to regional tax regulations—members are responsible for their individual compliance.
            </p>
          </div>
        </section>

        <section className="space-y-8 pt-16 border-t border-surface-container">
          <div className="flex items-center gap-4 text-secondary">
            <ShieldCheck size={24} />
            <h2 className="text-3xl font-black italic uppercase tracking-tight">Subscription Terms</h2>
          </div>
          <div className="space-y-4 text-on-surface-variant font-medium italic opacity-85 leading-relaxed">
             <p>All subscription fees are recurring and billed automatically to your provided payment method. You 
             may cancel your membership at any time through your Profile dashboard—access remains through 
             the end of the current billing cycle.</p>
             <p>As a charity-first platform, 10-20% of all fees (depending on tier) are non-refundable and directed immediately to partner NGOs.</p>
          </div>
        </section>
      </div>

      <div className="text-center pt-10 border-t border-surface-container">
        <div className="inline-flex items-center gap-4 text-primary font-black uppercase tracking-widest text-[9px] italic group">
          <Mail size={14} className="group-hover:translate-x-1 transition-transform" />
          Questions? Contact legal@clubhouse.io
        </div>
      </div>
    </PageTransition>
  );
};

export default Terms;
