import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Recycle,
  Settings,
  Sun,
  User,
  X,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const profileMenuRef = useRef(null);

  const navbarCopyByLanguage = {
    en: {
      login: 'Login',
      notifications: 'Notifications',
      messages: 'Messages',
      userAvatar: 'User avatar',
      admin: 'Admin',
      user: 'User',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      toggleMenu: 'Toggle menu',
      closeMenu: 'Close menu',
    },
    hi: {
      login: 'लॉगिन',
      notifications: 'सूचनाएं',
      messages: 'संदेश',
      userAvatar: 'यूज़र अवतार',
      admin: 'एडमिन',
      user: 'यूज़र',
      profile: 'प्रोफ़ाइल',
      settings: 'सेटिंग्स',
      logout: 'लॉगआउट',
      toggleMenu: 'मेन्यू बदलें',
      closeMenu: 'मेन्यू बंद करें',
    },
    mr: {
      login: 'लॉगिन',
      notifications: 'सूचना',
      messages: 'संदेश',
      userAvatar: 'वापरकर्ता अवतार',
      admin: 'अॅडमिन',
      user: 'वापरकर्ता',
      profile: 'प्रोफाइल',
      settings: 'सेटिंग्ज',
      logout: 'लॉगआउट',
      toggleMenu: 'मेनू बदला',
      closeMenu: 'मेनू बंद करा',
    },
    ur: {
      login: 'لاگ ان',
      notifications: 'اطلاعات',
      messages: 'پیغامات',
      userAvatar: 'صارف اوتار',
      admin: 'ایڈمن',
      user: 'صارف',
      profile: 'پروفائل',
      settings: 'سیٹنگز',
      logout: 'لاگ آؤٹ',
      toggleMenu: 'مینو بدلیں',
      closeMenu: 'مینو بند کریں',
    },
    bn: {
      login: 'লগইন',
      notifications: 'নোটিফিকেশন',
      messages: 'বার্তা',
      userAvatar: 'ইউজার অবতার',
      admin: 'অ্যাডমিন',
      user: 'ইউজার',
      profile: 'প্রোফাইল',
      settings: 'সেটিংস',
      logout: 'লগআউট',
      toggleMenu: 'মেনু টগল করুন',
      closeMenu: 'মেনু বন্ধ করুন',
    },
  };
  const navCopy = navbarCopyByLanguage[language] || navbarCopyByLanguage.en;

  const getLabel = (key, fallbackText) => {
    const translated = t(key);
    return translated === key ? fallbackText : translated;
  };

  const navItems = useMemo(
    () => [
      { to: '/', label: t('home') },
      { to: '/about', label: t('about') },
      { to: '/income-source', label: t('yourContribution') },
      { to: '/gift', label: t('incentives') },
      { to: '/skill', label: t('learningHub') },
      { to: '/upload-talent', label: getLabel('uploadYourTalent', 'Upload Your Talent') },
      { to: '/talent-gallery', label: getLabel('talentGallery', 'Talent Gallery') },
      { to: '/contact', label: t('contact') },
      { to: '/profile', label: user ? t('profile') : navCopy.login },
    ],
    [language, user]
  );

  const brandByLanguage = {
    en: 'KachraBeche',
    hi: 'कचरा बेचें',
    mr: 'कचरा विक्री',
    ur: 'کچرا بیچیں',
    bn: 'আবর্জনা বেচুন',
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <span className="nav-brand-icon" aria-hidden="true">
            <Recycle size={18} />
          </span>
          <span className="nav-brand-text">{brandByLanguage[language] || brandByLanguage.en}</span>
        </Link>
      </div>

      <nav className={`nav-center ${isMenuOpen ? 'active' : ''}`} aria-label="Main navigation">
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-mobile-controls">
          <button type="button" className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            {theme === 'light' ? t('darkMode') : t('lightMode')}
          </button>

          <select className="lang-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English (EN)</option>
            <option value="hi">हिंदी (HI)</option>
            <option value="mr">मराठी (MR)</option>
            <option value="ur">اردو (UR)</option>
            <option value="bn">বাংলা (BN)</option>
          </select>
        </div>
      </nav>

      <div className="nav-right">
        <button
          type="button"
          className="theme-toggle-btn nav-desktop-control"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? `Switch to ${t('darkMode')} mode` : `Switch to ${t('lightMode')} mode`}
          title={theme === 'light' ? `Switch to ${t('darkMode')} mode` : `Switch to ${t('lightMode')} mode`}
        >
          {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          {theme === 'light' ? t('darkMode') : t('lightMode')}
        </button>

        <select className="lang-select nav-desktop-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="mr">MR</option>
          <option value="ur">UR</option>
          <option value="bn">BN</option>
        </select>

        <div className="profile-menu-wrap" ref={profileMenuRef}>
          <button type="button" className="profile-trigger" onClick={toggleProfileMenu} aria-expanded={isProfileMenuOpen}>
            <img
              src="https://i.pravatar.cc/80?img=12"
              alt={navCopy.userAvatar}
              className="profile-avatar"
            />
            <ChevronDown size={14} />
          </button>

          {isProfileMenuOpen ? (
            <div className="profile-dropdown" role="menu">
              <p className="profile-role-chip">{user?.role === 'admin' ? navCopy.admin : navCopy.user}</p>
              <Link to="/profile" className="profile-dropdown-item" onClick={closeMenu}>
                <User size={14} />
                {navCopy.profile}
              </Link>
              <button type="button" className="profile-dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                <Settings size={14} />
                {navCopy.settings}
              </button>
              <button type="button" className="profile-dropdown-item logout" onClick={handleLogout}>
                <LogOut size={14} />
                {navCopy.logout}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <button className="mobile-menu-btn" onClick={toggleMenu} aria-label={navCopy.toggleMenu}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isMenuOpen ? <button type="button" className="nav-backdrop" aria-label={navCopy.closeMenu} onClick={closeMenu} /> : null}
    </header>
  );
};

export default Navbar;
