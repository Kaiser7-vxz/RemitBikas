import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, PieChart, Coins, HardHat, TrendingUp, Users, ArrowRight, FileText, Landmark, Repeat, CheckCircle } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="bg-emerald-50 p-3 rounded-xl">
        <Icon className="w-8 h-8 text-emerald-600" />
      </div>
      <span className="text-3xl font-black text-gray-800">{value}</span>
    </div>
    <h3 className="font-bold text-gray-700">{title}</h3>
    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
  </motion.div>
);

const ProjectCard = ({ title, status, desc, budget, date, progress }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all group"
  >
    <div className="h-40 bg-gradient-to-br from-emerald-800 to-teal-700 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
      <Building2 className="w-16 h-16 text-white/80" />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">{status}</span>
      </div>
      <p className="text-gray-500 text-sm mb-5 leading-relaxed">{desc}</p>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-emerald-700 flex items-center gap-1"><Coins className="w-4 h-4" /> ₨ {budget}</span>
          <span className="text-gray-500 flex items-center gap-1"><FileText className="w-4 h-4" /> {date}</span>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500 font-medium">Progress</span>
            <span className="text-emerald-700 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-emerald-600 h-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-full blur-3xl -mr-96 -mt-96 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-teal-50/50 to-transparent rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-100">
                <TrendingUp className="w-4 h-4" /> Municipal Transparency Hub
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900 tracking-tight">
                Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Remittance</span><br className="hidden md:block" /> for Growth
              </h1>
              <p className="text-gray-500 text-lg md:text-xl mt-6 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                RemitBikas brings full transparency to public construction, government expenditures, and local works. Track every rupee, monitor progress, and build accountable governance.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/projects" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-emerald-600/20 transition-all font-semibold flex items-center justify-center gap-2 text-lg group">
                  Explore Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/transparency" className="bg-white border-2 border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 px-8 py-4 rounded-2xl transition-all font-semibold flex items-center justify-center gap-2 text-lg">
                  <PieChart className="w-5 h-5" /> Remittance Report
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 flex justify-center w-full"
            >
              <div className="relative w-full max-w-lg aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-[3rem] rotate-3 scale-105" />
                <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 p-8 flex flex-col">
                   <div className="flex justify-between items-center mb-8 border-b pb-4">
                     <div>
                       <p className="text-sm text-gray-500 font-medium">Total Co-Investment</p>
                       <p className="text-3xl font-black text-gray-900">₨ 24.8M</p>
                     </div>
                     <div className="bg-emerald-100 text-emerald-700 p-3 rounded-2xl">
                       <TrendingUp className="w-6 h-6" />
                     </div>
                   </div>
                   
                   <div className="flex-1 space-y-4">
                     {[1, 2, 3].map((i) => (
                       <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                         <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 text-emerald-600">
                           <Building2 className="w-6 h-6" />
                         </div>
                         <div className="flex-1">
                           <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                           <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
                             <div className="h-full bg-emerald-500 rounded" style={{ width: `${30 + (i * 13) % 40}%` }} />
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gray-50 py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Coins} title="Remittance Inflow" value="₨ 24.8M" subtitle="Last 6 months · +12.3%" />
            <StatCard icon={HardHat} title="Active Projects" value="47" subtitle="Constructions & Infra" />
            <StatCard icon={TrendingUp} title="Budget Utilized" value="92%" subtitle="FY 2080/81" />
            <StatCard icon={Users} title="Citizen Reports" value="15K+" subtitle="Feedback & Transparency" />
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Public Construction <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Projects</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg"
            >
              Real-time updates, budget tracking, and progress reports of municipal infrastructure works directly verifiable by the diaspora.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="Sundarijal Flyover"
              status="75% Complete"
              desc="Modern bridge connecting Ward 4 & 5, expected to reduce local market traffic by 40%."
              budget="12.2M"
              date="Est. Nov 2025"
              progress={75}
            />
            <ProjectCard 
              title="Janak Secondary School"
              status="Active Phase 2"
              desc="Reconstruction of 15 classrooms & smart classroom facility funded by diaspora."
              budget="8.5M"
              date="Mar 2026"
              progress={40}
            />
            <ProjectCard 
              title="Drinking Water Scheme"
              status="Planning"
              desc="Piped water supply for 2,500 households, under remittance co-fund milestone release."
              budget="22.3M"
              date="Dec 2025"
              progress={15}
            />
          </div>
          
          <div className="text-center mt-12">
            <Link to="/projects" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
              View all verified projects <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SUCHANA BOARD PREVIEW SECTION */}
      <section className="py-24 bg-gradient-to-br from-emerald-950 to-teal-900 text-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <Repeat className="w-4 h-4" /> Live Updates
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Stay Informed with the <span className="text-emerald-300">Suchana Board</span>
              </h2>
              <p className="text-emerald-100/70 text-lg leading-relaxed mb-8 max-w-lg">
                The official digital notice board for your municipality. Get instant access to public notices, tender alerts, press releases, and civic events — all in one place.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { val: '24', label: 'Active Notices' },
                  { val: '156', label: 'Tenders Published' },
                  { val: '12', label: 'Upcoming Events' },
                  { val: '48', label: 'Documents' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="text-3xl font-extrabold text-emerald-300">{s.val}</p>
                    <p className="text-emerald-100/60 text-sm font-medium mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link to="/suchana" className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg group">
                Open Suchana Board <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right: Notice Cards Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 space-y-4"
            >
              {[
                { tag: 'Urgent Notice', tagColor: 'bg-red-500', title: 'Public Hearing: Annual Budget 2082/83', desc: 'Citizens invited to give feedback on the proposed municipal budget.', time: '2 days ago' },
                { tag: 'Tender Alert', tagColor: 'bg-amber-500', title: 'Smart Classroom Equipment Supply', desc: 'Sealed bids invited for 15 schools. Deadline: Sep 15, 2025.', time: '5 days ago' },
                { tag: 'Press Release', tagColor: 'bg-blue-500', title: 'Remittance Inflow Reaches All-Time High', desc: 'Q2 remittance crosses ₨ 56.2M — 14.2% year-on-year growth.', time: '3 days ago' },
                { tag: 'Event', tagColor: 'bg-purple-500', title: 'Digital Literacy Workshop for Seniors', desc: 'Free 3-day workshop. Aug 28-30 at Municipal Hall.', time: '1 week ago' },
              ].map((notice, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`${notice.tagColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{notice.tag}</span>
                        <span className="text-emerald-300/60 text-xs">{notice.time}</span>
                      </div>
                      <h4 className="font-bold text-base text-white mb-1">{notice.title}</h4>
                      <p className="text-emerald-100/60 text-sm leading-relaxed">{notice.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-emerald-400/40 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-10 md:p-12 shadow-xl border border-gray-100"
            >
              <div className="bg-emerald-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <Landmark className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Government Works Monitoring</h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Every tender, procurement, and public work order is documented on RemitBikas. Real-time budget allocation, contract details, and completion reports accessible to citizens.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle className="w-6 h-6 text-emerald-500" /> 158 works completed this fiscal year
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle className="w-6 h-6 text-emerald-500" /> Open contract bids & vendor transparency
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle className="w-6 h-6 text-emerald-500" /> Audit reports & third-party evaluations
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-[3rem] p-10 md:p-12 shadow-xl text-white overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              
              <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                <Repeat className="w-10 h-10 text-emerald-300" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Remittance & Local Development</h3>
              <p className="text-emerald-100 text-lg leading-relaxed mb-10">
                Remittance flows drive the local economy. Track how diaspora contributions are channeled into infrastructure, health, and education projects.
              </p>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-emerald-200 text-sm">Direct Project Alloc.</span>
                    <p className="text-3xl font-bold">₨ 58.4M</p>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-200 text-sm">Community Invest</span>
                    <p className="text-xl font-bold text-emerald-300">34% ↑</p>
                  </div>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
