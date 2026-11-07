import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PincodeModal } from './components/PincodeModal';
import { AuthModal } from './components/AuthModal';
import { WhatsAppShareModal } from './components/WhatsAppShareModal';
import { Footer } from './components/Footer';

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
import { LoginPage } from './pages/LoginPage';

import { ShieldCheck, Heart, MapPin, MessageSquare, Phone } from 'lucide-react';

export const App = () => {
  const { currentPage, toastMessage, navigateTo, user, setIsAuthModalOpen, lang, t } = useApp();

  // 5-second automatic login popup for unauthenticated guests
  useEffect(() => {
    if (!user?.isLoggedIn && currentPage !== 'login') {
      const alreadyDismissed = sessionStorage.getItem('rb_login_popup_dismissed');
      if (!alreadyDismissed) {
        const timer = setTimeout(() => {
          setIsAuthModalOpen(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [user?.isLoggedIn, currentPage, setIsAuthModalOpen]);

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
      case 'login':
        return <LoginPage />;
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

      {/* Footer (Dark Luxury Homage Style) */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Global Modals */}
      <PincodeModal />
      <AuthModal />
      <WhatsAppShareModal />
    </div>
  );
};
