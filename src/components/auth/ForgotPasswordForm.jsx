import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2, Send, Loader2 } from 'lucide-react';
import { AuthFormField } from './AuthFormField';

export const ForgotPasswordForm = ({ onBackToLogin, lang = 'en' }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const clean = email.trim();
    if (!clean) {
      setError(lang === 'hi' ? 'कृपया अपना ईमेल पता दर्ज करें' : 'Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(clean)) {
      setError(lang === 'hi' ? 'कृपया एक वैध ईमेल पता दर्ज करें' : 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-4 animate-fadeIn">
        <div className="w-14 h-14 bg-emerald-50 text-success rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 size={32} />
        </div>
        <h4 className="text-xl font-serif font-bold text-ink mb-1.5">
          {lang === 'hi' ? 'रीसेट लिंक भेजा गया!' : 'Reset Link Sent!'}
        </h4>
        <p className="text-xs text-muted leading-relaxed max-w-sm mx-auto mb-6">
          {lang === 'hi' 
            ? `हमने ${email} पर पासवर्ड रीसेट लिंक भेजा है। कृपया अपना इनबॉक्स या स्पैम फोल्डर चेक करें।` 
            : `We have sent password recovery instructions to ${email}. Please check your inbox or spam folder.`}
        </p>
        <button
          type="button"
          onClick={onBackToLogin}
          className="btn btn-outline btn-block py-2.5 rounded-xl text-xs font-semibold"
        >
          {lang === 'hi' ? 'साइन इन पर वापस जाएं' : 'Back to Sign In'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fadeIn">
      <div className="text-center mb-5">
        <h4 className="text-xl font-serif font-bold text-ink">
          {lang === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Your Password?'}
        </h4>
        <p className="text-xs text-muted mt-1 leading-relaxed">
          {lang === 'hi' 
            ? 'अपना रजिस्टर्ड ईमेल दर्ज करें और हम आपको रीसेट लिंक भेजेंगे।' 
            : 'Enter your registered email address and we will send you instructions to reset your password.'}
        </p>
      </div>

      <AuthFormField
        id="forgot-email"
        label={lang === 'hi' ? 'ईमेल पता' : 'Email Address'}
        type="email"
        placeholder="name@domain.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
        error={error}
        required
        leadingIcon={Mail}
        autoFocus
      />

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary btn-block py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>{lang === 'hi' ? 'भेजा जा रहा है...' : 'Sending Link...'}</span>
          </>
        ) : (
          <>
            <span>{lang === 'hi' ? 'रीसेट लिंक भेजें' : 'Send Reset Link'}</span>
            <Send size={14} />
          </>
        )}
      </button>

      <div className="text-center mt-5 pt-3 border-t border-rule">
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center gap-1.5 text-xs text-forest hover:text-accent-clay font-semibold transition-colors"
        >
          <ArrowLeft size={13} />
          <span>{lang === 'hi' ? 'लॉगिन पर वापस जाएं' : 'Back to Login'}</span>
        </button>
      </div>
    </form>
  );
};

