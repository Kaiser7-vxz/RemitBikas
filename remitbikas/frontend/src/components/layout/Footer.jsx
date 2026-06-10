import { Building2, Globe, MessageCircle, Hash, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-24 md:pb-12 mt-20 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-emerald-900/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-900/20 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="w-8 h-8 text-emerald-500" />
              <span className="font-bold text-2xl text-white">
                Remit<span className="text-emerald-500">Bikas</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transforming remittances into transparent community investments. Building a trust-by-design infrastructure for Nepal's future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Hash className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm">Co-Investment Portal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm">Escrow System (Kista)</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm">Digital Suchana Board</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm">Transparency Reports</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm">How it Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm">AI Verification Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm">Municipality Partners</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">contact@remitbikas.gov.np</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Built for transparent governance</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} RemitBikas. All public works & remittance data transparent.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
