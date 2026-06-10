import { motion } from 'framer-motion';
import {
  HandHeart, Target, Zap, ShieldCheck, Globe, ArrowRight, CheckCircle,
  Users, Banknote, TrendingUp, Eye, BarChart3, Building2, Leaf,
  Mail, Phone, MapPin, Send, ChevronRight, AlertTriangle, Lightbulb,
  Star, Award
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});

export default function About() {
  return (
    <div className="bg-white">

      {/* ========== HERO ========== */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-6 py-24 md:py-36 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full text-sm font-semibold mb-8 text-emerald-200">
              <HandHeart className="w-4 h-4" /> Nepal's Digital Remittance Platform
            </motion.div>
            <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-8">
              Building Nepal's
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                Future Together
              </span>
            </motion.h1>
            <motion.p {...fadeUp(0.2)} className="text-xl text-emerald-100/80 max-w-3xl mx-auto leading-relaxed mb-12">
              RemitBikas is a digital public infrastructure platform that channels Nepal's $9 billion annual remittance inflow into transparent, milestone-based local infrastructure projects — bridging the gap between diaspora trust and community development.
            </motion.p>
            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 group">
                Get In Touch <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#how-it-works" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                How It Works <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Stat strip */}
          <motion.div {...fadeUp(0.4)} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-12">
            {[
              { val: '$9B', label: 'Annual Remittance to Nepal' },
              { val: '70+', label: 'Local Municipalities Served' },
              { val: '₨ 146M', label: 'Funds Channeled to Projects' },
              { val: '98.4%', label: 'Transparency Score' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-extrabold text-emerald-300">{s.val}</p>
                <p className="text-emerald-100/70 text-sm font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== OUR MISSION ========== */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div {...fadeUp(0)}>
              <span className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-4 block">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Turning Remittances into
                <span className="text-emerald-600"> Real Impact</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We believe that every rupee sent home by a Nepali abroad should have the power to build schools, roads, and hospitals — not just cover daily expenses. Our mission is to create a trust-by-design ecosystem where diaspora contributions are transparently and directly invested in verifiable infrastructure milestones.
              </p>
              <ul className="space-y-4">
                {[
                  'Eliminate corruption through smart milestone escrow',
                  'Enable diaspora to track every rupee in real time',
                  'Build bridges between overseas Nepalis and local governance',
                  'Make public finance transparent and citizen-led',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="space-y-6">
              {[
                { icon: Target, title: 'Targeted Investment', desc: 'Funds flow directly to verified project phases, not general government budgets.', color: 'bg-emerald-50 text-emerald-700' },
                { icon: Eye, title: 'Full Transparency', desc: 'Every transaction, contract, and audit report is publicly accessible on our platform.', color: 'bg-teal-50 text-teal-700' },
                { icon: ShieldCheck, title: 'Accountability First', desc: 'AI-verified milestone completion before any funds are released from escrow.', color: 'bg-blue-50 text-blue-700' },
                { icon: Leaf, title: 'Sustainable Growth', desc: 'Long-term community development over short-term household consumption.', color: 'bg-green-50 text-green-700' },
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-5 hover:shadow-md transition-shadow">
                  <div className={`${card.color} p-3 rounded-xl h-fit`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{card.title}</h4>
                    <p className="text-gray-500 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== PROBLEM WE SOLVE ========== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span {...fadeUp(0)} className="text-red-500 text-sm font-bold uppercase tracking-widest mb-4 block">The Problem We Solve</motion.span>
            <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Why Remittances Fail Communities</motion.h2>
            <motion.p {...fadeUp(0.2)} className="text-gray-600 text-lg">Nepal receives billions annually, yet local infrastructure remains underfunded. Here's why.</motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: AlertTriangle, color: 'bg-red-50 text-red-600', title: 'Lack of Transparency', desc: 'Most of the remittance money flowing to Nepal goes to household consumption with no oversight into how government project funds are actually spent.', stat: '72%', statLabel: 'spent on consumption' },
              { icon: Building2, color: 'bg-orange-50 text-orange-600', title: 'Weak Infrastructure', desc: 'Local municipalities suffer from chronic underfunding, project delays, cost overruns, and paper-based reporting that leaves no digital audit trail.', stat: '60%', statLabel: 'projects face delays' },
              { icon: Globe, color: 'bg-amber-50 text-amber-600', title: 'Diaspora Distrust', desc: 'Overseas Nepalis want to invest in their homeland but are discouraged by lack of accountability, no visibility into fund use, and zero return on civic investment.', stat: '$9B', statLabel: 'untapped potential' },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.15)} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6">{item.desc}</p>
                <div className="border-t border-gray-100 pt-4">
                  <span className="text-3xl font-extrabold text-gray-900">{item.stat}</span>
                  <span className="text-sm text-gray-400 font-medium ml-2">{item.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-emerald-950 to-teal-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMCBoNjAgdjYwIEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span {...fadeUp(0)} className="text-emerald-300 text-sm font-bold uppercase tracking-widest mb-4 block">How It Works</motion.span>
            <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-extrabold mb-6">A Simple, Transparent Process</motion.h2>
            <motion.p {...fadeUp(0.2)} className="text-emerald-100/70 text-lg">From remittance transfer to completed infrastructure — tracked every step of the way.</motion.p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 bg-emerald-700" />
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: '01', icon: Banknote, title: 'Diaspora Invests', desc: 'Overseas Nepalis send remittances or buy municipal bonds through our secure co-investment portal.' },
                  { step: '02', icon: ShieldCheck, title: 'Funds Go to Escrow', desc: 'Money is held in a smart milestone-linked escrow — no release until progress is independently verified.' },
                  { step: '03', icon: BarChart3, title: 'AI Verifies Progress', desc: 'Our AI assistant validates milestone completion using site reports, images, and official contractor data.' },
                  { step: '04', icon: CheckCircle, title: 'Funds Released', desc: 'Once a milestone is verified, the corresponding tranche is released directly to the contractor.' },
                ].map((step, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.15)} className="relative flex flex-col items-center text-center">
                    <div className="bg-emerald-700 border-4 border-emerald-900 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-xl z-10 relative">
                      <step.icon className="w-8 h-8 text-emerald-300" />
                    </div>
                    <span className="text-xs text-emerald-400 font-black tracking-widest mb-2">STEP {step.step}</span>
                    <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                    <p className="text-emerald-100/60 text-sm leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span {...fadeUp(0)} className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-4 block">Platform Features</motion.span>
            <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Everything You Need to Invest Confidently</motion.h2>
            <motion.p {...fadeUp(0.2)} className="text-gray-600 text-lg">Purpose-built tools for both overseas investors and local governance bodies.</motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Lightbulb, title: 'Co-Investment Portal', desc: 'A digital marketplace where diaspora can browse and invest in specific local projects with full transparency.', tag: 'Investing' },
              { icon: ShieldCheck, title: 'Milestone Escrow', desc: 'Smart contract-style fund release tied to verified construction or service delivery milestones.', tag: 'Security' },
              { icon: Eye, title: 'Transparency Dashboard', desc: 'Real-time tracking of every rupee — from inflow to expenditure — with public audit reports.', tag: 'Transparency' },
              { icon: BarChart3, title: 'Suchana Board', desc: 'Official digital notice board for tenders, public hearings, press releases, and civic announcements.', tag: 'Governance' },
              { icon: TrendingUp, title: 'Municipal Bonds', desc: 'Invest in government-backed municipal bonds and earn competitive returns while developing infrastructure.', tag: 'Finance' },
              { icon: Zap, title: 'AI Oversight', desc: 'AI-assisted verification of project progress using field reports, photos, and contractor submissions.', tag: 'AI' },
            ].map((feature, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                  <feature.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 block">{feature.tag}</span>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== OUR PARTNERS ========== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span {...fadeUp(0)} className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-4 block">Our Partners</motion.span>
            <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Backed by Trusted Institutions</motion.h2>
            <motion.p {...fadeUp(0.2)} className="text-gray-600 text-lg">We work alongside government bodies, financial institutions, and civil society organizations to build this ecosystem.</motion.p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
              {[
                { name: 'Nepal Rastra Bank', role: 'Regulatory Partner', icon: Building2, color: 'bg-red-50 border-red-100 text-red-700' },
                { name: 'Ministry of Finance', role: 'Government Partner', icon: ShieldCheck, color: 'bg-blue-50 border-blue-100 text-blue-700' },
                { name: 'Local Municipalities', role: 'Implementation Bodies', icon: MapPin, color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
                { name: 'Himalayan Bank', role: 'Financial Partner', icon: Banknote, color: 'bg-purple-50 border-purple-100 text-purple-700' },
                { name: 'NRN Association', role: 'Diaspora Network', icon: Globe, color: 'bg-teal-50 border-teal-100 text-teal-700' },
                { name: 'UNDP Nepal', role: 'Development Partner', icon: Users, color: 'bg-amber-50 border-amber-100 text-amber-700' },
              ].map((partner, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className={`${partner.color} rounded-2xl p-6 border flex flex-col items-center text-center hover:shadow-md transition-shadow`}>
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <partner.icon className="w-7 h-7 text-gray-700" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{partner.name}</h4>
                  <p className="text-xs font-medium text-gray-500">{partner.role}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.3)} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 text-center border border-emerald-100">
              <Award className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interested in Partnering?</h3>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">Whether you're a financial institution, civil society org, or local government — we'd love to explore how we can collaborate to transform Nepal's development landscape.</p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-emerald-700 text-white px-7 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-colors shadow-md">
                Become a Partner <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== TEAM / VALUES ========== */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span {...fadeUp(0)} className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-4 block">Our Values</motion.span>
            <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Built on Principled Foundations</motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Star, title: 'Trust First', desc: 'Every feature, every policy, every decision is designed to maximise the trust of both investors and citizens.', color: 'from-emerald-700 to-teal-700' },
              { icon: Globe, title: 'Community Driven', desc: 'We are for Nepal, by Nepalis. Decisions are participatory, and our data is always open to citizens.', color: 'from-teal-700 to-cyan-700' },
              { icon: Zap, title: 'Innovation at Scale', desc: 'We use technology — AI, smart contracts, real-time data — to solve centuries-old governance problems.', color: 'from-emerald-800 to-emerald-600' },
            ].map((val, i) => (
              <motion.div key={i} {...fadeUp(i * 0.15)} className={`bg-gradient-to-br ${val.color} text-white rounded-3xl p-8 shadow-lg`}>
                <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <val.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-2xl mb-3">{val.title}</h3>
                <p className="text-white/80 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            {/* Left: Info */}
            <motion.div {...fadeUp(0)}>
              <span className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-4 block">Contact Us</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Let's Build Nepal's <span className="text-emerald-600">Future Together</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Whether you have questions about our platform, want to explore partnerships, or just want to learn more — we'd love to hear from you.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', val: 'hello@remitbikas.gov.np', color: 'bg-emerald-50 text-emerald-700' },
                  { icon: Phone, label: 'Phone', val: '+977-01-4xxxxxx', color: 'bg-teal-50 text-teal-700' },
                  { icon: MapPin, label: 'Office', val: 'Singha Durbar, Kathmandu, Nepal', color: 'bg-blue-50 text-blue-700' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className={`${c.color} p-4 rounded-2xl`}>
                      <c.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">{c.label}</p>
                      <p className="text-gray-800 font-semibold">{c.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div {...fadeUp(0.2)} className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-2xl text-gray-900 mb-8">Send a Message</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">First Name</label>
                    <input type="text" placeholder="Ramesh" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow font-medium placeholder-gray-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Last Name</label>
                    <input type="text" placeholder="Sharma" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow font-medium placeholder-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" placeholder="you@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow font-medium placeholder-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Subject</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow font-medium">
                    <option value="">Select a topic</option>
                    <option value="invest">I want to invest</option>
                    <option value="partnership">Partnership inquiry</option>
                    <option value="government">Government / Municipality</option>
                    <option value="media">Media inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Message</label>
                  <textarea rows={5} placeholder="Tell us more about your inquiry..." className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow font-medium placeholder-gray-400 resize-none" />
                </div>
                <button type="submit" className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold hover:bg-emerald-800 transition-colors shadow-md flex items-center justify-center gap-2 group">
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
