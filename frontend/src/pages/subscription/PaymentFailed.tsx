import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  CreditCard, 
  ArrowRight, 
  ShieldCheck,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9f8] flex flex-col selection:bg-primary/20">
      {/* Header */}
      <header className="px-12 py-8 flex justify-between items-center relative z-10">
        <Link to="/" className="text-xl font-black text-[#002819] italic tracking-tighter hover:opacity-80 transition-opacity">
          Fairway Fund
        </Link>
        <button className="w-8 h-8 bg-[#002819] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
          <HelpCircle size={16} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center px-6 lg:px-16 py-12">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left Column — Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-black/[0.03] overflow-hidden"
            >
              {/* Red Top Gradient */}
              <div className="h-[5px] w-full bg-gradient-to-r from-red-400 via-red-500 to-red-300"></div>

              <div className="p-10 lg:p-14 space-y-8">
                {/* Error Icon */}
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                  <AlertCircle size={28} className="text-red-500" />
                </div>

                {/* Heading */}
                <div className="space-y-5">
                  <h1 className="text-4xl font-black text-[#002819] tracking-tight">
                    Payment Unsuccessful
                  </h1>
                  <p className="text-base text-on-surface-variant/60 font-medium leading-relaxed max-w-md">
                    We were unable to process your transaction for the{' '}
                    <em className="text-[#002819] font-bold not-italic italic">Masters Circle Membership</em>.
                    This usually happens due to temporary bank connectivity issues.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => navigate('/subscribe')}
                    className="px-8 py-5 bg-[#002819] text-white rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center gap-3"
                  >
                    <RefreshCw size={16} />
                    Retry Payment
                  </button>
                  <button
                    onClick={() => navigate('/profile')}
                    className="px-8 py-5 bg-[#f0f0f0] text-[#002819] rounded-2xl font-bold text-sm hover:bg-[#e5e5e5] transition-all"
                  >
                    Update Payment<br />Method
                  </button>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-2.5 pt-4">
                  <ShieldCheck size={16} className="text-primary/40" />
                  <span className="text-[11px] font-medium text-on-surface-variant/40 italic">
                    Secure transaction handled by Fairway Protocol
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column — Transaction Summary + Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Transaction Summary Card */}
              <div className="bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-black/[0.03] p-8 space-y-6">
                <h3 className="text-[10px] font-black text-[#002819] uppercase tracking-[0.25em]">
                  Transaction Summary
                </h3>

                <div className="space-y-0 divide-y divide-black/[0.04]">
                  <div className="flex justify-between items-center py-4">
                    <span className="text-sm text-on-surface-variant/60 font-medium">Reference ID</span>
                    <span className="text-xs font-mono font-bold text-[#002819] bg-[#f5f5f5] px-3 py-1.5 rounded-lg">FW-9823-XQ</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-sm text-on-surface-variant/60 font-medium">Item</span>
                    <span className="text-sm font-bold text-[#002819]">Masters Circle Annual</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-sm text-on-surface-variant/60 font-medium">Amount</span>
                    <span className="text-xl font-black text-[#002819] tracking-tight">$1,250.00</span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="bg-[#f8f9f8] rounded-xl p-5 flex items-center gap-4 border border-black/[0.03]">
                  <div className="w-10 h-7 bg-[#e0e0e0] rounded-md flex items-center justify-center">
                    <CreditCard size={16} className="text-on-surface-variant/50" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#002819]">Visa ending in 4242</p>
                    <p className="text-[11px] font-medium text-red-500 flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block"></span>
                      Declined by issuing bank
                    </p>
                  </div>
                </div>
              </div>

              {/* Need Assistance Card */}
              <div className="bg-[#002819] rounded-[2rem] p-8 text-white relative overflow-hidden">
                <HelpCircle className="absolute top-6 right-6 text-white/[0.06]" size={80} />
                <div className="relative z-10 space-y-4">
                  <h4 className="text-base font-black text-white">Need assistance?</h4>
                  <p className="text-sm text-white/50 font-medium leading-relaxed">
                    Our concierge team is available to help resolve any billing issues immediately.
                  </p>
                  <button className="text-[#fed65b] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all mt-2 group">
                    Contact Support
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-12 py-10 border-t border-black/[0.04] flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-lg font-black text-[#002819] italic tracking-tighter">Fairway Fund</span>
        <div className="flex items-center gap-8">
          {['Support', 'Privacy Policy', 'Terms of Service'].map(link => (
            <button key={link} className="text-xs font-medium text-primary/60 hover:text-primary transition-colors">
              {link}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-medium text-on-surface-variant/40 italic">
          © 2024 Fairway Fund. The Digital Clubhouse.
        </span>
      </footer>
    </div>
  );
};

export default PaymentFailed;
