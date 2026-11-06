import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Leaf, 
  Truck, 
  ShieldCheck, 
  Heart
} from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage = () => {
  const { user, navigateTo, goBack, lang } = useApp();

  // If already logged in, show personalized account card
  if (user?.isLoggedIn) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl border border-rule shadow-sm">
          <div className="w-16 h-16 bg-brand-forest-subtle text-forest rounded-2xl flex items-center justify-center mx-auto mb-4 border border-forest/10">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-ink mb-2">
            {lang === 'hi' ? 'आप पहले से लॉगिन हैं' : 'You are currently logged in'}
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

  return (
    <div className="dedicated-login-page min-h-[90vh] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* 2-Column Desktop Composition */}
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl border border-rule overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* LEFT BRAND VISUAL PANEL */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#162B20] via-[#22533C] to-[#1E4734] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-accent-clay/10 pointer-events-none blur-3xl" />

          {/* Top Brand & Back Bar */}
          <div className="relative z-10">
            <button 
              onClick={goBack} 
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white mb-6 transition-colors bg-white/10 px-3 py-1.5 rounded-full"
            >
              <ArrowLeft size={14} />
              <span>{lang === 'hi' ? 'दुकान पर वापस जाएं' : 'Back to Store'}</span>
            </button>
            <div className="brand-logo-text text-3xl font-serif text-white tracking-tight">Roots_Bloom</div>
            <p className="text-xs text-white/70 mt-1 uppercase tracking-wider font-medium">Handcrafted Living Miniature Art</p>
          </div>

          {/* Center Showcase Inspiration */}
          <div className="my-8 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-emerald-200 mb-3 border border-white/10">
              <Sparkles size={13} className="text-marigold" />
              <span>{lang === 'hi' ? 'प्राकृतिक सुकून' : 'Breathe Life Into Your Space'}</span>
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white leading-tight">
              {lang === 'hi' 
                ? 'जीवित पौधे, शांत मन और भावनात्मक सजावट।' 
                : 'Living miniature gardens crafted to bring peace & love home.'}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-3 leading-relaxed">
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
              <span>Pan-India Safe Transit</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink tracking-tight">
                {lang === 'hi' ? 'वापसी पर स्वागत है' : 'Welcome Back'}
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                {lang === 'hi' 
                  ? 'अपने ऑर्डर्स, डिलीवरी ट्रैकिंग और विशलिस्ट को एक्सेस करने के लिए साइन इन करें।' 
                  : 'Sign in to continue to your account and manage your handcrafted orders.'}
              </p>
            </div>

            {/* Shared Reusable LoginForm */}
            <LoginForm 
              onSuccess={() => navigateTo('account')} 
              showHeading={false} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};
