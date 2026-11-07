import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/catalog';
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
  RotateCcw,
  Award,
  Lock,
  Plus,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { 
    selectedProductId, 
    navigateTo, 
    goBack,
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
  const [quantity, setQuantity] = useState(1);
  const [includeBundleAddon, setIncludeBundleAddon] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const whatsappCatalogUrl = `https://www.whatsapp.com/catalog/918527733901/?app_absent=0`;

  // Bundle Addon Product from remaining products
  const bundleAddon = PRODUCTS.find((p) => p.id !== product.id) || PRODUCTS[1];

  const isWishlisted = wishlist.includes(product.id);
  const productName = lang === 'hi' && product.name_hi ? product.name_hi : product.name;
  const productCategory = lang === 'hi' && product.category_hi ? product.category_hi : product.category;
  const badgeText = lang === 'hi' && product.visual_assets?.badge_hi ? product.visual_assets.badge_hi : product.visual_assets?.badge;

  const galleryImages = product.visual_assets?.gallery?.length 
    ? product.visual_assets.gallery 
    : [product.visual_assets?.primary_image || product.image];

  const handleAddToCart = () => {
    addToCart(product.id, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity, false);
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

  const faqAnswers = {
    'watering': lang === 'hi' ? 'हफ्ते में 2-3 बार हल्का पानी स्प्रे करें। मिट्टी सूखने पर ही पानी डालें।' : 'Spray water lightly 2-3 times a week. Allow top soil to slightly dry between watering.',
    'sunlight': lang === 'hi' ? 'अप्रत्यक्ष धूप (Indirect bright light) इस पौधे के लिए सबसे उत्तम है।' : 'Prefers indirect bright sunlight or well-lit desk lamp lighting.',
    'transit': lang === 'hi' ? '100% सेफ ट्रांजिट थर्माकोल और कुशनिंग के साथ। कोई भी डैमेज होने पर फ्री रिप्लेसमेंट।' : '100% damage-free transit guarantee in custom shock-absorbing crates with free replacement.',
    'box': lang === 'hi' ? 'हाँ, यह सुंदर लग्जरी गिफ्ट बॉक्स और प्लांट केयर गाइड के साथ आता है।' : 'Yes! Comes in an artisan gift-ready unboxing pack with plant nourishment guide.'
  };

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh', padding: '16px 0 40px 0' }}>
      
      {/* Top Breadcrumb Navigation */}
      <div style={{ maxWidth: '1360px', margin: '0 auto 16px auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#55695D' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <button 
            onClick={goBack} 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#22533C', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', padding: 0 }}
          >
            <ArrowLeft size={14} />
            <span>{t('back')}</span>
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', color: '#55695D', cursor: 'pointer', padding: 0 }}>
            {t('home')}
          </button>
          <ChevronRight size={12} />
          <button 
            onClick={() => {
              const matchCat = CATEGORIES.find((c) => c.categoryKey === product.category || c.name === product.category);
              navigateTo('category', { category: matchCat ? matchCat.id : 'all' });
            }} 
            style={{ background: 'none', border: 'none', color: '#55695D', cursor: 'pointer', padding: 0 }}
          >
            {productCategory}
          </button>
          <ChevronRight size={12} />
          <span style={{ color: '#1F2922', fontWeight: 600 }}>{productName}</span>
        </div>

        <button 
          onClick={() => openShareModal(product)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#22533C', cursor: 'pointer', fontSize: '12px' }}
        >
          <Share2 size={14} />
          <span>Share</span>
        </button>
      </div>

      {/* ================= 3-COLUMN AMAZON LAYOUT ================= */}
      <div className="amazon-pdp-layout">
        
        {/* ================= COLUMN 1: GALLERY ================= */}
        <div className="amazon-pdp-gallery-col">
          <div className="amazon-pdp-gallery-flex">
            
            {/* Vertical Thumbnail Stack */}
            {galleryImages.length > 1 && (
              <div className="amazon-pdp-thumb-stack">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`amazon-pdp-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="amazon-pdp-main-stage">
              {badgeText && (
                <span style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 5, padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, backgroundColor: '#C85A32', color: '#ffffff' }}>
                  {badgeText}
                </span>
              )}

              <button 
                onClick={() => toggleWishlist(product.id)}
                style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 5, width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? "#C85A32" : "none"} color={isWishlisted ? "#C85A32" : "#777"} />
              </button>

              <img 
                src={galleryImages[activeImageIndex] || product.visual_assets?.primary_image} 
                alt={productName}
                className="amazon-pdp-main-img"
              />
            </div>

          </div>
        </div>

        {/* ================= COLUMN 2: CENTER DETAILS ================= */}
        <div className="amazon-pdp-center-col">
          
          {/* Brand & Title */}
          <div>
            <button onClick={() => navigateTo('home')} className="amazon-pdp-store-link">
              Brand: Roots & Bloom
            </button>
            <h1 className="amazon-pdp-title">{productName}</h1>
          </div>

          {/* Rating */}
          <div className="amazon-pdp-rating-row">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', backgroundColor: '#22533C', color: '#ffffff', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, fontSize: '12px' }}>
              <span>{product.rating?.average || 4.9}</span>
              <Star size={11} fill="#FFFFFF" />
            </div>
            <span style={{ color: '#55695D', fontWeight: 500 }}>
              {product.rating?.count || 85} ratings • {lang === 'hi' ? '100% जीवित पौधा गारंटी' : 'Verified Purchase'}
            </span>
          </div>

          <div style={{ height: '1px', backgroundColor: '#E2E8DE', width: '100%' }} />

          {/* Price Block */}
          <div>
            <div className="amazon-pdp-price-row">
              <span className="amazon-pdp-discount-pct">
                -{(product.pricing?.discount_percent || 25)}%
              </span>
              <span className="amazon-pdp-current-price">
                ₹{(product.pricing?.offer_price || product.price || 999).toLocaleString('en-IN')}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#7A8E82' }}>
              <span>M.R.P.: <del>₹{(product.pricing?.base_price || 1499).toLocaleString('en-IN')}</del></span>
              <span> • Inclusive of all taxes</span>
            </div>
          </div>

          {/* Special Offers Box */}
          <div className="amazon-offers-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#1F2922' }}>
              <span>🎁</span>
              <span>Offers & Savings</span>
            </div>

            <div className="amazon-offers-grid">
              <div className="amazon-offer-card">
                <span style={{ fontWeight: 700, color: '#22533C', display: 'block', fontSize: '12px' }}>Cashback</span>
                <p style={{ fontSize: '11px', color: '#55695D', margin: '4px 0 0 0' }}>Upto ₹100 instant discount on UPI checkout.</p>
              </div>

              <div className="amazon-offer-card">
                <span style={{ fontWeight: 700, color: '#22533C', display: 'block', fontSize: '12px' }}>Free Care Kit</span>
                <p style={{ fontSize: '11px', color: '#55695D', margin: '4px 0 0 0' }}>Complementary plant spray & guide included.</p>
              </div>
            </div>
          </div>

          {/* 5-Icon Trust Bar */}
          <div className="amazon-trust-bar">
            <div className="amazon-trust-item">
              <Truck size={20} color="#22533C" />
              <span>Free Delivery</span>
            </div>
            <div className="amazon-trust-item">
              <RotateCcw size={20} color="#22533C" />
              <span>7 Days Return</span>
            </div>
            <div className="amazon-trust-item">
              <Award size={20} color="#22533C" />
              <span>Top Brand</span>
            </div>
            <div className="amazon-trust-item">
              <ShieldCheck size={20} color="#22533C" />
              <span>Live Plants</span>
            </div>
            <div className="amazon-trust-item">
              <Lock size={20} color="#22533C" />
              <span>Secure Pay</span>
            </div>
          </div>

          {/* Product Details Spec Grid */}
          <div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1F2922', display: 'block', marginBottom: '4px' }}>Product details</span>
            <table className="amazon-specs-table">
              <tbody>
                <tr>
                  <td className="label">Category:</td>
                  <td className="val">{productCategory}</td>
                </tr>
                <tr>
                  <td className="label">Planter Type:</td>
                  <td className="val">Handcrafted Ceramic / Tray</td>
                </tr>
                <tr>
                  <td className="label">Plant Variety:</td>
                  <td className="val">Live Natural Green Foliage</td>
                </tr>
                <tr>
                  <td className="label">Occasion:</td>
                  <td className="val">Home Decor, Gifting, Desk</td>
                </tr>
                <tr>
                  <td className="label">Country of Origin:</td>
                  <td className="val">India</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* About This Item */}
          <div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1F2922', display: 'block', marginBottom: '4px' }}>About this item</span>
            <ul className="amazon-bullets-list">
              <li><strong>Handcrafted Living Art:</strong> Each planter is individually arranged by master artisans with natural live plants and emotional thematic miniatures.</li>
              <li><strong>Emotional Connection:</strong> Inspires peace, positivity, and heartfelt memories for home, work desk or gifting.</li>
              <li><strong>Safe Transit Packaging:</strong> Multi-layer shockproof thermal cushioning guarantees fresh, undamaged arrival anywhere in India.</li>
              <li><strong>Easy Maintenance:</strong> Low maintenance plant variety suited for indoor Indian climates and bright desk settings.</li>
            </ul>
          </div>

          {/* Ask a Question Chips */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1F2922', display: 'block', marginBottom: '8px' }}>Ask a question</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <button 
                onClick={() => setActiveQuestion(activeQuestion === 'watering' ? null : 'watering')}
                style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '20px', border: activeQuestion === 'watering' ? '1px solid #22533C' : '1px solid #C5D5CB', background: activeQuestion === 'watering' ? '#22533C' : '#ffffff', color: activeQuestion === 'watering' ? '#ffffff' : '#22533C', cursor: 'pointer' }}
              >
                How often to water?
              </button>
              <button 
                onClick={() => setActiveQuestion(activeQuestion === 'sunlight' ? null : 'sunlight')}
                style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '20px', border: activeQuestion === 'sunlight' ? '1px solid #22533C' : '1px solid #C5D5CB', background: activeQuestion === 'sunlight' ? '#22533C' : '#ffffff', color: activeQuestion === 'sunlight' ? '#ffffff' : '#22533C', cursor: 'pointer' }}
              >
                Sunlight required?
              </button>
              <button 
                onClick={() => setActiveQuestion(activeQuestion === 'transit' ? null : 'transit')}
                style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '20px', border: activeQuestion === 'transit' ? '1px solid #22533C' : '1px solid #C5D5CB', background: activeQuestion === 'transit' ? '#22533C' : '#ffffff', color: activeQuestion === 'transit' ? '#ffffff' : '#22533C', cursor: 'pointer' }}
              >
                Safe transit guarantee?
              </button>
              <button 
                onClick={() => setActiveQuestion(activeQuestion === 'box' ? null : 'box')}
                style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '20px', border: activeQuestion === 'box' ? '1px solid #22533C' : '1px solid #C5D5CB', background: activeQuestion === 'box' ? '#22533C' : '#ffffff', color: activeQuestion === 'box' ? '#ffffff' : '#22533C', cursor: 'pointer' }}
              >
                Comes in gift box?
              </button>
            </div>

            {activeQuestion && (
              <div style={{ marginTop: '8px', padding: '10px 12px', background: '#ffffff', borderRadius: '8px', border: '1px solid rgba(34, 83, 60, 0.2)', fontSize: '12px', color: '#22533C', fontWeight: 500 }}>
                💡 {faqAnswers[activeQuestion]}
              </div>
            )}
          </div>

          {/* Plant Care Guide */}
          {product.is_live_plant && product.care_guide && (
            <div style={{ marginTop: '10px', padding: '14px', background: '#ffffff', border: '1px solid #E2E8DE', borderRadius: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1F2922', display: 'block', marginBottom: '10px' }}>
                🌿 {t('botanicalCare')}
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                <div style={{ padding: '8px 10px', background: '#FAF7F2', borderRadius: '8px', fontSize: '11px' }}>
                  <span style={{ fontWeight: 700, color: '#E29547', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sun size={14} /> {t('sunlightRequirement')}
                  </span>
                  <p style={{ margin: '3px 0 0 0', color: '#55695D' }}>{product.care_guide.sunlight}</p>
                </div>

                <div style={{ padding: '8px 10px', background: '#FAF7F2', borderRadius: '8px', fontSize: '11px' }}>
                  <span style={{ fontWeight: 700, color: '#22533C', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Droplets size={14} /> {t('wateringSchedule')}
                  </span>
                  <p style={{ margin: '3px 0 0 0', color: '#55695D' }}>{product.care_guide.watering}</p>
                </div>

                <div style={{ padding: '8px 10px', background: '#FAF7F2', borderRadius: '8px', fontSize: '11px' }}>
                  <span style={{ fontWeight: 700, color: '#55695D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Layers size={14} /> {t('soilType')}
                  </span>
                  <p style={{ margin: '3px 0 0 0', color: '#55695D' }}>{product.care_guide.soil}</p>
                </div>

                <div style={{ padding: '8px 10px', background: '#FAF7F2', borderRadius: '8px', fontSize: '11px' }}>
                  <span style={{ fontWeight: 700, color: '#C85A32', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Thermometer size={14} /> {t('temperature')}
                  </span>
                  <p style={{ margin: '3px 0 0 0', color: '#55695D' }}>{product.care_guide.temperature}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ================= COLUMN 3: STICKY BUY BOX ================= */}
        <div>
          <div className="amazon-buybox-card">
            
            {/* Price in BuyBox */}
            <div>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#1F2922' }}>
                ₹{(product.pricing?.offer_price || product.price || 999).toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '11px', color: '#55695D', display: 'block', marginTop: '2px' }}>FREE delivery included</span>
            </div>

            {/* Pincode & SLA */}
            <div style={{ fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#22533C', fontWeight: 600 }}>
                <MapPin size={14} />
                <span>Deliver to: <strong>{pincode}</strong></span>
                <button 
                  onClick={() => setIsPincodeModalOpen(true)}
                  style={{ background: 'none', border: 'none', color: '#C85A32', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline', padding: 0, marginLeft: '4px' }}
                >
                  Change
                </button>
              </div>
              <p style={{ color: '#33463B', fontWeight: 600, margin: '6px 0 0 0', fontSize: '12px' }}>
                FREE Delivery by <strong>Thursday, 10 Sep</strong>. Order within 12 hrs.
              </p>
            </div>

            {/* In Stock */}
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#2D6A4F', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} />
              <span>In Stock.</span>
            </div>

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
              <label htmlFor="qty-select" style={{ fontWeight: 600, color: '#55695D' }}>Quantity:</label>
              <select
                id="qty-select"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ border: '1px solid #C5D5CB', borderRadius: '6px', padding: '3px 8px', fontSize: '12px', background: '#ffffff', color: '#111' }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Primary Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Add to Cart */}
              <button onClick={handleAddToCart} className="amazon-btn-cart">
                <ShoppingBag size={16} />
                <span>{t('addToCart')}</span>
              </button>

              {/* Buy Now */}
              <button onClick={handleBuyNow} className="amazon-btn-buy">
                <Zap size={16} />
                <span>{t('buyNow')}</span>
              </button>

              {/* Direct WhatsApp Catalog Order */}
              <a 
                href={whatsappCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="amazon-btn-wa"
              >
                <MessageCircle size={16} />
                <span>Order on WhatsApp Catalog</span>
              </a>
            </div>

            {/* Dispatch details */}
            <div style={{ fontSize: '11px', color: '#55695D', paddingTop: '10px', borderTop: '1px solid #E2E8DE', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Ships from</span>
                <span style={{ fontWeight: 600, color: '#1F2922' }}>Roots & Bloom</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Sold by</span>
                <span style={{ fontWeight: 600, color: '#1F2922' }}>Roots & Bloom Official</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Payment</span>
                <span style={{ fontWeight: 600, color: '#1F2922' }}>Secure transaction</span>
              </div>
            </div>

            {/* Add to Wishlist */}
            <button 
              onClick={() => toggleWishlist(product.id)}
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #C5D5CB', background: '#ffffff', fontSize: '12px', fontWeight: 600, color: '#22533C', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Heart size={14} fill={isWishlisted ? "#C85A32" : "none"} color={isWishlisted ? "#C85A32" : "#22533C"} />
              <span>{isWishlisted ? 'Added to Wish List' : 'Add to Wish List'}</span>
            </button>

          </div>
        </div>

      </div>

      {/* Frequently Bought Together Bundle */}
      {bundleAddon && (
        <div className="amazon-bundle-container">
          <div className="amazon-bundle-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div className="amazon-bundle-images">
                <div className="amazon-bundle-thumb">
                  <img src={product.visual_assets?.primary_image} alt="" />
                </div>
                <Plus size={18} color="#777" />
                <div className="amazon-bundle-thumb">
                  <img src={bundleAddon.visual_assets?.primary_image} alt="" />
                </div>
              </div>

              <div style={{ fontSize: '13px' }}>
                <span style={{ fontWeight: 700, color: '#1F2922', display: 'block', fontSize: '14px', marginBottom: '4px' }}>
                  Frequently bought together
                </span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={includeBundleAddon} 
                    onChange={(e) => setIncludeBundleAddon(e.target.checked)} 
                    style={{ accentColor: '#22533C' }}
                  />
                  <span>
                    Add <strong>{bundleAddon.name}</strong> (+₹{bundleAddon.pricing?.offer_price || 499})
                  </span>
                </label>
                <span style={{ fontSize: '11px', color: '#7A8E82', display: 'block', marginTop: '2px' }}>
                  Both artisan products ship together in reinforced safety crates.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: '#55695D', display: 'block' }}>Bundle Price:</span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#22533C' }}>
                  ₹{(product.pricing?.offer_price || 999) + (includeBundleAddon ? (bundleAddon.pricing?.offer_price || 499) : 0)}
                </span>
              </div>
              <button 
                onClick={handleAddBundle}
                style={{ padding: '8px 16px', borderRadius: '20px', background: '#22533C', color: '#ffffff', border: 'none', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
              >
                {t('addBothToCart')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="mobile-pdp-sticky-bar" style={{ display: 'none' }}>
        <button 
          onClick={handleAddToCart}
          style={{ flex: 1, padding: '10px', borderRadius: '24px', background: '#F7CA00', color: '#111', border: 'none', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
        >
          {t('addToCart')}
        </button>
        <button 
          onClick={handleBuyNow}
          style={{ flex: 1, padding: '10px', borderRadius: '24px', background: '#FA8900', color: '#fff', border: 'none', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
        >
          {t('buyNow')}
        </button>
      </div>

    </div>
  );
};
