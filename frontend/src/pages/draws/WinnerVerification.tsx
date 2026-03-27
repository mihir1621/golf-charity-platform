import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Info, 
  ArrowRight, 
  Share2,
  Printer,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/animations/PageTransition';

const WinnerVerification: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <PageTransition className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 space-y-12 pb-24">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <span className="px-3 py-1 bg-secondary text-primary text-[9px] font-black rounded-full uppercase tracking-widest italic shadow-sm">Action Required</span>
             <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[.2em] italic opacity-75">August Tournament Draw</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter italic uppercase leading-none">
            Claim Your <br/> Victory Proof.
          </h1>
          <p className="text-on-surface-variant text-lg font-medium italic opacity-85 max-w-xl leading-relaxed">
            To maintain the integrity of our digital clubhouse, please provide a high-resolution screenshot of your final scorecard. Our stewards will verify the results within 24 hours.
          </p>
        </div>

        {/* Prize Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-xl flex flex-col items-center text-center relative overflow-hidden group min-w-[300px]"
        >
           <div className="w-12 h-12 bg-primary text-secondary rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <CheckCircle2 size={24} />
           </div>
           <p className="text-4xl font-black text-on-surface italic tracking-tighter mb-2">$4,250.00</p>
           <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-80 italic">Pending Prize Disbursement</p>
           
           <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl"></div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Upload & Guidelines */}
        <div className="lg:col-span-7 space-y-8">
          {/* Upload Area */}
          <div className="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-sm relative group overflow-hidden">
             <div className="absolute inset-4 border-2 border-dashed border-outline-variant/20 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center space-y-6">
                <AnimatePresence mode="wait">
                  {!selectedFile ? (
                    <motion.div 
                      key="upload"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 flex flex-col items-center"
                    >
                       <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                          <Upload size={32} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black italic uppercase tracking-tight text-on-surface mb-2">Drop your scorecard here</h3>
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-75 italic">PNG, JPG or PDF. Max 10MB.</p>
                       </div>
                       <label className="px-10 py-4 bg-on-surface text-white rounded-2xl font-black text-xs uppercase tracking-widest italic cursor-pointer hover:scale-105 transition-all shadow-xl active:scale-95">
                          Select File
                          <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                       </label>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 flex flex-col items-center"
                    >
                       <div className="w-16 h-16 bg-primary text-secondary rounded-2xl flex items-center justify-center shadow-lg">
                          <CheckCircle2 size={32} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black italic uppercase tracking-tight text-on-surface mb-2">{selectedFile.name}</h3>
                          <p className="text-[10px] font-bold text-primary uppercase tracking-widest italic">Scorecard Captured Successfully</p>
                       </div>
                       <button 
                         onClick={removeFile}
                         className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic underline underline-offset-4 decoration-outline-variant hover:text-primary transition-colors"
                       >
                         Replace File
                       </button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
             <div className="h-[400px]"></div>
          </div>

          {/* Submission Guidelines */}
          <div className="bg-surface-container-low p-10 rounded-[3rem] border border-outline-variant/10 space-y-8">
             <div className="flex items-center gap-4 text-secondary">
               <Info size={24} fill="currentColor" className="text-secondary" />
               <h2 className="text-2xl font-black italic uppercase tracking-tight text-on-surface">Submission Guidelines</h2>
             </div>
             <div className="space-y-6">
                {[
                  { id: '01', text: 'The screenshot must show your full username and the date of the match clearly.' },
                  { id: '02', text: 'Ensure all 18 holes are visible in the digital score summary.' },
                  { id: '03', text: 'Any signs of digital alteration will result in immediate disqualification.' }
                ].map((item) => (
                  <div key={item.id} className="flex gap-6 items-start">
                    <span className="text-lg font-black italic text-on-surface opacity-30 mt-[-2px]">{item.id}</span>
                    <p className="text-[13px] font-medium text-on-surface-variant italic opacity-85 leading-relaxed">{item.text}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Preview & Actions */}
        <div className="lg:col-span-5 space-y-10">
          {/* Live Preview Section */}
          <div className="bg-white rounded-[3.5rem] border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col">
             <div className="p-8 border-b border-surface-container flex justify-between items-center bg-surface-container-low/20">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic">Live Preview</span>
                <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest italic">{selectedFile?.name || 'SCORECARD_V1_FINAL.PNG'}</span>
             </div>
             <div className="aspect-[4/5] bg-surface-container-low relative p-8 group">
                <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Scorecard Preview" className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full bg-[#002819] flex items-center justify-center relative overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" alt="golf" />
                       <p className="relative z-10 text-white/20 text-4xl font-black uppercase italic tracking-tighter vertical-text transform -rotate-180">Fairway Fund</p>
                    </div>
                  )}
                </div>
                {/* User Badge Float */}
                <div className="absolute top-12 right-12 bg-[#002819] p-3 rounded-2xl flex items-center gap-3 shadow-2xl border border-white/10 z-20">
                   <div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden">
                      <img src="https://i.pravatar.cc/100?u=arthur" alt="Avatar" className="w-full h-full object-cover" />
                   </div>
                   <div className="pr-4">
                      <p className="text-[8px] font-black text-secondary uppercase tracking-widest italic leading-none mb-1">Pro Member</p>
                      <p className="text-xs font-black text-white italic tracking-tighter leading-none">Arthur McHill</p>
                   </div>
                </div>
             </div>
             
             <div className="p-10 space-y-8">
                <div className="space-y-3">
                   <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest italic px-4">Verification Note (Optional)</span>
                   <textarea 
                     value={note}
                     onChange={(e) => setNote(e.target.value)}
                     className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 text-sm font-medium italic focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px] resize-none"
                     placeholder="e.g. 'This was the best round of the season!'"
                   />
                </div>

                <div className="bg-[#002819] p-6 rounded-2xl flex items-center gap-6 text-white border border-white/10">
                   <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-secondary">
                      <ShieldCheck size={20} />
                   </div>
                   <p className="text-[10px] font-bold text-white/70 italic leading-relaxed uppercase tracking-wide">
                      Encryption enabled. Your personal data and gameplay statistics are protected by Fairway’s Clubhouse Security protocols.
                   </p>
                </div>

                <button 
                  disabled={!selectedFile}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest italic flex items-center justify-center gap-4 shadow-2xl transition-all active:scale-95 ${!selectedFile ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed opacity-50' : 'bg-primary text-white hover:scale-[1.02] shadow-primary/20'}`}
                >
                   Submit for Verification
                   <ArrowRight size={18} />
                </button>

                <div className="text-center">
                   <button 
                     onClick={() => navigate('/dashboard')}
                     className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic hover:text-primary transition-colors"
                   >
                      Cancel & Return to Dashboard
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Quote Footer Section */}
      <div className="pt-20 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="space-y-4 max-w-lg text-center md:text-left">
            <p className="text-md font-medium text-on-surface-variant italic leading-relaxed opacity-75">
              "In golf, as in life, it is the follow-through that makes all the difference. We verify the past to secure your future winnings."
            </p>
            <div className="flex items-center gap-4 justify-center md:justify-start">
               <div className="h-[1px] w-12 bg-on-surface/20"></div>
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-on-surface italic">The Steward's Oath</span>
            </div>
         </div>
         <div className="flex gap-4">
            <button className="p-4 bg-white border border-outline-variant/10 rounded-2xl text-on-surface-variant hover:bg-primary hover:text-white transition-all shadow-sm">
               <Share2 size={20} />
            </button>
            <button className="p-4 bg-white border border-outline-variant/10 rounded-2xl text-on-surface-variant hover:bg-primary hover:text-white transition-all shadow-sm">
               <Printer size={20} />
            </button>
         </div>
      </div>
    </PageTransition>
  );
};

export default WinnerVerification;
