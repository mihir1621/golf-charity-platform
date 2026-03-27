import { useState } from 'react';
import apiClient from '../../api/apiClient';
import { motion } from 'framer-motion';
import { 
  Check, 
  Loader2, 
  Sparkles, 
  Trophy, 
  Target, 
  Users, 
  ShieldCheck, 
  Zap,
  ChevronRight
} from 'lucide-react';

const plans = [
  {
    id: 'monthly',
    name: 'Impact Pioneer',
    price: '$9.99',
    period: '/ month',
    description: 'Perfect for golfers getting started with high-impact play.',
    features: [
      'Enter up to 5 qualifying rounds',
      'Entry into Monthly Prize Draw',
      'Support any listed charity (10%+ share)',
      'Basic Impact Analytics',
      'Exclusive Community Access'
    ],
    color: 'primary'
  },
  {
    id: 'yearly',
    name: 'Charity Champion',
    price: '$99',
    period: '/ year',
    description: 'The ultimate dedication. Maximize your rewards and impact.',
    features: [
      'Enter ALL qualifying rounds',
      'Entry into Monthly Prize Draw',
      'Support any listed charity (20%+ share)',
      'Advanced Impact Analytics Portfolio',
      'Priority Draw Notifications',
      'Premium Profile Badge',
      'Get 2 Months Free'
    ],
    featured: true,
    color: 'secondary'
  }
];

const Subscribe: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = async (planType: string) => {
    setLoading(planType);
    try {
      const response = await apiClient.post('/subscribe/checkout', { planType });
      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Subscription failed. Please contact support.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10 mb-8">
           <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Memberships</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-on-surface tracking-tighter mb-8 leading-none italic uppercase">
          Elevate Your <span className="text-primary">Game.</span>
        </h1>
        <p className="text-on-surface-variant text-xl font-medium leading-relaxed italic opacity-70">
          Join thousands of golfers worldwide transforming every round into a global force for good.
        </p>
      </motion.div>

      {/* Pricing Toggle (Conceptual for design) */}
      <div className="flex justify-center mb-12">
        <div className="bg-surface-container-low p-1.5 rounded-2xl flex items-center gap-1 border border-outline-variant/10">
           <button 
             onClick={() => setBillingCycle('monthly')}
             className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all italic ${billingCycle === 'monthly' ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
           >
             Monthly
           </button>
           <button 
             onClick={() => setBillingCycle('yearly')}
             className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all italic ${billingCycle === 'yearly' ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
           >
             Yearly <span className="ml-2 text-[8px] opacity-60 bg-secondary text-primary px-1.5 py-0.5 rounded-md">-20%</span>
           </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            className={`flex flex-col p-12 rounded-[3.5rem] border relative overflow-hidden transition-all duration-500 group ${
              plan.featured 
              ? 'bg-primary border-primary shadow-2xl shadow-primary/30 text-white' 
              : 'bg-white border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-on-surface'
            }`}
          >
            {plan.featured && (
              <div className="absolute top-8 right-8 bg-[#fed65b] text-[#002819] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center italic">
                <Sparkles size={12} className="mr-2" />
                Recommended
              </div>
            )}
            
            <div className="mb-12">
              <h3 className={`text-3xl font-black italic uppercase tracking-tighter mb-4 ${plan.featured ? 'text-white' : 'text-on-surface'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm font-medium mb-10 leading-relaxed italic ${plan.featured ? 'text-white/60' : 'text-on-surface-variant'}`}>
                {plan.description}
              </p>
              <div className="flex items-baseline">
                <span className={`text-6xl font-black tracking-tighter italic ${plan.featured ? 'text-[#fed65b]' : 'text-primary'}`}>{plan.price}</span>
                <span className={`text-xs font-black ml-3 uppercase tracking-widest opacity-40 italic ${plan.featured ? 'text-white' : 'text-on-surface-variant'}`}>{plan.period}</span>
              </div>
            </div>

            <div className="space-y-6 mb-16 flex-grow">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${plan.featured ? 'bg-white/10 text-[#fed65b]' : 'bg-primary/5 text-primary'}`}>
                    <Check size={14} />
                  </div>
                  <span className={`text-sm font-bold tracking-tight italic ${plan.featured ? 'text-white/80' : 'text-on-surface/80'}`}>{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={!!loading}
              className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 italic group/btn overflow-hidden relative ${
                plan.featured 
                ? 'bg-[#fed65b] text-[#002819] hover:bg-white shadow-xl shadow-secondary/10' 
                : 'bg-on-surface text-white hover:bg-primary shadow-xl shadow-on-surface/10'
              }`}
            >
              {loading === plan.id ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <span className="relative z-10">Initialize Membership</span>
                  <ChevronRight className="relative z-10 group-hover/btn:translate-x-2 transition-transform" size={16} />
                </>
              )}
            </button>
            
            {/* Background elements for depth */}
            {plan.featured && (
               <Trophy className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 rotate-12" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Trust Badges / Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 flex flex-col items-center text-center group hover:bg-primary/5 transition-colors"
         >
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
               <ShieldCheck size={32} />
            </div>
            <h4 className="text-xl font-black italic uppercase tracking-tight mb-4 text-on-surface">Secure Payments</h4>
            <p className="text-xs font-medium text-on-surface-variant italic opacity-60 leading-relaxed">Enterprise-grade encryption powered by Stripe Connect.</p>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 flex flex-col items-center text-center group hover:bg-primary/5 transition-colors"
         >
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
               <Target size={32} />
            </div>
            <h4 className="text-xl font-black italic uppercase tracking-tight mb-4 text-on-surface">Impact Verified</h4>
            <p className="text-xs font-medium text-on-surface-variant italic opacity-60 leading-relaxed">Every dollar contributed is tracked with real-time analytics.</p>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 flex flex-col items-center text-center group hover:bg-primary/5 transition-colors"
         >
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
               <Zap size={32} />
            </div>
            <h4 className="text-xl font-black italic uppercase tracking-tight mb-4 text-on-surface">Instant Access</h4>
            <p className="text-xs font-medium text-on-surface-variant italic opacity-60 leading-relaxed">Unlock the Clubhouse and start tracking rounds immediately.</p>
         </motion.div>
      </div>
      
      {/* Community Proof Section */}
      <section className="bg-primary rounded-[3.5rem] p-16 text-center text-white relative overflow-hidden group">
         <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-8 group-hover:scale-105 transition-transform">Joined by 12,000+ Pros</h2>
            <div className="flex justify-center -space-x-4 mb-10">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-14 h-14 rounded-full border-4 border-primary overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                 </div>
               ))}
            </div>
            <p className="text-white/60 font-medium italic mb-10 leading-relaxed">
               "The impact-first approach of the Digital Clubhouse has transformed how I view my weekend rounds. It's more than just golf."
            </p>
            <div className="flex items-center justify-center gap-4 text-secondary font-black text-xs uppercase tracking-widest italic">
               <Users size={16} />
               Join the Movement
            </div>
         </div>
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-secondary/5 to-transparent"></div>
      </section>
    </div>
  );
};

export default Subscribe;
