import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Heart, 
  Download, 
  Slash, 
  Loader2,
  CheckCircle2
} from 'lucide-react';
import apiClient from '../../api/apiClient';

const Admin = () => {
  const [stats, setStats] = useState<any>(null);
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningDraw, setRunningDraw] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsRes, winnersRes] = await Promise.all([
        apiClient.get('/admin/stats'),
        apiClient.get('/admin/winners')
      ]);
      setStats(statsRes.data);
      setWinners(winnersRes.data);
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunDraw = async () => {
    if (!window.confirm('Are you sure you want to run the draw? This will calculate winners and deduct subscription fees.')) return;
    
    setRunningDraw(true);
    try {
      await apiClient.post('/draw/run');
      alert('Draw executed successfully!');
      fetchAdminData();
    } catch (err: any) {
      alert(`Error running draw: ${err.response?.data?.error || err.message}`);
    } finally {
      setRunningDraw(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

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
           </div>
           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-40 italic">Active Subscribers</p>
           <p className="text-4xl font-black italic tracking-tighter text-on-surface">{stats?.overview?.activeSubscribers || 0}</p>
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
           </div>
           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-40 italic">Rollover Pool</p>
           <p className="text-4xl font-black italic tracking-tighter text-on-surface">${stats?.overview?.currentRollover || 0}</p>
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
           </div>
           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-40 italic">Charity Totals</p>
           <p className="text-4xl font-black italic tracking-tighter text-on-surface">${stats?.overview?.charityTotals || 0}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
           <div className="flex justify-between items-center px-4">
              <h3 className="text-2xl font-black text-on-surface italic uppercase tracking-tight">Winner Audit</h3>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest italic hover:underline">Full History</button>
           </div>
           
           <div className="bg-white rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
              <table className="w-full">
                 <thead>
                    <tr className="text-left text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 border-b border-surface-container">
                       <th className="px-10 py-6">User</th>
                       <th className="px-10 py-6">Prize Tier</th>
                       <th className="px-10 py-6">Amount</th>
                       <th className="px-10 py-6">Status</th>
                       <th className="px-10 py-6 text-right">Verification</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-surface-container/30">
                    {winners && winners.length > 0 ? winners.slice(0, 5).map((winner) => (
                       <tr key={winner.id} className="group hover:bg-surface-container-low transition-colors">
                          <td className="px-10 py-6">
                             <span className="text-sm font-black italic text-on-surface uppercase tracking-tight">#{winner.userId?.slice(-6) || 'N/A'}</span>
                          </td>
                          <td className="px-10 py-6">
                             <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-md text-[9px] font-black italic tracking-widest uppercase">
                                {winner.matchTier}
                             </span>
                          </td>
                          <td className="px-10 py-6 text-sm font-black text-primary italic">
                             ${winner.prizeAmount}
                          </td>
                          <td className="px-10 py-6">
                             <span className={`text-[10px] font-black uppercase italic ${winner.paymentStatus === 'paid' ? 'text-primary' : 'text-secondary'}`}>
                                {winner.paymentStatus}
                             </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                             <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button title="Verify Score Proof" className="p-2 text-on-surface-variant hover:text-primary transition-colors"><CheckCircle2 size={16} /></button>
                                <button title="Reject" className="p-2 text-on-surface-variant hover:text-error transition-colors"><Slash size={16} /></button>
                             </div>
                          </td>
                       </tr>
                    )) : (
                       <tr>
                          <td colSpan={5} className="px-10 py-12 text-center text-on-surface-variant italic opacity-40 text-sm font-medium">No draw results found. Run a draw to generate winners.</td>
                       </tr>
                    )}
                 </tbody>
              </table>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="bg-[#002819] p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                 <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-4">Monthly Draw Engine</h4>
                 <p className="text-sm text-white/50 font-medium italic mb-10">Running the draw will process all active subscribers, calculate tiers, and allocate charitable shares.</p>
                 <div className="flex gap-4">
                    <button 
                      onClick={handleRunDraw}
                      disabled={runningDraw}
                      className="flex-1 py-4 bg-[#fed65b] text-[#002819] rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:enabled:scale-105 transition-all italic flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {runningDraw ? <Loader2 className="animate-spin" size={14} /> : 'Execute Live Draw'}
                    </button>
                 </div>
                 <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-2xl font-black italic uppercase tracking-tighter">Pool Status</h4>
                   <span className="px-3 py-1 bg-primary text-secondary text-[8px] font-black rounded-full uppercase tracking-widest italic">Live</span>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-surface-container pb-4">
                       <span className="text-[10px] font-black text-on-surface-variant uppercase italic opacity-40">Dynamic Prize Base:</span>
                       <span className="text-[10px] font-black text-on-surface uppercase italic underline decoration-primary/20">
                          ${(stats?.overview?.activeSubscribers || 0) * 10} (50%)
                       </span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-on-surface-variant uppercase italic opacity-40">Available For Draw:</span>
                       <span className="text-lg font-black text-primary italic tracking-tight">
                          ${((stats?.overview?.activeSubscribers || 0) * 10) + (stats?.overview?.currentRollover || 0)}
                       </span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-12">
           <div className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] overflow-hidden relative group">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter">Active Stats</h3>
              </div>
              
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                   <span className="text-xs font-black uppercase italic text-on-surface-variant opacity-40 tracking-widest">Total Users</span>
                   <span className="text-sm font-black text-primary italic">{stats?.overview?.totalUsers || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs font-black uppercase italic text-on-surface-variant opacity-40 tracking-widest">Subscriber %</span>
                   <span className="text-sm font-black text-secondary italic">
                    {stats?.overview?.totalUsers ? Math.round((stats?.overview?.activeSubscribers / stats?.overview?.totalUsers) * 100) : 0}%
                   </span>
                </div>
              </div>

              <div className="mt-12 space-y-6 pt-10 border-t border-surface-container">
                 <p className="text-[10px] font-black text-on-surface-variant uppercase italic opacity-40 tracking-widest">System Health</p>
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                    <h4 className="text-xs font-black italic uppercase tracking-tighter text-on-surface">Cloudbase Operational</h4>
                 </div>
              </div>
           </div>

           <div className="bg-surface-container-low/40 p-10 rounded-[3rem] border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                 <h4 className="text-md font-black italic uppercase tracking-tighter">Admin Tasks</h4>
              </div>
              <ul className="space-y-4">
                <li className="text-[10px] font-bold text-on-surface-variant italic uppercase tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Verify 2 pending score proofs
                </li>
                <li className="text-[10px] font-bold text-on-surface-variant italic uppercase tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Audit Q3 Charity Payouts
                </li>
              </ul>
           </div>
        </div>
      </div>
      
      <div className="text-center pb-8 pt-12 opacity-30 text-[9px] font-black uppercase tracking-[0.3em] italic">
         © 2026 Clubhouse. Admin Secure Terminal.
      </div>
    </div>
  );
};

export default Admin;
