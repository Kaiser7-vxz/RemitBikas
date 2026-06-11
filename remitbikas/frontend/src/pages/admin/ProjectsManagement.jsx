import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';
import { 
  Briefcase, Activity, CheckCircle, AlertTriangle, 
  Search, Plus, Edit2, Trash2, Eye, Loader2, ArrowRight
} from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.getProjects({ limit: 100 });
      // API returns { projects: [...], pagination: {...} }
      setProjects(res?.projects || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
        <p className="text-gray-500 font-medium">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 text-rose-700 p-6 rounded-2xl text-center border border-rose-100">
        <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-80" />
        <h3 className="text-lg font-bold">Error loading projects</h3>
        <p className="mt-1 opacity-80">{error}</p>
        <button onClick={fetchProjects} className="mt-4 bg-white text-rose-700 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-rose-50 transition-colors">Try Again</button>
      </div>
    );
  }

  const activeProjects = projects.filter(p => p.status === 'ONGOING' || p.status === 'TENDER');
  const completedProjects = projects.filter(p => p.status === 'COMPLETED');
  const delayedProjects = projects.filter(p => p.status === 'SUSPENDED'); // Approximating delayed for mock

  const statusData = {
    labels: ['Planning', 'Tender', 'Ongoing', 'Completed', 'Suspended'],
    datasets: [{
      data: [
        projects.filter(p => p.status === 'PLANNING').length,
        projects.filter(p => p.status === 'TENDER').length,
        projects.filter(p => p.status === 'ONGOING').length,
        projects.filter(p => p.status === 'COMPLETED').length,
        projects.filter(p => p.status === 'SUSPENDED').length,
      ],
      backgroundColor: ['#94a3b8', '#8b5cf6', '#10b981', '#3b82f6', '#f43f5e'],
      borderWidth: 0,
    }]
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Projects Management</h1>
          <p className="text-gray-500 font-medium mt-1">Create, track, and manage all municipal infrastructure projects.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Project
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4"><Briefcase className="w-6 h-6 text-blue-600" /></div>
          <p className="text-sm font-bold text-gray-500">Total Projects</p>
          <h3 className="text-3xl font-black text-gray-900">{projects.length}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"><Activity className="w-6 h-6 text-emerald-600" /></div>
          <p className="text-sm font-bold text-gray-500">Active & Ongoing</p>
          <h3 className="text-3xl font-black text-gray-900">{activeProjects.length}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4"><CheckCircle className="w-6 h-6 text-indigo-600" /></div>
          <p className="text-sm font-bold text-gray-500">Completed</p>
          <h3 className="text-3xl font-black text-gray-900">{completedProjects.length}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4"><AlertTriangle className="w-6 h-6 text-rose-600" /></div>
          <p className="text-sm font-bold text-gray-500">Delayed/Suspended</p>
          <h3 className="text-3xl font-black text-gray-900">{delayedProjects.length}</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">All Projects</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search projects..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64 transition-all" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {projects.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No projects found. Create one to get started.</p>
              </div>
            ) : (
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100">
                    <th className="p-4">Project</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Progress</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{p.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{p.type}</p>
                      </td>
                      <td className="p-4 font-medium text-gray-700">₨ {p.totalBudget.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                          p.status === 'ONGOING' ? 'bg-emerald-100 text-emerald-700' :
                          p.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                          p.status === 'TENDER' ? 'bg-purple-100 text-purple-700' :
                          p.status === 'SUSPENDED' ? 'bg-rose-100 text-rose-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${p.completionPercentage}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-gray-500">{p.completionPercentage}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/projects`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Eye className="w-4 h-4" /></Link>
                          <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
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
            <h2 className="text-lg font-bold text-gray-900 mb-6">Status Distribution</h2>
            <div className="h-64 flex justify-center">
               <Doughnut data={statusData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } }, cutout: '75%' }} />
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-emerald-900 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-30"></div>
            <h3 className="text-xl font-bold mb-2">Need a detailed report?</h3>
            <p className="text-emerald-100/80 text-sm mb-6 leading-relaxed">Download a comprehensive PDF report of all municipal projects, their funding statuses, and delays.</p>
            <button className="bg-white text-emerald-900 px-4 py-2.5 rounded-xl font-bold text-sm w-full hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
              Generate Report <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
