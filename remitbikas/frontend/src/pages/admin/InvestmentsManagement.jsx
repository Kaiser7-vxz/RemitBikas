import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';
import { 
  Banknote, Users, TrendingUp, Search, Loader2, AlertCircle, ArrowRight
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function InvestmentsManagement() {
  const [data, setData] = useState({ investments: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.getAdminInvestments();
        setData(res || { investments: [], stats: {} });
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
        <p className="text-gray-500 font-medium">Loading investment records...</p>
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

  const { investments, stats } = data;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Funds Raised (NPR)',
      data: [0, 50000, 150000, 400000, 800000, stats.fundsRaised || 1200000],
      borderColor: '#059669',
      backgroundColor: 'rgba(5, 150, 105, 0.1)',
      fill: true,
      tension: 0.4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { borderDash: [2, 4], color: '#f1f5f9' } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Investments & Contributions</h1>
        <p className="text-gray-500 font-medium mt-1">Track diaspora and local funding for municipal projects.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"><Banknote className="w-6 h-6 text-emerald-600" /></div>
          <p className="text-sm font-bold text-gray-500">Total Funds Raised</p>
          <h3 className="text-3xl font-black text-gray-900">₨ {stats.fundsRaised?.toLocaleString() || 0}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4"><Users className="w-6 h-6 text-blue-600" /></div>
          <p className="text-sm font-bold text-gray-500">Unique Investors</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.totalInvestors || 0}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4"><TrendingUp className="w-6 h-6 text-indigo-600" /></div>
          <p className="text-sm font-bold text-gray-500">Total Transactions</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.totalInvestments || 0}</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Table Area */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">Global Ledger</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search transactions..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64 transition-all" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {investments.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Banknote className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No investment records found.</p>
              </div>
            ) : (
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100">
                    <th className="p-4">Investor</th>
                    <th className="p-4">Project</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Method</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {investments.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{inv.user?.name}</p>
                        <p className="text-xs text-gray-500">{new Date(inv.createdAt).toLocaleDateString()}</p>
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-700 truncate max-w-[200px]">{inv.project?.title}</td>
                      <td className="p-4 font-bold text-emerald-700">₨ {inv.amount.toLocaleString()}</td>
                      <td className="p-4 text-sm text-gray-600">{inv.paymentMethod}</td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                          inv.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                          inv.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Charts & Summary */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Funding Growth</h2>
            <div className="h-64">
               <Line data={chartData} options={chartOptions} />
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h2 className="text-lg font-bold text-blue-900 mb-4">Fund Management</h2>
            <p className="text-blue-700 text-sm mb-6">Withdraw collected funds to municipal accounts for contractor allocation.</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              Withdraw Funds <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
            <h2 className="text-lg font-bold text-emerald-900 mb-4">Export Financial Summary</h2>
            <p className="text-emerald-700 text-sm mb-6">Download a complete CSV of all transaction logs for auditing purposes.</p>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              Download CSV <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
