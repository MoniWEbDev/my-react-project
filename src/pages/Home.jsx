import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, LogIn, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import bannerBg from '../assets/recycling_banner.png'; // Assuming I move it to assets
import './Home.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useLanguage();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin123') {
      setShowSuccess(true);
      setUsername('');
      setPassword('');
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } else {
      setError(t('errInvalidLogin'));
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login is not configured yet. This is a UI demo.");
  };

  return (
    <div className="home-container">
      <div className="home-page">

        {/* ── SUCCESS POPUP ── */}
        {showSuccess && (
          <div className="success-overlay" onClick={() => setShowSuccess(false)}>
            <div className="success-modal" onClick={e => e.stopPropagation()}>
              <CheckCircle size={60} color="#48bb78" className="success-icon" />
              <h3>{t('congratsMessage')}</h3>
              <p>{t('congratsSubtitle')}</p>
              <button className="success-close" onClick={() => setShowSuccess(false)}>
                OK
              </button>
            </div>
          </div>
        )}

        {/* ── LEFT: Welcome Info ── */}
        <div className="home-left">
          <h1 className="welcome-heading">
            {t('welcomeTitle')} &nbsp;<span>{t('brandName')}</span>
          </h1>

          <p className="welcome-text">
            {t('description1')}
          </p>

          <p className="welcome-text">
            {t('description2')}
          </p>

          <div className="home-stats">
            <div className="stat-box">
              <h3>10L+</h3>
              <p>{t('statUsers')}</p>
            </div>
            <div className="stat-box">
              <h3>500+</h3>
              <p>{t('statCities')}</p>
            </div>
            <div className="stat-box">
              <h3>₹50Cr+</h3>
              <p>{t('statPaid')}</p>
            </div>
            <div className="stat-box">
              <h3>99%</h3>
              <p>{t('statHappy')}</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Login ── */}
        <div className="home-right">
          <div className="login-card">
            <h2>{t('loginTitle')}</h2>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username">{t('usernameLabel')}</label>
                <input
                  id="username"
                  type="text"
                  placeholder={t('usernameLabel')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">{t('passwordLabel')}</label>
                <input
                  id="password"
                  type="password"
                  placeholder={t('passwordLabel')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="login-error-msg">{error}</p>}
              
              <p className="form-note">{t('caseSensitiveNote')}</p>

              <button type="submit" className="btn-login">
                <LogIn size={18} style={{ marginRight: '8px' }} />
                {t('loginBtn')}
              </button>
            </form>

            <div className="social-login-container">
              <div className="divider-text">
                <span>OR</span>
              </div>
              
              <button onClick={handleGoogleLogin} className="btn-google">
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  className="google-icon"
                />
                {t('loginGoogle')}
              </button>
            </div>

            <hr className="login-divider" />

            <div className="login-footer">
              <Link to="/profile">{t('forgotLink')}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── NEW BANNER SECTION ── */}
      <section className="home-banner-section">
        <div className="banner-card" style={{ backgroundImage: `url(${bannerBg})` }}>
          <div className="banner-content-wrapper">
            <div className="banner-right-content">
              <h2 className="banner-slogan">
                Recycle Smartly,<br/>
                Live Green.<br/>
                <span>Sell Your Scrap Online!</span>
              </h2>
            </div>

            <div className="yellow-info-box">
              <div className="info-icon-wrapper">
                <Leaf size={28} color="#1a202c" />
              </div>
              <h2 className="banner-title">{t('bannerTitle')}</h2>
              <p className="banner-text">{t('bannerDesc')}</p>
              <button className="btn-banner-action">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
