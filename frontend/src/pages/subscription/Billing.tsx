import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { 
  CreditCard, 
  ChevronRight, 
  Plus, 
  History, 
  MessageSquare,
  BadgeCheck,
  Trophy,
  Loader2,
  ExternalLink
} from 'lucide-react';
import PageTransition from '../../components/animations/PageTransition';

const Billing: React.FC = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, invoicesRes] = await Promise.all([
          apiClient.get('/user/profile'),
          apiClient.get('/user/invoices')
        ]);
        setProfile(profileRes.data);
        setInvoices(invoicesRes.data);
      } catch (err) {
        console.error('Billing fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenPortal = async () => {
    setPortalLoading(true);
    try {
      const response = await apiClient.post('/subscribe/portal');
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err: any) {
      console.error('Portal session error:', err);
      alert(err.response?.data?.error || 'Failed to open billing portal.');
    } finally {
      setPortalLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <PageTransition className="px-6 sm:px-8 py-8 md:py-16 max-w-7xl mx-auto space-y-10 md:space-y-20 overflow-x-hidden">
      {/* Breadcrumb & Title - Responsive */}
      <div className="space-y-6 md:space-y-10 px-2 lg:px-0">
        <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40 italic">
          <span>Clubhouse</span>
          <ChevronRight size={10} />
          <span className="text-primary opacity-100">Membership & Billing</span>
        </div>
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-[#002819] italic tracking-tighter uppercase leading-none">
            Financial <br className="hidden md:block" />
            <span className="text-primary underline decoration-secondary/20 underline-offset-[12px]">Terminals.</span>
          </h1>
          <p className="text-base md:text-xl font-medium text-on-surface-variant/70 leading-relaxed italic max-w-2xl">
            Review your membership status, synchronize billing protocols, and manage your digital clubhouse access within the unified Fairway ecosystem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-start px-2 lg:px-0">
        {/* Left Column: Membership & Payment */}
        <div className="lg:col-span-5 space-y-8 md:space-y-12 w-full">
          {/* Membership Card - High Fidelity */}
          <div className="bg-[#002819] text-white p-8 sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-8 md:space-y-12">
              <div className="flex justify-between items-start">
                <div className="px-5 py-2 bg-white/10 backdrop-blur-3xl rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] italic border border-white/5 shadow-inner">
                   Active Subscription
                </div>
                <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform border border-white/5">
                  <BadgeCheck size={20} className="text-[#fed65b] drop-shadow-[0_0_10px_rgba(254,214,91,0.5)]" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-white">
                  {profile?.subscriptionStatus === 'active' ? 'Elite Member' : 'Guest Pass'}
                </h2>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                   <p className="text-sm font-black text-[#fed65b] italic uppercase tracking-widest leading-none">
                      {profile?.subscriptionStatus === 'active' ? 'Full Ecosystem Sync' : 'Limited Visibility'}
                   </p>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex justify-between text-[10px] font-black uppercase italic tracking-[0.2em] opacity-40">
                  <span>Protocol Status</span>
                  <span className="text-white opacity-100">{profile?.subscriptionStatus?.toUpperCase()}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ width: profile?.subscriptionStatus === 'active' ? '100%' : '20%' }}></div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/subscribe')}
                className="w-full py-6 md:py-8 bg-[#fed65b] text-[#002819] rounded-2xl md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.03] active:scale-95 transition-all italic border-b-4 border-black/10"
              >
                Change Tier Status
              </button>
            </div>
            
            <Trophy size={200} className="absolute -bottom-24 -right-24 text-white/[0.03] rotate-12 group-hover:rotate-0 transition-all duration-1000" />
          </div>

          {/* Payment Method - Responsive Stack */}
          <div className="bg-white p-10 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-10">
            <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[#002819]">Vault Access</h3>
            
            <div className="space-y-6">
               <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 bg-surface-container-low/30 rounded-[1.5rem] sm:rounded-[2rem] border border-black/[0.03] gap-6">
                  <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                     <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-black/[0.03]">
                        <CreditCard size={24} className="text-primary" />
                     </div>
                     <div className="min-w-0">
                        <p className="text-base sm:text-lg font-black italic text-[#002819] uppercase tracking-tighter truncate">Clubhouse Card</p>
                        <p className="text-[9px] sm:text-[10px] font-black text-on-surface-variant/40 italic uppercase tracking-widest mt-1">Industrial Security</p>
                     </div>
                  </div>
                  <button 
                    disabled={portalLoading}
                    onClick={handleOpenPortal}
                    className="w-full sm:w-auto px-6 py-3 bg-[#002819] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] italic hover:bg-primary transition-all flex items-center justify-center gap-3"
                  >
                    {portalLoading ? <Loader2 className="animate-spin" size={12} /> : <><ExternalLink size={14}/> Manage</>}
                  </button>
               </div>

               <button 
                 disabled={portalLoading}
                 onClick={handleOpenPortal}
                 className="w-full flex items-center justify-center gap-4 py-6 text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] italic hover:text-primary transition-colors disabled:opacity-50"
               >
                  <Plus size={20} className="opacity-40" />
                  Synchronize New Method
               </button>
            </div>
          </div>
        </div>

        {/* Right Column: Billing History - Responsive Table */}
        <div className="lg:col-span-7 space-y-10 md:space-y-14 w-full">
          <div className="bg-white p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-black/[0.03] shadow-[0_30px_60px_rgba(0,0,0,0.03)] flex flex-col min-h-[600px] md:min-h-[800px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 md:mb-20">
               <div className="flex items-center gap-5">
                 <div className="p-4 bg-primary/5 rounded-2xl">
                    <History size={28} className="text-primary opacity-40" />
                 </div>
                 <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[#002819]">Archive</h3>
               </div>
               <div className="px-6 py-3 bg-surface-container-low/50 border border-black/[0.03] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic text-on-surface-variant/50">
                  Cycles Logged: {invoices.length}
               </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide flex-1">
               <table className="w-full text-left min-w-[500px]">
                  <thead>
                     <tr className="border-b border-surface-container text-[11px] font-black text-on-surface-variant/30 uppercase tracking-[0.3em] italic">
                        <th className="pb-8">System Date</th>
                        <th className="pb-8">Net Amount</th>
                        <th className="pb-8 text-right">Verification</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container/30">
                     {invoices.length > 0 ? invoices.map((invoice, i) => (
                        <tr key={i} className="group hover:bg-surface-container-low/20 transition-all cursor-default">
                           <td className="py-10">
                              <p className="text-base md:text-xl font-black text-[#002819] italic uppercase tracking-tighter leading-none">{invoice.date}</p>
                              <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-widest mt-1 italic">Clubhouse ID: #{Math.floor(Math.random() * 90000) + 10000}</p>
                           </td>
                           <td className="py-10">
                              <p className="text-base md:text-2xl font-black text-primary italic tracking-tighter leading-none">
                                 {formatCurrency(invoice.amount)}
                              </p>
                           </td>
                           <td className="py-10 text-right">
                              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#006041]/5 text-[#006041] text-[9px] font-black uppercase tracking-widest italic rounded-lg border border-[#006041]/10">
                                 <BadgeCheck size={14} className="text-[#00c853]" />
                                 Verified
                              </div>
                           </td>
                        </tr>
                     )) : (
                        <tr>
                          <td colSpan={3} className="py-24 text-center">
                             <div className="flex flex-col items-center gap-6 opacity-20">
                                <Loader2 className="animate-spin-slow" size={40} />
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] italic">Synchronizing historical cycle archive...</p>
                             </div>
                          </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
          </div>

          {/* Need help banner - Responsive Stacking */}
          <div className="bg-[#002819] p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-primary/5 flex flex-col xl:flex-row justify-between items-center gap-10 md:gap-14 shadow-2xl relative overflow-hidden group">
             <div className="space-y-4 md:space-y-6 text-center xl:text-left relative z-10 max-w-2xl">
                <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#fed65b]">Need Financial Sync?</h3>
                <p className="text-base md:text-xl font-medium text-white/50 italic leading-relaxed">Our dedicated concierge team is available 24/7 to help you with corporate billing structures, tax documentation protocols, or custom membership scales.</p>
             </div>
             <button className="whitespace-nowrap w-full xl:w-auto px-12 py-6 md:py-8 bg-[#fed65b] text-[#002819] rounded-2xl md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.05] transition-all flex items-center justify-center gap-4 italic relative z-10">
                <MessageSquare size={20} />
                Open Support Terminal
             </button>
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fed65b]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </div>

      <div className="text-center pb-8 opacity-20 text-[10px] font-black uppercase tracking-[0.5em] italic">
         Official Billing Interface V5.0 // Clubhouse Monetary Sync
      </div>
    </PageTransition>
  );
};

export default Billing;
