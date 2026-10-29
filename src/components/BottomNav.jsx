import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalog';
import { Home, Grid, Heart, Package, User } from 'lucide-react';

export const BottomNav = () => {
  const { currentPage, navigateTo, cart, wishlist, t } = useApp();
  const wishlistCount = wishlist.filter((id) => PRODUCTS.some((p) => p.id === id)).length;

  // On PDP and Checkout, mobile sticky CTA takes full precedence so they do not overlap
  if (currentPage === 'pdp' || currentPage === 'checkout') {
    return null;
  }

  return (
    <nav className="bottom-nav">
      <button 
        className={`bottom-nav-item ${currentPage === 'home' ? 'active' : ''}`}
        onClick={() => navigateTo('home')}
      >
        <Home size={20} />
        <span>{t('home')}</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentPage === 'category' ? 'active' : ''}`}
        onClick={() => navigateTo('category', { category: 'all' })}
      >
        <Grid size={20} />
        <span>{t('categories')}</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentPage === 'wishlist' ? 'active' : ''}`}
        onClick={() => navigateTo('wishlist')}
      >
        <Heart size={20} />
        {wishlistCount > 0 && <span className="bottom-nav-badge">{wishlistCount}</span>}
        <span>{t('wishlist')}</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentPage === 'order-tracking' || currentPage === 'order-success' ? 'active' : ''}`}
        onClick={() => navigateTo('order-tracking')}
      >
        <Package size={20} />
        <span>{t('orders')}</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentPage === 'account' ? 'active' : ''}`}
        onClick={() => navigateTo('account')}
      >
        <User size={20} />
        <span>{t('account')}</span>
      </button>
    </nav>
  );
};
