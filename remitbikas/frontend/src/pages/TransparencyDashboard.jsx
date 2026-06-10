import { motion } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { BarChart3, FileText, CheckCircle, Clock, PieChart, LineChart, DollarSign, ClipboardCheck, Scale, Database, Bell, Mail, BarChart } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const allocData = {
  labels: ['Infrastructure', 'Education', 'Health', 'Water Supply', 'Agriculture', 'Digital Nepal'],
  datasets: [{
    data: [42, 18, 15, 14, 6, 5],
    backgroundColor: ['#0d9488', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'],
    borderWidth: 0,
  }]
};

const expData = {
  labels: ['Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun'],
  datasets: [
    { label: 'Planned Budget', data: [18, 22, 28, 32, 38, 42, 46, 52], borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', fill: false, tension: 0.3 },
    { label: 'Actual Expenditure', data: [16, 20, 26, 31, 37, 44, 48, 54], borderColor: '#0d9488', backgroundColor: 'rgba(13,148,136,0.1)', fill: false, tension: 0.3 }
  ]
};

const contracts = [
  { id: 'CT-2025-001', name: 'Sundarijal Flyover', vendor: 'Shivam Construction', amount: '₨ 12.2M', status: 'Ongoing', statusColor: 'bg-green-100 text-green-700', audit: 'View' },
  { id: 'CT-2025-008', name: 'Janak Secondary School', vendor: 'Everest Builders', amount: '₨ 8.5M', status: 'Active', statusColor: 'bg-amber-100 text-amber-700', audit: 'View' },
  { id: 'CT-2025-012', name: 'Drinking Water Scheme', vendor: 'Hydro Solutions Ltd', amount: '₨ 22.3M', status: 'Ongoing', statusColor: 'bg-green-100 text-green-700', audit: 'View' },
  { id: 'CT-2024-045', name: 'Ward 2 Road Asphalt', vendor: 'Nepal Paving Corp', amount: '₨ 4.25M', status: 'Completed', statusColor: 'bg-blue-100 text-blue-700', audit: 'Final' },
  { id: 'CT-2025-023', name: 'Community Hospital Upgrade', vendor: 'MediBuild Intl', amount: '₨ 9.8M', status: 'Tender', statusColor: 'bg-purple-100 text-purple-700', audit: 'Pending' }
];

export default function TransparencyDashboard() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-emerald-900 to-teal-800 text-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border border-white/10">
            <BarChart3 className="w-4 h-4" /> Full Public Disclosure
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight">
            Transparency <span className="text-emerald-300">Dashboard</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-emerald-100 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Real-time tracking of every rupee — from remittance inflow to project expenditure. Open data, open governance.
          </motion.p>
        </div>
      </section>

      {/* METRICS */}
      <section className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: BarChart3, val: '98.4%', label: 'Transparency Score' },
            { icon: FileText, val: '₨ 312.6M', label: 'Total Disclosed Budget' },
            { icon: CheckCircle, val: '1,284', label: 'Public Contracts' },
            { icon: Clock, val: 'Live', label: 'Real-time Sync' }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (i * 0.1) }} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center">
              <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 mx-auto mb-3" />
              <p className="text-2xl md:text-4xl font-black text-gray-800 tracking-tight">{stat.val}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CHARTS */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Financial Transparency</h2>
          <p className="text-gray-500 text-lg">Budget allocation, expenditure tracking, and remittance utilization</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2"><PieChart className="text-emerald-600 w-6 h-6" /> Budget Allocation (FY 2081)</h3>
            <div className="h-64 flex justify-center"><Doughnut data={allocData} options={{ maintainAspectRatio: false }} /></div>
            <p className="text-sm text-gray-400 text-center mt-6">Total allocated budget: ₨ 312.6 Million</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2"><LineChart className="text-emerald-600 w-6 h-6" /> Monthly Expenditure Trend</h3>
            <div className="h-64"><Line data={expData} options={{ maintainAspectRatio: false }} /></div>
            <p className="text-sm text-gray-400 text-center mt-6">Cumulative spending vs. planned budget (millions NPR)</p>
          </div>
        </div>
      </section>

      {/* REMITTANCE UTILIZATION */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl text-gray-800 mb-8 flex items-center gap-2"><DollarSign className="text-emerald-600 w-6 h-6" /> Remittance Utilization Tracker</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Inflow', val: '₨ 146.2M' },
              { label: 'Project Allocation', val: '₨ 58.4M' },
              { label: 'Community Invest', val: '₨ 32.8M' },
              { label: 'Overhead', val: '₨ 4.2M' }
            ].map((item, i) => (
              <div key={i} className="bg-emerald-50 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-500 font-medium mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-emerald-700">{item.val}</p>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 mb-3">
            <div className="bg-emerald-500 h-4 rounded-full transition-all duration-1000" style={{ width: '68%' }}></div>
          </div>
          <p className="text-sm text-gray-500 font-medium text-center">68% of remittance funds directly utilized in development projects</p>
        </div>
      </section>

      {/* CONTRACTS TABLE */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Public Contracts & Procurement</h2>
          <p className="text-gray-500">All government contracts, tenders, and awarded bids are publicly accessible</p>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/50">
                  <th className="p-5 text-sm font-bold text-emerald-900 uppercase tracking-wider">ID</th>
                  <th className="p-5 text-sm font-bold text-emerald-900 uppercase tracking-wider">Project</th>
                  <th className="p-5 text-sm font-bold text-emerald-900 uppercase tracking-wider">Vendor</th>
                  <th className="p-5 text-sm font-bold text-emerald-900 uppercase tracking-wider">Amount</th>
                  <th className="p-5 text-sm font-bold text-emerald-900 uppercase tracking-wider">Status</th>
                  <th className="p-5 text-sm font-bold text-emerald-900 uppercase tracking-wider">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contracts.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 text-sm text-gray-500 font-medium">{c.id}</td>
                    <td className="p-5 text-sm font-bold text-gray-900">{c.name}</td>
                    <td className="p-5 text-sm text-gray-600">{c.vendor}</td>
                    <td className="p-5 text-sm font-bold text-emerald-700">{c.amount}</td>
                    <td className="p-5"><span className={`px-3 py-1 rounded-full text-xs font-bold ${c.statusColor}`}>{c.status}</span></td>
                    <td className="p-5 text-sm font-bold text-emerald-600 hover:text-emerald-800 cursor-pointer">{c.audit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* COMPLIANCE & OVERSIGHT */}
      <section className="container mx-auto px-6 py-8 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800 mb-8 flex items-center gap-2"><ClipboardCheck className="text-emerald-600 w-6 h-6" /> Audit & Compliance</h3>
            <div className="space-y-6">
              {[
                { label: 'Financial Audit Compliance', val: 98 },
                { label: 'Procurement Transparency', val: 96 },
                { label: 'Remittance Utilization', val: 94 },
                { label: 'Project Completion Rate', val: 89 }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2"><span className="text-sm font-semibold text-gray-700">{item.label}</span><span className="font-bold text-emerald-700">{item.val}%</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5"><div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${item.val}%` }}></div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-8 shadow-sm border border-emerald-100">
            <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2"><Scale className="text-emerald-600 w-6 h-6" /> Citizen Oversight</h3>
            <p className="text-gray-600 leading-relaxed mb-6">Every citizen has the right to access project documents, audit reports, and expenditure details. Our open-data API allows third-party verification.</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm text-gray-700 flex items-center gap-1"><Database className="w-4 h-4 text-emerald-600" /> Open Data API</span>
              <span className="bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm text-gray-700 flex items-center gap-1"><FileText className="w-4 h-4 text-emerald-600" /> RTI Portal</span>
              <span className="bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm text-gray-700 flex items-center gap-1"><BarChart className="w-4 h-4 text-emerald-600" /> Live Dashboard</span>
            </div>
            <button className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-colors shadow-md w-full sm:w-auto">
              Download Open Data Set
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-12 text-center shadow-2xl">
          <FileText className="w-16 h-16 mx-auto mb-6 text-emerald-300 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Request Public Information</h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-lg mx-auto">File an RTI request, access project documents, or report a transparency concern.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> Submit RTI Request
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5" /> View Full Ledger
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
