import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';
import { 
  Users, UserCheck, ThumbsUp, AlertCircle, 
  Search, Loader2, ArrowRight, Star
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CitizensManagement() {
  const [data, setData] = useState({ citizens: [], stats: {}, votingTrends: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.getAdminCitizens();
        setData(res || { citizens: [], stats: {}, votingTrends: null });
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
        <p className="text-gray-500 font-medium">Loading citizen data...</p>
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

  const { citizens, stats, votingTrends } = data;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { borderDash: [2, 4], color: '#f1f5f9' } },
      x: { grid: { display: false } }
    }
  };

  const chartData = {
    labels: votingTrends?.labels || [],
    datasets: [{
      label: 'Votes Cast',
      data: votingTrends?.data || [],
      backgroundColor: '#10b981',
      borderRadius: 6,
    }]
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Citizens & Votes</h1>
        <p className="text-gray-500 font-medium mt-1">Monitor community engagement, votes, and reports.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4"><Users className="w-6 h-6 text-blue-600" /></div>
          <p className="text-sm font-bold text-gray-500">Total Citizens</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.total}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"><UserCheck className="w-6 h-6 text-emerald-600" /></div>
          <p className="text-sm font-bold text-gray-500">Active Citizens</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.active}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4"><ThumbsUp className="w-6 h-6 text-indigo-600" /></div>
          <p className="text-sm font-bold text-gray-500">Total Votes/Reviews</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.totalVotes}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4"><AlertCircle className="w-6 h-6 text-rose-600" /></div>
          <p className="text-sm font-bold text-gray-500">Community Reports</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.communityReports}</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">Registered Citizens</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search citizens..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64 transition-all" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {citizens.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No citizens registered yet.</p>
              </div>
            ) : (
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100">
                    <th className="p-4">Citizen Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4 text-center">Votes/Reviews</th>
                    <th className="p-4 text-center">Reports</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {citizens.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-xs">
                          {c.name.charAt(0)}
                        </div>
                        <span className="font-bold text-gray-900">{c.name}</span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{c.email}</td>
                      <td className="p-4 text-center font-bold text-indigo-600">{c._count.reviews}</td>
                      <td className="p-4 text-center font-bold text-rose-600">{c._count.reports}</td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${c.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                          {c.active ? 'Active' : 'Inactive'}
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
            <h2 className="text-lg font-bold text-gray-900 mb-6">Voting Trends</h2>
            <div className="h-64">
               {votingTrends ? <Bar data={chartData} options={chartOptions} /> : <p className="text-gray-400 text-center mt-20">No data</p>}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-amber-500" /> Top Contributors</h2>
            <div className="space-y-4">
              {citizens.slice(0, 3).map((c, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-gray-300">#{idx + 1}</span>
                    <p className="font-bold text-sm text-gray-800">{c.name}</p>
                  </div>
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">{c._count.reviews} reviews</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
