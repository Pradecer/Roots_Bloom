import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalog';
import { 
  ChevronRight, 
  Star, 
  Share2, 
  Heart, 
  ShoppingBag, 
  Zap, 
  MapPin, 
  Check, 
  Sun, 
  Droplets, 
  Layers, 
  Thermometer,
  ShieldCheck,
  Truck,
  Plus,
  MessageCircle,
  ThumbsUp,
  ArrowLeft
} from 'lucide-react';
import { CATEGORIES } from '../data/catalog';

export const ProductDetailPage = () => {
  const { 
    selectedProductId, 
    navigateTo, 
    goBack,
    activeCategory,
    addToCart, 
    wishlist, 
    toggleWishlist, 
    pincode, 
    setIsPincodeModalOpen,
    openShareModal,
    lang, 
    t,
    showToast
  } = useApp();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [includeBundleAddon, setIncludeBundleAddon] = useState(true);

  // Bundle Addon Product (DIY kit or Hanging Birds)
  const bundleAddonId = product.cross_sell_ids?.[0] || 'miniature-diy-accessories-kit';
  const bundleAddon = PRODUCTS.find((p) => p.id === bundleAddonId) || PRODUCTS[7];

  const isWishlisted = wishlist.includes(product.id);
  const productName = lang === 'hi' && product.name_hi ? product.name_hi : product.name;
  const productCategory = lang === 'hi' && product.category_hi ? product.category_hi : product.category;
  const productStory = lang === 'hi' && product.description_hi ? product.description_hi : product.description;
  const productHeadline = lang === 'hi' && product.seo_headline_hi ? product.seo_headline_hi : product.seo_headline;
  const badgeText = lang === 'hi' && product.visual_assets.badge_hi ? product.visual_assets.badge_hi : product.visual_assets.badge;
  const keyFeatures = lang === 'hi' && product.key_features_hi ? product.key_features_hi : product.key_features;

  const galleryImages = product.visual_assets.gallery || [product.visual_assets.primary_image];

  const handleAddToCart = () => {
    addToCart(product.id, 1, true);
  };

  const handleBuyNow = () => {
    addToCart(product.id, 1, false);
    navigateTo('checkout');
  };

  const handleAddBundle = () => {
    addToCart(product.id, 1, false);
    if (includeBundleAddon && bundleAddon) {
      addToCart(bundleAddon.id, 1, false);
    }
    showToast(t('addedToCart'));
    navigateTo('cart');
  };

  return (
    <div className="pdp-page-container py-4">
      <div className="container">
        {/* Breadcrumb Navigation & Prominent Back Action */}
        <div className="breadcrumb-bar mb-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button 
              onClick={goBack} 
              className="pdp-back-btn mr-1 flex items-center gap-1"
              title={t('back')}
              aria-label="Go Back"
            >
              <ArrowLeft size={16} />
              <span className="font-bold text-xs">{t('back')}</span>
            </button>
            <span className="text-muted text-xs">/</span>
            <button onClick={() => navigateTo('home')} className="breadcrumb-link">{t('home')}</button>
            <ChevronRight size={14} className="text-muted" />
            <button 
              onClick={() => {
                const matchCat = CATEGORIES.find((c) => c.categoryKey === product.category || c.name === product.category);
                navigateTo('category', { category: matchCat ? matchCat.id : 'all' });
              }} 
              className="breadcrumb-link"
            >
              {productCategory}
            </button>
            <ChevronRight size={14} className="text-muted" />
            <span className="breadcrumb-current">{productName}</span>
          </div>
        </div>

        {/* Main PDP Grid: Gallery (Left) + Details & Purchase (Right) */}
        <div className="pdp-main-grid">
          {/* Left Column: 1:1 Studio Gallery & Angle Switcher */}
          <div className="pdp-gallery-col">
            <div className="pdp-main-image-wrap">
              {badgeText && <span className="badge-chip">{badgeText}</span>}

              <button 
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? "var(--color-accent-crimson)" : "none"} />
              </button>

              <img 
                src={galleryImages[activeImageIndex] || product.visual_assets.primary_image} 
                alt={`${productName} Angle ${activeImageIndex + 1}`}
                className="pdp-main-img"
              />
            </div>

            {/* Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="pdp-thumbnail-strip mt-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumbnail-btn ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    title={`Image ${idx + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}

            {/* Desktop Action Buttons (Sticky Under Gallery) */}
            <div className="desktop-pdp-actions-row mt-4">
              <button 
                className="btn btn-secondary btn-lg flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>{t('addToCart')}</span>
              </button>
              <button 
                className="btn btn-buy-now btn-lg flex-1"
                onClick={handleBuyNow}
              >
                <Zap size={18} />
                <span>{t('buyNow')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Commercial Info, Specs & Care */}
          <div className="pdp-info-col">
            {/* Title & Share Row */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest">{productCategory}</span>
                <h1 className="pdp-title mt-1">{productName}</h1>
              </div>
              <button 
                className="pdp-share-icon-btn" 
                onClick={() => openShareModal(product)}
                title="Share via WhatsApp"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Official Solid Dark Green Rating Pill */}
            <div className="flex items-center gap-2 mt-2">
              <div className="rating-chip">
                <span>{product.rating.average}</span>
                <Star size={11} fill="#FFFFFF" />
              </div>
              <span className="text-xs font-semibold text-muted">
                {product.rating.count} {lang === 'hi' ? 'वेरिफाइड ग्राहक रेटिंग्स' : 'Verified Buyer Ratings'}
              </span>
              <span className="text-xs text-success font-semibold flex items-center gap-1 ml-2">
                <Check size={13} /> {t('verifiedHandcrafted')}
              </span>
            </div>

            {/* Price Block */}
            <div className="pdp-price-box my-3">
              <div className="price-block">
                <span className="price-offer text-2xl font-extrabold text-forest">
                  ₹{product.pricing.offer_price.toLocaleString('en-IN')}
                </span>
                <span className="price-base text-base">
                  MRP ₹{product.pricing.base_price.toLocaleString('en-IN')}
                </span>
                <span className="price-discount text-sm font-bold">
                  {product.pricing.discount_percent}% OFF
                </span>
              </div>
              <span className="text-xs text-muted block mt-1">{t('inclusiveTaxes')}</span>
            </div>

            {/* Pincode & Delivery Date SLA Check Block */}
            <div className="pdp-delivery-check-box p-3 my-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={17} className="text-forest" />
                  <span className="text-xs font-bold">{lang === 'hi' ? 'डिलीवरी उपलब्धता जांचें:' : 'Delivery to:'} <strong>{pincode}</strong></span>
                </div>
                <button 
                  className="btn btn-link text-forest text-xs font-bold"
                  onClick={() => setIsPincodeModalOpen(true)}
                >
                  {t('change')}
                </button>
              </div>
              <div className="delivery-sla-details mt-2">
                <div className="text-xs text-forest font-bold flex items-center gap-1">
                  <Truck size={14} />
                  <span>{lang === 'hi' ? 'गुरुवार, 10 सितंबर तक मुफ़्त डिलीवरी उपलब्ध' : 'FREE Express Delivery by Thursday, 10 Sep'}</span>
                </div>
                <div className="text-xs text-muted mt-1 flex items-center gap-1">
                  <Check size={13} className="text-success" />
                  <span>{lang === 'hi' ? 'कैश ऑन डिलीवरी (COD) उपलब्ध' : 'Cash on Delivery (COD) Available on this Pincode'}</span>
                </div>
              </div>
            </div>

            {/* Emotional Story & Headline Pull Quote */}
            <div className="pdp-story-box my-4">
              <blockquote className="pdp-headline-quote">
                "{productHeadline}"
              </blockquote>
              <p className="pdp-description-text text-sm text-secondary mt-2">
                {productStory}
              </p>
            </div>

            {/* Dynamic Key Features Specifications Table */}
            <div className="pdp-specs-box my-4">
              <h3 className="section-title text-base mb-2">{t('keySpecifications')}</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(keyFeatures).map(([key, val]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Permanent Unhidden Botanical Plant Care Guide */}
            {product.is_live_plant && product.care_guide && (
              <div className="pdp-care-guide-box my-4">
                <h3 className="section-title text-base mb-2 flex items-center gap-2">
                  <span>🌿</span>
                  <span>{t('botanicalCare')}</span>
                </h3>
                <div className="care-grid">
                  <div className="care-item">
                    <Sun size={18} className="care-icon text-marigold" />
                    <div>
                      <span className="care-label">{t('sunlightRequirement')}</span>
                      <p className="care-desc">{product.care_guide.sunlight}</p>
                    </div>
                  </div>

                  <div className="care-item">
                    <Droplets size={18} className="care-icon text-forest" />
                    <div>
                      <span className="care-label">{t('wateringSchedule')}</span>
                      <p className="care-desc">{product.care_guide.watering}</p>
                    </div>
                  </div>

                  <div className="care-item">
                    <Layers size={18} className="care-icon text-muted" />
                    <div>
                      <span className="care-label">{t('soilType')}</span>
                      <p className="care-desc">{product.care_guide.soil}</p>
                    </div>
                  </div>

                  <div className="care-item">
                    <Thermometer size={18} className="care-icon text-crimson" />
                    <div>
                      <span className="care-label">{t('temperature')}</span>
                      <p className="care-desc">{product.care_guide.temperature}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Frequently Bought Together 1-Click Bundle */}
            {bundleAddon && (
              <div className="frequently-bought-box my-4 p-3 border rounded-md bg-white">
                <h3 className="section-title text-sm mb-2">{t('frequentlyBoughtTogether')}</h3>
                <div className="bundle-items-row flex items-center gap-2">
                  <div className="bundle-thumb">
                    <img src={product.visual_assets.primary_image} alt="" />
                    <span className="bundle-item-price">₹{product.pricing.offer_price}</span>
                  </div>
                  <Plus size={16} className="text-muted" />
                  <div className="bundle-thumb">
                    <img src={bundleAddon.visual_assets.primary_image} alt="" />
                    <span className="bundle-item-price">₹{bundleAddon.pricing.offer_price}</span>
                  </div>
                </div>

                <div className="bundle-details mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={includeBundleAddon} 
                      onChange={(e) => setIncludeBundleAddon(e.target.checked)} 
                    />
                    <span className="text-xs">
                      {lang === 'hi' ? 'साथ में जोड़ें:' : 'Add'} <strong>{lang === 'hi' ? bundleAddon.name_hi : bundleAddon.name}</strong> (+₹{bundleAddon.pricing.offer_price})
                    </span>
                  </label>

                  <div className="bundle-total-row flex items-center justify-between mt-2">
                    <span className="text-xs font-bold">
                      {lang === 'hi' ? 'बंडल कॉम्बो मूल्य:' : 'Bundle Combo Total:'} 
                      <strong className="text-forest ml-1">
                        ₹{product.pricing.offer_price + (includeBundleAddon ? bundleAddon.pricing.offer_price : 0)}
                      </strong>
                    </span>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={handleAddBundle}
                    >
                      {t('addBothToCart')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Verified Customer Reviews & Unboxing Photos */}
            <div className="pdp-reviews-box my-6 pt-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <h3 className="section-title text-base">{t('unboxingReviews')}</h3>
                <button 
                  className="btn btn-outline-neutral btn-sm"
                  onClick={() => showToast(lang === 'hi' ? 'डिलीवरी के 5 दिन बाद रिव्यू लिंक एक्टिव होगा' : 'Review submission opens after confirmed delivery')}
                >
                  {t('writeReview')}
                </button>
              </div>

              {/* Rating Histogram */}
              <div className="reviews-summary-grid mb-4">
                <div className="rating-score-box text-center">
                  <div className="text-3xl font-extrabold text-forest">{product.rating.average}</div>
                  <div className="flex items-center justify-center gap-1 my-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill="#E8703C" stroke="#E8703C" />
                    ))}
                  </div>
                  <div className="text-xs text-muted">{product.rating.count} {lang === 'hi' ? 'समीक्षाएं' : 'reviews'}</div>
                </div>

                <div className="histogram-bars">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = product.rating?.distribution?.[stars] || (stars === 5 ? 48 : 12);
                    const pct = Math.round((count / (product.rating?.count || 1)) * 100);
                    return (
                      <div key={stars} className="histogram-row flex items-center gap-2 text-xs">
                        <span className="w-6">{stars} ★</span>
                        <div className="histogram-bar-track flex-1">
                          <div className="histogram-bar-fill" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="w-8 text-right text-muted">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Individual Verified Reviews */}
              <div className="reviews-list">
                {(product.reviews || []).map((rev) => (
                  <div key={rev.id} className="review-card p-3 my-2 border rounded-md bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{rev.user_name}</span>
                        {rev.verified && (
                          <span className="badge-verified flex items-center gap-1 text-xs text-success font-semibold">
                            <Check size={12} /> {t('verifiedPurchase')}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted">{rev.date} • {rev.city}</span>
                    </div>

                    <div className="flex items-center gap-1 my-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#E8703C" stroke="#E8703C" />
                      ))}
                    </div>

                    <h4 className="text-xs font-bold text-dark mt-1">{rev.title}</h4>
                    <p className="text-xs text-secondary mt-1">{rev.text}</p>

                    {rev.photo && (
                      <div className="review-photo-wrap mt-2">
                        <img src={rev.photo} alt="Customer unboxing" className="review-photo-thumb" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="mobile-pdp-sticky-bar">
        <button 
          className={`sticky-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart size={20} fill={isWishlisted ? "var(--color-accent-crimson)" : "none"} />
        </button>
        <button 
          className="btn btn-secondary flex-1"
          onClick={handleAddToCart}
        >
          <ShoppingBag size={16} />
          <span>{t('addToCart')}</span>
        </button>
        <button 
          className="btn btn-buy-now flex-1"
          onClick={handleBuyNow}
        >
          <Zap size={16} />
          <span>{t('buyNow')}</span>
        </button>
      </div>
    </div>
  );
};
