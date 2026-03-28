import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { language } = useLanguage();
  const {
    user,
    login: loginUser,
    logout,
  } = useAuth();
  const COPY = {
    en: {
      login: 'Login',
      signup: 'Signup',
      accountTitle: 'Profile',
      accountSubtitle: 'Manage your account details and access permissions.',
      signedInAs: 'Signed in as',
      roleLabel: 'Role',
      logout: 'Logout',
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
      userType: 'User Type',
      normalUser: 'Normal User',
      adminUser: 'Admin',
    },
    hi: {
      login: 'लॉगिन',
      signup: 'साइनअप',
      accountTitle: 'प्रोफाइल',
      accountSubtitle: 'अपनी अकाउंट जानकारी और अनुमति यहां देखें।',
      signedInAs: 'लॉगिन यूज़र',
      roleLabel: 'भूमिका',
      logout: 'लॉगआउट',
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
      userType: 'उपयोगकर्ता प्रकार',
      normalUser: 'सामान्य उपयोगकर्ता',
      adminUser: 'एडमिन',
    },
    mr: {
      login: 'लॉगिन',
      signup: 'साइनअप',
      accountTitle: 'प्रोफाइल',
      accountSubtitle: 'तुमचे खाते तपशील आणि परवानग्या येथे पाहा.',
      signedInAs: 'लॉगिन वापरकर्ता',
      roleLabel: 'भूमिका',
      logout: 'लॉगआउट',
      subtitle: 'कचरा पिकअप ट्रॅक करा आणि रिवॉर्ड क्लेम करा.',
      name: 'नाव',
      email: 'ईमेल',
      password: 'पासवर्ड',
      createPassword: 'पासवर्ड तयार करा',
      confirmPassword: 'पासवर्ड पुष्टी करा',
      showPassword: 'पासवर्ड दाखवा',
      hidePassword: 'पासवर्ड लपवा',
      showConfirmPassword: 'पुष्टी पासवर्ड दाखवा',
      hideConfirmPassword: 'पुष्टी पासवर्ड लपवा',
      pleaseWait: 'कृपया थांबा...',
      newHere: 'नवीन आहात? ',
      alreadyAccount: 'आधीच खाते आहे? ',
      createOne: 'नवे तयार करा',
      or: 'किंवा',
      openingGoogle: 'Google उघडत आहे...',
      loginGoogle: 'Google ने लॉगिन',
      requiredFields: 'कृपया सर्व आवश्यक फील्ड भरा.',
      invalidEmail: 'कृपया वैध ईमेल पत्ता टाका.',
      shortPassword: 'पासवर्ड किमान 6 अक्षरांचा असावा.',
      confirmRequired: 'कृपया पासवर्ड पुष्टी करा.',
      mismatch: 'पासवर्ड आणि पुष्टी पासवर्ड जुळत नाहीत.',
      requestFailed: 'विनंती अयशस्वी. पुन्हा प्रयत्न करा.',
      loginSuccess: 'लॉगिन यशस्वी.',
      signupSuccess: 'साइनअप यशस्वी.',
      connectError: 'सर्व्हरशी कनेक्ट होता आले नाही. बॅकएंड चालू आहे का तपासा.',
      googleNotConfigured: 'Google लॉगिन अजून कॉन्फिगर नाही.',
      googleSuccess: 'Google लॉगिन यशस्वी.',
      googleFailed: 'Google लॉगिन अयशस्वी. पुन्हा प्रयत्न करा.',
      switchTabs: 'लॉगिन आणि साइनअप स्विच',
      userType: 'वापरकर्ता प्रकार',
      normalUser: 'सामान्य वापरकर्ता',
      adminUser: 'अॅडमिन',
    },
    ur: {
      login: 'لاگ ان',
      signup: 'سائن اپ',
      accountTitle: 'پروفائل',
      accountSubtitle: 'اپنے اکاؤنٹ کی تفصیل اور اجازتیں یہاں دیکھیں۔',
      signedInAs: 'لاگ ان صارف',
      roleLabel: 'کردار',
      logout: 'لاگ آؤٹ',
      subtitle: 'ویسٹ پک اپ ٹریک کریں اور ریوارڈ کلیم کریں۔',
      name: 'نام',
      email: 'ای میل',
      password: 'پاس ورڈ',
      createPassword: 'پاس ورڈ بنائیں',
      confirmPassword: 'پاس ورڈ کی تصدیق کریں',
      showPassword: 'پاس ورڈ دکھائیں',
      hidePassword: 'پاس ورڈ چھپائیں',
      showConfirmPassword: 'تصدیقی پاس ورڈ دکھائیں',
      hideConfirmPassword: 'تصدیقی پاس ورڈ چھپائیں',
      pleaseWait: 'براہ کرم انتظار کریں...',
      newHere: 'نئے ہیں؟ ',
      alreadyAccount: 'پہلے سے اکاؤنٹ ہے؟ ',
      createOne: 'نیا بنائیں',
      or: 'یا',
      openingGoogle: 'Google کھل رہا ہے...',
      loginGoogle: 'Google سے لاگ ان',
      requiredFields: 'براہ کرم تمام ضروری فیلڈز بھریں۔',
      invalidEmail: 'براہ کرم درست ای میل درج کریں۔',
      shortPassword: 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے۔',
      confirmRequired: 'براہ کرم پاس ورڈ کی تصدیق کریں۔',
      mismatch: 'پاس ورڈ اور تصدیقی پاس ورڈ مماثل نہیں۔',
      requestFailed: 'درخواست ناکام ہوئی۔ دوبارہ کوشش کریں۔',
      loginSuccess: 'لاگ ان کامیاب۔',
      signupSuccess: 'سائن اپ کامیاب۔',
      connectError: 'سرور سے رابطہ نہیں ہو سکا۔ بیک اینڈ چل رہا ہے یا نہیں چیک کریں۔',
      googleNotConfigured: 'Google لاگ ان ابھی کنفیگر نہیں ہے۔',
      googleSuccess: 'Google لاگ ان کامیاب۔',
      googleFailed: 'Google لاگ ان ناکام۔ دوبارہ کوشش کریں۔',
      switchTabs: 'لاگ ان اور سائن اپ سوئچ',
      userType: 'صارف کی قسم',
      normalUser: 'عام صارف',
      adminUser: 'ایڈمن',
    },
    bn: {
      login: 'লগইন',
      signup: 'সাইনআপ',
      accountTitle: 'প্রোফাইল',
      accountSubtitle: 'আপনার অ্যাকাউন্টের তথ্য ও অনুমতি এখানে দেখুন।',
      signedInAs: 'লগইন ইউজার',
      roleLabel: 'ভূমিকা',
      logout: 'লগআউট',
      subtitle: 'বর্জ্য পিকআপ ট্র্যাক করুন এবং রিওয়ার্ড ক্লেইম করুন।',
      name: 'নাম',
      email: 'ইমেল',
      password: 'পাসওয়ার্ড',
      createPassword: 'পাসওয়ার্ড তৈরি করুন',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      showPassword: 'পাসওয়ার্ড দেখান',
      hidePassword: 'পাসওয়ার্ড লুকান',
      showConfirmPassword: 'নিশ্চিত পাসওয়ার্ড দেখান',
      hideConfirmPassword: 'নিশ্চিত পাসওয়ার্ড লুকান',
      pleaseWait: 'অনুগ্রহ করে অপেক্ষা করুন...',
      newHere: 'নতুন এখানে? ',
      alreadyAccount: 'আগেই অ্যাকাউন্ট আছে? ',
      createOne: 'নতুন তৈরি করুন',
      or: 'অথবা',
      openingGoogle: 'Google খুলছে...',
      loginGoogle: 'Google দিয়ে লগইন',
      requiredFields: 'অনুগ্রহ করে সব প্রয়োজনীয় ফিল্ড পূরণ করুন।',
      invalidEmail: 'অনুগ্রহ করে সঠিক ইমেল লিখুন।',
      shortPassword: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।',
      confirmRequired: 'অনুগ্রহ করে পাসওয়ার্ড নিশ্চিত করুন।',
      mismatch: 'পাসওয়ার্ড ও নিশ্চিত পাসওয়ার্ড মেলেনি।',
      requestFailed: 'অনুরোধ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
      loginSuccess: 'লগইন সফল।',
      signupSuccess: 'সাইনআপ সফল।',
      connectError: 'সার্ভারে সংযোগ করা যায়নি। ব্যাকএন্ড চলছে কিনা দেখুন।',
      googleNotConfigured: 'Google লগইন এখনও কনফিগার করা হয়নি।',
      googleSuccess: 'Google লগইন সফল।',
      googleFailed: 'Google লগইন ব্যর্থ। আবার চেষ্টা করুন।',
      switchTabs: 'লগইন ও সাইনআপ সুইচ',
      userType: 'ব্যবহারকারীর ধরন',
      normalUser: 'সাধারণ ব্যবহারকারী',
      adminUser: 'অ্যাডমিন',
    },
  };
  const copy = COPY[language] || COPY.en;

  if (user) {
    return (
      <section className="auth-page">
        <div className="auth-card account-card">
          <div className="auth-header">
            <h1>{copy.accountTitle}</h1>
            <p>{copy.accountSubtitle}</p>
          </div>

          <div className="account-info-grid">
            <div className="account-info-row">
              <span>{copy.name}</span>
              <strong>{user.name || 'N/A'}</strong>
            </div>
            <div className="account-info-row">
              <span>{copy.email}</span>
              <strong>{user.email || 'N/A'}</strong>
            </div>
            <div className="account-info-row">
              <span>{copy.roleLabel}</span>
              <strong>{user.role === 'admin' ? copy.adminUser : copy.normalUser}</strong>
            </div>
          </div>

          <p className="account-signed-in-text">
            {copy.signedInAs}: <b>{user.email || user.name || 'N/A'}</b>
          </p>

          <button type="button" className="auth-submit-btn account-logout-btn" onClick={logout}>
            {copy.logout}
          </button>
        </div>
      </section>
    );
  }

  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
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
              role: formData.role,
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

      if (data?.user) {
        loginUser(data.user);
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
      role: 'user',
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
        role: 'user',
      }));

      loginUser({
        name: user.displayName || '',
        email: user.email || '',
        role: 'user',
      });

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
            <label htmlFor="auth-role" className="sr-only">{copy.userType}</label>
          )}

          {mode === 'signup' && (
            <select
              id="auth-role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="auth-input"
            >
              <option value="user">{copy.normalUser}</option>
              <option value="admin">{copy.adminUser}</option>
            </select>
          )}

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
