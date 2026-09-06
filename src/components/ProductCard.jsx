import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Star, ShoppingBag, Zap, Check } from 'lucide-react';

export const ProductCard = ({ product, showBuyNow = false }) => {
  const { 
    navigateTo, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    lang, 
    t 
  } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const badgeText = lang === 'hi' && product.visual_assets.badge_hi ? product.visual_assets.badge_hi : product.visual_assets.badge;
  const productName = lang === 'hi' && product.name_hi ? product.name_hi : product.name;

  const handleCardClick = (e) => {
    // If click was on button, do not navigate
    if (e.target.closest('.card-action-btn') || e.target.closest('.wishlist-btn')) {
      return;
    }
    navigateTo('pdp', { productId: product.id });
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product.id, 1, true);
  };

  const handleOneTapBuy = (e) => {
    e.stopPropagation();
    addToCart(product.id, 1, false);
    navigateTo('checkout');
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* 1:1 Studio Photo Container */}
      <div className="product-photo-wrap">
        {badgeText && (
          <span className="badge-chip">{badgeText}</span>
        )}

        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Save to Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? "var(--color-accent-crimson)" : "none"} />
        </button>

        <img 
          src={product.visual_assets.primary_image} 
          alt={productName} 
          loading="lazy"
        />
      </div>

      {/* Product Details Block */}
      <div className="product-info">
        {/* Rating Pill */}
        <div className="flex items-center gap-1 mb-1">
          <div className="rating-chip">
            <span>{product.rating.average}</span>
            <Star size={10} fill="#FFFFFF" />
          </div>
          <span className="rating-chip-count">({product.rating.count})</span>
        </div>

        {/* 2-Line Truncated Title */}
        <h3 className="product-title" title={productName}>
          {productName}
        </h3>

        {/* Universal Price Block Math */}
        <div className="price-block">
          <span className="price-offer">₹{product.pricing.offer_price.toLocaleString('en-IN')}</span>
          <span className="price-base">₹{product.pricing.base_price.toLocaleString('en-IN')}</span>
          <span className="price-discount">{product.pricing.discount_percent}% OFF</span>
        </div>

        {/* Free Delivery SLA */}
        <div className="product-delivery-badge">
          <Check size={12} />
          <span>{t('freeDelivery')} • {t('codAvailable')}</span>
        </div>

        {/* Action Buttons */}
        <div className="card-actions-row mt-2">
          {showBuyNow ? (
            <div className="card-dual-btn-group">
              <button 
                className="btn btn-secondary btn-sm card-action-btn flex-1"
                onClick={handleQuickAdd}
              >
                <ShoppingBag size={14} />
                <span>{t('addToCart')}</span>
              </button>
              <button 
                className="btn btn-buy-now btn-sm card-action-btn flex-1"
                onClick={handleOneTapBuy}
              >
                <Zap size={14} />
                <span>{t('buyNow')}</span>
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-secondary btn-sm btn-block card-action-btn"
              onClick={handleQuickAdd}
            >
              <ShoppingBag size={14} />
              <span>{t('addToCart')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
