import React from 'react';
import { Shield, Lock, Eye, FileText, Globe, Bell } from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const Privacy: React.FC = () => {
  return (
    <PageTransition className="max-w-5xl mx-auto px-6 py-20 space-y-20">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10">
          <Shield size={14} className="text-primary" />
          <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">Privacy Protocol</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-on-surface tracking-tighter italic uppercase leading-none">
          Protecting Your <br/><span className="text-primary underline decoration-secondary/20 underline-offset-8">Legacy.</span>
        </h1>
        <p className="text-on-surface-variant text-lg font-medium italic opacity-85 max-w-2xl mx-auto leading-relaxed">
          Your privacy is the foundation of our trust. Discover how we protect your data across our digital clubhouse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[
          { icon: <Lock />, title: 'Encryption', desc: 'Enterprise-grade SSL/TLS encryption for all data transmissions and stored records.' },
          { icon: <Eye />, title: 'Transparency', desc: 'Complete clarity on what data we collect and why—never sold, always protected.' },
          { icon: <Globe />, title: 'GDPR / CCPA', desc: 'Fully compliant with global privacy standards, giving you total control over your identity.' },
          { icon: <Bell />, title: 'Control', desc: 'Easily manage your communication preferences and data visibility in real-time.' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-sm group hover:shadow-xl transition-all">
             <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
               {item.icon}
             </div>
             <h3 className="text-2xl font-black italic uppercase tracking-tight text-on-surface mb-4">{item.title}</h3>
             <p className="text-on-surface-variant font-medium italic opacity-85 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-[4rem] p-12 md:p-20 space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-primary">
            <FileText size={24} />
            <h2 className="text-3xl font-black italic uppercase tracking-tight">Data Collection</h2>
          </div>
          <div className="space-y-4 text-on-surface-variant font-medium italic opacity-85 leading-relaxed">
            <p>
              When you join the Golf Charity Platform, we collect essential membership information: identity markers (name, email), 
              performance data (scores, courses played), and philanthropic history. This allows us to verify your entries into 
              our global draws and calculate your community impact.
            </p>
            <p>
              Financial data is processed exclusively through our secure partner, Stripe Connect. We do not store credit card numbers 
              directly on our servers—ensuring your financial integrity is never compromised.
            </p>
          </div>
        </section>

        <section className="space-y-6 pt-12 border-t border-surface-container">
          <div className="flex items-center gap-4 text-primary">
            <Shield size={24} />
            <h2 className="text-3xl font-black italic uppercase tracking-tight">Your Rights</h2>
          </div>
          <p className="text-on-surface-variant font-medium italic opacity-85 leading-relaxed">
            You retain absolute ownership of your data. At any time, you can request a full export of your performance 
            and impact logs, or choose to deactivate your clubhouse access entirely. Our commitment to privacy 
            means your history is yours to control, forever.
          </p>
        </section>

        <div className="pt-12 text-center">
          <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest italic">
            Last updated: March 27, 2026 • Effective immediately across all clubhouse jurisdictions.
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Privacy;
