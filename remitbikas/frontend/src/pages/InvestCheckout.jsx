import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Lock, Loader2, Check, AlertCircle } from 'lucide-react';
import { api } from '../lib/api';

export default function InvestCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;

  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('esewa');
  const [step, setStep] = useState('input'); // 'input' | 'confirm' | 'processing' | 'success'
  const [error, setError] = useState('');
  const [txnId, setTxnId] = useState('');

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No project selected.</p>
          <button onClick={() => navigate('/invest')} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold">
            Back to Invest
          </button>
        </div>
      </div>
    );
  }

  const numericAmount = parseInt(amount.replace(/,/g, '') || '0');

  const handleSendMoney = () => {
    if (!amount || numericAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (numericAmount < 100) {
      setError('Minimum amount is NPR 100.');
      return;
    }
    setError('');
    setStep('confirm');
  };

  const handleConfirm = async () => {
    setStep('processing');
    try {
      const payload = {
        projectId: project.id,
        amount: numericAmount,
        paymentMethod: 'MOBILE_WALLET', // eSewa & Khalti map to MOBILE_WALLET in the DB schema
        description: `Fund contribution for ${project.title} via ${paymentMethod}`,
      };
      const res = await api.createContribution(payload);
      const genTxnId = res?.id
        ? `TXN-${res.id.slice(0, 8).toUpperCase()}`
        : `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setTxnId(genTxnId);
      setStep('success');
    } catch (err) {
      setError('Payment failed. Please try again.');
      setStep('input');
    }
  };

  const esewaColor = 'bg-[#60BB46]';
  const khaltiColor = 'bg-[#5C2D91]';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back button — only on input step */}
        {step === 'input' && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
        )}

        <AnimatePresence mode="wait">

          {/* ─── STEP 1: INPUT ─── */}
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gray-900 text-white px-8 pt-8 pb-10">
                <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-1">Fund This Project</p>
                <h1 className="text-2xl font-black leading-snug">{project.title}</h1>
              </div>

              <div className="px-8 py-8 space-y-6">
                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                  </div>
                )}

                {/* Amount */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Project Fund Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">NPR</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={amount}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '');
                        setAmount(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                      }}
                      placeholder="0"
                      className="w-full pl-16 pr-4 py-4 text-2xl font-black text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Payment method */}
                <div>
                  <label className="block text-gray-700 font-bold mb-3">Pay With</label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* eSewa */}
                    <button
                      onClick={() => setPaymentMethod('esewa')}
                      className={`relative flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                        paymentMethod === 'esewa'
                          ? 'border-[#60BB46] bg-[#60BB46]/5 ring-4 ring-[#60BB46]/15'
                          : 'border-gray-200 hover:border-[#60BB46]/40'
                      }`}
                    >
                      <div className="w-8 h-8 bg-[#60BB46] rounded-lg flex items-center justify-center font-black text-white text-lg">e</div>
                      <span className="font-bold text-gray-800">eSewa</span>
                      {paymentMethod === 'esewa' && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#60BB46] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Khalti */}
                    <button
                      onClick={() => setPaymentMethod('khalti')}
                      className={`relative flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                        paymentMethod === 'khalti'
                          ? 'border-[#5C2D91] bg-[#5C2D91]/5 ring-4 ring-[#5C2D91]/15'
                          : 'border-gray-200 hover:border-[#5C2D91]/40'
                      }`}
                    >
                      <div className="w-8 h-8 bg-[#5C2D91] rounded-lg flex items-center justify-center font-black text-white text-lg">K</div>
                      <span className="font-bold text-[#5C2D91]">Khalti</span>
                      {paymentMethod === 'khalti' && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#5C2D91] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold justify-center">
                  <Lock className="w-3.5 h-3.5" /> Secured & Encrypted
                </div>

                <button
                  onClick={handleSendMoney}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-black text-lg py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/25"
                >
                  Send Money
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 2: CONFIRM ─── */}
          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="px-8 pt-8 pb-6">
                <h2 className="text-2xl font-black text-gray-900 mb-1">Confirm Payment</h2>
                <p className="text-gray-500 text-sm font-medium">Please review before confirming.</p>
              </div>

              <div className="mx-8 mb-6 bg-gray-50 rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                <div className="flex justify-between items-center px-5 py-4">
                  <span className="text-gray-500 font-semibold text-sm">Project</span>
                  <span className="text-gray-900 font-bold text-sm text-right max-w-[55%]">{project.title}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-4">
                  <span className="text-gray-500 font-semibold text-sm">Amount</span>
                  <span className="text-emerald-600 font-black text-lg">NPR {amount}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-4">
                  <span className="text-gray-500 font-semibold text-sm">Pay With</span>
                  <span className="font-bold text-gray-800 capitalize">{paymentMethod}</span>
                </div>
              </div>

              <div className="px-8 pb-8 flex gap-3">
                <button
                  onClick={() => setStep('input')}
                  className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={handleConfirm}
                  className={`flex-1 text-white font-bold py-3.5 rounded-xl transition-all ${
                    paymentMethod === 'esewa' ? 'bg-[#60BB46] hover:bg-[#4aa835]' : 'bg-[#5C2D91] hover:bg-[#491e77]'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 3: PROCESSING ─── */}
          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-5 py-20"
            >
              <Loader2 className={`w-14 h-14 animate-spin ${paymentMethod === 'esewa' ? 'text-[#60BB46]' : 'text-[#5C2D91]'}`} />
              <p className="text-gray-700 font-bold text-lg">Processing payment…</p>
              <p className="text-gray-400 text-sm">Please wait, do not close this window.</p>
            </motion.div>
          )}

          {/* ─── STEP 4: SUCCESS ─── */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>

              <h2 className="text-3xl font-black text-gray-900 mb-2">Money Sent!</h2>
              <p className="text-gray-500 mb-8">Your contribution was sent successfully.</p>

              <div className="bg-gray-50 rounded-2xl border border-gray-100 divide-y divide-gray-100 text-left mb-8 overflow-hidden">
                <div className="flex justify-between items-center px-5 py-3.5">
                  <span className="text-gray-500 text-sm font-semibold">Project</span>
                  <span className="text-gray-900 font-bold text-sm text-right max-w-[55%]">{project.title}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3.5">
                  <span className="text-gray-500 text-sm font-semibold">Amount Sent</span>
                  <span className="text-emerald-600 font-black">NPR {amount}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3.5">
                  <span className="text-gray-500 text-sm font-semibold">Method</span>
                  <span className="text-gray-800 font-bold capitalize">{paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3.5">
                  <span className="text-gray-500 text-sm font-semibold">Transaction ID</span>
                  <span className="text-gray-700 font-mono font-bold text-sm">{txnId}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3.5">
                  <span className="text-gray-500 text-sm font-semibold">Date</span>
                  <span className="text-gray-700 font-bold text-sm">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/invest')}
                  className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Back to Invest
                </button>
                <button
                  onClick={() => navigate('/user/dashboard')}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition-all"
                >
                  My Dashboard
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}