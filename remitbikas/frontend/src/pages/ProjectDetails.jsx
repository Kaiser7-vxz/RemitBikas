import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardHat, Activity, CheckCircle, Banknote, Percent, Map, Building, Droplets, ShieldCheck, TreePine, Construction, Briefcase, Calendar as CalIcon, Users, Settings } from 'lucide-react';

const projects = [
  { id: 1, title: 'Sundarijal Flyover', status: 'ongoing', type: 'Infrastructure', desc: 'Modern bridge connecting Ward 4 & 5, expected to reduce traffic by 40%.', budget: '₨ 12.2M', date: 'Est. Nov 2025', workers: 45, completion: 75, funds: 68, icon: Map, color: 'from-emerald-800 to-green-700' },
  { id: 2, title: 'Janak Secondary School', status: 'ongoing', type: 'Education', desc: 'Reconstruction of 15 classrooms & smart classroom facility.', budget: '₨ 8.5M', date: 'Mar 2026', workers: 28, completion: 40, funds: 35, icon: Building, color: 'from-teal-700 to-emerald-600' },
  { id: 3, title: 'Drinking Water Scheme', status: 'ongoing', type: 'Utilities', desc: 'Piped water supply for 2,500 households, under remittance co-fund.', budget: '₨ 22.3M', date: 'Dec 2025', workers: 62, completion: 60, funds: 52, icon: Droplets, color: 'from-emerald-800 to-lime-700' },
  { id: 4, title: 'Ward 2 Road Asphalt', status: 'completed', type: 'Infrastructure', desc: '2.4 km road asphalt with drainage system, completed 2 months ahead.', budget: '₨ 4.25M', date: 'May 2025', workers: null, completion: 100, funds: 100, icon: Construction, color: 'from-gray-700 to-gray-600' },
  { id: 5, title: 'Community Hospital Upgrade', status: 'tender', type: 'Healthcare', desc: '50-bed hospital expansion with ICU. Contractor bids closing soon.', budget: '₨ 9.8M', date: 'Bid Deadline: Aug 30', workers: null, completion: 0, funds: 0, icon: ShieldCheck, color: 'from-blue-800 to-blue-700' },
  { id: 6, title: 'Smart City Phase 1', status: 'planning', type: 'Technology', desc: 'IoT-enabled street lighting, smart parking, and public Wi-Fi.', budget: '₨ 35.0M (prop)', date: 'Est. 2026', workers: null, completion: 20, funds: 0, icon: Settings, color: 'from-purple-800 to-purple-700' },
  { id: 7, title: 'Solar Microgrid Project', status: 'ongoing', type: 'Energy', desc: 'Community solar installation for 1,200 households.', budget: '₨ 18.6M', date: 'Feb 2026', workers: 34, completion: 55, funds: 48, icon: Activity, color: 'from-cyan-800 to-cyan-700' },
  { id: 8, title: 'Urban Park & Green Space', status: 'completed', type: 'Environment', desc: '5-acre community park with walking trails and native plantation.', budget: '₨ 7.2M', date: 'Mar 2025', workers: null, completion: 100, funds: 100, icon: TreePine, color: 'from-green-800 to-green-700' }
];

export default function ProjectDetails() {
  const [filter, setFilter] = useState('all');
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-emerald-900 to-teal-800 text-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border border-white/10">
            <HardHat className="w-4 h-4"/> Active Infrastructure
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight">
            Development <span className="text-emerald-300">Projects</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-emerald-100 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Track real-time progress, budgets, and completion status of all municipal construction and development initiatives.
          </motion.p>
        </div>
      </section>

      {/* STATS OVERVIEW */}
      <section className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Activity, val: '47', label: 'Active Projects' },
            { icon: CheckCircle, val: '23', label: 'Completed (FY 2081)' },
            { icon: Banknote, val: '₨ 146.2M', label: 'Total Budget' },
            { icon: Percent, val: '68%', label: 'Avg. Completion' }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (i * 0.1) }} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 mx-auto mb-3" />
              <p className="text-2xl md:text-4xl font-black text-gray-800 tracking-tight">{stat.val}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FILTER & GRID */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'completed', label: 'Completed' },
            { id: 'planning', label: 'Planning' },
            { id: 'tender', label: 'Tender' }
          ].map((cat) => (
            <button key={cat.id} onClick={() => setFilter(cat.id)} className={`px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${
                filter === cat.id ? 'bg-emerald-700 text-white shadow-emerald-700/20' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} key={project.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100">
                <div className={`h-48 bg-gradient-to-r ${project.color} flex items-center justify-center relative`}>
                  <project.icon className="w-16 h-16 text-white/80" />
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 shadow-sm">
                    {project.status === 'completed' ? 'Completed' : project.status === 'tender' ? 'Bids Open' : `${project.completion}% Complete`}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 leading-tight">{project.title}</h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ml-2">{project.status}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">{project.desc}</p>
                  <div className="flex justify-between text-sm font-semibold mb-4">
                    <span className="text-emerald-700 flex items-center gap-1.5"><Banknote className="w-4 h-4"/> {project.budget}</span>
                    <span className="text-gray-500 flex items-center gap-1.5"><CalIcon className="w-4 h-4"/> {project.date}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${project.completion}%` }} />
                  </div>
                  <div className="flex gap-2">
                    {project.workers && <span className="text-xs font-medium bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-gray-600"><Users className="w-3.5 h-3.5"/> {project.workers} workers</span>}
                    {project.funds > 0 && <span className="text-xs font-medium bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-gray-600"><Activity className="w-3.5 h-3.5"/> {project.funds}% funds used</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">📅 Project Milestones</h2>
            <p className="text-gray-500">Key upcoming deadlines and completion targets</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { date: 'AUGUST 2025', title: 'Sundarijal Flyover', desc: 'Pillar foundation completion target' },
              { date: 'SEPTEMBER 2025', title: 'Water Scheme', desc: '12km pipeline to be completed' },
              { date: 'NOVEMBER 2025', title: 'School Reconstruction', desc: 'All classrooms roof completion' }
            ].map((milestone, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border-l-8 border-emerald-500">
                <p className="text-sm text-emerald-600 font-bold tracking-wider mb-2">{milestone.date}</p>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{milestone.title}</h3>
                <p className="text-gray-600 font-medium">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-12 text-center shadow-2xl relative overflow-hidden">
          <Briefcase className="w-16 h-16 mx-auto mb-6 text-emerald-300 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Local Infrastructure</h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-lg mx-auto">Explore investment opportunities in municipal bonds and remittance-backed development projects.</p>
          <button className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 mx-auto">
            <Activity className="w-5 h-5"/> View Investment Options
          </button>
        </div>
      </section>
    </div>
  );
}
