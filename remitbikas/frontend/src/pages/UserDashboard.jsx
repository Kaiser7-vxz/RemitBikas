import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { 
  Wallet, TrendingUp, Search, Loader2, AlertCircle, ArrowRight, Activity 
} from 'lucide-react';
import { Line } from 'react-chartjs-2';

export default function UserDashboard() {
  const [data, setData] = useState({ contributions: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const res = await api.getUserInvestments();
        setData(res || { contributions: [], stats: {} });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestments();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
        <p className="text-gray-500 font-medium">Loading your investment portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-rose-50 text-rose-700 p-8 rounded-3xl text-center border border-rose-100 max-w-md w-full mx-4">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-80 text-rose-500" />
          <h3 className="text-xl font-bold mb-2">Error loading portfolio</h3>
          <p className="opacity-80 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  const { contributions, stats } = data;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Portfolio Value (NPR)',
      data: [0, 0, 0, 0, 0, stats.totalContributed || 0],
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Portfolio</h1>
          <p className="text-gray-500 font-medium mt-1">Track your investments in municipal infrastructure projects.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6"><Wallet className="w-7 h-7 text-emerald-600" /></div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Invested</p>
            <h3 className="text-4xl font-black text-gray-900">₨ {stats.totalContributed?.toLocaleString() || 0}</h3>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6"><Activity className="w-7 h-7 text-blue-600" /></div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Active Projects</p>
            <h3 className="text-4xl font-black text-gray-900">{stats.projectsContributed || 0}</h3>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6"><TrendingUp className="w-7 h-7 text-indigo-600" /></div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Avg. Return Rate</p>
            <h3 className="text-4xl font-black text-gray-900">11.5% <span className="text-sm text-emerald-600 font-bold ml-2">APY</span></h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Table Area */}
          <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">Investment History</h2>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search projects..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full sm:w-64 transition-all" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {contributions.length === 0 ? (
                <div className="p-16 text-center text-gray-500">
                  <Wallet className="w-16 h-16 mx-auto mb-6 opacity-20" />
                  <p className="text-lg">You haven't made any investments yet.</p>
                  <button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm">
                    Explore Projects
                  </button>
                </div>
              ) : (
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-gray-50/50 text-xs uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                      <th className="p-6">Project Details</th>
                      <th className="p-6">Amount</th>
                      <th className="p-6">Date</th>
                      <th className="p-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {contributions.map((inv) => (
                      <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-6">
                          <p className="font-bold text-gray-900 text-base">{inv.project?.title}</p>
                          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Payment via {inv.paymentMethod}</p>
                        </td>
                        <td className="p-6 font-black text-emerald-700 text-lg">₨ {inv.amount.toLocaleString()}</td>
                        <td className="p-6 text-sm text-gray-500 font-medium">{new Date(inv.createdAt).toLocaleDateString()}</td>
                        <td className="p-6">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
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

          {/* Right Sidebar Charts */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Portfolio Growth</h2>
              <div className="h-64">
                 <Line data={chartData} options={chartOptions} />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-emerald-900 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-30"></div>
              <h3 className="text-xl font-bold mb-3">Download Tax Certificate</h3>
              <p className="text-emerald-100/80 text-sm mb-8 leading-relaxed">Get an official PDF statement of your municipal investments for tax exemption purposes.</p>
              <button className="bg-white text-emerald-900 px-4 py-3 rounded-xl font-bold text-sm w-full hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                Generate Statement <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
