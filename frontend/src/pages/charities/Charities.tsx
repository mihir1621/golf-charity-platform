import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { motion } from 'framer-motion';
import { Heart, Search, Filter, ArrowRight, ExternalLink, ShieldCheck, Globe, Trophy } from 'lucide-react';

interface Charity {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  totalRaised: number;
  isFeatured: boolean;
}

const Charities: React.FC = () => {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await apiClient.get('/charities');
        setCharities(response.data);
      } catch (err) {
        console.error('Charity fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharities();
  }, []);

  const filteredCharities = charities.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-charity-500/20 border-t-charity-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="bg-red-500/10 text-red-500 p-3 rounded-2xl w-14 h-14 mx-auto mb-6 flex items-center justify-center border border-red-500/20 rotate-12 group hover:rotate-0 transition-transform duration-500 shadow-lg shadow-red-500/10">
          <Heart fill="currentColor" size={32} />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">Our Impact <span className="text-charity-600">Partners</span></h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">Verified organizations making a tangible difference. Every dollar raised through your golf rounds goes directly to their mission.</p>
      </motion.div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-charity-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search charities by name or cause..." 
            className="input-field pl-12 h-14 bg-slate-800/50 backdrop-blur-sm border-slate-700/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="h-14 px-8 border border-slate-700 hover:bg-slate-750 font-bold uppercase tracking-widest text-xs rounded-2xl transition-all flex items-center justify-center space-x-2">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      {/* Featured Charity */}
      {searchTerm === '' && charities.find(c => c.isFeatured) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-charity-900/40 via-dark-800 to-dark-800 border border-charity-500/30 rounded-[40px] p-8 md:p-14 mb-20 relative overflow-hidden group shadow-2xl shadow-charity-900/10"
        >
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
             <Trophy size={200} />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 relative z-10">
            <div className="w-56 h-56 bg-white p-8 rounded-[40px] shadow-2xl shadow-white/5 flex items-center justify-center shrink-0 border-8 border-slate-800/50">
              <img src={charities.find(c => c.isFeatured)?.logoUrl || 'https://via.placeholder.com/200'} alt="Featured Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-center md:text-left">
              <span className="text-charity-500 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Charter Member Partner</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">{charities.find(c => c.isFeatured)?.name}</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl font-medium leading-relaxed">{charities.find(c => c.isFeatured)?.description}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                <button className="btn-primary px-10 h-14 text-sm font-bold uppercase tracking-tighter">Support this Mission</button>
                <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
                  <span>Learn More</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Charities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCharities.map((charity, index) => (
          <motion.div 
            key={charity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-charity-500/30 transition-all group hover:bg-dark-800"
          >
            <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-2xl mb-8 flex items-center justify-center p-4 shadow-xl shadow-black/20 overflow-hidden group-hover:border-charity-600/50 transition-colors">
               <img src={charity.logoUrl || 'https://via.placeholder.com/100'} alt={charity.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-opacity" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{charity.name}</h3>
            <p className="text-slate-500 text-sm mb-8 line-clamp-3 font-medium leading-relaxed">{charity.description}</p>
            
            <div className="pt-6 border-t border-slate-800/50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Total Impact</p>
                <p className="text-white font-black text-lg">${charity.totalRaised.toLocaleString()}</p>
              </div>
              <button className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 text-slate-500 group-hover:bg-charity-600 group-hover:text-white group-hover:border-charity-600 transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Safety Section */}
      <div className="mt-32 p-12 bg-charity-900/5 rounded-[50px] border border-charity-500/10 flex flex-col md:flex-row items-center gap-10 md:gap-20">
         <div className="w-32 h-32 bg-dark-800 border-4 border-charity-500/20 rounded-[40px] flex items-center justify-center text-charity-500 shadow-2xl shadow-charity-900/20">
            <ShieldCheck size={64} />
         </div>
         <div className="text-center md:text-left">
            <h3 className="text-3xl font-black text-white mb-4">Maximum Transparency</h3>
            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">We maintain real-time verification and audits for all charity partners. Every contribution is tracked, authenticated, and delivered with 100% honesty.</p>
         </div>
         <div className="hidden lg:block ml-auto opacity-5 shadow-2xl">
            <Globe size={180} />
         </div>
      </div>
    </div>
  );
};

export default Charities;
