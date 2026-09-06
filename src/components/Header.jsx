import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  User, 
  Languages, 
  Package, 
  Sparkles,
  ChevronDown,
  X
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/catalog';

export const Header = () => {
  const { 
    navigateTo, 
    currentPage, 
    cart, 
    wishlist, 
    pincode, 
    setIsPincodeModalOpen,
    lang, 
    toggleLanguage, 
    t,
    searchQuery,
    setSearchQuery,
    setIsAuthModalOpen,
    user
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const wishlistCount = wishlist.length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('category', { category: 'all' });
      setIsSearchFocused(false);
    }
  };

  const handleSelectSuggestion = (product) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    navigateTo('pdp', { productId: product.id });
  };

  const searchSuggestions = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          (p.name_hi && p.name_hi.includes(query)) ||
          p.category.toLowerCase().includes(query) ||
          p.search_aliases.some((alias) => alias.toLowerCase().includes(query))
        );
      }).slice(0, 4)
    : [];

  return (
    <header className="site-header">
      {/* Top Banner Nudge */}
      <div className="top-announcement-bar">
        <div className="container announcement-content">
          <div className="announcement-badge">
            <Sparkles size={13} className="sparkle-icon" />
            <span>{lang === 'hi' ? 'त्योहार स्पेशल: पहले ऑर्डर पर ₹100 की सीधी छूट (कोड: FESTIVE200)' : 'Festive Season: Flat ₹100 Off on First Order (Code: FESTIVE200)'}</span>
          </div>
          <div className="announcement-links">
            <button 
              onClick={() => navigateTo('referral')} 
              className="top-link-btn"
            >
              {lang === 'hi' ? 'शेयर करें और ₹150 कमाएं' : 'Share & Earn ₹150'}
            </button>
            <span className="divider-dot">•</span>
            <button 
              onClick={toggleLanguage} 
              className="lang-toggle-btn"
              title="Change Language"
            >
              <Languages size={14} />
              <span>{t('switchToHindi')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <div className="main-nav-bar">
        <div className="container nav-content">
          {/* Top Brand & Location Row (On Mobile this splits from search bar, on desktop stays inline) */}
          <div className="nav-brand-location-wrap">
            {/* Brand Logo */}
            <div className="brand-wrap" onClick={() => navigateTo('home')}>
              <span className="brand-logo-text">Roots_Bloom</span>
              <span className="brand-subtext">{lang === 'hi' ? 'हस्तनिर्मित जीवित गार्डन्स' : 'Handcrafted Miniature Gardens'}</span>
            </div>

            {/* Delivery Pincode Selector Chip */}
            <button 
              className="pincode-chip" 
              onClick={() => setIsPincodeModalOpen(true)}
              title="Change Delivery Location"
            >
              <MapPin size={15} className="pin-icon" />
              <div className="pincode-text">
                <span className="pincode-label">{t('deliveringTo')}</span>
                <span className="pincode-value">{pincode} <ChevronDown size={11} /></span>
              </div>
            </button>
          </div>

          {/* Search Bar with Live Transliteration Autocomplete */}
          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear Search"
                >
                  <X size={15} />
                </button>
              )}
              <button 
                type="submit" 
                className="search-submit-btn" 
                title={lang === 'hi' ? 'खोजें' : 'Search'}
              >
                <Search size={15} />
                <span className="search-submit-text">{lang === 'hi' ? 'खोजें' : 'Search'}</span>
              </button>
            </form>

            {/* Backdrop overlay when focused to allow easy dismiss */}
            {isSearchFocused && (
              <div 
                className="search-backdrop-overlay" 
                onClick={() => setIsSearchFocused(false)} 
              />
            )}

            {/* Suggestions Dropdown */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="search-dropdown">
                <div className="dropdown-header">
                  <span>{lang === 'hi' ? 'लोकप्रिय खोज सुझाव' : 'Top Product Matches'}</span>
                  <button 
                    type="button" 
                    className="dropdown-close-btn"
                    onClick={() => setIsSearchFocused(false)}
                  >
                    <X size={13} />
                  </button>
                </div>
                {searchSuggestions.length > 0 ? (
                  <>
                    <div className="suggestions-list">
                      {searchSuggestions.map((prod) => (
                        <div
                          key={prod.id}
                          className="suggestion-item"
                          onMouseDown={() => handleSelectSuggestion(prod)}
                        >
                          <img src={prod.visual_assets.primary_image} alt={prod.name} className="suggestion-img" />
                          <div className="suggestion-info">
                            <div className="suggestion-name">{lang === 'hi' ? prod.name_hi : prod.name}</div>
                            <div className="suggestion-meta-row">
                              <span className="suggestion-price">₹{prod.pricing.offer_price}</span>
                              <span className="suggestion-base-price">₹{prod.pricing.base_price}</span>
                              <span className="suggestion-category-tag">{prod.category}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div 
                      className="suggestion-view-all"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSearchSubmit(e);
                      }}
                    >
                      <span>{lang === 'hi' ? `"${searchQuery}" के सभी परिणाम देखें →` : `View all results for "${searchQuery}" →`}</span>
                    </div>
                  </>
                ) : (
                  <div className="suggestion-empty">
                    <span>{lang === 'hi' ? 'कोई मैचिंग प्लांटर नहीं मिला' : 'No matching planters found'}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Right Nav Action Buttons */}
          <div className="desktop-actions">
            <button 
              className={`nav-action-btn ${currentPage === 'wishlist' ? 'active' : ''}`}
              onClick={() => navigateTo('wishlist')}
              title="Saved Planters"
            >
              <div className="icon-badge-wrap">
                <Heart size={20} />
                {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
              </div>
              <span className="action-label">{t('wishlist')}</span>
            </button>

            <button 
              className={`nav-action-btn ${currentPage === 'cart' || currentPage === 'checkout' ? 'active' : ''}`}
              onClick={() => navigateTo('cart')}
              title="Shopping Cart"
            >
              <div className="icon-badge-wrap">
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="badge-count cart-badge">{cartCount}</span>}
              </div>
              <span className="action-label">{t('cart')}</span>
            </button>

            <button 
              className={`nav-action-btn ${currentPage === 'order-tracking' ? 'active' : ''}`}
              onClick={() => navigateTo('order-tracking')}
              title="Track Orders"
            >
              <Package size={20} />
              <span className="action-label">{t('orders')}</span>
            </button>

            <button 
              className={`nav-action-btn ${currentPage === 'account' ? 'active' : ''}`}
              onClick={() => navigateTo('account')}
              title="Profile & Address"
            >
              <User size={20} />
              <span className="action-label">{user?.isLoggedIn ? user.name.split(' ')[0] : t('account')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Quick Category Sub-Navigation Strip */}
      <div className="desktop-category-strip">
        <div className="container cat-strip-content">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`cat-strip-link ${currentPage === 'category' && cat.id === 'all' ? 'active' : ''}`}
              onClick={() => navigateTo('category', { category: cat.id })}
            >
              {lang === 'hi' ? cat.name_hi : cat.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
