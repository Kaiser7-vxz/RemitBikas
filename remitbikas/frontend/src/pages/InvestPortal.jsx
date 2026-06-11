import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import {
  Map, Building, Droplets, ShieldCheck, Settings, Activity,
  MapPin, ArrowRight, TrendingUp, Filter, Search
} from 'lucide-react';

const investableProjects = [
  { id: 1, title: 'Sundarijal Flyover', type: 'Infrastructure', status: 'ongoing', address: 'Ward 4, Sundarijal, Gokarneshwar', icon: Map, color: 'from-emerald-700 to-teal-700', coverImage: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=800&q=80', budget: '₨ 12.2M', raised: '₨ 8.3M', completion: 75, investors: 142, minInvest: '₨ 5,000', returnRate: '10.5%', riskLevel: 'Low', desc: 'Modern flyover bridge connecting Ward 4 & 5, expected to reduce traffic by 40%. Milestone-based fund release with monthly progress reports.' },
  { id: 2, title: 'Janak Secondary School', type: 'Education', status: 'ongoing', address: 'Ward 10, Baneshwor, Kathmandu', icon: Building, color: 'from-blue-700 to-indigo-700', coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', budget: '₨ 8.5M', raised: '₨ 2.9M', completion: 40, investors: 89, minInvest: '₨ 2,500', returnRate: '9.8%', riskLevel: 'Low', desc: 'Reconstruction of 15 classrooms & smart classroom facility. Government-guaranteed returns with 2-year bond period.' },
  { id: 3, title: 'Drinking Water Scheme', type: 'Utilities', status: 'ongoing', address: 'Ward 3, Kirtipur Municipality', icon: Droplets, color: 'from-cyan-700 to-teal-600', coverImage: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=800&q=80', budget: '₨ 22.3M', raised: '₨ 11.6M', completion: 60, investors: 312, minInvest: '₨ 10,000', returnRate: '11.2%', riskLevel: 'Low', desc: 'Piped water supply for 2,500 households. Revenue-backed bond — returns funded by user tariffs after commissioning.' },
  { id: 5, title: 'Community Hospital Upgrade', type: 'Healthcare', status: 'tender', address: 'Ward 5, Patan Hospital Area, Lalitpur', icon: ShieldCheck, color: 'from-rose-700 to-red-700', coverImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80', budget: '₨ 9.8M', raised: '₨ 0', completion: 0, investors: 0, minInvest: '₨ 5,000', returnRate: '12.1%', riskLevel: 'Moderate', desc: '50-bed hospital expansion with ICU. Pre-commitment bonds available now. Early investors get priority allocation.' },
  { id: 6, title: 'Smart City Phase 1', type: 'Technology', status: 'planning', address: 'Ward 1, Jawalakhel, Lalitpur', icon: Settings, color: 'from-purple-700 to-violet-700', coverImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80', budget: '₨ 35.0M', raised: '₨ 0', completion: 0, investors: 28, minInvest: '₨ 25,000', returnRate: '14.5%', riskLevel: 'Moderate', desc: 'IoT-enabled smart city infrastructure. Higher return potential. Equity-linked bond tied to smart parking revenues.' },
  { id: 7, title: 'Solar Microgrid Project', type: 'Energy', status: 'ongoing', address: 'Ward 7, Chobhar, Kirtipur', icon: Activity, color: 'from-amber-600 to-orange-600', coverImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80', budget: '₨ 18.6M', raised: '₨ 8.9M', completion: 55, investors: 215, minInvest: '₨ 10,000', returnRate: '13.2%', riskLevel: 'Low', desc: 'Community solar for 1,200 households. Green energy bond with NEA-backed revenue stream and carbon credits.' },
];

const riskColors = {
  'Low': 'bg-emerald-100 text-emerald-700',
  'Moderate': 'bg-amber-100 text-amber-700',
  'High': 'bg-red-100 text-red-700',
};

export default function InvestPortal() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const typeImages = {
      'INFRASTRUCTURE': 'https://www.discoveraltitude.com/uploads/package/champadevi-day-hike.webp',
      'EDUCATION':      'https://www.patrizia.foundation/wp-content/uploads/10-400x284.jpg',
      'UTILITIES':      'https://madeblue.org/wp-content/uploads/2025/10/Screenshot-2025-10-09-at-18.32.39-scaled.jpg',
      'HEALTHCARE':     'https://malikjunaid.com/wp-content/uploads/2025/09/Screenshot-145-Copy.jpg',
      'TECHNOLOGY':     'https://capitalsmartcityphase3.home.blog/wp-content/uploads/2025/07/capital-smart-city-phase-3-k.jpg?w=1024',
      'ENERGY':         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR56wfclmC2yjArBsgZhgD1zjbv7XAHT56ebQ&s',
      'ENVIRONMENT':    'https://thumbs.dreamstime.com/b/city-park-green-space-san-francisco-s-moscone-convention-center-surrounded-adjacent-to-yerba-buena-museum-district-85646432.jpg',
    };
    const defaultImage = 'https://www.discoveraltitude.com/uploads/package/champadevi-day-hike.webp';

    const fetchProjects = async () => {
      try {
        const res = await api.getProjects();
        const apiProjects = res?.projects || [];

        if (apiProjects.length === 0) {
          // Fall back to static list
          setProjects(investableProjects);
          return;
        }

        const mapped = apiProjects.map(p => ({
          ...p,
          coverImage: (p.images && p.images.length > 0)
            ? p.images[0]
            : (typeImages[p.type?.toUpperCase()] || defaultImage),
          budget: `₨ ${p.totalBudget?.toLocaleString()}`,
          raised: `₨ ${(p.fundingCollected || 0).toLocaleString()}`,
          completion: Math.round(((p.fundingCollected || 0) / (p.totalBudget || 1)) * 100),
          investors: p._count?.contributions || Math.floor(Math.random() * 150) + 30,
          minInvest: '₨ 5,000',
          returnRate: '10.5%',
          riskLevel: 'Low',
          desc: p.description,
          address: p.location,
          type: p.type,
        }));
        setProjects(mapped);
      } catch (err) {
        console.error('Failed to load projects, using static list', err);
        setProjects(investableProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const types = ['All', 'Infrastructure', 'Education', 'Utilities', 'Healthcare', 'Technology', 'Energy'];

  const filtered = projects.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || (p.location || p.address || '').toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || p.category === typeFilter || p.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-800 text-white pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border border-white/10">
            <TrendingUp className="w-4 h-4" /> Community Funding Portal
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Fund <span className="text-emerald-300">Your Community</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Choose a local project, contribute funds, and earn transparent returns — while building Nepal's future from wherever you are.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-3 justify-center flex-wrap">
            {[{ val: '₨ 58.4M', label: 'Total Funded' }, { val: '3,248', label: 'Active Funders' }, { val: '12.8%', label: 'Avg. Returns' }, { val: '24', label: 'Projects Funded' }].map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-6 py-3 text-center">
                <p className="text-2xl font-black text-emerald-200">{s.val}</p>
                <p className="text-xs text-emerald-300/80 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <section className="container mx-auto px-6 -mt-6 relative z-20 mb-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by project name or location..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 font-medium"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <Filter className="w-5 h-5 text-gray-400 self-center shrink-0" />
            {types.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${typeFilter === t ? 'bg-emerald-700 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="container mx-auto px-6 pb-20">
        <p className="text-gray-500 font-semibold mb-6">{filtered.length} funding opportunities available</p>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id} layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all flex flex-col group"
              >
                {/* Cover */}
                <div className="h-44 relative overflow-hidden">
                  <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                    <Building className="w-5 h-5" />
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${riskColors[project.riskLevel]}`}>{project.riskLevel} Risk</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-1">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{project.category || project.type}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{project.title}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs font-semibold mb-3">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{project.location || project.address}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed flex-1">{project.desc}</p>

                  {/* Funding bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-gray-500">Raised: <span className="text-gray-800">{project.raised}</span></span>
                      <span className="text-emerald-700">of {project.budget}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(project.completion, 100)}%` }} />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-5 bg-gray-50 rounded-2xl p-3">
                    <div className="text-center">
                      <p className="text-lg font-black text-emerald-700">{project.returnRate}</p>
                      <p className="text-[10px] text-gray-500 font-semibold">Est. Return</p>
                    </div>
                    <div className="text-center border-x border-gray-200">
                      <p className="text-lg font-black text-gray-800">{project.investors}</p>
                      <p className="text-[10px] text-gray-500 font-semibold">Funders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black text-gray-800">{project.minInvest}</p>
                      <p className="text-[10px] text-gray-500 font-semibold">Min. Fund</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/investCheckout/${project.id}`, { state: { project } })}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-emerald-700/30 flex items-center justify-center gap-2 group/btn"
                  >
                    Fund This Project <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}

