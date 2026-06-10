import { motion } from 'framer-motion';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement,
} from 'chart.js';
import { TrendingUp, Coins, Building2, Users, PieChart, Award, Sun, School, ShieldCheck, Download, UserPlus } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [{
    label: 'Remittance (M NPR)',
    data: [28.4, 31.2, 34.8, 38.5, 42.1, 46.3, 49.8, 54.2],
    borderColor: '#0d9488',
    backgroundColor: 'rgba(13,148,136,0.1)',
    fill: true,
    tension: 0.4,
  }]
};

const doughnutData = {
  labels: ['Infrastructure', 'Green Energy', 'Education', 'Water Systems', 'Digital Nepal'],
  datasets: [{
    data: [11.5, 13.2, 10.8, 9.5, 14.1],
    backgroundColor: ['#0d9488', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'],
    borderWidth: 0,
  }]
};

const barData = {
  labels: ['2021', '2022', '2023', '2024', '2025'],
  datasets: [
    { label: 'Remittance Inflow', data: [182, 210, 245, 278, 312], backgroundColor: '#0d9488', borderRadius: 4 },
    { label: 'Local Investment', data: [68, 85, 112, 148, 186], backgroundColor: '#f59e0b', borderRadius: 4 }
  ]
};

export default function CoInvestmentPortal() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-emerald-900 to-teal-800 text-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border border-white/10">
            <TrendingUp className="w-4 h-4"/> Investment Opportunities
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight">
            Invest in <span className="text-emerald-300">Nepal's Growth</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-emerald-100 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Discover remittance-backed bonds, infrastructure projects, and government-secured investment options with transparent returns.
          </motion.p>
        </div>
      </section>

      {/* METRICS */}
      <section className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: TrendingUp, val: '12.8%', label: 'Avg. Returns (FY)' },
            { icon: Coins, val: '₨ 58.4M', label: 'Active Investments' },
            { icon: Building2, val: '24', label: 'Projects Funded' },
            { icon: Users, val: '3,248', label: 'Active Investors' }
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3"><PieChart className="w-8 h-8 text-emerald-600"/> Investment Performance</h2>
          <p className="text-gray-500 text-lg">Real-time analytics on remittance growth and project returns</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800 mb-6">Remittance Inflow Trend</h3>
            <div className="h-64"><Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} /></div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800 mb-6">Returns by Sector</h3>
            <div className="h-64 flex justify-center"><Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} /></div>
          </div>
        </div>
      </section>

      {/* INVESTMENT CARDS */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-gray-500 text-lg">Government-backed, transparent, and remittance-secured options</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Municipal Infra Bond', icon: Award, color: 'from-emerald-700 to-teal-700', return: '11.5%', min: '50k', risk: 'Low', riskColor: 'bg-green-100 text-green-700' },
              { title: 'Green Energy Fund', icon: Sun, color: 'from-blue-700 to-cyan-700', return: '13.2%', min: '100k', risk: 'Moderate', riskColor: 'bg-yellow-100 text-yellow-700' },
              { title: 'Education Infra Bond', icon: School, color: 'from-purple-700 to-pink-700', return: '10.8%', min: '25k', risk: 'Low', riskColor: 'bg-green-100 text-green-700' }
            ].map((bond, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100">
                <div className={`bg-gradient-to-r ${bond.color} p-6 text-white`}>
                  <bond.icon className="w-10 h-10 mb-4 opacity-90"/>
                  <h3 className="text-2xl font-bold">{bond.title}</h3>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Annual Return</span>
                    <span className="font-black text-emerald-700 text-2xl">{bond.return}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Min. Investment</span>
                    <span className="font-bold text-gray-900">₨ {bond.min}</span>
                  </div>
                  <div className="flex justify-between items-center pb-6">
                    <span className="text-gray-500 font-medium">Risk Level</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${bond.riskColor}`}>{bond.risk}</span>
                  </div>
                  <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-xl font-bold transition-colors shadow-md">
                    Invest Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORRELATION */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <h3 className="font-bold text-2xl text-gray-900 mb-8 text-center">Remittance vs. Investment Correlation</h3>
          <div className="h-72"><Bar data={barData} options={{ maintainAspectRatio: false }} /></div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-emerald-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Investing Today</h2>
            <p className="text-emerald-100 text-lg mb-10 max-w-lg mx-auto">Join thousands of investors building Nepal's future with secure, transparent, and rewarding options.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5"/> Create Account
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5"/> Download Prospectus
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
