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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <PageTransition className="max-w-7xl mx-auto px-8 py-12 space-y-12">
      {/* Breadcrumb & Title */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 italic">
          <span>Account</span>
          <ChevronRight size={10} />
          <span className="text-primary">Subscription & Billing</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black text-on-surface italic tracking-tighter uppercase leading-none">
            Subscription <span className="text-secondary underline underline-offset-8 decoration-primary/20">Management</span>
          </h1>
          <p className="text-lg font-medium text-on-surface-variant leading-relaxed italic opacity-70 max-w-2xl">
            Review your membership status, update your billing method, and manage your digital clubhouse access from one place.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Membership & Payment */}
        <div className="lg:col-span-4 space-y-10">
          {/* Membership Card */}
          <div className="bg-[#002819] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-start">
                <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest italic border border-white/10">
                  Premium Tier
                </div>
                <div className="p-3 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                  <BadgeCheck size={20} className="text-[#fed65b]" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                  {profile?.subscriptionStatus === 'active' ? 'Active Member' : 'Guest Pass'}
                </h2>
                <p className="text-sm font-medium opacity-60 italic">
                  {profile?.subscriptionStatus === 'active' ? 'Full Clubhouse Access' : 'Limited Access'}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase italic tracking-widest opacity-80">
                  <span>Membership Status</span>
                  <span className="text-primary">{profile?.subscriptionStatus?.toUpperCase()}</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#fed65b] rounded-full shadow-[0_0_15px_rgba(254,214,91,0.3)]" style={{ width: profile?.subscriptionStatus === 'active' ? '100%' : '0%' }}></div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/subscribe')}
                className="w-full py-5 bg-[#fed65b] text-[#002819] rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all italic active:scale-95"
              >
                Change Plan
              </button>
            </div>
            
            <Trophy size={180} className="absolute -bottom-20 -right-20 text-white/5 rotate-12 group-hover:rotate-45 transition-all duration-1000" />
          </div>

          {/* Payment Method */}
          <div className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] space-y-8">
            <h3 className="text-xl font-black italic uppercase tracking-tight text-on-surface">Payment Method</h3>
            
            <div className="space-y-6">
               <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-3xl border border-outline-variant/5">
                  <div className="flex items-center gap-6">
                     <div className="p-3 bg-white rounded-xl shadow-sm border border-outline-variant/5">
                        <CreditCard size={24} className="text-primary" />
                     </div>
                     <div>
                        <p className="text-sm font-black italic text-on-surface uppercase tracking-widest">Digital Card</p>
                        <p className="text-[10px] font-medium text-on-surface-variant italic opacity-60">Verified Identity</p>
                     </div>
                  </div>
                  <button 
                    disabled={portalLoading}
                    onClick={handleOpenPortal}
                    className="text-[10px] font-black text-primary uppercase tracking-widest italic hover:underline underline-offset-4 flex items-center gap-2"
                  >
                    {portalLoading ? <Loader2 className="animate-spin" size={12} /> : <><ExternalLink size={12}/> Manage</>}
                  </button>
               </div>

               <button 
                 disabled={portalLoading}
                 onClick={handleOpenPortal}
                 className="w-full flex items-center justify-center gap-3 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic hover:text-primary transition-colors disabled:opacity-50"
               >
                  <Plus size={16} />
                  Add New Method
               </button>
            </div>
          </div>
        </div>

        {/* Right Column: Billing History */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-10 rounded-[3.5rem] border border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col min-h-[600px]">
            <div className="flex justify-between items-center mb-12">
               <div className="flex items-center gap-4">
                 <History size={24} className="text-primary opacity-20" />
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter text-on-surface">Billing History</h3>
               </div>
               <div className="px-5 py-3 bg-surface-container-low border border-outline-variant/10 rounded-2xl text-[10px] font-black uppercase tracking-widest italic text-on-surface-variant">
                  Transactions Found: {invoices.length}
               </div>
            </div>

            <div className="overflow-x-auto flex-1">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-surface-container/50 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 italic">
                        <th className="pb-6">Date</th>
                        <th className="pb-6">Amount</th>
                        <th className="pb-6">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container/30">
                     {invoices.length > 0 ? invoices.map((invoice, i) => (
                        <tr key={i} className="group hover:bg-surface-container-low/50 transition-colors">
                           <td className="py-8">
                              <p className="text-sm font-black text-on-surface italic uppercase tracking-tight">{invoice.date}</p>
                           </td>
                           <td className="py-8 text-sm font-black text-on-surface italic tracking-tight">${invoice.amount}</td>
                           <td className="py-8">
                              <div className="flex items-center gap-2 text-[10px] font-black text-[#006041] uppercase tracking-widest italic">
                                 <BadgeCheck size={14} className="text-[#00c853]" />
                                 Paid
                              </div>
                           </td>
                        </tr>
                     )) : (
                       <tr>
                         <td colSpan={3} className="py-20 text-center text-on-surface-variant italic font-medium opacity-50">No transaction records found.</td>
                       </tr>
                     )}
                  </tbody>
               </table>
            </div>
          </div>

          {/* Need help banner */}
          <div className="bg-[#e7f0e7] p-10 rounded-[3rem] border border-primary/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#002819]">Need assistance with billing?</h3>
                <p className="text-sm font-medium text-[#002819]/60 italic max-w-md">Our dedicated concierge team is available 24/7 to help you with corporate billing, tax receipts, or custom membership structures.</p>
             </div>
             <button className="px-10 py-5 bg-[#002819] text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl hover:bg-primary transition-all flex items-center gap-3 italic">
                <MessageSquare size={18} />
                Contact Support
             </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Billing;
