import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

import ProjectDetails from './pages/ProjectDetails';
import CoInvestmentPortal from './pages/CoInvestmentPortal';
import TransparencyDashboard from './pages/TransparencyDashboard';
import SuchanaBoard from './pages/SuchanaBoard';
import Login from './pages/Login';
import About from './pages/About';
import AIBotWidget from './components/AIBotWidget';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans antialiased relative">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectDetails />} />
            <Route path="/invest" element={<CoInvestmentPortal />} />
            <Route path="/transparency" element={<TransparencyDashboard />} />
            <Route path="/suchana" element={<SuchanaBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer />
        <AIBotWidget />
      </div>
    </Router>
  );
}

export default App;
