import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Package, 
  MapPin, 
  Share2, 
  Languages, 
  MessageSquare, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Award,
  ArrowLeft
} from 'lucide-react';

export const AccountPage = () => {
  const { 
    user, 
    setUser, 
    orders, 
    addresses, 
    navigateTo, 
    goBack,
    toggleLanguage, 
    lang, 
    t, 
    setIsAuthModalOpen,
    showToast 
  } = useApp();

  const handleLogout = () => {
    setUser({ phone: '', name: 'Guest User', isLoggedIn: false, credits: 0 });
    showToast(lang === 'hi' ? 'लॉगआउट हो गया' : 'Logged out successfully');
  };

  return (
    <div className="account-page-container py-4">
      <div className="container max-w-2xl mx-auto">
        <div className="breadcrumb-bar mb-3">
          <button 
            onClick={goBack} 
            className="pdp-back-btn flex items-center gap-1"
            title={t('back')}
          >
            <ArrowLeft size={16} />
            <span>{t('back')}</span>
          </button>
        </div>
        {/* User Profile Card */}
        <div className="user-profile-header-card p-4 border rounded-md bg-white mb-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="avatar-box">
              <User size={28} className="text-forest" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{user?.name || 'Priya Sharma'}</h2>
              <span className="text-xs text-muted">+91 {user?.phone || '9876543210'}</span>
              <div className="credits-chip mt-1">
                <Award size={12} className="text-marigold" />
                <span>{lang === 'hi' ? 'वॉलेट क्रेडिट्स:' : 'Store Credits:'} <strong>₹{user?.credits || 150}</strong></span>
              </div>
            </div>
          </div>

          {!user?.isLoggedIn ? (
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setIsAuthModalOpen(true)}
            >
              {t('loginSignup')}
            </button>
          ) : (
            <button 
              className="btn btn-outline-neutral btn-sm flex items-center gap-1 text-crimson"
              onClick={handleLogout}
            >
              <LogOut size={14} />
              <span>{lang === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
            </button>
          )}
        </div>

        {/* Quick Menu Links */}
        <div className="account-menu-list border rounded-md bg-white mb-4 divide-y">
          <div 
            className="menu-item p-3 flex items-center justify-between cursor-pointer hover:bg-surface-muted"
            onClick={() => navigateTo('order-tracking')}
          >
            <div className="flex items-center gap-3">
              <Package size={18} className="text-forest" />
              <div>
                <strong className="text-sm">{t('myOrders')}</strong>
                <span className="text-xs text-muted block">{orders.length} {lang === 'hi' ? 'ऑर्डर्स दर्ज हैं' : 'active orders'}</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </div>

          <div 
            className="menu-item p-3 flex items-center justify-between cursor-pointer hover:bg-surface-muted"
            onClick={() => navigateTo('referral')}
          >
            <div className="flex items-center gap-3">
              <Share2 size={18} className="text-marigold" />
              <div>
                <strong className="text-sm">{t('referAndEarn')}</strong>
                <span className="text-xs text-muted block">{lang === 'hi' ? 'मित्रों को शेयर करें और स्टोर क्रेडिट्स पाएं' : 'Share WhatsApp catalog & earn ₹150 credits'}</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </div>

          <div 
            className="menu-item p-3 flex items-center justify-between cursor-pointer hover:bg-surface-muted"
            onClick={toggleLanguage}
          >
            <div className="flex items-center gap-3">
              <Languages size={18} className="text-forest" />
              <div>
                <strong className="text-sm">{lang === 'hi' ? 'भाषा: हिंदी' : 'Language: English'}</strong>
                <span className="text-xs text-muted block">{lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}</span>
              </div>
            </div>
            <span className="text-xs text-forest font-bold">{t('switchToHindi')}</span>
          </div>

          <div 
            className="menu-item p-3 flex items-center justify-between cursor-pointer hover:bg-surface-muted"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=919876543210', '_blank')}
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={18} className="text-success" />
              <div>
                <strong className="text-sm">{t('helpSupport')}</strong>
                <span className="text-xs text-muted block">{lang === 'hi' ? 'व्हाट्सएप पर सहायता (10 AM - 8 PM)' : 'Live WhatsApp assistance for plant care & orders'}</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </div>
        </div>

        {/* Saved Addresses Summary */}
        <div className="saved-addresses-card p-4 border rounded-md bg-white mb-4">
          <div className="flex items-center justify-between border-b pb-2 mb-3">
            <h3 className="section-title text-sm flex items-center gap-2">
              <MapPin size={16} className="text-forest" />
              <span>{t('savedAddresses')} ({addresses.length})</span>
            </h3>
          </div>

          <div className="address-list space-y-2">
            {addresses.map((addr) => (
              <div key={addr.id} className="p-3 border rounded bg-surface-muted text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold">{addr.name} ({addr.label})</strong>
                  <span className="text-muted">{addr.phone}</span>
                </div>
                <p className="text-secondary mt-1">{addr.line1}, {addr.line2}</p>
                <p className="text-secondary">{addr.city}, {addr.state} - {addr.pincode}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
