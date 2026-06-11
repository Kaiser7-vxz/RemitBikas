import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';
import { BrainCircuit, AlertTriangle, TrendingUp, ThumbsUp, ThumbsDown, Loader2, AlertCircle } from 'lucide-react';

export default function AnalyticsManagement() {
  const [data, setData] = useState({ delayAnalysis: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.getAdminAnalytics();
        setData(res || { delayAnalysis: [], stats: {} });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
      <p className="text-gray-500 font-medium">Loading analytics...</p>
    </div>
  );

  if (error) return (
    <div className="bg-rose-50 text-rose-700 p-6 rounded-2xl text-center border border-rose-100">
      <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-80" />
      <h3 className="text-lg font-bold">Error loading analytics</h3>
      <p className="mt-1 opacity-80">{error}</p>
    </div>
  );

  const { delayAnalysis, stats } = data;
  const sentiment = stats.sentiment || { positive: 0, negative: 0 };
  const total = sentiment.positive + sentiment.negative || 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-indigo-600" /> Analytics & AI Insights
        </h1>
        <p className="text-gray-500 font-medium mt-1">Predictive modeling, delay risk scores, and citizen sentiment.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4"><AlertTriangle className="w-6 h-6 text-rose-600" /></div>
          <p className="text-sm font-bold text-gray-500">High Risk Projects</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.highRiskCount || 0}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4"><AlertTriangle className="w-6 h-6 text-amber-600" /></div>
          <p className="text-sm font-bold text-gray-500">Projects Under Analysis</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.delayedCount || 0}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"><ThumbsUp className="w-6 h-6 text-emerald-600" /></div>
          <p className="text-sm font-bold text-gray-500">Positive Sentiment</p>
          <h3 className="text-3xl font-black text-gray-900">{Math.round((sentiment.positive / total) * 100)}%</h3>
        </motion.div>
      </div>

      {/* Sentiment Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Citizen Sentiment Analysis</h2>
        <div className="flex gap-4 items-center mb-3">
          <ThumbsUp className="w-5 h-5 text-emerald-500" />
          <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
            <div className="bg-emerald-500 h-4 rounded-full transition-all" style={{ width: `${Math.round((sentiment.positive / total) * 100)}%` }} />
          </div>
          <span className="font-bold text-emerald-700 w-12">{sentiment.positive}</span>
        </div>
        <div className="flex gap-4 items-center">
          <ThumbsDown className="w-5 h-5 text-rose-500" />
          <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
            <div className="bg-rose-500 h-4 rounded-full transition-all" style={{ width: `${Math.round((sentiment.negative / total) * 100)}%` }} />
          </div>
          <span className="font-bold text-rose-700 w-12">{sentiment.negative}</span>
        </div>
      </motion.div>

      {/* Delay Risk Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" /> Delay Risk Analysis
          </h2>
        </div>
        {delayAnalysis.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <BrainCircuit className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No delay risk data available yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100">
                  <th className="p-4">Project</th>
                  <th className="p-4">Risk Level</th>
                  <th className="p-4">Probability</th>
                  <th className="p-4">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {delayAnalysis.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">{d.project?.title}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        d.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-700' :
                        d.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>{d.riskLevel}</span>
                    </td>
                    <td className="p-4 font-bold text-gray-700">{d.probability ? `${Math.round(d.probability * 100)}%` : 'N/A'}</td>
                    <td className="p-4 text-sm text-gray-500">{d.reason || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
