import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginUser, 
    showToast,
    lang 
  } = useApp();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsAuthModalOpen(false);
    try {
      sessionStorage.setItem('rb_login_popup_dismissed', 'true');
    } catch {
      // storage quota
    }
  };

  // Close on Escape & disable scroll
  useEffect(() => {
    if (!isAuthModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isSupabaseConfigured) {
        showToast(
          lang === 'hi' 
            ? 'कृपया .env फाइल में Supabase URL और Anon Key जोड़ें।' 
            : 'Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
        );
        setIsLoading(false);
        return;
      }

      const clean = loginIdentifier.trim();
      const userEmail = clean.includes('@') ? clean : `${clean.replace(/\D/g, '')}@rootsbloom.local`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: loginPassword,
      });

      if (error) {
        showToast(error.message);
        setIsLoading(false);
        return;
      }

      const profileName = data.user?.user_metadata?.full_name || data.user?.user_metadata?.name || data.user?.email?.split('@')[0] || 'Valued Customer';
      const userObj = {
        id: data.user?.id,
        name: profileName,
        email: data.user?.email,
        phone: data.user?.user_metadata?.phone || '',
        credits: 150
      };

      loginUser(userObj);
      showToast(lang === 'hi' ? `लॉगिन सफल! स्वागत है ${profileName}` : `Login successful! Welcome ${profileName}`);
      handleClose();
    } catch (err) {
      showToast(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isSupabaseConfigured) {
        showToast(
          lang === 'hi' 
            ? 'कृपया .env फाइल में Supabase URL और Anon Key जोड़ें।' 
            : 'Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
        );
        setIsLoading(false);
        return;
      }

      const cleanPhone = regPhone.replace(/\D/g, '');
      const userEmail = regEmail.trim();

      const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: regPassword,
        options: {
          data: {
            full_name: regName.trim(),
            phone: cleanPhone,
          }
        }
      });

      if (error) {
        showToast(error.message);
        setIsLoading(false);
        return;
      }

      const profileName = regName.trim();
      const userObj = {
        id: data.user?.id,
        name: profileName,
        email: userEmail,
        phone: cleanPhone,
        credits: 200
      };

      if (!data.session && data.user?.identities && data.user.identities.length === 0) {
        showToast(lang === 'hi' ? 'यह ईमेल पहले से रजिस्टर्ड है। कृपया लॉगिन करें।' : 'This email is already registered. Please sign in.');
        setActiveTab('login');
        setIsLoading(false);
        return;
      }

      loginUser(userObj);
      showToast(
        lang === 'hi' 
          ? `अकाउंट तैयार! स्वागत है ${profileName}` 
          : `Registration successful! Welcome to Roots_Bloom, ${profileName}`
      );
      handleClose();
    } catch (err) {
      showToast(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginIdentifier.includes('@')) {
      alert(lang === 'hi' ? 'कृपया अपना ईमेल पता दर्ज करें।' : 'Please enter your registered email address.');
      return;
    }
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.resetPasswordForEmail(loginIdentifier.trim());
      if (error) {
        alert(error.message);
      } else {
        alert(lang === 'hi' ? 'पासवर्ड रीसेट लिंक आपके ईमेल पर भेज दिया गया है।' : 'Password reset link sent to your email.');
      }
    } else {
      alert(lang === 'hi' ? 'पासवर्ड रीसेट लिंक आपके रजिस्टर्ड ईमेल पर भेज दिया जाएगा।' : 'Password reset link will be sent to your registered email.');
    }
  };

  return (
    <div 
      className="auth-modal-overlay" 
      onClick={handleClose}
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="login-modal-title"
    >
      <div 
        className="auth-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="auth-modal-close" 
          onClick={handleClose} 
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        {/* Modal Header without subtitles */}
        <div className="auth-modal-header" style={{ paddingBottom: '16px' }}>
          <div className="auth-logo-badge" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <img 
              src="/logo.png" 
              alt="Roots & Bloom" 
              className="auth-logo-image" 
              style={{ 
                width: '48px', 
                height: '48px', 
                minWidth: '48px', 
                minHeight: '48px', 
                maxWidth: '48px', 
                maxHeight: '48px', 
                borderRadius: '50%', 
                objectFit: 'contain',
                border: '1.5px solid rgba(45, 106, 79, 0.25)',
                background: '#ffffff',
                padding: '2px',
                display: 'block',
                flexShrink: 0
              }} 
            />
            <div style={{ textAlign: 'left' }}>
              <span className="brand-title">ROOTS & BLOOM</span>
              <span className="brand-subtitle">{lang === 'hi' ? 'केयर की जड़ें, प्यार के फूल' : 'Roots of care, blooms of love'}</span>
            </div>
          </div>
          <h3 id="login-modal-title" style={{ marginBottom: 0 }}>
            {activeTab === 'login' 
              ? (lang === 'hi' ? 'वापसी पर स्वागत है' : 'Welcome Back') 
              : (lang === 'hi' ? 'नया खाता बनाएं' : 'Create Account')}
          </h3>
        </div>

        {/* Auth Tabs (Login / Register) */}
        <div className="auth-tabs">
          <button 
            type="button" 
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`} 
            onClick={() => setActiveTab('login')}
          >
            {lang === 'hi' ? 'लॉगिन' : 'Login'}
          </button>
          <button 
            type="button" 
            className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`} 
            onClick={() => setActiveTab('register')}
          >
            {lang === 'hi' ? 'साइन अप' : 'Sign Up'}
          </button>
        </div>

        <div className="auth-modal-body">
          {/* ================= LOGIN FORM ================= */}
          {activeTab === 'login' && (
            <form className="auth-form-wrap" onSubmit={handleLoginSubmit}>
              <div className="form-group-custom">
                <label className="form-label-custom" htmlFor="login-email">
                  {lang === 'hi' ? 'ईमेल या मोबाइल नंबर *' : 'Email or Phone *'}
                </label>
                <div className="input-icon-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <input 
                    type="text" 
                    id="login-email" 
                    className="form-control-custom" 
                    placeholder={lang === 'hi' ? 'ईमेल या 10-अंकों का मोबाइल नंबर' : 'Enter email or mobile number'} 
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required 
                    autoFocus
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label className="form-label-custom" htmlFor="login-password">
                  {lang === 'hi' ? 'पासवर्ड *' : 'Password *'}
                </label>
                <div className="input-icon-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  <input 
                    type={showLoginPassword ? 'text' : 'password'} 
                    id="login-password" 
                    className="form-control-custom" 
                    placeholder="••••••••" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn" 
                    onClick={() => setShowLoginPassword(!showLoginPassword)} 
                    aria-label="Toggle password"
                  >
                    {showLoginPassword ? (
                      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: '#22533C' }}>
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: '#8c9b93' }}>
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="auth-options">
                <label className="remember-wrap">
                  <input 
                    type="checkbox" 
                    id="login-remember" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>{lang === 'hi' ? 'मुझे याद रखें' : 'Remember me'}</span>
                </label>
                <a 
                  href="#" 
                  className="forgot-link" 
                  onClick={handleForgotPassword}
                >
                  {lang === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
                </a>
              </div>

              <button type="submit" disabled={isLoading} className="auth-submit-btn">
                {isLoading 
                  ? (lang === 'hi' ? 'साइन इन हो रहा है...' : 'Signing in...') 
                  : (lang === 'hi' ? 'साइन इन करें' : 'Sign In')}
              </button>

              <p className="auth-switch-text">
                {lang === 'hi' ? 'खाता नहीं है?' : "Don't have an account?"}
                <button type="button" onClick={() => setActiveTab('register')}>
                  {lang === 'hi' ? 'अभी रजिस्टर करें' : 'Register Now'}
                </button>
              </p>
            </form>
          )}

          {/* ================= SIGN UP FORM ================= */}
          {activeTab === 'register' && (
            <form className="auth-form-wrap" onSubmit={handleRegisterSubmit}>
              <div className="form-group-custom">
                <label className="form-label-custom" htmlFor="reg-name">
                  {lang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                </label>
                <div className="input-icon-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <input 
                    type="text" 
                    id="reg-name" 
                    className="form-control-custom" 
                    placeholder="e.g. Priya Sharma" 
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required 
                    autoFocus
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label className="form-label-custom" htmlFor="reg-phone">
                  {lang === 'hi' ? 'मोबाइल नंबर *' : 'Phone Number *'}
                </label>
                <div className="input-icon-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <input 
                    type="tel" 
                    id="reg-phone" 
                    className="form-control-custom" 
                    placeholder="10-digit mobile number" 
                    pattern="[0-9]{10}" 
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label className="form-label-custom" htmlFor="reg-email">
                  {lang === 'hi' ? 'ईमेल पता *' : 'Email Address *'}
                </label>
                <div className="input-icon-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <input 
                    type="email" 
                    id="reg-email" 
                    className="form-control-custom" 
                    placeholder="name@domain.com" 
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label className="form-label-custom" htmlFor="reg-password">
                  {lang === 'hi' ? 'पासवर्ड बनाएं *' : 'Create Password *'}
                </label>
                <div className="input-icon-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  <input 
                    type={showRegPassword ? 'text' : 'password'} 
                    id="reg-password" 
                    className="form-control-custom" 
                    placeholder={lang === 'hi' ? 'न्यूनतम 6 अक्षर' : 'Min. 6 characters'} 
                    minLength={6} 
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn" 
                    onClick={() => setShowRegPassword(!showRegPassword)} 
                    aria-label="Toggle password"
                  >
                    {showRegPassword ? (
                      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: '#22533C' }}>
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: '#8c9b93' }}>
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="auth-submit-btn">
                {isLoading 
                  ? (lang === 'hi' ? 'खाता बन रहा है...' : 'Creating Account...') 
                  : (lang === 'hi' ? 'अकाउंट बनाएं' : 'Create Account')}
              </button>

              <p className="auth-switch-text">
                {lang === 'hi' ? 'पहले से खाता है?' : 'Already registered?'}
                <button type="button" onClick={() => setActiveTab('login')}>
                  {lang === 'hi' ? 'लॉग इन करें' : 'Log In'}
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
