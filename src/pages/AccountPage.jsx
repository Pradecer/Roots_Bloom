import React, { useState } from 'react';
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
  Award,
  ArrowLeft,
  Plus,
  Trash2
} from 'lucide-react';

export const AccountPage = () => {
  const { 
    user, 
    logoutUser, 
    orders, 
    addresses, 
    saveAddress,
    deleteAddress,
    pincode,
    navigateTo, 
    goBack,
    toggleLanguage, 
    lang, 
    t, 
    setIsAuthModalOpen,
    showToast 
  } = useApp();

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: 'Home',
    name: user?.name && user.name !== 'Guest User' ? user.name : '',
    phone: user?.phone || '',
    line1: '',
    line2: '',
    pincode: pincode || '110001',
    city: '',
    state: ''
  });

  const handleLogout = () => {
    logoutUser();
    navigateTo('login');
    showToast(lang === 'hi' ? 'लॉगआउट हो गया' : 'Logged out successfully');
  };

  const handleAddAddressSubmit = async (e) => {
    e.preventDefault();
    if (!newAddr.name.trim() || !newAddr.phone.trim() || !newAddr.line1.trim() || !newAddr.city.trim() || !newAddr.pincode.trim()) {
      showToast(lang === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें' : 'Please fill all required fields');
      return;
    }

    await saveAddress({
      ...newAddr,
      isDefault: addresses.length === 0
    });

    setIsAddingAddress(false);
    setNewAddr({
      label: 'Home',
      name: user?.name && user.name !== 'Guest User' ? user.name : '',
      phone: user?.phone || '',
      line1: '',
      line2: '',
      pincode: pincode || '110001',
      city: '',
      state: ''
    });
  };

  const displayName = user?.isLoggedIn
    ? (user.name || user.email?.split('@')[0] || (lang === 'hi' ? 'प्रिय ग्राहक' : 'Valued Customer'))
    : (lang === 'hi' ? 'अतिथि (Guest)' : 'Guest User');

  const displayContact = user?.phone 
    ? `+91 ${user.phone}` 
    : (user?.email || (lang === 'hi' ? 'लॉगिन नहीं किया है' : 'Not signed in'));

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
              <h2 className="text-lg font-bold">{displayName}</h2>
              <span className="text-xs text-muted">{displayContact}</span>
              {user?.isLoggedIn && (
                <div className="credits-chip mt-1">
                  <Award size={12} className="text-marigold" />
                  <span>{lang === 'hi' ? 'वॉलेट क्रेडिट्स:' : 'Store Credits:'} <strong>₹{user?.credits || 150}</strong></span>
                </div>
              )}
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
                <span className="text-xs text-muted block">
                  {orders.length} {lang === 'hi' ? 'ऑर्डर्स दर्ज हैं' : 'active orders'}
                </span>
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
                <span className="text-xs text-muted block">
                  {lang === 'hi' ? 'मित्रों को शेयर करें और स्टोर क्रेडिट्स पाएं' : 'Share WhatsApp catalog & earn ₹150 credits'}
                </span>
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
            onClick={() => window.open('https://www.whatsapp.com/catalog/918527733901/?app_absent=0', '_blank')}
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={18} className="text-success" />
              <div>
                <strong className="text-sm">{t('helpSupport')}</strong>
                <span className="text-xs text-muted block">
                  {lang === 'hi' ? 'व्हाट्सएप पर सहायता (10 AM - 8 PM)' : 'Live WhatsApp assistance for plant care & orders'}
                </span>
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
            {!isAddingAddress && (
              <button 
                className="btn btn-outline-neutral btn-sm flex items-center gap-1 text-xs"
                onClick={() => setIsAddingAddress(true)}
              >
                <Plus size={14} />
                <span>{lang === 'hi' ? 'नया पता जोड़ें' : 'Add New Address'}</span>
              </button>
            )}
          </div>

          {isAddingAddress && (
            <form onSubmit={handleAddAddressSubmit} className="p-3 mb-3 border rounded bg-surface-muted text-xs">
              <h4 className="font-bold mb-2 text-forest">{lang === 'hi' ? 'नया डिलीवरी पता' : 'New Delivery Address'}</h4>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  className="form-control text-xs"
                  required
                />
                <input
                  type="tel"
                  placeholder="10-Digit Mobile"
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="form-control text-xs"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="House / Flat / Building / Floor"
                value={newAddr.line1}
                onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })}
                className="form-control text-xs mb-2"
                required
              />
              <input
                type="text"
                placeholder="Street / Colony / Landmark (Optional)"
                value={newAddr.line2}
                onChange={(e) => setNewAddr({ ...newAddr, line2: e.target.value })}
                className="form-control text-xs mb-2"
              />
              <div className="grid grid-cols-3 gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Pincode"
                  value={newAddr.pincode}
                  onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                  className="form-control text-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="form-control text-xs"
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  className="form-control text-xs"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary btn-sm flex-1">
                  {lang === 'hi' ? 'सुरक्षित करें' : 'Save Address'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-neutral btn-sm"
                  onClick={() => setIsAddingAddress(false)}
                >
                  {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
              </div>
            </form>
          )}

          <div className="address-list space-y-2">
            {addresses.length === 0 ? (
              <div className="p-4 border rounded border-dashed text-center bg-surface-muted text-xs text-muted">
                {lang === 'hi' 
                  ? 'आपने अभी तक कोई पता नहीं सहेजा है। बार-बार टाइप करने से बचने के लिए अपना होम एड्रेस जोड़ें।' 
                  : 'No delivery addresses saved yet. Add your home location to enjoy 1-click checkout from any device.'}
              </div>
            ) : (
              addresses.map((addr) => (
                <div key={addr.id} className="p-3 border rounded bg-surface-muted text-xs flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold text-dark">{addr.name}</strong>
                      <span className="badge-chip">{addr.label || 'Home'}</span>
                      <span className="text-muted">{addr.phone}</span>
                    </div>
                    <p className="text-secondary mt-1">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                    <p className="text-secondary">{addr.city}{addr.state ? `, ${addr.state}` : ''} - <strong>{addr.pincode}</strong></p>
                  </div>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="p-1 text-muted hover:text-crimson transition-colors"
                    title={lang === 'hi' ? 'पता हटाएं' : 'Delete Address'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};