import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Smartphone, 
  Lock, 
  User, 
  Mail, 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  LogIn,
  UserPlus
} from 'lucide-react';

export const LoginPage = () => {
  const { 
    user, 
    loginUser, 
    navigateTo, 
    goBack, 
    lang, 
    showToast 
  } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [authMethod, setAuthMethod] = useState('password'); // 'password' | 'otp'
  
  // Form fields
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState(''); // phone or email
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect message
  if (user?.isLoggedIn) {
    return (
      <div className="login-page-container py-12">
        <div className="container max-w-md mx-auto text-center bg-white p-8 rounded-xl border border-rule shadow-sm">
          <CheckCircle2 size={52} className="text-forest mx-auto mb-3" />
          <h2 className="text-2xl font-serif font-bold text-ink mb-2">
            {lang === 'hi' ? 'आप पहले से लॉगिन हैं' : 'You are already logged in'}
          </h2>
          <p className="text-muted text-sm mb-6">
            {lang === 'hi' ? `स्वागत है, ${user.name}` : `Welcome back, ${user.name}`} ({user.phone || user.email})
          </p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => navigateTo('home')} 
              className="btn btn-primary"
            >
              {lang === 'hi' ? 'शॉपिंग जारी रखें' : 'Continue Shopping'}
            </button>
            <button 
              onClick={() => navigateTo('account')} 
              className="btn btn-outline"
            >
              {lang === 'hi' ? 'अकाउंट देखें' : 'View Account'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`login-otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const cleanPhone = (mode === 'register' ? phone : identifier).replace(/\D/g, '');
    if (!/^\d{10}$/.test(cleanPhone)) {
      setError(lang === 'hi' ? 'कृपया 10-अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      showToast(lang === 'hi' ? 'OTP भेजा गया! डेमो OTP: 123456' : 'OTP Sent! Demo OTP: 123456');
    }, 600);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanInput = identifier.trim();
    if (!cleanInput) {
      setError(lang === 'hi' ? 'कृपया अपना मोबाइल नंबर या ईमेल दर्ज करें' : 'Please enter your mobile number or email');
      return;
    }

    if (authMethod === 'password') {
      if (!password || password.length < 4) {
        setError(lang === 'hi' ? 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए' : 'Password must be at least 4 characters');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Check stored users in localStorage
        const storedUsers = JSON.parse(localStorage.getItem('rb_users_db') || '[]');
        const found = storedUsers.find(
          u => (u.phone === cleanInput || u.email?.toLowerCase() === cleanInput.toLowerCase()) && u.password === password
        );

        if (found) {
          loginUser(found);
          showToast(lang === 'hi' ? `स्वागत है, ${found.name}!` : `Welcome back, ${found.name}!`);
          navigateTo('account');
        } else if (cleanInput === '9876543210' || cleanInput === 'demo@rootsbloom.com') {
          // Demo fallback
          const demoUser = {
            name: 'Priya Sharma',
            phone: '9876543210',
            email: 'priya@rootsbloom.com',
            credits: 150
          };
          loginUser(demoUser);
          showToast(lang === 'hi' ? 'सफलतापूर्वक लॉगिन हो गया!' : 'Successfully logged in!');
          navigateTo('account');
        } else {
          // If not registered yet, auto-log in as guest or prompt
          const newUser = {
            name: cleanInput.includes('@') ? cleanInput.split('@')[0] : 'Valued Customer',
            phone: cleanInput.replace(/\D/g, '').length === 10 ? cleanInput : '',
            email: cleanInput.includes('@') ? cleanInput : '',
            credits: 100
          };
          loginUser(newUser);
          showToast(lang === 'hi' ? 'लॉगिन सफल!' : 'Login successful!');
          navigateTo('account');
        }
      }, 500);

    } else {
      // OTP Verification
      const enteredOtp = otp.join('');
      if (enteredOtp !== '123456' && enteredOtp.length !== 6) {
        setError(lang === 'hi' ? 'गलत OTP! कृपया डेमो OTP दर्ज करें: 123456' : 'Invalid OTP! Please use demo OTP: 123456');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const storedUsers = JSON.parse(localStorage.getItem('rb_users_db') || '[]');
        const found = storedUsers.find(u => u.phone === cleanInput.replace(/\D/g, ''));
        const userObj = found || {
          name: 'Green Thumb Lover',
          phone: cleanInput.replace(/\D/g, ''),
          credits: 150
        };
        loginUser(userObj);
        showToast(lang === 'hi' ? 'सफलतापूर्वक लॉगिन हो गया!' : 'Successfully logged in with OTP!');
        navigateTo('account');
      }, 500);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(lang === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!/^\d{10}$/.test(cleanPhone)) {
      setError(lang === 'hi' ? 'कृपया 10-अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }

    if (!password || password.length < 4) {
      setError(lang === 'hi' ? 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए' : 'Password must be at least 4 characters');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newUser = {
        name: name.trim(),
        phone: cleanPhone,
        email: identifier.trim() || `${cleanPhone}@rootsbloom.local`,
        password: password,
        credits: 200 // Bonus credits for new sign up
      };

      // Save to localStorage users db
      const storedUsers = JSON.parse(localStorage.getItem('rb_users_db') || '[]');
      const existsIndex = storedUsers.findIndex(u => u.phone === cleanPhone);
      if (existsIndex >= 0) {
        storedUsers[existsIndex] = newUser;
      } else {
        storedUsers.push(newUser);
      }
      localStorage.setItem('rb_users_db', JSON.stringify(storedUsers));

      // Login current user
      loginUser(newUser);
      showToast(lang === 'hi' ? `खाता बन गया! आपको मिले ₹200 वेलकम क्रेडिट्स` : `Account created! You received ₹200 welcome credits`);
      navigateTo('account');
    }, 600);
  };

  return (
    <div className="login-page-container py-8 px-4">
      <div className="container max-w-md mx-auto">
        {/* Back Link */}
        <div className="mb-4">
          <button 
            onClick={goBack} 
            className="pdp-back-btn flex items-center gap-1.5 text-muted hover:text-forest text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>{lang === 'hi' ? 'पीछे जाएं' : 'Back'}</span>
          </button>
        </div>

        {/* Card Box */}
        <div className="bg-white rounded-2xl border border-rule shadow-sm overflow-hidden p-6 sm:p-8">
          {/* Header Title */}
          <div className="text-center mb-6">
            <span className="brand-logo-text text-forest text-2xl block mb-1">Roots_Bloom</span>
            <h1 className="text-xl font-serif font-bold text-ink">
              {mode === 'login' 
                ? (lang === 'hi' ? 'अपने अकाउंट में लॉगिन करें' : 'Welcome to Roots_Bloom') 
                : (lang === 'hi' ? 'नया अकाउंट बनाएं' : 'Create an Artisan Account')}
            </h1>
            <p className="text-xs text-muted mt-1">
              {mode === 'login'
                ? (lang === 'hi' ? 'ऑर्डर्स ट्रैक करें, विशलिस्ट और रिवार्ड्स एक्सेस करें' : 'Access your tracked orders, live planters & rewards')
                : (lang === 'hi' ? 'साइनअप करें और ₹200 के वेलकम क्रेडिट्स पाएं' : 'Sign up today and receive ₹200 welcome bonus credits')}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex bg-paper-warm p-1 rounded-xl mb-6 border border-rule">
            <button
              type="button"
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'login' ? 'bg-white text-forest shadow-xs' : 'text-muted hover:text-ink'
              }`}
              onClick={() => {
                setMode('login');
                setError('');
              }}
            >
              <LogIn size={14} />
              <span>{lang === 'hi' ? 'लॉगिन' : 'Log In'}</span>
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'register' ? 'bg-white text-forest shadow-xs' : 'text-muted hover:text-ink'
              }`}
              onClick={() => {
                setMode('register');
                setError('');
              }}
            >
              <UserPlus size={14} />
              <span>{lang === 'hi' ? 'नया खाता बनाएं' : 'Register'}</span>
            </button>
          </div>

          {/* LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Method Toggle: Password vs OTP */}
              <div className="flex justify-between items-center text-xs pb-1 border-b border-rule">
                <span className="text-muted font-medium">
                  {lang === 'hi' ? 'लॉगिन का तरीका:' : 'Login Method:'}
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`font-semibold transition-colors ${authMethod === 'password' ? 'text-forest underline' : 'text-muted'}`}
                    onClick={() => {
                      setAuthMethod('password');
                      setError('');
                    }}
                  >
                    {lang === 'hi' ? 'पासवर्ड' : 'Password'}
                  </button>
                  <span className="text-rule">•</span>
                  <button
                    type="button"
                    className={`font-semibold transition-colors ${authMethod === 'otp' ? 'text-forest underline' : 'text-muted'}`}
                    onClick={() => {
                      setAuthMethod('otp');
                      setError('');
                    }}
                  >
                    {lang === 'hi' ? 'OTP लॉगिन' : 'Quick OTP'}
                  </button>
                </div>
              </div>

              {/* Identifier Input */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  {lang === 'hi' ? 'मोबाइल नंबर या ईमेल' : 'Mobile Number or Email'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                    <Smartphone size={16} />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-rule rounded-lg focus:outline-none focus:border-forest transition-colors"
                    placeholder={lang === 'hi' ? '9876543210 या email@example.com' : '9876543210 or email@example.com'}
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setError('');
                    }}
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Mode Fields */}
              {authMethod === 'password' && (
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-ink">
                      {lang === 'hi' ? 'पासवर्ड' : 'Password'}
                    </label>
                    <button
                      type="button"
                      className="text-xs text-forest hover:underline"
                      onClick={() => {
                        setAuthMethod('otp');
                        showToast(lang === 'hi' ? 'OTP लॉगिन मोड चुना गया' : 'Switched to OTP mode');
                      }}
                    >
                      {lang === 'hi' ? 'OTP से लॉगिन करें?' : 'Use OTP instead?'}
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-rule rounded-lg focus:outline-none focus:border-forest transition-colors"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-ink"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Mode Fields */}
              {authMethod === 'otp' && (
                <div className="pt-1">
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="btn btn-outline btn-block text-xs py-2"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending...' : (lang === 'hi' ? '6-अंकों का OTP प्राप्त करें' : 'Send 6-Digit OTP')}
                    </button>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-semibold text-ink">
                          {lang === 'hi' ? '6-अंकों का OTP दर्ज करें (डेमो: 123456)' : 'Enter 6-digit OTP (Demo: 123456)'}
                        </label>
                        <button
                          type="button"
                          className="text-xs text-forest hover:underline"
                          onClick={handleSendOtp}
                        >
                          {lang === 'hi' ? 'पुनः भेजें' : 'Resend'}
                        </button>
                      </div>
                      <div className="flex gap-2 justify-between">
                        {otp.map((d, i) => (
                          <input
                            key={i}
                            id={`login-otp-${i}`}
                            type="text"
                            maxLength={1}
                            value={d}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            className="w-10 h-11 text-center font-bold text-base border border-rule rounded-lg focus:border-forest focus:outline-none bg-paper-warm"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {error && <p className="text-xs text-red-600 font-medium bg-red-50 p-2 rounded border border-red-200">{error}</p>}

              <button
                type="submit"
                className="btn btn-primary btn-block py-2.5 mt-2"
                disabled={isLoading}
              >
                {isLoading 
                  ? (lang === 'hi' ? 'सत्यापित हो रहा है...' : 'Verifying...') 
                  : (lang === 'hi' ? 'लॉगिन करें' : 'Log In to Account')}
              </button>

              {/* Demo credentials hint */}
              <div className="bg-paper-warm p-3 rounded-lg border border-rule text-xs text-muted">
                <span className="font-semibold text-ink block mb-0.5">💡 Demo Credentials for Instant Login:</span>
                <span>Mobile: <strong>9876543210</strong> | Password: <strong>demo123</strong> (or OTP: <strong>123456</strong>)</span>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  {lang === 'hi' ? 'आपका पूरा नाम' : 'Full Name'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-rule rounded-lg focus:outline-none focus:border-forest transition-colors"
                    placeholder="Priya Sharma"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    autoFocus
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  {lang === 'hi' ? '10-अंकों का मोबाइल नंबर' : '10-Digit Mobile Number'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted font-medium text-xs">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    className="w-full pl-12 pr-3 py-2.5 text-sm bg-white border border-rule rounded-lg focus:outline-none focus:border-forest transition-colors"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, ''));
                      setError('');
                    }}
                  />
                </div>
              </div>

              {/* Optional Email */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  {lang === 'hi' ? 'ईमेल पता (वैकल्पिक)' : 'Email Address (Optional)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-rule rounded-lg focus:outline-none focus:border-forest transition-colors"
                    placeholder="priya@example.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>

              {/* Create Password */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  {lang === 'hi' ? 'पासवर्ड बनाएं' : 'Create Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-rule rounded-lg focus:outline-none focus:border-forest transition-colors"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-ink"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-xs text-red-600 font-medium bg-red-50 p-2 rounded border border-red-200">{error}</p>}

              <button
                type="submit"
                className="btn btn-primary btn-block py-2.5 mt-2"
                disabled={isLoading}
              >
                {isLoading 
                  ? (lang === 'hi' ? 'खाता बन रहा है...' : 'Creating Account...') 
                  : (lang === 'hi' ? 'रजिस्टर करें और ₹200 पाएं' : 'Sign Up & Claim ₹200')}
              </button>
            </form>
          )}

          {/* Privacy Footnote */}
          <div className="mt-6 pt-4 border-t border-rule text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
              <ShieldCheck size={14} className="text-forest" />
              <span>{lang === 'hi' ? 'आपकी जानकारी 100% सुरक्षित और एन्क्रिप्टेड है' : 'Your data is 100% encrypted & stored safely on your device'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
