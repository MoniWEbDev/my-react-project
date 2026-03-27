import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import IncomeSource from './pages/IncomeSource';
import Gift from './pages/Gift';
import Skill from './pages/Skill';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import CategoryDetail from './pages/CategoryDetail';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="page-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/category/:categoryName" element={<CategoryDetail />} />
              <Route path="/income-source" element={<IncomeSource />} />
              <Route path="/gift" element={<Gift />} />
              <Route path="/skill" element={<Skill />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
