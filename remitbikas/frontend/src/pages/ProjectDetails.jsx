import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HardHat, Activity, CheckCircle, Banknote, Percent, Map, Building, Droplets, ShieldCheck, TreePine, Construction, Briefcase, Calendar as CalIcon, Users, Settings, MapPin, X, ChevronUp, BookOpen, Trash2, Send, ThumbsUp, MessageCircle, Loader2, User } from 'lucide-react';
import { io } from 'socket.io-client';
import { api } from '../lib/api';
import { API_URL } from '../lib/constants';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const projects = [
  { id: 1, title: 'Sundarijal Flyover', status: 'ongoing', type: 'Infrastructure', desc: 'Modern bridge connecting Ward 4 & 5, expected to reduce traffic by 40%.', budget: '₨ 12.2M', date: 'Est. Nov 2025', workers: 45, completion: 75, funds: 68, icon: Map, color: 'from-emerald-800 to-green-700', lat: 27.7667, lng: 85.4167, address: 'Ward 4, Sundarijal, Gokarneshwar', coverImage: 'https://picsum.photos/seed/proj1/800/600', progressImages: ['https://picsum.photos/seed/proj1a/800/600', 'https://picsum.photos/seed/proj1b/800/600'], currentState: 'Main pillars completed. Currently installing the precast concrete girders for the central span. Slight delay due to recent heavy rains, but expected to catch up next month.' },
  { id: 2, title: 'Janak Secondary School', status: 'ongoing', type: 'Education', desc: 'Reconstruction of 15 classrooms & smart classroom facility.', budget: '₨ 8.5M', date: 'Mar 2026', workers: 28, completion: 40, funds: 35, icon: Building, color: 'from-teal-700 to-emerald-600', lat: 27.7000, lng: 85.3000, address: 'Ward 10, Baneshwor, Kathmandu', coverImage: 'https://images.squarespace-cdn.com/content/v1/62026fe548745433d4f4985e/8bbb9487-5016-4edc-a9cc-0ac9651a86c3/Picture+1.4.jpg', progressImages: ['https://images.squarespace-cdn.com/content/v1/62026fe548745433d4f4985e/9204c78c-399b-46d7-907e-bfed642461d3/Picture+1.jpg'], currentState: 'First floor slab casting is finished. Brickwork for the second floor has commenced. Procurement for smart boards is in the tender phase.' },
  { id: 3, title: 'Drinking Water Scheme', status: 'ongoing', type: 'Utilities', desc: 'Piped water supply for 2,500 households, under remittance co-fund.', budget: '₨ 22.3M', date: 'Dec 2025', workers: 62, completion: 60, funds: 52, icon: Droplets, color: 'from-emerald-800 to-lime-700', lat: 27.7200, lng: 85.3500, address: 'Ward 3, Kirtipur Municipality', coverImage: 'https://risingnepaldaily.com/storage/media/45819/Untitled-2.jpg', progressImages: [], currentState: 'Main reservoir tank construction complete. Currently laying the primary distribution pipelines in Ward 3 and 4. Testing phase to begin in October.' },
  { id: 4, title: 'Ward 2 Road Asphalt', status: 'completed', type: 'Infrastructure', desc: '2.4 km road asphalt with drainage system, completed 2 months ahead.', budget: '₨ 4.25M', date: 'May 2025', workers: null, completion: 100, funds: 100, icon: Construction, color: 'from-gray-700 to-gray-600', lat: 27.7300, lng: 85.3300, address: 'Ward 2, Maharajgunj, Kathmandu', coverImage: 'https://i.ytimg.com/vi/zFeduooKp3U/mqdefault.jpg', progressImages: [], currentState: 'Project successfully completed and handed over to the community. Routine maintenance scheduled for next year.' },
  { id: 5, title: 'Community Hospital Upgrade', status: 'tender', type: 'Healthcare', desc: '50-bed hospital expansion with ICU. Contractor bids closing soon.', budget: '₨ 9.8M', date: 'Bid Deadline: Aug 30', workers: null, completion: 0, funds: 0, icon: ShieldCheck, color: 'from-blue-800 to-blue-700', lat: 27.6800, lng: 85.3100, address: 'Ward 5, Patan Hospital Area, Lalitpur', coverImage: 'https://malikjunaid.com/wp-content/uploads/2025/09/Screenshot-145-Copy.jpg', progressImages: [], currentState: 'Technical evaluation of submitted bids is ongoing. Contract award expected by mid-September.' },
  { id: 6, title: 'Smart City Phase 1', status: 'planning', type: 'Technology', desc: 'IoT-enabled street lighting, smart parking, and public Wi-Fi.', budget: '₨ 35.0M (prop)', date: 'Est. 2026', workers: null, completion: 20, funds: 0, icon: Settings, color: 'from-purple-800 to-purple-700', lat: 27.6900, lng: 85.3300, address: 'Ward 1, Jawalakhel, Lalitpur', coverImage: 'https://capitalsmartcityphase3.home.blog/wp-content/uploads/2025/07/capital-smart-city-phase-3-k.jpg?w=1024', progressImages: [], currentState: 'Feasibility study and site mapping completed. Initial design phase for the IoT architecture is underway.', votes: 342 },
  { id: 7, title: 'Solar Microgrid Project', status: 'ongoing', type: 'Energy', desc: 'Community solar installation for 1,200 households.', budget: '₨ 18.6M', date: 'Feb 2026', workers: 34, completion: 55, funds: 48, icon: Activity, color: 'from-cyan-800 to-cyan-700', lat: 27.7100, lng: 85.2900, address: 'Ward 7, Chobhar, Kirtipur', coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR56wfclmC2yjArBsgZhgD1zjbv7XAHT56ebQ&s', progressImages: [], currentState: 'Solar panels for sector A installed. Inverter room construction in progress. Battery storage units are currently en route from customs.' },
  { id: 8, title: 'Urban Park & Green Space', status: 'completed', type: 'Environment', desc: '5-acre community park with walking trails and native plantation.', budget: '₨ 7.2M', date: 'Mar 2025', workers: null, completion: 100, funds: 100, icon: TreePine, color: 'from-green-800 to-green-700', lat: 27.7400, lng: 85.3400, address: 'Ward 8, Balaju, Kathmandu', coverImage: 'https://thumbs.dreamstime.com/b/city-park-green-space-san-francisco-s-moscone-convention-center-surrounded-adjacent-to-yerba-buena-museum-district-85646432.jpg', progressImages: [], currentState: 'Park is fully open to the public. Landscaping is being maintained by the local user committee.' },
  { id: 9, title: 'Ward 5 Public Library', status: 'planning', type: 'Education', desc: 'A modern e-library facility with high-speed internet and reading halls for students.', budget: '₨ 4.5M (prop)', date: 'Est. 2026', workers: null, completion: 0, funds: 0, icon: BookOpen, color: 'from-indigo-800 to-indigo-700', lat: 26.6650, lng: 87.2750, address: 'Ward 5, Itahari Sub-Metropolitan City, Sunsari', coverImage: 'https://i0.wp.com/s3.tipsnepal.com/2020/11/Library-Around-Kathmandu-Valley-Kaiser-Library-3-e1614679962881.jpg?fit=1024,683&quality=95&strip=all&ssl=1', progressImages: [], currentState: 'Land allocated by the municipality. Currently seeking budget approval and community support.', votes: 845 },
  { id: 10, title: 'Waste Management Plant', status: 'planning', type: 'Utilities', desc: 'Centralized organic waste composting and recycling facility to manage urban solid waste.', budget: '₨ 45.0M (prop)', date: 'Est. 2027', workers: null, completion: 0, funds: 0, icon: Trash2, color: 'from-orange-800 to-orange-700', lat: 27.7500, lng: 85.3900, address: 'Ward 9, Gokarna, Gokarneshwar', coverImage: 'https://media.gettyimages.com/id/2228593355/photo/workers-monitor-recycling-plant-operations.jpg?s=612x612&w=0&k=20&c=QBCD8SMmC4v1EgzCq-_2VpfAt9NWdXWl3sEU3G_fsZQ=', progressImages: [], currentState: 'Environmental Impact Assessment (EIA) has been submitted. Awaiting public consensus.', votes: 124 }
];

export default function ProjectDetails() {

    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [mapCenter, setMapCenter] = useState([27.7172, 85.3240]); // Default Kathmandu
    const [mapZoom, setMapZoom] = useState(11);
    const [votedProjects, setVotedProjects] = useState(new Set());
    const mapSectionRef = useRef(null);
    const commentsEndRef = useRef(null);

    // Comment state
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);
    const [likedComments, setLikedComments] = useState(new Set());
    const socketRef = useRef(null);

    function readStoredUser() {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Load comments when a project is selected
  useEffect(() => {
    if (!selectedProject) {
      setComments([]);
      return;
    }

    const projectId = String(selectedProject.id);
    setIsCommentsLoading(true);

    // 1. Fetch existing comments
    const fetchComments = async () => {
      try {
        const res = await api.request(`/projects/${projectId}/comments`);
        setComments(res.data || []);
      } catch (err) {
        console.error('Failed to load comments', err);
      } finally {
        setIsCommentsLoading(false);
      }
    };
    fetchComments();

    // 2. Connect socket
    const backendUrl = API_URL.startsWith('http') ? new URL(API_URL).origin : 'http://localhost:5000';
    const sock = io(backendUrl, { withCredentials: true });
    sock.on('connect', () => {
      sock.emit('join_project_room', projectId);
    });
    sock.on('new_project_comment', (comment) => {
      setComments(prev => [...prev, comment]);
    });
    sock.on('comment_liked', ({ commentId, likes }) => {
      setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes } : c));
    });
    socketRef.current = sock;

    return () => {
      sock.emit('leave_project_room', projectId);
      sock.disconnect();
    };
  }, [selectedProject?.id]);

useEffect(() => {
  commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [comments]);

const handlePostComment = async (e) => {
  e.preventDefault();
  if (!commentInput.trim() || !selectedProject) return;
  const user = readStoredUser();
  try {
    await api.request(`/projects/${selectedProject.id}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        content: commentInput.trim(),
        authorId: user?.id || null,
        authorName: user?.name || 'Anonymous Citizen',
      }),
    });
    setCommentInput('');
  } catch (err) {
    console.error('Failed to post comment', err);
  }
};

const handleLikeComment = async (commentId) => {
  if (likedComments.has(commentId)) return;
  setLikedComments(prev => new Set(prev).add(commentId));
  try {
    await api.request(`/projects/${selectedProject.id}/comments/${commentId}/like`, {
      method: 'POST',
    });
  } catch (err) {
    console.error('Failed to like comment', err);
  }
};

const rawFiltered = filter === 'all' ? projects : projects.filter(p => p.status === filter);

// Sort planning projects by votes (highest first) when in planning filter
const filteredProjects = filter === 'planning'
  ? [...rawFiltered].sort((a, b) => {
    const votesA = (a.votes ?? 0) + (votedProjects.has(a.id) ? 1 : 0);
    const votesB = (b.votes ?? 0) + (votedProjects.has(b.id) ? 1 : 0);
    return votesB - votesA;
  })
  : rawFiltered;

const handleOpenMap = (project) => {
  if (project && project.lat && project.lng) {
    setMapCenter([project.lat, project.lng]);
    setMapZoom(15);
  } else {
    setMapCenter([27.7172, 85.3240]);
    setMapZoom(11);
  }
  setTimeout(() => {
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
};

const handleVote = (e, projectId) => {
  e.stopPropagation();
  setVotedProjects(prev => {
    const newSet = new Set(prev);
    if (newSet.has(projectId)) {
      newSet.delete(projectId);
    } else {
      newSet.add(projectId);
    }
    return newSet;
  });
};

return (
  <div>
    {/* HERO */}
    <section className="relative bg-gradient-to-r from-emerald-900 to-teal-800 text-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border border-white/10">
          <HardHat className="w-4 h-4" /> Active Infrastructure
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
          <button key={cat.id} onClick={() => setFilter(cat.id)} className={`px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${filter === cat.id ? 'bg-emerald-700 text-white shadow-emerald-700/20' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}>
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div layoutId={`card-${project.id}`} onClick={() => setSelectedProject(project)} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} key={project.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 cursor-pointer flex flex-col group">
              <div className="h-48 relative overflow-hidden">
                <motion.img layoutId={`image-${project.id}`} src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent pointer-events-none`} />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                  <project.icon className="w-6 h-6" />
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-gray-800 shadow-sm z-10">
                  {project.status === 'completed' ? 'Completed' : project.status === 'tender' ? 'Bids Open' : `${project.completion}% Complete`}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 leading-tight pr-2">{project.title}</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleOpenMap(project); }} className="p-1.5 bg-gray-50 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors group/map relative z-10">
                      <MapPin className="w-5 h-5" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/map:opacity-100 transition-opacity whitespace-nowrap">View on Map</span>
                    </button>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider">{project.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{project.address}</span>
                </div>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{project.desc}</p>
                <div className="flex justify-between text-sm font-semibold mb-4">
                  <span className="text-emerald-700 flex items-center gap-1.5"><Banknote className="w-4 h-4" /> {project.budget}</span>
                  <span className="text-gray-500 flex items-center gap-1.5"><CalIcon className="w-4 h-4" /> {project.date}</span>
                </div>

                {project.status === 'planning' ? (
                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-50">
                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Community Priority</div>
                    <button onClick={(e) => handleVote(e, project.id)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm border ${votedProjects.has(project.id) ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-emerald-300'}`}>
                      <ChevronUp className={`w-4 h-4 ${votedProjects.has(project.id) ? 'text-white' : 'text-emerald-600'}`} />
                      {project.votes + (votedProjects.has(project.id) ? 1 : 0)}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
                      <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${project.completion}%` }} />
                    </div>
                    <div className="flex gap-2">
                      {project.workers && <span className="text-xs font-medium bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-gray-600"><Users className="w-3.5 h-3.5" /> {project.workers} workers</span>}
                      {project.funds > 0 && <span className="text-xs font-medium bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-gray-600"><Activity className="w-3.5 h-3.5" /> {project.funds}% funds used</span>}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* DETAILED VIEW MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm" />

            <motion.div layoutId={`card-${selectedProject.id}`} className="bg-white rounded-3xl w-full max-w-5xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] my-auto">
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-20 bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 sm:p-10 overflow-y-auto">
                <div className="mb-8 pr-12">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block shadow-sm border border-emerald-200">{selectedProject.type}</span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">{selectedProject.title}</h2>
                  <div className="flex items-center gap-2 text-gray-600 text-lg font-medium">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <span>{selectedProject.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-10">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4"><Activity className="text-emerald-600" /> Present State & Conditions</h3>
                      <p className="text-gray-700 text-lg leading-relaxed bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">{selectedProject.currentState}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-5">Images & Progress</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.img layoutId={`image-${selectedProject.id}`} src={selectedProject.coverImage} alt={selectedProject.title} className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow" />
                        {selectedProject.progressImages.map((img, idx) => (
                          <img key={idx} src={img} alt="Progress" className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow" />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Project Description</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedProject.desc}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-fit space-y-8 shadow-inner">
                    <div>
                      <p className="text-sm text-gray-500 font-bold mb-2 uppercase tracking-wider">Status</p>
                      <span className="bg-white text-emerald-700 font-bold px-5 py-2.5 rounded-xl inline-block border border-gray-200 shadow-sm text-lg">{selectedProject.status}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold mb-2 uppercase tracking-wider">Budget</p>
                      <p className="text-4xl font-black text-gray-800">{selectedProject.budget}</p>
                    </div>
                    {selectedProject.status === 'planning' ? (
                      <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm mt-4 text-center">
                        <h4 className="font-bold text-gray-800 mb-2">Community Priority</h4>
                        <p className="text-sm text-gray-500 mb-5 leading-relaxed">Help prioritize this project for execution by casting your vote.</p>
                        <button onClick={(e) => handleVote(e, selectedProject.id)} className={`w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-lg transition-all shadow-md border ${votedProjects.has(selectedProject.id) ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300'}`}>
                          <ChevronUp className={`w-6 h-6 ${votedProjects.has(selectedProject.id) ? 'text-white' : 'text-emerald-600'}`} />
                          {selectedProject.votes + (votedProjects.has(selectedProject.id) ? 1 : 0)} Votes
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <p className="text-sm text-gray-500 font-bold mb-3 uppercase tracking-wider">Overall Progress</p>
                          <div className="w-full bg-gray-200 rounded-full h-3.5 mb-2 overflow-hidden shadow-inner">
                            <div className="bg-emerald-500 h-3.5 rounded-full" style={{ width: `${selectedProject.completion}%` }} />
                          </div>
                          <p className="text-right text-sm font-bold text-emerald-700">{selectedProject.completion}% Complete</p>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex items-center gap-4 text-gray-700 font-medium text-lg">
                          <CalIcon className="w-6 h-6 text-emerald-600 shrink-0" /> {selectedProject.date}
                        </div>
                        {selectedProject.workers && (
                          <div className="flex items-center gap-4 text-gray-700 font-medium text-lg">
                            <Users className="w-6 h-6 text-emerald-600 shrink-0" /> {selectedProject.workers} Active Workers
                          </div>
                        )}
                        {selectedProject.funds > 0 && (
                          <div className="flex items-center gap-4 text-gray-700 font-medium text-lg">
                            <Banknote className="w-6 h-6 text-emerald-600 shrink-0" /> {selectedProject.funds}% Funds Disbursed
                          </div>
                        )}
                      </>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); setSelectedProject(null); handleOpenMap(selectedProject); }} className="w-full mt-6 bg-white border-2 border-emerald-600 text-emerald-700 font-bold py-4 rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-lg shadow-sm hover:shadow-md">
                      <MapPin className="w-6 h-6" /> View Location on Map
                    </button>
                  </div>
                </div>

                {/* ── COMMENTS & REVIEWS SECTION ────────────────── */}
                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                    <MessageCircle className="text-emerald-600" /> Community Discussion
                    <span className="text-sm font-medium bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full ml-2">{comments.length} comments</span>
                  </h3>

                  {/* Comments List */}
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent' }}>
                    {isCommentsLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="w-7 h-7 animate-spin text-emerald-600" />
                      </div>
                    ) : comments.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">
                        <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
                        <p className="font-medium">No comments yet. Be the first to share your thoughts!</p>
                      </div>
                    ) : (
                      comments.map((c, idx) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={c.id || idx}
                          className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-emerald-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-gray-800 text-sm">{c.authorName}</span>
                                <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                              <p className="text-gray-700 mt-1.5 text-sm leading-relaxed">{c.content}</p>
                              <button
                                onClick={() => handleLikeComment(c.id)}
                                className={`mt-2.5 flex items-center gap-1.5 text-xs font-semibold transition-colors px-2.5 py-1 rounded-lg ${likedComments.has(c.id)
                                    ? 'text-emerald-700 bg-emerald-100'
                                    : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                                  }`}
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                                {c.likes > 0 && c.likes}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                    <div ref={commentsEndRef} />
                  </div>

                  {/* Post Comment Form */}
                  <form onSubmit={handlePostComment} className="flex gap-3">
                    <input
                      type="text"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Share your feedback on this project..."
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow text-gray-800 font-medium placeholder-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={!commentInput.trim()}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-xl transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      <span className="hidden sm:inline">Post</span>
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAP SECTION */}
      <div ref={mapSectionRef} className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Map className="text-emerald-600" /> Project Locations Tracker</h2>
          <span className="text-sm text-gray-500 font-semibold bg-gray-100 px-3 py-1.5 rounded-full">{projects.filter(p => p.lat && p.lng).length} locations pinned</span>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-200 max-w-5xl mx-auto">
          <div className="h-[500px] w-full bg-gray-100 relative">
            <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 10 }}>
              <ChangeView center={mapCenter} zoom={mapZoom} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {projects.map(p => p.lat && p.lng && (
                <Marker key={p.id} position={[p.lat, p.lng]}>
                  <Popup>
                    <div className="font-sans min-w-[160px]">
                      <h4 className="font-bold text-sm mb-1">{p.title}</h4>
                      <p className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">📍 {p.address}</p>
                      <p className="text-xs text-gray-600 mb-2">{p.type}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${p.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                        p.status === 'planning' ? 'bg-purple-100 text-purple-700' :
                          p.status === 'tender' ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-800'
                        }`}>{p.status.toUpperCase()}{p.status === 'ongoing' ? ` • ${p.completion}%` : ''}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-3 font-medium">All current and future projects are automatically pinned. Click any marker for details.</p>
      </div>
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
        <p className="text-emerald-100 text-lg mb-8 max-w-lg mx-auto">Explore funding opportunities in municipal bonds and remittance-backed development projects.</p>
        <button
          onClick={() => {
            if (selectedProject) {
              navigate(`/investCheckout/${selectedProject.id}`, {
                state: {
                  project: {
                    ...selectedProject,
                    minInvest: "NPR 10,000",
                    returnRate: "12%",
                    budget: `NPR ${selectedProject.totalBudget?.toLocaleString()}`,
                    riskLevel: "LOW",
                    coverImage: selectedProject.images?.[0] || "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80",
                    address: selectedProject.location
                  }
                }
              });
            } else {
              navigate('/invest');
            }
          }}
          className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <Activity className="w-5 h-5" /> Invest Now
        </button>
      </div>
    </section>
  </div>
);
}
