import { motion } from 'framer-motion';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement, Filler
} from 'chart.js';
import { 
  Briefcase, CheckCircle, TrendingUp, AlertTriangle, Users, 
  Banknote, ShieldCheck, Activity, BrainCircuit, CreditCard,
  ChevronRight, ThumbsUp, Wallet, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

// --- Mock Data ---

const kpiCards = [
  { title: 'Total Projects', value: '42', trend: '+3', isUp: true, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
  { title: 'Active & Ongoing', value: '18', trend: '+2', isUp: true, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { title: 'Total Budget Allocated', value: '₨ 845.2M', trend: '+12%', isUp: true, icon: Banknote, color: 'text-violet-600', bg: 'bg-violet-100' },
  { title: 'Delayed Projects', value: '3', trend: '-1', isUp: false, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-100' },
];

const priorityProjects = [
  { name: 'Sundarijal Water Extension', votes: 4280, status: 'Pending Approval', progress: 0, date: 'TBD' },
  { name: 'Ward 4 Community Hospital', votes: 3150, status: 'Ongoing', progress: 45, date: 'Oct 2026' },
  { name: 'Green Park Solar Lighting', votes: 2890, status: 'Tender', progress: 10, date: 'Dec 2025' },
  { name: 'Primary School Renovation', votes: 1950, status: 'Ongoing', progress: 80, date: 'Aug 2025' },
];

const fundingChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Target Funding',
      data: [100, 150, 200, 250, 300, 350],
      borderColor: '#94a3b8',
      borderDash: [5, 5],
      tension: 0.4,
    },
    {
      label: 'Actual Raised (Remittance + Govt)',
      data: [120, 180, 210, 280, 340, 400],
      borderColor: '#059669',
      backgroundColor: 'rgba(5, 150, 105, 0.1)',
      fill: true,
      tension: 0.4,
    }
  ]
};

const transparencyPieData = {
  labels: ['Contractor Payments', 'Material Costs', 'Labor Wages', 'Admin & Audits', 'Reserve Fund'],
  datasets: [{
    data: [45, 30, 15, 5, 5],
    backgroundColor: ['#059669', '#3b82f6', '#f59e0b', '#8b5cf6', '#64748b'],
    borderWidth: 0,
  }]
};

const paymentChartData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    { label: 'eSewa', data: [1.2, 1.9, 1.5, 2.8], backgroundColor: '#60a5fa' },
    { label: 'Khalti', data: [0.8, 1.2, 1.4, 2.1], backgroundColor: '#818cf8' },
  ]
};

// --- Components ---

export default function AdminDashboard() {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 font-medium mt-1">Real-time monitoring of municipal infrastructure and funds.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2">
          <DownloadReportIcon /> Export Full Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={kpi.title} 
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${kpi.bg} p-3 rounded-xl`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <span className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg ${kpi.isUp ? (kpi.icon === AlertTriangle ? 'text-rose-700 bg-rose-50' : 'text-emerald-700 bg-emerald-50') : 'text-emerald-700 bg-emerald-50'}`}>
                {kpi.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />} {kpi.trend}
              </span>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-sm font-bold text-gray-500">{kpi.title}</p>
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${kpi.bg} opacity-20 group-hover:scale-150 transition-transform duration-500`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Investment & Funding */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Wallet className="text-emerald-500 w-6 h-6" /> Investment & Funding Progress</h2>
              <button className="text-emerald-600 font-bold text-sm hover:underline">View All</button>
            </div>
            <div className="h-72">
              <Line data={fundingChartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Target Need</p>
                <p className="text-xl font-bold text-gray-900">₨ 350M</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Amount Raised</p>
                <p className="text-xl font-bold text-emerald-600">₨ 400M</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Investors</p>
                <p className="text-xl font-bold text-blue-600">1,248</p>
              </div>
            </div>
          </motion.div>

          {/* Community Priority Projects */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><ThumbsUp className="text-blue-500 w-6 h-6" /> Community Priority Projects</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100">
                    <th className="p-4">Project Name</th>
                    <th className="p-4 text-center">Votes</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 w-1/3">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {priorityProjects.map((proj, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-gray-800">{proj.name}</td>
                      <td className="p-4 text-center">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold inline-flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {proj.votes}</span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${proj.status === 'Ongoing' ? 'bg-emerald-100 text-emerald-700' : proj.status === 'Tender' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-gray-500 w-8">{proj.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* AI Insights */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden border border-indigo-700">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-indigo-100"><BrainCircuit className="text-indigo-400 w-6 h-6" /> AI Predictive Insights</h2>
            
            <div className="space-y-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-100 text-sm">Delay Risk Detected</h4>
                    <p className="text-xs text-indigo-200 mt-1 leading-relaxed">"Ward 4 Road Extension" shows a 78% probability of a 3-month delay due to recent weather patterns and supply chain lag.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-emerald-100 text-sm">Funding Surplus Projected</h4>
                    <p className="text-xs text-indigo-200 mt-1 leading-relaxed">Remittance inflow for Q3 is trending 15% higher than expected. Consider accelerating the "Green Park" tender.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fund Transparency */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6"><ShieldCheck className="text-emerald-500 w-6 h-6" /> Fund Allocation (YTD)</h2>
            <div className="h-56 flex justify-center relative">
               <Doughnut data={transparencyPieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } } }, cutout: '70%' }} />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none pr-24">
                 <div className="text-center">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Spent</p>
                   <p className="text-xl font-black text-gray-800">₨ 420M</p>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Payment Monitoring */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><CreditCard className="text-blue-500 w-6 h-6" /> Payment Volumes</h2>
            </div>
            <div className="h-48">
              <Bar data={paymentChartData} options={{ maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } }, plugins: { legend: { display: false } } }} />
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                 <span className="text-xs font-bold text-gray-600">eSewa (65%)</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                 <span className="text-xs font-bold text-gray-600">Khalti (35%)</span>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function DownloadReportIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );
}
