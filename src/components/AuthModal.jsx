import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  ArrowRight,
  Gift
} from 'lucide-react';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    user, 
    loginUser, 
    showToast,
    navigateTo,
    lang 
  } = useApp();

  const [method, setMethod] = useState('otp'); // 'otp' | 'password'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState('input'); // 'input' | 'otp' | 'success'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    sessionStorage.setItem('rb_login_popup_dismissed', 'true');
  };

  const handleQuickDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser({
        name: 'Priya Sharma',
        phone: '9876543210',
        email: 'priya@rootsbloom.com',
        credits: 150
      });
      setStep('success');
      setTimeout(() => {
        handleClose();
        showToast(lang === 'hi' ? 'स्वागत है, Priya Sharma!' : 'Welcome back, Priya Sharma!');
      }, 900);
    }, 400);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const clean = phoneNumber.replace(/\D/g, '');
    if (/^\d{10}$/.test(clean)) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
        setError('');
        showToast(lang === 'hi' ? 'OTP भेजा गया! (डेमो: 123456)' : 'OTP sent (Demo OTP: 123456)');
      }, 400);
    } else {
      setError(lang === 'hi' ? 'कृपया 10-अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit phone number');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp === '123456' || enteredOtp.length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        loginUser({
          phone: phoneNumber.replace(/\D/g, ''),
          name: 'Green Enthusiast',
          credits: 150
        });
        setStep('success');
        setTimeout(() => {
          handleClose();
          showToast(lang === 'hi' ? 'सफलतापूर्वक लॉगिन हो गया!' : 'Successfully logged in!');
        }, 900);
      }, 400);
    } else {
      setError(lang === 'hi' ? 'गलत OTP! डेमो OTP दर्ज करें: 123456' : 'Invalid OTP! Use demo OTP: 123456');
    }
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError(lang === 'hi' ? 'कृपया मोबाइल नंबर दर्ज करें' : 'Please enter phone number');
      return;
    }
    if (!password) {
      setError(lang === 'hi' ? 'कृपया पासवर्ड दर्ज करें' : 'Please enter password');
      return;
    }
    handleQuickDemo();
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`modal-otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-rule relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Canva gradient styling */}
        <div className="bg-gradient-to-r from-brand-forest to-[#1E4734] p-6 text-white text-center relative">
          <button 
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={handleClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-emerald-200 mb-2">
            <Gift size={13} className="text-marigold" />
            <span>{lang === 'hi' ? '₹200 वेलकम वाउचर' : 'Flat ₹200 Welcome Gift'}</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white tracking-tight">Roots_Bloom</h3>
          <p className="text-xs text-white/80 mt-1">
            {lang === 'hi' 
              ? 'लॉगिन करें और तुरंत अपने पहले ऑर्डर पर ₹200 की छूट पाएं' 
              : 'Log in to unlock exclusive botanical discounts & order tracking'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'input' && (
            <div>
              {/* 1-Click Quick Demo Button */}
              <button
                type="button"
                onClick={handleQuickDemo}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 mb-4 bg-paper-warm hover:bg-rule/40 border border-rule rounded-xl text-xs font-semibold text-ink transition-all shadow-xs"
              >
                <Sparkles size={15} className="text-marigold" />
                <span>{lang === 'hi' ? '1-क्लिक डेमो लॉगिन (Priya Sharma)' : '1-Click Instant Demo Login'}</span>
              </button>

              <div className="relative flex items-center justify-center mb-4">
                <div className="border-t border-rule w-full" />
                <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-muted font-medium absolute">
                  {lang === 'hi' ? 'या मोबाइल से जारी रखें' : 'or continue with phone'}
                </span>
              </div>

              <form onSubmit={method === 'otp' ? handleSendOtp : handlePasswordLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    {lang === 'hi' ? '10-अंकों का मोबाइल नंबर' : '10-Digit Mobile Number'}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-medium text-muted">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      className="w-full pl-11 pr-3 py-2.5 text-sm bg-paper-warm border border-rule rounded-xl focus:bg-white focus:outline-none focus:border-forest transition-all"
                      placeholder="9876543210"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value.replace(/\D/g, ''));
                        setError('');
                      }}
                      autoFocus
                    />
                  </div>
                </div>

                {error && <p className="text-xs text-red-600 font-medium bg-red-50 p-2 rounded-lg border border-red-200">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-block py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  {isLoading ? '...' : (lang === 'hi' ? 'OTP प्राप्त करें' : 'Get 6-Digit OTP')}
                </button>
              </form>

              {/* Link to Full Canva-Style Login Page */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigateTo('login');
                  }}
                  className="text-xs text-forest hover:text-accent-clay font-medium inline-flex items-center gap-1 hover:underline"
                >
                  <span>{lang === 'hi' ? 'पासवर्ड या नया खाता बनाने के लिए यहां क्लिक करें' : 'Prefer password login or want to sign up?'}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-xs text-center text-muted">
                {lang === 'hi' 
                  ? `+91 ${phoneNumber} पर भेजा गया 6-अंकों का OTP दर्ज करें (डेमो: 123456)`
                  : `Enter the 6-digit OTP sent to +91 ${phoneNumber} (Demo: 123456)`}
              </p>

              <div className="flex gap-2 justify-between">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`modal-otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-10 h-11 text-center font-bold text-base border border-rule rounded-xl focus:border-forest focus:outline-none bg-paper-warm focus:bg-white"
                  />
                ))}
              </div>

              {error && <p className="text-xs text-red-600 font-medium bg-red-50 p-2 rounded-lg border border-red-200">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-block py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? '...' : (lang === 'hi' ? 'सत्यापित करें' : 'Verify & Continue')}
              </button>

              <div className="flex justify-between items-center text-xs text-muted pt-1">
                <button
                  type="button"
                  className="text-forest hover:underline"
                  onClick={() => setStep('input')}
                >
                  {lang === 'hi' ? 'नंबर बदलें' : 'Change Number'}
                </button>
                <button
                  type="button"
                  className="text-forest hover:underline"
                  onClick={handleSendOtp}
                >
                  {lang === 'hi' ? 'पुनः भेजें' : 'Resend OTP'}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-forest rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-xl font-serif font-bold text-ink">
                {lang === 'hi' ? 'लॉगिन सफल!' : 'Login Successful!'}
              </h4>
              <p className="text-xs text-muted mt-1">
                {lang === 'hi' ? 'आपकी ₹200 की छूट एक्टिवेट हो गई है' : 'Welcome back to Roots_Bloom'}
              </p>
            </div>
          )}

          {/* Privacy Note */}
          <div className="mt-4 pt-3 border-t border-rule text-center">
            <span className="text-[11px] text-muted flex items-center justify-center gap-1">
              <ShieldCheck size={13} className="text-forest" />
              {lang === 'hi' ? '100% सुरक्षित और प्राइवेट' : '100% Encrypted & Private'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
