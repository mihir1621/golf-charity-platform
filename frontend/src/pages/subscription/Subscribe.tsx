import React, { useState } from 'react';
import apiClient from '../../api/apiClient';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Loader2, Sparkles, Building, Globe } from 'lucide-react';

const plans = [
  {
    id: 'monthly',
    name: 'Impact Pioneer',
    price: '$9.99',
    period: 'per month',
    description: 'Perfect for golfers getting started with high-impact play.',
    features: [
      'Enter up to 5 qualifying rounds',
      'Entry into Monthly Prize Draw',
      'Support any listed charity (10%+ share)',
      'Basic Impact Analytics',
      'Exclusive Community Access'
    ]
  },
  {
    id: 'yearly',
    name: 'Charity Champion',
    price: '$99',
    period: 'per year',
    description: 'The ultimate dedication. Maximize your rewards and impact.',
    features: [
      'Enter ALL qualifying rounds',
      'Entry into Monthly Prize Draw',
      'Support any listed charity (10%+ share)',
      'Advanced Impact Analytics Portfolio',
      'Priority Draw Notifications',
      'Premium Profile Badge',
      'Get 2 Months Free'
    ],
    featured: true
  }
];

const Subscribe: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planType: string) => {
    setLoading(planType);
    try {
      const response = await apiClient.post('/subscribe', { planType });
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
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-16"
      >
        <span className="text-charity-500 font-extrabold text-sm uppercase tracking-[0.3em] bg-charity-600/10 px-4 py-1.5 rounded-full border border-charity-500/20 mb-6 inline-block">Impact Memberships</span>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">Elevate Your Game. <br/> <span className="text-charity-600">Multiply Your Impact.</span></h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">Join thousands of golfers worldwide transforming every round into a global force for good. Choose the plan that fits your ambition.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4 }}
            className={`flex flex-col text-left p-10 rounded-3xl border ${plan.featured ? 'border-charity-500/50 bg-gradient-to-b from-dark-800 to-charity-900/10 relative shadow-2xl shadow-charity-500/10' : 'border-slate-800 bg-dark-800/40 backdrop-blur-sm'}`}
          >
            {plan.featured && (
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-charity-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center shadow-charity-600/30">
                <Sparkles size={12} className="mr-1.5" />
                Recommended
              </div>
            )}
            
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 font-medium mb-8 pr-10">{plan.description}</p>
              <div className="flex items-baseline text-white">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                <span className="text-slate-500 font-bold ml-2 uppercase tracking-widest text-xs">{plan.period}</span>
              </div>
            </div>

            <div className="space-y-4 mb-12 flex-grow">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-slate-300">
                  <div className={`mt-0.5 rounded-full p-1 ${plan.featured ? 'bg-charity-600/20 text-charity-500' : 'bg-slate-700/50 text-slate-400'}`}>
                    <Check size={14} />
                  </div>
                  <span className="text-sm font-medium tracking-tight whitespace-nowrap">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={!!loading}
              className={`w-full h-16 rounded-2xl font-black text-lg transition-all flex items-center justify-center uppercase tracking-tight group ${plan.featured ? 'bg-charity-600 text-white hover:bg-charity-500 shadow-xl shadow-charity-600/20' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
            >
              {loading === plan.id ? <Loader2 className="animate-spin" size={28} /> : (
                <>
                  <span>Unlock Access</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1.5 transition-transform" size={20} />
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 p-12 bg-slate-800/20 border border-slate-700/50 rounded-[40px] max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between group">
        <div className="flex items-center space-x-6 mb-8 md:mb-0">
          <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center text-charity-500">
            <Globe className="animate-pulse" size={32} />
          </div>
          <div className="text-left">
            <h4 className="text-xl font-extrabold text-white mb-1">Impact-Zero Payouts</h4>
            <p className="text-slate-400 font-medium text-sm">We handle all transaction fees for charity contributions so 100% of your impact reaches the goal.</p>
          </div>
        </div>
        <Building className="text-slate-700 hidden md:block" size={48} />
      </div>
    </div>
  );
};

export default Subscribe;
