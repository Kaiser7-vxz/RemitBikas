import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

import ProjectDetails from './pages/ProjectDetails';
import InvestPortal from './pages/InvestPortal';
import InvestCheckout from './pages/InvestCheckout';
import TransparencyDashboard from './pages/TransparencyDashboard';
import SuchanaBoard from './pages/SuchanaBoard';
import Login from './pages/Login';
import CoInvestmentPortal from './pages/CoInvestmentPortal';
import About from './pages/About';
import CommunityHub from './pages/CommunityHub';
import UserDashboard from './pages/UserDashboard';
import AIBotWidget from './components/AIBotWidget';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import CitizensManagement from './pages/admin/CitizensManagement';
import InvestmentsManagement from './pages/admin/InvestmentsManagement';
import TransparencyManagement from './pages/admin/TransparencyManagement';
import AnalyticsManagement from './pages/admin/AnalyticsManagement';
import SettingsManagement from './pages/admin/SettingsManagement';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans antialiased relative">
      {!isAdminRoute && <Navbar />}

      <main className={`flex-grow ${isAdminRoute ? 'h-screen' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectDetails />} />
          <Route path="/invest" element={<InvestPortal />} />
          <Route path="/invest/:id" element={<InvestCheckout />} />
          <Route path="/investCheckout/:id" element={<InvestCheckout />} />
          <Route path="/transparency" element={<TransparencyDashboard />} />
          <Route path="/suchana" element={<SuchanaBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/community" element={<CommunityHub />} />
          <Route path="/about" element={<About />} />
          <Route path="/cofunding" element={<CoInvestmentPortal />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN', 'MUNICIPAL_OFFICER']} />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="projects" element={<ProjectsManagement />} />
              <Route path="citizens" element={<CitizensManagement />} />
              <Route path="investments" element={<InvestmentsManagement />} />
              <Route path="transparency" element={<TransparencyManagement />} />
              <Route path="analytics" element={<AnalyticsManagement />} />
              <Route path="settings" element={<SettingsManagement />} />
            </Route>
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AIBotWidget />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
