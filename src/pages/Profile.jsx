import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase';
import { useLanguage } from '../contexts/LanguageContext';
import './Profile.css';

const Profile = () => {
  const { t } = useLanguage();
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setMessage('');
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError(t('profileFieldRequired'));
      return;
    }

    if (!isValidEmail(formData.email.trim())) {
      setError(t('profileInvalidEmail'));
      return;
    }

    if (formData.password.length < 6) {
      setError(t('profilePasswordMinLength'));
      return;
    }

    if (mode === 'signup') {
      if (!formData.confirmPassword.trim()) {
        setError(t('profileConfirmPasswordRequired'));
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError(t('profilePasswordMismatch'));
        return;
      }
    }

    try {
      setIsSubmitting(true);
      setError('');
      setMessage('');

      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const payload =
        mode === 'login'
          ? {
              email: formData.email.trim(),
              password: formData.password,
            }
          : {
              name: formData.name.trim(),
              email: formData.email.trim(),
              password: formData.password,
            };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || t('profileRequestFailed'));
        return;
      }

      setMessage(data?.message || (mode === 'login' ? t('profileLoginSuccess') : t('profileSignupSuccess')));
    } catch {
      setError(t('profileServerConnectError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setError('');
    setMessage('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured || !auth) {
      setError(t('profileGoogleNotConfigured'));
      return;
    }

    try {
      setIsGoogleLoading(true);
      setError('');
      setMessage('');

      // Clear current auth session so Google always asks account selection.
      await signOut(auth);

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setFormData((prev) => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email,
      }));

      setMessage(t('profileGoogleSuccess'));
    } catch (authError) {
      setError(authError?.message || t('profileGoogleFailed'));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{mode === 'login' ? t('profileLogin') : t('profileSignUp')}</h1>
          <p>{t('profileSubtitle')}</p>
        </div>

        <div className="auth-switch" role="tablist" aria-label="Login and signup switch">
          <button
            type="button"
            className={`auth-switch-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => handleModeChange('login')}
          >
            {t('profileLogin')}
          </button>
          <button
            type="button"
            className={`auth-switch-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => handleModeChange('signup')}
          >
            {t('profileSignUp')}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="auth-name" className="sr-only">{t('profileName')}</label>
          <input
            id="auth-name"
            type="text"
            name="name"
            placeholder={t('profileName')}
            value={formData.name}
            onChange={handleInputChange}
            className="auth-input"
            required
          />

          <label htmlFor="auth-email" className="sr-only">{t('profileEmail')}</label>
          <input
            id="auth-email"
            type="email"
            name="email"
            placeholder={t('profileEmail')}
            value={formData.email}
            onChange={handleInputChange}
            className="auth-input"
            required
          />

          <div className="auth-password-wrap">
            <label htmlFor="auth-password" className="sr-only">{t('profilePassword')}</label>
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={mode === 'login' ? t('profilePassword') : t('profilePassword')}
              value={formData.password}
              onChange={handleInputChange}
              className="auth-input"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {mode === 'signup' && (
            <div className="auth-password-wrap">
              <label htmlFor="auth-confirm-password" className="sr-only">{t('profileConfirmPassword')}</label>
              <input
                id="auth-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder={t('profileConfirmPassword')}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="auth-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? t('profilePleaseWait') : mode === 'login' ? t('profileLoginBtn') : t('profileSignUpBtn')}
          </button>
        </form>

        {error && <p className="auth-feedback auth-error">{error}</p>}
        {message && <p className="auth-feedback auth-success">{message}</p>}

        <p className="auth-inline-text">
          {mode === 'login' ? t('profileSwitchToSignUp') : t('profileSwitchToLogin')}
        </p>

        <div className="auth-divider"><span>{t('profileOr')}</span></div>

        <div className="auth-socials">
          <button
            type="button"
            className="social-btn social-google"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google"
              className="social-google-logo"
            />
            {isGoogleLoading ? t('profileOpeningGoogle') : t('profileLoginWithGoogle')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
