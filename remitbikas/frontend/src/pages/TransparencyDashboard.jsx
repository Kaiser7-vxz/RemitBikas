import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { BarChart3, FileText, CheckCircle, Clock, PieChart, LineChart, DollarSign, ClipboardCheck, Scale, Database, Mail, BarChart, X, Download, FileCheck, Shield, ChevronRight } from 'lucide-react';

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
  { 
    id: 'CT-2025-001', name: 'Sundarijal Flyover', vendor: 'Shivam Construction', amount: '₨ 12.2M', status: 'Ongoing', statusColor: 'bg-green-100 text-green-700', audit: 'View',
    auditDetails: {
      budgetUtilized: 68,
      totalBudget: '₨ 12,200,000',
      spent: '₨ 8,296,000',
      documents: [
        { title: 'Initial Environmental Examination', date: '2024-05-12', type: 'PDF' },
        { title: 'Tender Award Verification', date: '2024-06-01', type: 'PDF' },
        { title: 'Q1 Financial Audit Report', date: '2024-10-15', type: 'XLSX' }
      ],
      timeline: [
        { date: 'Jun 2024', event: 'Contract Awarded & Initial 20% Fund Released' },
        { date: 'Oct 2024', event: 'Foundation Completed. Q1 Audit Passed.' },
        { date: 'Jan 2025', event: '30% Milestone Fund Released. Pillar works ongoing.' }
      ],
      complianceScore: 94
    }
  },
  { 
    id: 'CT-2025-008', name: 'Janak Secondary School', vendor: 'Everest Builders', amount: '₨ 8.5M', status: 'Active', statusColor: 'bg-amber-100 text-amber-700', audit: 'View',
    auditDetails: {
      budgetUtilized: 35,
      totalBudget: '₨ 8,500,000',
      spent: '₨ 2,975,000',
      documents: [
        { title: 'School Committee Approval', date: '2024-08-20', type: 'PDF' },
        { title: 'Material Quality Verification', date: '2024-11-05', type: 'PDF' }
      ],
      timeline: [
        { date: 'Sep 2024', event: 'Contract Signed. Site clearing begun.' },
        { date: 'Dec 2024', event: 'Foundation laid. 35% funds released.' }
      ],
      complianceScore: 98
    }
  },
  { 
    id: 'CT-2025-012', name: 'Drinking Water Scheme', vendor: 'Hydro Solutions Ltd', amount: '₨ 22.3M', status: 'Ongoing', statusColor: 'bg-green-100 text-green-700', audit: 'View',
    auditDetails: {
      budgetUtilized: 52,
      totalBudget: '₨ 22,300,000',
      spent: '₨ 11,596,000',
      documents: [
        { title: 'Water Source Feasibility Study', date: '2024-01-10', type: 'PDF' },
        { title: 'Pipeline Procurement Invoice', date: '2024-07-22', type: 'PDF' }
      ],
      timeline: [
        { date: 'Jul 2024', event: 'Initial Pipeline Procured.' },
        { date: 'Nov 2024', event: 'First 5km completed. Audit verified.' }
      ],
      complianceScore: 91
    }
  },
  { 
    id: 'CT-2024-045', name: 'Ward 2 Road Asphalt', vendor: 'Nepal Paving Corp', amount: '₨ 4.25M', status: 'Completed', statusColor: 'bg-blue-100 text-blue-700', audit: 'Final',
    auditDetails: {
      budgetUtilized: 100,
      totalBudget: '₨ 4,250,000',
      spent: '₨ 4,250,000',
      documents: [
        { title: 'Final Project Completion Report', date: '2024-12-20', type: 'PDF' },
        { title: 'Independent Quality Test', date: '2024-12-25', type: 'PDF' }
      ],
      timeline: [
        { date: 'Dec 2024', event: 'Project formally handed over to Municipality.' }
      ],
      complianceScore: 99
    }
  },
  { 
    id: 'CT-2025-023', name: 'Community Hospital Upgrade', vendor: 'MediBuild Intl', amount: '₨ 9.8M', status: 'Tender', statusColor: 'bg-purple-100 text-purple-700', audit: 'Pending',
    auditDetails: null
  }
];

export default function TransparencyDashboard() {
  const [selectedAudit, setSelectedAudit] = useState(null);
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
              { label: 'Community Fund', val: '₨ 32.8M' },
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
                    <td className="p-5">
                      {c.auditDetails ? (
                        <button onClick={() => setSelectedAudit(c)} className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
                          <FileCheck className="w-4 h-4" /> View Audit
                        </button>
                      ) : (
                        <span className="text-sm font-bold text-gray-400 flex items-center gap-1.5 cursor-not-allowed">
                          <Clock className="w-4 h-4" /> Pending
                        </span>
                      )}
                    </td>
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
      {/* AUDIT MODAL */}
      <AnimatePresence>
        {selectedAudit && selectedAudit.auditDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedAudit(null)} className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
            
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-white rounded-3xl w-full max-w-4xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] my-auto">
              <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{selectedAudit.id}</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"><Shield className="w-3 h-3" /> Score: {selectedAudit.auditDetails.complianceScore}/100</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900">{selectedAudit.name}</h2>
                  <p className="text-gray-500 font-medium mt-1">Vendor: {selectedAudit.vendor}</p>
                </div>
                <button onClick={() => setSelectedAudit(null)} className="bg-white hover:bg-gray-100 text-gray-600 p-2 rounded-full transition-colors shadow-sm border border-gray-200">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1 bg-white">
                {/* Financial Overview */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><DollarSign className="w-6 h-6 text-emerald-600" /> Financial Overview</h3>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Total Budget</p>
                        <p className="text-2xl font-black text-gray-900">{selectedAudit.auditDetails.totalBudget}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Expended</p>
                        <p className="text-2xl font-black text-emerald-700">{selectedAudit.auditDetails.spent}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden shadow-inner">
                      <div className="bg-emerald-500 h-4 rounded-full transition-all duration-1000" style={{ width: `${selectedAudit.auditDetails.budgetUtilized}%` }}></div>
                    </div>
                    <p className="text-right text-sm font-bold text-emerald-700">{selectedAudit.auditDetails.budgetUtilized}% Utilized</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Clock className="w-6 h-6 text-emerald-600" /> Funding & Progress Timeline</h3>
                  <div className="space-y-6 pl-4 border-l-2 border-emerald-200 ml-3">
                    {selectedAudit.auditDetails.timeline.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[23px] top-1 w-3 h-3 bg-emerald-500 rounded-full border-4 border-white shadow-sm ring-2 ring-emerald-200"></div>
                        <p className="text-sm font-bold text-emerald-600 mb-1">{item.date}</p>
                        <p className="text-gray-700 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">{item.event}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><FileText className="w-6 h-6 text-emerald-600" /> Verification Documents</h3>
                  <div className="grid gap-4">
                    {selectedAudit.auditDetails.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group cursor-pointer bg-white shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs ${doc.type === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {doc.type}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{doc.title}</p>
                            <p className="text-xs text-gray-500 font-medium">Uploaded: {doc.date}</p>
                          </div>
                        </div>
                        <button className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-emerald-100 rounded-full">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}