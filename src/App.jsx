import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PincodeModal } from './components/PincodeModal';
import { AuthModal } from './components/AuthModal';
import { WhatsAppShareModal } from './components/WhatsAppShareModal';

import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { ReferralPage } from './pages/ReferralPage';

import { ShieldCheck, Heart, MapPin, MessageSquare, Phone } from 'lucide-react';

export const App = () => {
  const { currentPage, toastMessage, navigateTo, lang, t } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'category':
        return <CategoryPage />;
      case 'pdp':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'account':
        return <AccountPage />;
      case 'referral':
        return <ReferralPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="global-toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header />

      {/* Page Content Body */}
      <main className="main-content">
        {renderPage()}
      </main>

      {/* Footer (Desktop & Tablet) */}
      <footer className="site-footer bg-white border-t mt-8 py-6">
        <div className="container">
          <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="brand-logo-text text-base text-forest">Roots_Bloom</span>
              <p className="text-muted mt-2">
                {lang === 'hi' 
                  ? 'हस्तनिर्मित लाइव मिनिएचर गार्डन्स और इमोशनल थीम प्लांटर्स। हर गमला एक रिश्ते और भावना की कहानी कहता है।'
                  : 'Handcrafted live miniature gardens & emotional theme planters. Every planter tells a story of relationship and living greenery.'}
              </p>
              <div className="footer-contact-item flex items-center gap-2 text-forest font-bold mt-3">
                <MessageSquare size={14} />
                <span>WhatsApp: +91 98765 43210</span>
              </div>
            </div>

            <div>
              <h4 className="footer-col-title font-bold text-dark uppercase mb-2">{lang === 'hi' ? 'कैटलॉग' : 'Catalog'}</h4>
              <ul className="footer-links-list space-y-1 text-muted">
                <li><button onClick={() => navigateTo('category', { category: 'tray-gardens' })} className="footer-link">{lang === 'hi' ? 'ट्रे गार्डन्स' : 'Tray Gardens'}</button></li>
                <li><button onClick={() => navigateTo('category', { category: 'theme-planters' })} className="footer-link">{lang === 'hi' ? 'थीम प्लांटर्स (माँ-बेटी, दादा-दादी)' : 'Theme Planters (Maa-Beti, Dada-Dadi)'}</button></li>
                <li><button onClick={() => navigateTo('category', { category: 'devotional' })} className="footer-link">{lang === 'hi' ? 'भक्ति एवं वास्तु प्लांटर्स' : 'Devotional & Vastu Planters'}</button></li>
                <li><button onClick={() => navigateTo('category', { category: 'novelty-planters' })} className="footer-link">{lang === 'hi' ? 'नॉवेल्टी डेस्क प्लांटर्स' : 'Novelty Desk Planters'}</button></li>
                <li><button onClick={() => navigateTo('category', { category: 'diy-kits' })} className="footer-link">{lang === 'hi' ? 'DIY एक्सेसरीज किट्स' : 'DIY Accessories Kits'}</button></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title font-bold text-dark uppercase mb-2">{lang === 'hi' ? 'ग्राहक सेवा' : 'Customer Care'}</h4>
              <ul className="footer-links-list space-y-1 text-muted">
                <li><button onClick={() => navigateTo('order-tracking')} className="footer-link">{lang === 'hi' ? 'ऑर्डर ट्रैक करें' : 'Track Order'}</button></li>
                <li><button onClick={() => navigateTo('referral')} className="footer-link">{lang === 'hi' ? 'शेयर करें और ₹150 कमाएं' : 'Share & Earn ₹150'}</button></li>
                <li><span className="footer-link">{lang === 'hi' ? 'लाइव प्लांट गारंटी पॉलिसी' : 'Live Plant Transit Guarantee'}</span></li>
                <li><span className="footer-link">{lang === 'hi' ? '7-दिन रिप्लेसमेंट गाइड' : '7-Day Replacement Policy'}</span></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title font-bold text-dark uppercase mb-2">{lang === 'hi' ? 'सुरक्षित भुगतान एवं डिलीवरी' : 'Security & Delivery'}</h4>
              <p className="text-muted">{lang === 'hi' ? 'कैश ऑन डिलीवरी (COD), UPI (GPay/PhonePe/Paytm), कार्ड्स और नेट बैंकिंग द्वारा 100% सुरक्षित भुगतान।' : '100% Secure Checkout via Cash on Delivery, UPI, Cards and Net Banking.'}</p>
              <div className="flex items-center gap-2 mt-3 text-forest font-semibold">
                <ShieldCheck size={18} />
                <span>Pan-India 20,000+ Pincodes</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar border-t mt-6 pt-4 text-center text-xs text-muted flex flex-col md:flex-row items-center justify-between gap-2">
            <span>© 2026 Roots_Bloom Inc. All rights reserved. Handcrafted in India.</span>
            <span>Enterprise-Grade • Anti-Cartoon Compliant • High-Density Retail UI</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Global Modals */}
      <PincodeModal />
      <AuthModal />
      <WhatsAppShareModal />
    </div>
  );
};
