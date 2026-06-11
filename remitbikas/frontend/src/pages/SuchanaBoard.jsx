import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Megaphone, FileText, Calendar, Download, MapPin, Clock, Eye, Gavel, FileOutput, UserCheck, FolderOpen, Bell, Send, TrendingUp, Handshake } from 'lucide-react';

const notices = [
  { id: 1, type: 'notice', category: 'Public Notice', title: 'Water Supply Disruption Schedule', desc: 'Maintenance work on main pipeline. Water supply will be disrupted on August 20-21 in Wards 2,3,4.', date: '2 days ago', views: '1,284', icon: Megaphone, color: 'blue' },
  { id: 2, type: 'tender', category: 'Tender Notice', title: 'Smart Classroom Equipment Supply', desc: 'Sealed bids invited for supply and installation of smart classroom equipment in 15 schools.', date: '5 days ago', budget: '₨ 8.5M', icon: Gavel, color: 'amber' },
  { id: 3, type: 'event', category: 'Event', title: 'Digital Literacy Workshop', desc: 'Free 3-day workshop on digital literacy for senior citizens and women entrepreneurs.', date: '1 week ago', dateInfo: 'Aug 28-30, 2025', icon: Calendar, color: 'purple' },
  { id: 4, type: 'press', category: 'Press Release', title: 'Remittance Inflow Reaches All-Time High', desc: 'Q2 remittance crosses ₨ 56.2M, marking 14.2% year-on-year growth. Infrastructure spending up 22%.', date: '3 days ago', source: 'Official Statement', icon: TrendingUp, color: 'green' },
  { id: 5, type: 'notice', category: 'Public Notice', title: 'Tax Payment Deadline Extension', desc: 'Property tax deadline extended to September 15, 2025. No late fee applicable until then.', date: '1 week ago', source: 'Tax Notice', icon: Megaphone, color: 'blue' },
  { id: 6, type: 'tender', category: 'Tender Notice', title: 'Solar Street Light Installation', desc: 'Tender for 200 solar street lights in rural wards. Bid deadline: September 10, 2025.', date: '4 days ago', budget: 'Est. ₨ 12.5M', icon: Gavel, color: 'amber' },
  { id: 7, type: 'event', category: 'Event', title: 'Funder Meetup: Infrastructure Bonds', desc: 'Connect with municipal officials and explore funding opportunities in local bonds.', date: '6 days ago', dateInfo: 'Sep 5, 2025', icon: Handshake, color: 'purple' },
  { id: 8, type: 'press', category: 'Press Release', title: 'New Municipal Chairman Elected', desc: 'Mr. Krishna Prasad Sharma assumes office with focus on transparency and digital governance.', date: '2 weeks ago', source: 'Leadership', icon: UserCheck, color: 'green' },
];

const colorClasses = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  green: { bg: 'bg-green-100', text: 'text-green-700' }
};

export default function SuchanaBoard() {
  const [filter, setFilter] = useState('all');
  const filteredNotices = filter === 'all' ? notices : notices.filter(n => n.type === filter);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-emerald-900 to-teal-800 text-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border border-white/10"
          >
            <span className="flex items-center gap-2"><Newspaper className="w-4 h-4" /> Information & Public Notice Board</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight"
          >
            Suchana <span className="text-emerald-300">Board</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-100 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Official announcements, public notices, tender alerts, and citizen information hub — all in one place.
          </motion.p>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Megaphone, value: '24', label: 'Active Notices' },
            { icon: FileText, value: '156', label: 'Tenders Published' },
            { icon: Calendar, value: '12', label: 'Upcoming Events' },
            { icon: Download, value: '48', label: 'Documents Available' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center hover:-translate-y-1 transition-transform"
            >
              <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 mx-auto mb-3" />
              <p className="text-2xl md:text-4xl font-black text-gray-800 tracking-tight">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORY TABS & MAIN CONTENT */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'all', label: 'All Updates' },
            { id: 'notice', label: 'Public Notices' },
            { id: 'tender', label: 'Tender Alerts' },
            { id: 'event', label: 'Events' },
            { id: 'press', label: 'Press Release' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${filter === cat.id
                ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FEATURED NOTICE */}
        {filter === 'all' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border-l-8 border-emerald-600 shadow-md mb-16"
          >
            <div className="flex justify-between items-start gap-8">
              <div className="flex-1">
                <span className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">URGENT NOTICE</span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-3">Public Hearing: Annual Budget 2082/83</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">Municipal corporation invites all citizens to participate in the public hearing on proposed annual budget. Your feedback matters!</p>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600 font-medium mb-6">
                  <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-emerald-600" /> August 25, 2025</span>
                  <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-emerald-600" /> 10:00 AM - 4:00 PM</span>
                  <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-emerald-600" /> Municipal Hall, Ward 3</span>
                </div>
                <button className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-800 transition flex items-center gap-2 shadow-lg hover:shadow-emerald-700/20">
                  <Download className="w-5 h-5" /> Download Agenda
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* NOTICES GRID */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Newspaper className="text-emerald-600 w-6 h-6" /> Latest Information Updates
          </h2>
          <button className="text-emerald-600 text-sm font-semibold hover:underline">View Archive →</button>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          <AnimatePresence>
            {filteredNotices.map((notice) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={notice.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`${colorClasses[notice.color].bg} ${colorClasses[notice.color].text} text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5`}>
                      <notice.icon className="w-3.5 h-3.5" /> {notice.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{notice.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{notice.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">{notice.desc}</p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                      {notice.views && <><Eye className="w-4 h-4" /> {notice.views} views</>}
                      {notice.budget && <><FileOutput className="w-4 h-4" /> Budget: {notice.budget}</>}
                      {notice.dateInfo && <><Calendar className="w-4 h-4" /> {notice.dateInfo}</>}
                      {notice.source && <><FileText className="w-4 h-4" /> {notice.source}</>}
                    </span>
                    <button className="text-emerald-600 text-sm font-bold hover:text-emerald-800 transition-colors">
                      {notice.type === 'tender' ? 'Apply →' : notice.type === 'event' ? 'RSVP →' : 'Read More →'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* DOCUMENT LIBRARY */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
            <FolderOpen className="text-emerald-600 w-7 h-7" /> Document Library
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Annual Report 2081', size: 'PDF, 2.4 MB', color: 'text-red-500', bg: 'bg-red-50' },
              { name: 'Budget Proposal 2082', size: 'PDF, 3.1 MB', color: 'text-red-500', bg: 'bg-red-50' },
              { name: 'Transparency Dataset', size: 'CSV, 5.8 MB', color: 'text-green-600', bg: 'bg-green-50' },
              { name: 'Procurement Guidelines', size: 'DOCX, 1.2 MB', color: 'text-blue-600', bg: 'bg-blue-50' }
            ].map((doc, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer border border-gray-100 group">
                <div className={`${doc.bg} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <FileText className={`w-8 h-8 ${doc.color}`} />
                </div>
                <span className="text-sm font-bold text-gray-800 block mb-1">{doc.name}</span>
                <p className="text-xs text-gray-500 font-medium">{doc.size}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALERTS SECTION */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
          <div className="relative z-10">
            <Bell className="w-12 h-12 mx-auto mb-6 text-emerald-300" />
            <h2 className="text-3xl font-bold mb-4">Get Suchana Alerts</h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-lg mx-auto">Subscribe to receive instant notifications about new notices, tenders, and announcements.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="px-6 py-4 rounded-xl text-gray-800 flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-medium" />
              <button className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> Subscribe
              </button>
            </div>
            <p className="text-emerald-200/70 text-sm mt-6 font-medium">Free service. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}