import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase';
import './Profile.css';

const Profile = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill all required fields.');
      return;
    }

    if (!isValidEmail(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    if (mode === 'signup') {
      if (!formData.confirmPassword.trim()) {
        setError('Please confirm your password.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Password and confirm password do not match.');
        return;
      }
    }

    setError('');
    setMessage(mode === 'login' ? 'Login successful.' : 'Signup successful.');
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
      setError('Google login is not configured yet. Add Firebase env values first.');
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

      setMessage('Google login successful.');
    } catch (authError) {
      setError(authError?.message || 'Google login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{mode === 'login' ? 'Login' : 'Signup'}</h1>
          <p>Continue to track waste pickups and claim rewards.</p>
        </div>

        <div className="auth-switch" role="tablist" aria-label="Login and signup switch">
          <button
            type="button"
            className={`auth-switch-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => handleModeChange('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-switch-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => handleModeChange('signup')}
          >
            Signup
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="auth-name" className="sr-only">Name</label>
          <input
            id="auth-name"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="auth-input"
            required
          />

          <label htmlFor="auth-email" className="sr-only">Email</label>
          <input
            id="auth-email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="auth-input"
            required
          />

          <div className="auth-password-wrap">
            <label htmlFor="auth-password" className="sr-only">Password</label>
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={mode === 'login' ? 'Password' : 'Create password'}
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
              <label htmlFor="auth-confirm-password" className="sr-only">Confirm password</label>
              <input
                id="auth-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
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

          <button type="submit" className="auth-submit-btn">
            {mode === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>

        {error && <p className="auth-feedback auth-error">{error}</p>}
        {message && <p className="auth-feedback auth-success">{message}</p>}

        <p className="auth-inline-text">
          {mode === 'login' ? 'New here? ' : 'Already have an account? '}
          <button
            type="button"
            className="auth-inline-link"
            onClick={() => handleModeChange(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Create one' : 'Login'}
          </button>
        </p>

        <div className="auth-divider"><span>Or</span></div>

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
            {isGoogleLoading ? 'Opening Google...' : 'Login with Google'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
