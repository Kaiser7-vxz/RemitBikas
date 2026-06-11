import { useState, useEffect } from 'react';
import { HandHeart, UserCircle, Home, Building2, TrendingUp, PieChart, Newspaper, Info, UserPlus, LogOut, MessageSquare } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function readStoredUser() {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return null;
  }
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Re-read auth state on route changes (e.g. after login/logout redirect).
  void location.pathname;
  const user = readStoredUser();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: Building2 },
    { name: 'Invest', path: '/invest', icon: TrendingUp },
    { name: 'Transparency', path: '/transparency', icon: PieChart },
    { name: 'Suchana Board', path: '/suchana', icon: Newspaper },
    { name: 'Community', path: '/community', icon: MessageSquare },
    { name: 'About Us', path: '/about', icon: Info },
  ];

  return (
    <>
      {/* ========== DESKTOP NAVIGATION ========== */}
      <div className={`hidden md:block w-full sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100 py-3' : 'bg-white py-4'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 lg:space-x-3 group">
              <div className="bg-emerald-50 p-2 rounded-xl group-hover:bg-emerald-100 transition-colors">
                <HandHeart className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-700" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-gray-800 tracking-tight">Remit<span className="text-emerald-600">Bikas</span></span>
            </Link>
            
            <div className="flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={`px-3 py-2 rounded-lg text-sm lg:text-base font-medium transition-all ${isActive ? 'text-emerald-700 bg-emerald-50' : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                <Link
                  to={['ADMIN', 'MUNICIPAL_OFFICER'].includes(user.role) ? '/admin/dashboard' : '/user/dashboard'}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5">
                <UserCircle className="w-5 h-5" />
                <span>Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ========== MOBILE BOTTOM NAVIGATION ========== */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 pb-safe">
        <div className="flex justify-around items-center py-2 px-1 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`flex flex-col items-center p-2 rounded-2xl transition-all min-w-[64px] flex-shrink-0 ${isActive ? 'bg-emerald-50' : ''}`}
              >
                <link.icon className={`w-5 h-5 mb-1 ${isActive ? 'text-emerald-700' : 'text-gray-500'}`} />
                <span className={`text-[10px] sm:text-xs font-medium ${isActive ? 'text-emerald-700' : 'text-gray-500'}`}>
                  {link.name.split(' ')[0]}
                </span>
              </Link>
            );
          })}
          <Link to="/login" className="flex flex-col items-center p-2 rounded-2xl transition-all min-w-[64px] flex-shrink-0">
            <UserPlus className="w-5 h-5 mb-1 text-gray-500" />
            <span className="text-[10px] sm:text-xs font-medium text-gray-500">Login</span>
          </Link>
        </div>
      </div>
    </>
  );
}
