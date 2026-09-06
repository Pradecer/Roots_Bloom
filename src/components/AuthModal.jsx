import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    user, 
    setUser, 
    showToast,
    lang 
  } = useApp();

  const [step, setStep] = useState('phone'); // phone | otp | success
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (/^\d{10}$/.test(phoneNumber)) {
      setStep('otp');
      setError('');
      showToast(lang === 'hi' ? '6-अंकों का OTP भेजा गया (डेमो: 123456)' : '6-digit OTP sent (Demo OTP: 123456)');
    } else {
      setError(lang === 'hi' ? 'कृपया 10-अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit Indian mobile number');
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      setUser({
        ...user,
        phone: phoneNumber,
        name: user?.name || 'Priya Sharma',
        isLoggedIn: true
      });
      setStep('success');
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setStep('phone');
        showToast(lang === 'hi' ? 'सफलतापूर्वक लॉगिन हो गया!' : 'Successfully logged in!');
      }, 1200);
    } else {
      setError(lang === 'hi' ? 'कृपया पूरा 6-अंकों का OTP दर्ज करें' : 'Please enter the complete 6-digit OTP');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <Smartphone size={18} className="text-forest" />
            <h3 className="modal-title">{lang === 'hi' ? 'लॉगिन / साइन अप' : 'Quick OTP Login'}</h3>
          </div>
          <button className="modal-close-btn" onClick={() => setIsAuthModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {step === 'phone' && (
            <form onSubmit={handleSendOtp}>
              <p className="modal-desc">
                {lang === 'hi' 
                  ? 'अपने ऑर्डर्स, विशलिस्ट और रेफरल रिवार्ड्स को एक्सेस करने के लिए 10-अंकों का मोबाइल नंबर दर्ज करें।'
                  : 'Enter your 10-digit mobile number to access your orders, saved planters, and referral rewards.'}
              </p>

              <div className="phone-input-wrap mt-3">
                <span className="phone-prefix">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  className="phone-field"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  autoFocus
                />
              </div>
              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="btn btn-primary btn-block mt-4">
                {lang === 'hi' ? 'OTP प्राप्त करें' : 'Get 6-Digit OTP'}
              </button>

              <div className="auth-privacy-note mt-3">
                <ShieldCheck size={14} />
                <span>{lang === 'hi' ? 'हम आपके डेटा को 100% सुरक्षित और गोपनीय रखते हैं' : 'Zero Spam. We keep your personal details 100% safe & encrypted.'}</span>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp}>
              <p className="modal-desc">
                {lang === 'hi' 
                  ? `+91 ${phoneNumber} पर भेजा गया 6-अंकों का OTP दर्ज करें (डेमो: 123456)`
                  : `Enter the 6-digit OTP sent to +91 ${phoneNumber} (Demo OTP: 123456)`}
              </p>

              <div className="otp-inputs-row mt-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="otp-box"
                  />
                ))}
              </div>
              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="btn btn-primary btn-block mt-4">
                {lang === 'hi' ? 'सत्यापित करें और आगे बढ़ें' : 'Verify & Proceed'}
              </button>

              <button 
                type="button" 
                className="btn btn-link text-center btn-block mt-2 text-forest"
                onClick={() => setStep('phone')}
              >
                {lang === 'hi' ? 'नंबर बदलें' : 'Change Phone Number'}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="auth-success-state py-4 text-center">
              <CheckCircle2 size={48} className="text-success mx-auto mb-2" />
              <h4 className="text-lg font-bold">{lang === 'hi' ? 'लॉगिन सफल रहा!' : 'Login Successful!'}</h4>
              <p className="text-muted text-sm">{lang === 'hi' ? 'आपका अकाउंट तैयार है' : 'Welcome back to Roots_Bloom'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
