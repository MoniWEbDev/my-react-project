import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import logoImg from '../assets/kachra-logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <Link to="/" className="nav-brand" onClick={closeMenu}>
        <img src={logoImg} alt="KachraBeche Logo" style={{ height: '125px', objectFit: 'contain' }} />
      </Link>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            {t('home')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            {t('about')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/income-source" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            {t('incomeSource')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/gift" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            {t('gift')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/skill" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            {t('skill')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            {t('contact')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            {t('profile')}
          </NavLink>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
          <select 
            className="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ 
              border: '2px solid var(--primary)', 
              borderRadius: '20px', 
              padding: '6px 12px', 
              background: 'var(--bg-light)',
              color: 'var(--text-dark)',
              fontFamily: 'inherit',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              outline: 'none',
              transition: 'var(--transition)'
            }}
          >
            <option value="en">English (EN)</option>
            <option value="hi">हिंदी (HI)</option>
            <option value="mr">मराठी (MR)</option>
            <option value="ur">اردو (UR)</option>
            <option value="bn">বাংলা (BN)</option>
          </select>
        </li>
      </ul>

      <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </header>
  );
};

export default Navbar;
