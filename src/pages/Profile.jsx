import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase';
import { useLanguage } from '../contexts/LanguageContext';
import './Profile.css';

const Profile = () => {
  const { language } = useLanguage();
  const COPY = {
    en: {
      login: 'Login',
      signup: 'Signup',
      subtitle: 'Continue to track waste pickups and claim rewards.',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      createPassword: 'Create password',
      confirmPassword: 'Confirm password',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      showConfirmPassword: 'Show confirm password',
      hideConfirmPassword: 'Hide confirm password',
      pleaseWait: 'Please wait...',
      newHere: 'New here? ',
      alreadyAccount: 'Already have an account? ',
      createOne: 'Create one',
      or: 'Or',
      openingGoogle: 'Opening Google...',
      loginGoogle: 'Login with Google',
      requiredFields: 'Please fill all required fields.',
      invalidEmail: 'Please enter a valid email address.',
      shortPassword: 'Password should be at least 6 characters long.',
      confirmRequired: 'Please confirm your password.',
      mismatch: 'Password and confirm password do not match.',
      requestFailed: 'Request failed. Please try again.',
      loginSuccess: 'Login successful.',
      signupSuccess: 'Signup successful.',
      connectError: 'Could not connect to server. Please make sure backend is running.',
      googleNotConfigured: 'Google login is not configured yet. Add Firebase env values first.',
      googleSuccess: 'Google login successful.',
      googleFailed: 'Google login failed. Please try again.',
      switchTabs: 'Login and signup switch',
    },
    hi: {
      login: 'लॉगिन',
      signup: 'साइनअप',
      subtitle: 'वेस्ट पिकअप ट्रैक करें और रिवॉर्ड क्लेम करें।',
      name: 'नाम',
      email: 'ईमेल',
      password: 'पासवर्ड',
      createPassword: 'पासवर्ड बनाएं',
      confirmPassword: 'पासवर्ड पुष्टि करें',
      showPassword: 'पासवर्ड दिखाएं',
      hidePassword: 'पासवर्ड छिपाएं',
      showConfirmPassword: 'पुष्टि पासवर्ड दिखाएं',
      hideConfirmPassword: 'पुष्टि पासवर्ड छिपाएं',
      pleaseWait: 'कृपया प्रतीक्षा करें...',
      newHere: 'नए हैं? ',
      alreadyAccount: 'पहले से अकाउंट है? ',
      createOne: 'नया बनाएं',
      or: 'या',
      openingGoogle: 'Google खुल रहा है...',
      loginGoogle: 'Google से लॉगिन',
      requiredFields: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
      invalidEmail: 'कृपया सही ईमेल पता दर्ज करें।',
      shortPassword: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए।',
      confirmRequired: 'कृपया पासवर्ड पुष्टि करें।',
      mismatch: 'पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।',
      requestFailed: 'अनुरोध विफल। कृपया फिर प्रयास करें।',
      loginSuccess: 'लॉगिन सफल।',
      signupSuccess: 'साइनअप सफल।',
      connectError: 'सर्वर से कनेक्ट नहीं हो सका। कृपया बैकएंड चल रहा है या नहीं जांचें।',
      googleNotConfigured: 'Google लॉगिन अभी कॉन्फ़िगर नहीं है।',
      googleSuccess: 'Google लॉगिन सफल।',
      googleFailed: 'Google लॉगिन विफल। कृपया फिर प्रयास करें।',
      switchTabs: 'लॉगिन और साइनअप स्विच',
    },
  };
  const copy = COPY[language] || COPY.hi;
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
      setError(copy.requiredFields);
      return;
    }

    if (!isValidEmail(formData.email.trim())) {
      setError(copy.invalidEmail);
      return;
    }

    if (formData.password.length < 6) {
      setError(copy.shortPassword);
      return;
    }

    if (mode === 'signup') {
      if (!formData.confirmPassword.trim()) {
        setError(copy.confirmRequired);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError(copy.mismatch);
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
        setError(data?.message || copy.requestFailed);
        return;
      }

      setMessage(data?.message || (mode === 'login' ? copy.loginSuccess : copy.signupSuccess));
    } catch {
      setError(copy.connectError);
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
      setError(copy.googleNotConfigured);
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

      setMessage(copy.googleSuccess);
    } catch (authError) {
      setError(authError?.message || copy.googleFailed);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{mode === 'login' ? copy.login : copy.signup}</h1>
          <p>{copy.subtitle}</p>
        </div>

        <div className="auth-switch" role="tablist" aria-label={copy.switchTabs}>
          <button
            type="button"
            className={`auth-switch-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => handleModeChange('login')}
          >
            {copy.login}
          </button>
          <button
            type="button"
            className={`auth-switch-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => handleModeChange('signup')}
          >
            {copy.signup}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="auth-name" className="sr-only">{copy.name}</label>
          <input
            id="auth-name"
            type="text"
            name="name"
            placeholder={copy.name}
            value={formData.name}
            onChange={handleInputChange}
            className="auth-input"
            required
          />

          <label htmlFor="auth-email" className="sr-only">{copy.email}</label>
          <input
            id="auth-email"
            type="email"
            name="email"
            placeholder={copy.email}
            value={formData.email}
            onChange={handleInputChange}
            className="auth-input"
            required
          />

          <div className="auth-password-wrap">
            <label htmlFor="auth-password" className="sr-only">{copy.password}</label>
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={mode === 'login' ? copy.password : copy.createPassword}
              value={formData.password}
              onChange={handleInputChange}
              className="auth-input"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? copy.hidePassword : copy.showPassword}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {mode === 'signup' && (
            <div className="auth-password-wrap">
              <label htmlFor="auth-confirm-password" className="sr-only">{copy.confirmPassword}</label>
              <input
                id="auth-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder={copy.confirmPassword}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="auth-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? copy.hideConfirmPassword : copy.showConfirmPassword}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? copy.pleaseWait : mode === 'login' ? copy.login : copy.signup}
          </button>
        </form>

        {error && <p className="auth-feedback auth-error">{error}</p>}
        {message && <p className="auth-feedback auth-success">{message}</p>}

        <p className="auth-inline-text">
          {mode === 'login' ? copy.newHere : copy.alreadyAccount}
          <button
            type="button"
            className="auth-inline-link"
            onClick={() => handleModeChange(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? copy.createOne : copy.login}
          </button>
        </p>

        <div className="auth-divider"><span>{copy.or}</span></div>

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
            {isGoogleLoading ? copy.openingGoogle : copy.loginGoogle}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
