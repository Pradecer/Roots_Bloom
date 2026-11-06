import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles } from 'lucide-react';
import { LoginForm } from './auth/LoginForm';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    lang 
  } = useApp();

  const handleClose = () => {
    setIsAuthModalOpen(false);
    try {
      sessionStorage.setItem('rb_login_popup_dismissed', 'true');
    } catch {
      // storage quota or private window
    }
  };

  // Scroll lock & Escape key listener
  useEffect(() => {
    if (!isAuthModalOpen) return;

    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard Escape listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md animate-fadeIn transition-all"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-login-heading"
    >
      {/* Floating Card Modal Container */}
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-rule/80 relative animate-scaleUp transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Circular floating top-right (reference Homage style) */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-paper-warm hover:bg-rule/60 text-ink/70 hover:text-ink flex items-center justify-center transition-all shadow-xs"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Modal Top Header with Brand Badge */}
        <div className="pt-8 pb-4 px-6 sm:px-8 text-center bg-gradient-to-b from-paper-warm/50 to-white border-b border-rule/40">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-forest-subtle text-forest mb-3 shadow-xs border border-forest/10">
            <span className="font-serif font-black text-xl tracking-tighter">RB</span>
          </div>

          <h3 id="modal-login-heading" className="text-2xl font-serif font-bold text-ink tracking-tight">
            {lang === 'hi' ? 'वापसी पर स्वागत है' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-muted mt-1 leading-relaxed max-w-xs mx-auto">
            {lang === 'hi' 
              ? 'अपने ऑर्डर्स और विशलिस्ट को एक्सेस करने के लिए साइन इन करें।' 
              : 'Sign in to continue to your account and track your living planters.'}
          </p>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 pt-5">
          <LoginForm 
            onSuccess={() => handleClose()} 
            showHeading={false}
          />
        </div>
      </div>
    </div>
  );
};
