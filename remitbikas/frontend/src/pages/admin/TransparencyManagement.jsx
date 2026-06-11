import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';
import { 
  ShieldCheck, ArrowDownRight, ArrowUpRight, DollarSign, 
  Search, Loader2, AlertCircle, FileText
} from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TransparencyManagement() {
  const [data, setData] = useState({ expenses: [], stats: {}, expenseBreakdown: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.getAdminTransparency();
        setData(res || { expenses: [], stats: {}, expenseBreakdown: {} });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
        <p className="text-gray-500 font-medium">Loading transparency records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 text-rose-700 p-6 rounded-2xl text-center border border-rose-100">
        <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-80" />
        <h3 className="text-lg font-bold">Error loading data</h3>
        <p className="mt-1 opacity-80">{error}</p>
      </div>
    );
  }

  const { expenses, stats, expenseBreakdown } = data;

  const chartData = {
    labels: Object.keys(expenseBreakdown || {}),
    datasets: [{
      data: Object.values(expenseBreakdown || {}),
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#64748b', '#ef4444'],
      borderWidth: 0,
    }]
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Fund Transparency</h1>
        <p className="text-gray-500 font-medium mt-1">Audit logs, contractor payments, and complete expense tracking.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"><ArrowDownRight className="w-6 h-6 text-emerald-600" /></div>
          <p className="text-sm font-bold text-gray-500">Total Funds Received</p>
          <h3 className="text-2xl font-black text-gray-900 truncate">₨ {stats.totalFundsReceived?.toLocaleString() || 0}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4"><ShieldCheck className="w-6 h-6 text-blue-600" /></div>
          <p className="text-sm font-bold text-gray-500">Total Allocated</p>
          <h3 className="text-2xl font-black text-gray-900 truncate">₨ {stats.totalAllocated?.toLocaleString() || 0}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4"><ArrowUpRight className="w-6 h-6 text-rose-600" /></div>
          <p className="text-sm font-bold text-gray-500">Total Spent</p>
          <h3 className="text-2xl font-black text-gray-900 truncate">₨ {stats.totalSpent?.toLocaleString() || 0}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4"><DollarSign className="w-6 h-6 text-amber-600" /></div>
          <p className="text-sm font-bold text-gray-500">Remaining Balance</p>
          <h3 className="text-2xl font-black text-gray-900 truncate">₨ {stats.remainingBalance?.toLocaleString() || 0}</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">Expense Ledger</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search expenses..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64 transition-all" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {expenses.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No expense records logged.</p>
              </div>
            ) : (
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100">
                    <th className="p-4">Description</th>
                    <th className="p-4">Project</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {expenses.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-gray-900">{e.description}</td>
                      <td className="p-4 text-sm text-gray-600 truncate max-w-[200px]">{e.project?.title}</td>
                      <td className="p-4">
                        <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{e.category}</span>
                      </td>
                      <td className="p-4 font-bold text-rose-600">₨ {e.amount.toLocaleString()}</td>
                      <td className="p-4 text-sm text-gray-500">{new Date(e.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Expense Breakdown</h2>
            <div className="h-64 flex justify-center">
               {Object.keys(expenseBreakdown || {}).length > 0 ? (
                 <Doughnut data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, cutout: '70%' }} />
               ) : (
                 <p className="text-gray-400 mt-20">No data</p>
               )}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
