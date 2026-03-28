import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import IncomeSource from './pages/IncomeSource';
import Gift from './pages/Gift';
import Skill from './pages/Skill';
import UploadTalent from './pages/UploadTalent';
import TalentGallery from './pages/TalentGallery';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import ChatbotWidget from './components/ChatbotWidget';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;

    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="page-container">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/income-source" element={<IncomeSource />} />
                <Route path="/gift" element={<Gift />} />
                <Route path="/skill" element={<Skill />} />
                <Route path="/upload-talent" element={<UploadTalent />} />
                <Route path="/talent-gallery" element={<TalentGallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <ChatbotWidget />
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
