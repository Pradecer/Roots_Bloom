import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Smartphone, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Loader2, 
  ArrowRight,
  Check
} from 'lucide-react';
import { AuthFormField } from './AuthFormField';
import { PasswordInput } from './PasswordInput';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const LoginForm = ({ 
  onSuccess, 
  initialMode = 'login',
  showHeading = false
}) => {
  const { loginUser, lang, showToast } = useApp();

  const [view, setView] = useState('auth'); // 'auth' | 'forgot'
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  
  // Fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  
  // States
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (mode === 'register') {
      if (!name.trim()) {
        errs.name = lang === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'Full name is required';
      }
      const cleanPhone = phone.replace(/\D/g, '');
      if (!/^\d{10}$/.test(cleanPhone)) {
        errs.phone = lang === 'hi' ? '10-अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Valid 10-digit phone number is required';
      }
    }

    const cleanId = identifier.trim();
    if (!cleanId) {
      errs.identifier = lang === 'hi' ? 'ईमेल या मोबाइल नंबर दर्ज करें' : 'Email or mobile number is required';
    } else {
      const isEmail = cleanId.includes('@');
      const isPhone = /^\d{10}$/.test(cleanId.replace(/\D/g, ''));
      if (isEmail && !/\S+@\S+\.\S+/.test(cleanId)) {
        errs.identifier = lang === 'hi' ? 'कृपया वैध ईमेल पता दर्ज करें' : 'Enter a valid email address';
      } else if (!isEmail && !isPhone) {
        errs.identifier = lang === 'hi' ? '10-अंकों का मोबाइल या वैध ईमेल दर्ज करें' : 'Enter 10-digit mobile or valid email';
      }
    }

    if (!password) {
      errs.password = lang === 'hi' ? 'पासवर्ड दर्ज करना आवश्यक है' : 'Password is required';
    } else if (password.length < 4) {
      errs.password = lang === 'hi' ? 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए' : 'Password must be at least 4 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    if (!isSupabaseConfigured) {
      showToast(
        lang === 'hi' 
          ? 'कृपया .env फाइल में Supabase URL और Anon Key जोड़ें।' 
          : 'Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const cleanInput = identifier.trim();

      if (mode === 'login') {
        const userEmail = cleanInput.includes('@') ? cleanInput : `${cleanInput.replace(/\D/g, '')}@rootsbloom.local`;
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userEmail,
          password: password,
        });

        if (error) {
          setServerError(error.message);
          setIsLoading(false);
          return;
        }

        const profileName = data.user?.user_metadata?.full_name || data.user?.user_metadata?.name || data.user?.email?.split('@')[0] || 'Valued Customer';
        const userObj = {
          id: data.user?.id,
          name: profileName,
          phone: data.user?.user_metadata?.phone || '',
          email: data.user?.email,
          credits: 100
        };
        loginUser(userObj);
        showToast(lang === 'hi' ? `स्वागत है, ${profileName}!` : `Welcome back, ${profileName}!`);
        if (onSuccess) onSuccess(userObj);
      } else {
        // Register Mode
        const cleanPhone = phone.replace(/\D/g, '');
        const userEmail = cleanInput.includes('@') ? cleanInput : `${cleanPhone}@rootsbloom.local`;
        const { data, error } = await supabase.auth.signUp({
          email: userEmail,
          password: password,
          options: {
            data: {
              full_name: name.trim(),
              phone: cleanPhone,
            }
          }
        });

        if (error) {
          setServerError(error.message);
          setIsLoading(false);
          return;
        }

        const profileName = name.trim();
        const newUser = {
          id: data.user?.id,
          name: profileName,
          phone: cleanPhone,
          email: userEmail,
          credits: 200
        };

        loginUser(newUser);
        showToast(lang === 'hi' ? 'खाता बन गया! ₹200 का वेलकम बोनस मिला' : 'Account created! ₹200 welcome bonus added');
        if (onSuccess) onSuccess(newUser);
      }
    } catch (err) {
      setServerError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (view === 'forgot') {
    return (
      <ForgotPasswordForm 
        onBackToLogin={() => setView('auth')} 
        lang={lang} 
      />
    );
  }

  return (
    <div className="login-form-container">
      {/* Optional In-Card Header */}
      {showHeading && (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-serif font-bold text-ink">
            {mode === 'login'
              ? (lang === 'hi' ? 'वापसी पर स्वागत है' : 'Welcome Back')
              : (lang === 'hi' ? 'नया खाता बनाएं' : 'Create Your Account')}
          </h3>
          <p className="text-xs text-muted mt-1">
            {mode === 'login'
              ? (lang === 'hi' ? 'अपने अकाउंट में जारी रखने के लिए साइन इन करें।' : 'Sign in to continue to your account.')
              : (lang === 'hi' ? 'साइन अप करें और अपने पहले ऑर्डर पर ₹200 पाएं।' : 'Join today and get ₹200 welcome credit.')}
          </p>
        </div>
      )}

      {serverError && (
        <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium animate-fadeIn">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {mode === 'register' && (
          <>
            <AuthFormField
              id="auth-name"
              label={lang === 'hi' ? 'पूरा नाम' : 'Full Name'}
              placeholder="e.g. Rahul Verma"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              error={errors.name}
              required
              leadingIcon={User}
              autoFocus
            />

            <AuthFormField
              id="auth-phone"
              label={lang === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, ''));
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              error={errors.phone}
              required
              leadingIcon={Smartphone}
            />
          </>
        )}

        {/* Email or Phone Input */}
        <AuthFormField
          id="auth-identifier"
          label={mode === 'register' 
            ? (lang === 'hi' ? 'ईमेल पता (वैकल्पिक)' : 'Email Address (Optional)')
            : (lang === 'hi' ? 'ईमेल या मोबाइल नंबर' : 'Email / Mobile Number')}
          type="text"
          placeholder={mode === 'register' ? 'name@domain.com' : 'Enter email or mobile number'}
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (errors.identifier) setErrors({ ...errors, identifier: '' });
          }}
          error={errors.identifier}
          required={mode === 'login'}
          leadingIcon={Smartphone}
          autoFocus={mode === 'login'}
        />

        {/* Password Input */}
        <PasswordInput
          id="auth-password"
          label={lang === 'hi' ? 'पासवर्ड' : 'Password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          error={errors.password}
          required
        />

        {/* Remember Me & Forgot Password Row */}
        {mode === 'login' && (
          <div className="flex items-center justify-between mt-1 mb-5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none text-ink-secondary">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${
                rememberMe ? 'bg-forest border-forest text-white' : 'border-rule bg-white'
              }`}>
                {rememberMe && <Check size={12} strokeWidth={3} />}
              </div>
              <span className="text-[11px] font-medium">{lang === 'hi' ? 'मुझे याद रखें' : 'Remember Me'}</span>
            </label>

            <button
              type="button"
              onClick={() => setView('forgot')}
              className="text-[11px] font-semibold text-forest hover:text-accent-clay transition-colors hover:underline"
            >
              {lang === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
            </button>
          </div>
        )}

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary btn-block py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>{lang === 'hi' ? 'प्रक्रिया जारी है...' : 'Signing in...'}</span>
            </>
          ) : (
            <>
              <span>
                {mode === 'login' 
                  ? (lang === 'hi' ? 'साइन इन करें' : 'Sign In') 
                  : (lang === 'hi' ? 'अकाउंट बनाएं' : 'Create Account')}
              </span>
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      {/* Switch Mode Link */}
      <div className="text-center mt-5 pt-3 border-t border-rule text-xs text-muted">
        {mode === 'login' ? (
          <span>
            {lang === 'hi' ? 'नए ग्राहक हैं? ' : 'New to Roots_Bloom? '}
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrors({});
              }}
              className="font-bold text-forest hover:text-accent-clay transition-colors hover:underline ml-1"
            >
              {lang === 'hi' ? 'नया खाता बनाएं' : 'Create an Account'}
            </button>
          </span>
        ) : (
          <span>
            {lang === 'hi' ? 'पहले से खाता है? ' : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrors({});
              }}
              className="font-bold text-forest hover:text-accent-clay transition-colors hover:underline ml-1"
            >
              {lang === 'hi' ? 'साइन इन करें' : 'Sign In'}
            </button>
          </span>
        )}
      </div>

      {/* Security Footnote */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted">
        <ShieldCheck size={13} className="text-forest" />
        <span>{lang === 'hi' ? '100% सुरक्षित और एन्क्रिप्टेड क्रेडेंशियल्स' : '100% Encrypted & Secure Authentication'}</span>
      </div>
    </div>
  );
};

