import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Heart, 
  Download, 
  Edit2, 
  Slash, 
  Plus, 
  Activity
} from 'lucide-react';

const Admin = () => {
  const users = [
    { name: 'Arthur Morgan', email: 'a.morgan@frontier.com', sub: 'PLATINUM', initial: 'AM', color: 'bg-primary/10 text-primary' },
    { name: 'Sadie Lawrence', email: 'sadie.l@outlaw.io', sub: 'STANDARD', initial: 'SL', color: 'bg-secondary/20 text-[#745c00]' },
    { name: 'John Marston', email: 'johnny@beechers.net', sub: 'PLATINUM', initial: 'JM', color: 'bg-primary/10 text-primary' },
  ];

  const charities = [
    { name: 'Green Fairways Trust', desc: 'Environmental Conservation', icon: <Heart size={14} />, color: 'bg-primary/5' },
    { name: 'Junior Golf Scholars', desc: 'Youth Education', icon: <Users size={14} />, color: 'bg-secondary/10' },
    { name: 'Wellness Links Foundation', desc: 'Community Health', icon: <Activity size={14} />, color: 'bg-primary-fixed-dim/20' },
  ];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-2 italic uppercase">Administrative Overview</h1>
          <p className="text-on-surface-variant font-medium italic opacity-60">Real-time performance metrics and ecosystem health.</p>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 bg-white border border-outline-variant/10 rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-sm hover:shadow-md transition-all">
          <Download size={14} />
          Export Report
        </button>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] group hover:bg-primary/5 transition-colors"
        >
           <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-primary/5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                 <Users size={24} />
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary text-[8px] font-black rounded-full uppercase tracking-widest italic">+12% vs LW</span>
           </div>
           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-40 italic">Total Users</p>
           <p className="text-4xl font-black italic tracking-tighter text-on-surface">12,482</p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] group hover:bg-primary/5 transition-colors"
        >
           <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-secondary/10 rounded-2xl text-[#745c00] group-hover:bg-[#fed65b] group-hover:text-[#002819] transition-all">
                 <DollarSign size={24} />
              </div>
              <span className="px-3 py-1 bg-secondary/20 text-[#745c00] text-[8px] font-black rounded-full uppercase tracking-widest italic">+8.4% growth</span>
           </div>
           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-40 italic">Total Revenue</p>
           <p className="text-4xl font-black italic tracking-tighter text-on-surface">$1.42M</p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] group hover:bg-primary/5 transition-colors"
        >
           <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-primary/5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                 <Heart size={24} />
              </div>
              <span className="px-3 py-1 bg-primary-fixed-dim/20 text-on-primary-fixed-variant text-[8px] font-black rounded-full uppercase tracking-widest italic">Target: $500k</span>
           </div>
           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-40 italic">Total Donations</p>
           <p className="text-4xl font-black italic tracking-tighter text-on-surface">$412,050</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* User Management */}
        <div className="lg:col-span-2 space-y-10">
           <div className="flex justify-between items-center px-4">
              <h3 className="text-2xl font-black text-on-surface italic uppercase tracking-tight">User Management</h3>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest italic hover:underline">View All Members</button>
           </div>
           
           <div className="bg-white rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
              <table className="w-full">
                 <thead>
                    <tr className="text-left text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 border-b border-surface-container">
                       <th className="px-10 py-6">Name</th>
                       <th className="px-10 py-6">Email</th>
                       <th className="px-10 py-6">Subscription</th>
                       <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-surface-container/30">
                    {users.map((user) => (
                       <tr key={user.email} className="group hover:bg-surface-container-low transition-colors">
                          <td className="px-10 py-6">
                             <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-[10px] font-black italic`}>
                                   {user.initial}
                                </div>
                                <span className="text-sm font-black italic text-on-surface uppercase tracking-tight">{user.name}</span>
                             </div>
                          </td>
                          <td className="px-10 py-6 text-sm font-medium text-on-surface-variant italic opacity-60">
                             {user.email}
                          </td>
                          <td className="px-10 py-6">
                             <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-md text-[9px] font-black italic tracking-widest uppercase">
                                {user.sub}
                             </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                             <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors"><Edit2 size={14} /></button>
                                <button className="p-2 text-on-surface-variant hover:text-error transition-colors"><Slash size={14} /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {/* Draw Status Cards Row */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="bg-[#002819] p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                 <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-4">Seasonal Draw #42</h4>
                 <p className="text-sm text-white/50 font-medium italic mb-10">Scheduled for Friday, 12th Oct. <br/> 4,203 entries processed.</p>
                 <div className="flex gap-4">
                    <button className="flex-1 py-4 bg-[#fed65b] text-[#002819] rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all italic">Run Draw</button>
                    <button className="flex-1 py-4 bg-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all italic border border-white/10">Preview Entries</button>
                 </div>
                 <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-2xl font-black italic uppercase tracking-tighter">Last Draw Results</h4>
                   <span className="px-3 py-1 bg-primary text-secondary text-[8px] font-black rounded-full uppercase tracking-widest italic">Verified</span>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-surface-container pb-4">
                       <span className="text-[10px] font-black text-on-surface-variant uppercase italic opacity-40">Winner ID:</span>
                       <span className="text-[10px] font-black text-on-surface uppercase italic underline decoration-primary/20">#FW-9921-X</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-on-surface-variant uppercase italic opacity-40">Prize Pool:</span>
                       <span className="text-lg font-black text-primary italic tracking-tight">$25,000.00</span>
                    </div>
                 </div>
                 <button className="w-full mt-10 py-4 bg-surface-container-high text-on-surface-variant rounded-xl font-black text-[10px] uppercase tracking-widest italic cursor-default opacity-50">Publish Results</button>
              </div>
           </div>
        </div>

        {/* Sidebar Style Info Column */}
        <div className="space-y-12">
           <div className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] overflow-hidden relative group">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter">Charity Partners</h3>
                 <button className="p-2 bg-primary text-secondary rounded-full hover:scale-110 transition-all shadow-lg"><Plus size={18} /></button>
              </div>
              
              <div className="space-y-8">
                 {charities.map((item, i) => (
                    <div key={i} className="flex gap-6 items-center">
                       <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-primary`}>
                          {item.icon}
                       </div>
                       <div>
                          <h5 className="text-sm font-black italic uppercase tracking-tight text-on-surface">{item.name}</h5>
                          <p className="text-[10px] font-bold text-on-surface-variant italic opacity-40">{item.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-12 space-y-6 pt-10 border-t border-surface-container">
                 <p className="text-[10px] font-black text-on-surface-variant uppercase italic opacity-40 tracking-widest">Impact Allocation</p>
                 <div className="space-y-6">
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[8px] font-black uppercase text-on-surface opacity-60">Environment</span>
                          <span className="text-[8px] font-black text-primary">65%</span>
                       </div>
                       <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[8px] font-black uppercase text-on-surface opacity-60">Education</span>
                          <span className="text-[8px] font-black text-[#745c00]">20%</span>
                       </div>
                       <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-[#fed65b] rounded-full transition-all duration-1000" style={{ width: '20%' }}></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[8px] font-black uppercase text-on-surface opacity-60">Veteran health</span>
                          <span className="text-[8px] font-black text-primary-fixed-dim">15%</span>
                       </div>
                       <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary-fixed-dim rounded-full transition-all duration-1000" style={{ width: '15%' }}></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-surface-container-low/40 p-10 rounded-[3rem] border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                 <h4 className="text-md font-black italic uppercase tracking-tighter">System Performance</h4>
              </div>
              <p className="text-[11px] font-medium text-on-surface-variant italic opacity-60 leading-relaxed mb-10">
                 All nodes operational. API latency at 42ms. Security scan completed 14 mins ago.
              </p>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-end mb-1">
                    <span className="text-[9px] font-black text-on-surface-variant uppercase italic opacity-40">Server Load</span>
                    <span className="text-[9px] font-black text-primary uppercase italic">Normal</span>
                 </div>
                 <div className="flex gap-1 h-10 items-end">
                    {[3, 5, 4, 8, 6, 7, 5, 9, 3, 6, 5, 4, 7, 5, 8, 3].map((h, i) => (
                       <div key={i} className={`flex-1 rounded-sm transition-all ${h > 7 ? 'bg-primary' : 'bg-primary-fixed-dim/40'}`} style={{ height: `${h * 10}%` }}></div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      <div className="text-center pb-8 pt-12 opacity-30 text-[9px] font-black uppercase tracking-[0.3em] italic">
         © 2024 Digital Clubhouse. Administrative Priority Environment.
      </div>
    </div>
  );
};

export default Admin;
