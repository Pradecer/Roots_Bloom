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
  UserPlus,
  Heart,
  Truck,
  Leaf
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

  // If already logged in, redirect state
  if (user?.isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl border border-rule shadow-sm">
          <div className="w-16 h-16 bg-brand-forest-subtle text-forest rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
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
    }, 500);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const demoUser = {
        name: 'Priya Sharma',
        phone: '9876543210',
        email: 'priya@rootsbloom.com',
        credits: 150
      };
      loginUser(demoUser);
      showToast(lang === 'hi' ? 'डेमो अकाउंट से लॉगिन सफल!' : 'Demo Login Successful!');
      navigateTo('account');
    }, 400);
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
        const storedUsers = JSON.parse(localStorage.getItem('rb_users_db') || '[]');
        const found = storedUsers.find(
          u => (u.phone === cleanInput || u.email?.toLowerCase() === cleanInput.toLowerCase()) && u.password === password
        );

        if (found) {
          loginUser(found);
          showToast(lang === 'hi' ? `स्वागत है, ${found.name}!` : `Welcome back, ${found.name}!`);
          navigateTo('account');
        } else if (cleanInput === '9876543210' || cleanInput === 'demo@rootsbloom.com') {
          handleQuickDemoLogin();
        } else {
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
      const enteredOtp = otp.join('');
      if (enteredOtp !== '123456' && enteredOtp.length !== 6) {
        setError(lang === 'hi' ? 'गलत OTP! डेमो OTP उपयोग करें: 123456' : 'Invalid OTP! Use demo OTP: 123456');
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
        credits: 200
      };

      const storedUsers = JSON.parse(localStorage.getItem('rb_users_db') || '[]');
      const existsIndex = storedUsers.findIndex(u => u.phone === cleanPhone);
      if (existsIndex >= 0) {
        storedUsers[existsIndex] = newUser;
      } else {
        storedUsers.push(newUser);
      }
      localStorage.setItem('rb_users_db', JSON.stringify(storedUsers));

      loginUser(newUser);
      showToast(lang === 'hi' ? `खाता बन गया! आपको मिले ₹200 वेलकम क्रेडिट्स` : `Account created! You received ₹200 welcome credits`);
      navigateTo('account');
    }, 500);
  };

  return (
    <div className="canva-auth-page min-h-[90vh] flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      {/* Main Canva-Style 2-Column Split Container */}
      <div className="canva-auth-wrapper bg-white rounded-3xl shadow-xl border border-rule overflow-hidden max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* LEFT BRAND SHOWCASE PANEL (Canva Style Visual Side) */}
        <div className="canva-visual-col lg:col-span-5 bg-gradient-to-br from-[#162B20] via-[#22533C] to-[#1E4734] text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle nature circle decoration */}
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-accent-clay/10 pointer-events-none blur-3xl" />

          {/* Top Brand Tag */}
          <div className="relative z-10">
            <button 
              onClick={goBack} 
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white mb-6 transition-colors bg-white/10 px-3 py-1.5 rounded-full"
            >
              <ArrowLeft size={14} />
              <span>{lang === 'hi' ? 'वापस जाएं' : 'Back to Shop'}</span>
            </button>
            <div className="brand-logo-text text-3xl font-serif text-white tracking-tight">Roots_Bloom</div>
            <p className="text-xs text-white/70 mt-1 uppercase tracking-wider font-medium">Handcrafted Living Miniature Art</p>
          </div>

          {/* Center Showcase Inspiration */}
          <div className="my-8 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-emerald-200 mb-3">
              <Sparkles size={13} />
              {lang === 'hi' ? 'प्राकृतिक सुकून' : 'Breathe Life Into Your Space'}
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white leading-tight">
              {lang === 'hi' 
                ? 'जीवित पौधे, शांत मन और भावनात्मक सजावट।' 
                : 'Living miniature gardens crafted to bring peace & love home.'}
            </h2>
            <p className="text-sm text-white/80 mt-3 leading-relaxed">
              {lang === 'hi' 
                ? 'अपने घर और वर्क डेस्क को बनाएं हरियाली से भरपूर। 100% लाइव प्लांट सेफ ट्रांजिट गारंटी।'
                : 'Join 10,000+ plant lovers enjoying artisan terrariums and living bonsai sculptures.'}
            </p>
          </div>

          {/* Bottom Trust Badges */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 gap-3 relative z-10 text-xs text-white/90">
            <div className="flex items-center gap-2">
              <Leaf size={16} className="text-emerald-300 shrink-0" />
              <span>100% Live Plants</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-emerald-300 shrink-0" />
              <span>Safe Pan-India Transit</span>
            </div>
          </div>
        </div>

        {/* RIGHT INTERACTIVE FORM PANEL (Canva Style Clean Card) */}
        <div className="canva-form-col lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            
            {/* Header / Mode Switch */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-rule">
              <div>
                <h1 className="text-2xl font-serif font-bold text-ink">
                  {mode === 'login' 
                    ? (lang === 'hi' ? 'लॉगिन करें' : 'Log in') 
                    : (lang === 'hi' ? 'नया खाता बनाएं' : 'Sign up for free')}
                </h1>
                <p className="text-xs text-muted mt-0.5">
                  {mode === 'login' 
                    ? (lang === 'hi' ? 'Roots_Bloom परिवार में आपका स्वागत है' : 'Welcome back to your green sanctuary')
                    : (lang === 'hi' ? 'तुरंत ₹200 का वेलकम बोनस पाएं' : 'Get ₹200 welcome bonus on registration')}
                </p>
              </div>

              {/* Mode Toggle Link */}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                className="text-xs font-semibold text-forest hover:text-accent-clay transition-colors underline"
              >
                {mode === 'login' 
                  ? (lang === 'hi' ? 'नया खाता?' : 'Create account') 
                  : (lang === 'hi' ? 'लॉगिन करें' : 'Log in instead')}
              </button>
            </div>

            {/* Quick One-Click Social / Demo Buttons (Canva Style) */}
            <div className="space-y-2.5 mb-6">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-paper-warm hover:bg-rule/50 text-ink rounded-xl border border-rule text-xs font-semibold transition-all shadow-xs"
              >
                <Sparkles size={15} className="text-marigold" />
                <span>{lang === 'hi' ? '1-क्लिक डेमो लॉगिन (Priya Sharma)' : '1-Click Instant Demo Login (Priya Sharma)'}</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-rule w-full" />
              <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-muted font-medium absolute">
                {lang === 'hi' ? 'या क्रेडेंशियल्स से' : 'or continue with credentials'}
              </span>
            </div>

            {/* LOGIN FORM */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Method selector */}
                <div className="flex justify-between items-center text-xs pb-1">
                  <span className="text-muted font-medium">
                    {lang === 'hi' ? 'तरीका चुनें:' : 'Method:'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
                        authMethod === 'password' ? 'bg-forest text-white' : 'bg-paper text-muted hover:text-ink'
                      }`}
                      onClick={() => {
                        setAuthMethod('password');
                        setError('');
                      }}
                    >
                      {lang === 'hi' ? 'पासवर्ड' : 'Password'}
                    </button>
                    <button
                      type="button"
                      className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
                        authMethod === 'otp' ? 'bg-forest text-white' : 'bg-paper text-muted hover:text-ink'
                      }`}
                      onClick={() => {
                        setAuthMethod('otp');
                        setError('');
                      }}
                    >
                      {lang === 'hi' ? 'OTP लॉगिन' : 'Quick OTP'}
                    </button>
                  </div>
                </div>

                {/* Input: Mobile or Email */}
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    {lang === 'hi' ? 'मोबाइल नंबर या ईमेल' : 'Mobile Number or Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                      <Smartphone size={16} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-paper-warm border border-rule rounded-xl focus:bg-white focus:outline-none focus:border-forest transition-all"
                      placeholder="9876543210 or email@example.com"
                      value={identifier}
                      onChange={(e) => {
                        setIdentifier(e.target.value);
                        setError('');
                      }}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Password field */}
                {authMethod === 'password' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-ink">
                        {lang === 'hi' ? 'पासवर्ड' : 'Password'}
                      </label>
                      <button
                        type="button"
                        className="text-xs text-forest hover:underline"
                        onClick={() => setAuthMethod('otp')}
                      >
                        {lang === 'hi' ? 'OTP से लॉगिन?' : 'Use OTP instead?'}
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                        <Lock size={16} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-9 pr-10 py-2.5 text-sm bg-paper-warm border border-rule rounded-xl focus:bg-white focus:outline-none focus:border-forest transition-all"
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

                {/* OTP Mode */}
                {authMethod === 'otp' && (
                  <div className="pt-1">
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="btn btn-outline btn-block text-xs py-2 rounded-xl"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Sending...' : (lang === 'hi' ? '6-अंकों का OTP भेजें' : 'Send 6-Digit OTP')}
                      </button>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-xs font-semibold text-ink">
                            {lang === 'hi' ? 'OTP दर्ज करें (डेमो: 123456)' : 'Enter 6-digit OTP (Demo: 123456)'}
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
                              className="w-10 h-11 text-center font-bold text-base border border-rule rounded-xl focus:border-forest focus:outline-none bg-paper-warm focus:bg-white"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {error && <p className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-xl border border-red-200">{error}</p>}

                <button
                  type="submit"
                  className="btn btn-primary btn-block py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (lang === 'hi' ? 'सत्यापित हो रहा है...' : 'Verifying...') 
                    : (lang === 'hi' ? 'लॉगिन करें' : 'Log In')}
                </button>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    {lang === 'hi' ? 'पूरा नाम' : 'Full Name'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-paper-warm border border-rule rounded-xl focus:bg-white focus:outline-none focus:border-forest transition-all"
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

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    {lang === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted font-medium text-xs">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      className="w-full pl-12 pr-3 py-2 text-sm bg-paper-warm border border-rule rounded-xl focus:bg-white focus:outline-none focus:border-forest transition-all"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, ''));
                        setError('');
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    {lang === 'hi' ? 'ईमेल (वैकल्पिक)' : 'Email (Optional)'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-paper-warm border border-rule rounded-xl focus:bg-white focus:outline-none focus:border-forest transition-all"
                      placeholder="priya@example.com"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    {lang === 'hi' ? 'पासवर्ड बनाएं' : 'Create Password'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-9 pr-10 py-2 text-sm bg-paper-warm border border-rule rounded-xl focus:bg-white focus:outline-none focus:border-forest transition-all"
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

                {error && <p className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-xl border border-red-200">{error}</p>}

                <button
                  type="submit"
                  className="btn btn-primary btn-block py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (lang === 'hi' ? 'खाता बन रहा है...' : 'Creating Account...') 
                    : (lang === 'hi' ? 'साइनअप करें और ₹200 पाएं' : 'Sign Up & Get ₹200 Credits')}
                </button>
              </form>
            )}

            {/* Footer privacy guarantee */}
            <div className="mt-6 pt-4 border-t border-rule flex items-center justify-center gap-1.5 text-xs text-muted">
              <ShieldCheck size={14} className="text-forest" />
              <span>{lang === 'hi' ? 'सुरक्षित और प्राइवेट लॉगिन • कोई स्पैम नहीं' : 'Secure & Private login • Zero Spam'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
