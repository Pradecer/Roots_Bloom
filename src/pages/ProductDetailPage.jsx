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
  HelpCircle,
  ArrowLeft,
  ChevronDown
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
  const productStory = lang === 'hi' && product.description_hi ? product.description_hi : product.description;
  const productHeadline = lang === 'hi' && product.seo_headline_hi ? product.seo_headline_hi : product.seo_headline;
  const badgeText = lang === 'hi' && product.visual_assets?.badge_hi ? product.visual_assets.badge_hi : product.visual_assets?.badge;
  const keyFeatures = lang === 'hi' && product.key_features_hi ? product.key_features_hi : product.key_features || {};

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
    'watering': lang === 'hi' ? 'हफ्ते में 2-3 बार हल्का पानी दें। मिट्टी सूखने पर ही पानी डालें।' : 'Spray water lightly 2-3 times a week. Allow top soil to slightly dry between watering.',
    'sunlight': lang === 'hi' ? 'अप्रत्यक्ष धूप (Indirect bright light) इस पौधे के लिए सबसे उत्तम है।' : 'Prefers indirect bright sunlight or well-lit desk lamp lighting.',
    'transit': lang === 'hi' ? '100% सेफ ट्रांजिट थर्माकोल और कॉटन कुशनिंग के साथ। कोई भी डैमेज होने पर फ्री रिप्लेसमेंट।' : '100% damage-free transit guarantee in custom shock-absorbing insulated crates with free replacement.',
    'box': lang === 'hi' ? 'हाँ, यह सुंदर लग्जरी गिफ्ट बॉक्स और पर्सनलाइज्ड विश कार्ड के साथ आता है।' : 'Yes! Comes in an artisan gift-ready unboxing pack with plant nourishment guide.'
  };

  return (
    <div className="amazon-pdp-wrapper py-4 bg-[#FAF7F2] min-h-screen">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Breadcrumb Navigation Bar */}
        <div className="breadcrumb-bar mb-4 flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button 
              onClick={goBack} 
              className="inline-flex items-center gap-1 text-[#22533C] hover:underline font-semibold mr-1"
            >
              <ArrowLeft size={14} />
              <span>{t('back')}</span>
            </button>
            <span>/</span>
            <button onClick={() => navigateTo('home')} className="hover:underline">{t('home')}</button>
            <ChevronRight size={12} />
            <button 
              onClick={() => {
                const matchCat = CATEGORIES.find((c) => c.categoryKey === product.category || c.name === product.category);
                navigateTo('category', { category: matchCat ? matchCat.id : 'all' });
              }} 
              className="hover:underline"
            >
              {productCategory}
            </button>
            <ChevronRight size={12} />
            <span className="text-dark font-medium truncate max-w-[200px] sm:max-w-none">{productName}</span>
          </div>

          <button 
            onClick={() => openShareModal(product)}
            className="inline-flex items-center gap-1 text-xs text-[#22533C] hover:text-[#C85A32] transition-colors p-1"
            title="Share"
          >
            <Share2 size={15} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* 3-COLUMN AMAZON LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ================= COLUMN 1: IMAGE GALLERY (Lg: 4.5 Cols) ================= */}
          <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-3">
            {/* Vertical Thumbnails Stack (Desktop/Tablet) */}
            {galleryImages.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[480px] shrink-0 scrollbar-none py-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 overflow-hidden transition-all shrink-0 bg-white ${
                      idx === activeImageIndex 
                        ? 'border-[#22533C] shadow-md scale-105' 
                        : 'border-[#E2E8DE] hover:border-[#8C9B93]'
                    }`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="flex-1 relative bg-white rounded-2xl border border-[#E2E8DE] overflow-hidden shadow-sm flex items-center justify-center p-3 sm:p-5 group">
              {badgeText && (
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#C85A32] text-white shadow-sm">
                  {badgeText}
                </span>
              )}

              <button 
                className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 border border-black/10 flex items-center justify-center transition-all ${
                  isWishlisted ? 'text-[#C85A32]' : 'text-gray-500 hover:text-[#C85A32]'
                } shadow-sm`}
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? "#C85A32" : "none"} />
              </button>

              <img 
                src={galleryImages[activeImageIndex] || product.visual_assets?.primary_image} 
                alt={productName}
                className="w-full max-h-[450px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* ================= COLUMN 2: PRODUCT DETAILS & OFFERS (Lg: 4.5 Cols) ================= */}
          <div className="lg:col-span-4 space-y-4">
            {/* Brand Store Link */}
            <div>
              <button 
                onClick={() => navigateTo('home')} 
                className="text-xs font-semibold text-[#22533C] hover:underline hover:text-[#C85A32] uppercase tracking-wider"
              >
                Brand: Roots & Bloom
              </button>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1F2922] mt-1 leading-snug">
                {productName}
              </h1>
            </div>

            {/* Ratings Row */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center bg-[#22533C] text-white px-2 py-0.5 rounded-md font-bold gap-1 shadow-sm">
                <span>{product.rating?.average || 4.9}</span>
                <Star size={11} fill="#FFFFFF" />
              </div>
              <span className="text-muted font-medium">
                {product.rating?.count || 85} ratings • {lang === 'hi' ? '100% जीवित पौधा गारंटी' : 'Verified Purchase'}
              </span>
            </div>

            <hr className="border-[#E2E8DE]" />

            {/* Amazon-Style Price Block */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#C85A32]">
                  -{(product.pricing?.discount_percent || 25)}%
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1F2922]">
                  ₹{(product.pricing?.offer_price || product.price || 999).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-xs text-muted flex items-center gap-1.5">
                <span>M.R.P.: <del>₹{(product.pricing?.base_price || 1499).toLocaleString('en-IN')}</del></span>
                <span>• Inclusive of all taxes</span>
              </div>
            </div>

            {/* Amazon-Style Special Offers Carousel / Cards */}
            <div className="bg-white rounded-xl p-3.5 border border-[#E2E8DE] shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F2922]">
                <span className="text-[#C85A32]">🎁</span>
                <span>Offers & Savings</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Offer 1 */}
                <div className="border border-[#E2E8DE] rounded-lg p-2.5 hover:border-[#22533C] transition-colors bg-[#FAF7F2]">
                  <span className="font-bold text-[#22533C] block">Cashback</span>
                  <p className="text-[11px] text-[#55695D] mt-0.5">Upto ₹100 instant discount on UPI payment.</p>
                </div>

                {/* Offer 2 */}
                <div className="border border-[#E2E8DE] rounded-lg p-2.5 hover:border-[#22533C] transition-colors bg-[#FAF7F2]">
                  <span className="font-bold text-[#22533C] block">Free Care Kit</span>
                  <p className="text-[11px] text-[#55695D] mt-0.5">Complementary plant spray & care manual included.</p>
                </div>
              </div>
            </div>

            {/* Trust Badges 5-Icon Row (Screenshot 1) */}
            <div className="grid grid-cols-5 gap-1 pt-2 pb-1 text-center border-y border-[#E2E8DE] py-3">
              <div className="flex flex-col items-center gap-1">
                <Truck size={20} className="text-[#22533C]" />
                <span className="text-[10px] leading-tight text-[#55695D] font-medium">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw size={20} className="text-[#22533C]" />
                <span className="text-[10px] leading-tight text-[#55695D] font-medium">7 Days Replacement</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Award size={20} className="text-[#22533C]" />
                <span className="text-[10px] leading-tight text-[#55695D] font-medium">Top Botanical Brand</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={20} className="text-[#22533C]" />
                <span className="text-[10px] leading-tight text-[#55695D] font-medium">100% Live Plants</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Lock size={20} className="text-[#22533C]" />
                <span className="text-[10px] leading-tight text-[#55695D] font-medium">Secure Payment</span>
              </div>
            </div>

            {/* Product Details Spec Grid */}
            <div className="space-y-2 pt-1">
              <h3 className="text-sm font-bold text-[#1F2922]">Product details</h3>
              <div className="grid grid-cols-2 gap-y-1.5 text-xs">
                <span className="font-semibold text-[#55695D]">Category:</span>
                <span className="text-[#1F2922]">{productCategory}</span>

                <span className="font-semibold text-[#55695D]">Planter Type:</span>
                <span className="text-[#1F2922]">Handcrafted Ceramic / Tray</span>

                <span className="font-semibold text-[#55695D]">Plant Variety:</span>
                <span className="text-[#1F2922]">Live Natural Green Foliage</span>

                <span className="font-semibold text-[#55695D]">Occasion:</span>
                <span className="text-[#1F2922]">Home Decor, Gifting, Desk</span>

                <span className="font-semibold text-[#55695D]">Country of Origin:</span>
                <span className="text-[#1F2922]">India</span>
              </div>
            </div>

            {/* About This Item Bullets */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-[#1F2922]">About this item</h3>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-[#44554A] leading-relaxed">
                <li><strong>Handcrafted Living Art:</strong> Each planter is individually arranged by master artisans with natural live plants and emotional thematic miniatures.</li>
                <li><strong>Emotional Connection:</strong> Inspires peace, positivity, and heartfelt memories for home, work desk or gifting.</li>
                <li><strong>Safe Transit Packaging:</strong> Multi-layer shockproof thermal cushioning guarantees fresh, undamaged arrival anywhere in India.</li>
                <li><strong>Easy Maintenance:</strong> Low maintenance plant variety suited for indoor Indian climates and bright desk settings.</li>
              </ul>
            </div>

            {/* Ask a Question Chips (Screenshot 1) */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#1F2922] block">Ask a question</span>
              <div className="flex flex-wrap gap-1.5">
                <button 
                  onClick={() => setActiveQuestion(activeQuestion === 'watering' ? null : 'watering')}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                    activeQuestion === 'watering' ? 'bg-[#22533C] text-white border-[#22533C]' : 'bg-white border-[#C5D5CB] text-[#22533C] hover:bg-[#FAF7F2]'
                  }`}
                >
                  How often to water?
                </button>
                <button 
                  onClick={() => setActiveQuestion(activeQuestion === 'sunlight' ? null : 'sunlight')}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                    activeQuestion === 'sunlight' ? 'bg-[#22533C] text-white border-[#22533C]' : 'bg-white border-[#C5D5CB] text-[#22533C] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Sunlight required?
                </button>
                <button 
                  onClick={() => setActiveQuestion(activeQuestion === 'transit' ? null : 'transit')}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                    activeQuestion === 'transit' ? 'bg-[#22533C] text-white border-[#22533C]' : 'bg-white border-[#C5D5CB] text-[#22533C] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Safe transit guarantee?
                </button>
                <button 
                  onClick={() => setActiveQuestion(activeQuestion === 'box' ? null : 'box')}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                    activeQuestion === 'box' ? 'bg-[#22533C] text-white border-[#22533C]' : 'bg-white border-[#C5D5CB] text-[#22533C] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Comes in gift box?
                </button>
              </div>

              {activeQuestion && (
                <div className="p-2.5 bg-white rounded-lg border border-[#22533C]/20 text-xs text-[#22533C] font-medium animate-fadeIn">
                  💡 {faqAnswers[activeQuestion]}
                </div>
              )}
            </div>

          </div>

          {/* ================= COLUMN 3: AMAZON STICKY BUY BOX (Lg: 3 Cols) ================= */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-[#D5E0D8] p-4 sm:p-5 shadow-md space-y-4 lg:sticky lg:top-24">
              
              {/* Buy Box Price */}
              <div>
                <span className="text-2xl font-extrabold text-[#1F2922]">
                  ₹{(product.pricing?.offer_price || product.price || 999).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-muted block mt-0.5">FREE delivery included</span>
              </div>

              {/* Delivery SLA & Pincode */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-[#22533C] font-semibold">
                  <MapPin size={15} />
                  <span>Deliver to: <strong>{pincode}</strong></span>
                  <button 
                    onClick={() => setIsPincodeModalOpen(true)}
                    className="text-[#C85A32] hover:underline ml-1"
                  >
                    Change
                  </button>
                </div>
                <p className="text-[#33463B] font-medium">
                  FREE Delivery by <strong>Thursday, 10 Sep</strong>. Order within 12 hrs.
                </p>
              </div>

              {/* In Stock Badge */}
              <div className="text-sm font-bold text-[#2D6A4F] flex items-center gap-1.5">
                <Check size={16} />
                <span>In Stock.</span>
              </div>

              {/* Quantity Selector Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <label htmlFor="qty-select" className="font-semibold text-[#55695D]">Quantity:</label>
                <select
                  id="qty-select"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-[#C5D5CB] rounded-lg px-2.5 py-1 text-xs bg-white text-dark focus:outline-none focus:border-[#22533C]"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* Add to Cart */}
                <button 
                  onClick={handleAddToCart}
                  className="w-full py-2.5 px-4 rounded-full font-bold text-xs sm:text-sm bg-[#F7CA00] hover:bg-[#E5B800] text-[#111] shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>{t('addToCart')}</span>
                </button>

                {/* Buy Now */}
                <button 
                  onClick={handleBuyNow}
                  className="w-full py-2.5 px-4 rounded-full font-bold text-xs sm:text-sm bg-[#FA8900] hover:bg-[#E27B00] text-white shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Zap size={16} />
                  <span>{t('buyNow')}</span>
                </button>

                {/* Direct WhatsApp Catalog Order Button */}
                <a 
                  href={whatsappCatalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-full font-bold text-xs bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle size={16} />
                  <span>Order on WhatsApp Catalog</span>
                </a>
              </div>

              {/* Seller & Dispatch Info */}
              <div className="text-[11px] text-[#55695D] space-y-1 pt-2 border-t border-[#E2E8DE]">
                <div className="flex justify-between">
                  <span>Ships from</span>
                  <span className="font-semibold text-dark">Roots & Bloom</span>
                </div>
                <div className="flex justify-between">
                  <span>Sold by</span>
                  <span className="font-semibold text-dark">Roots & Bloom Official</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment</span>
                  <span className="font-semibold text-dark">Secure transaction</span>
                </div>
              </div>

              {/* Add to Wishlist Button */}
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="w-full py-2 rounded-lg border border-[#C5D5CB] text-xs font-semibold text-[#22533C] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-1.5"
              >
                <Heart size={14} fill={isWishlisted ? "#C85A32" : "none"} />
                <span>{isWishlisted ? 'Added to Wish List' : 'Add to Wish List'}</span>
              </button>

            </div>
          </div>

        </div>

        {/* Lower Specifications & Customer Reviews Section */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8DE] shadow-sm space-y-8">
          
          {/* Technical Specifications Table */}
          <div>
            <h2 className="text-lg font-serif font-bold text-[#1F2922] mb-3">Product specifications</h2>
            <div className="border border-[#E2E8DE] rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b border-[#E2E8DE] bg-[#FAF7F2]">
                    <td className="p-3 font-semibold text-[#55695D] w-1/3">Brand</td>
                    <td className="p-3 text-[#1F2922] font-medium">Roots & Bloom</td>
                  </tr>
                  <tr className="border-b border-[#E2E8DE]">
                    <td className="p-3 font-semibold text-[#55695D]">Collection</td>
                    <td className="p-3 text-[#1F2922]">{productCategory}</td>
                  </tr>
                  <tr className="border-b border-[#E2E8DE] bg-[#FAF7F2]">
                    <td className="p-3 font-semibold text-[#55695D]">Net Quantity</td>
                    <td className="p-3 text-[#1F2922]">1 Complete Living Miniature Garden Set</td>
                  </tr>
                  <tr className="border-b border-[#E2E8DE]">
                    <td className="p-3 font-semibold text-[#55695D]">Country of Origin</td>
                    <td className="p-3 text-[#1F2922]">India</td>
                  </tr>
                  <tr className="bg-[#FAF7F2]">
                    <td className="p-3 font-semibold text-[#55695D]">Manufacturer & Packer</td>
                    <td className="p-3 text-[#1F2922]">Roots & Bloom Living Art, New Delhi - 110001</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Plant Care Guide */}
          {product.is_live_plant && product.care_guide && (
            <div className="border-t border-[#E2E8DE] pt-6">
              <h2 className="text-lg font-serif font-bold text-[#1F2922] mb-4 flex items-center gap-2">
                <span>🌿</span>
                <span>{t('botanicalCare')}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2E8DE] flex items-start gap-3">
                  <Sun size={20} className="text-[#E29547] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1F2922] block">{t('sunlightRequirement')}</span>
                    <p className="text-xs text-[#55695D] mt-1">{product.care_guide.sunlight}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2E8DE] flex items-start gap-3">
                  <Droplets size={20} className="text-[#22533C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1F2922] block">{t('wateringSchedule')}</span>
                    <p className="text-xs text-[#55695D] mt-1">{product.care_guide.watering}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2E8DE] flex items-start gap-3">
                  <Layers size={20} className="text-[#55695D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1F2922] block">{t('soilType')}</span>
                    <p className="text-xs text-[#55695D] mt-1">{product.care_guide.soil}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2E8DE] flex items-start gap-3">
                  <Thermometer size={20} className="text-[#C85A32] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1F2922] block">{t('temperature')}</span>
                    <p className="text-xs text-[#55695D] mt-1">{product.care_guide.temperature}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Frequently Bought Together Bundle */}
          {bundleAddon && (
            <div className="border-t border-[#E2E8DE] pt-6">
              <h2 className="text-base font-bold text-[#1F2922] mb-3">{t('frequentlyBoughtTogether')}</h2>
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#FAF7F2] p-4 rounded-xl border border-[#E2E8DE]">
                <div className="flex items-center gap-2">
                  <img 
                    src={product.visual_assets?.primary_image} 
                    alt="" 
                    className="w-16 h-16 rounded-lg object-cover bg-white border border-[#E2E8DE]" 
                  />
                  <Plus size={16} className="text-muted" />
                  <img 
                    src={bundleAddon.visual_assets?.primary_image} 
                    alt="" 
                    className="w-16 h-16 rounded-lg object-cover bg-white border border-[#E2E8DE]" 
                  />
                </div>

                <div className="flex-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={includeBundleAddon} 
                      onChange={(e) => setIncludeBundleAddon(e.target.checked)} 
                      className="rounded accent-[#22533C]"
                    />
                    <span>
                      {lang === 'hi' ? 'साथ में जोड़ें:' : 'Add'} <strong>{bundleAddon.name}</strong> (+₹{bundleAddon.pricing?.offer_price || 499})
                    </span>
                  </label>
                  <p className="text-muted text-[11px] mt-1">Both items ship together in a unified reinforced delivery box.</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold">
                    Total: <strong className="text-[#22533C]">₹{(product.pricing?.offer_price || 999) + (includeBundleAddon ? (bundleAddon.pricing?.offer_price || 499) : 0)}</strong>
                  </span>
                  <button 
                    onClick={handleAddBundle}
                    className="btn btn-secondary btn-sm rounded-full text-xs"
                  >
                    {t('addBothToCart')}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8DE] p-3 flex items-center gap-2 shadow-lg">
        <button 
          className={`p-2.5 rounded-xl border ${isWishlisted ? 'border-[#C85A32] text-[#C85A32]' : 'border-gray-300 text-gray-600'}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Wishlist"
        >
          <Heart size={20} fill={isWishlisted ? "#C85A32" : "none"} />
        </button>

        <button 
          onClick={handleAddToCart}
          className="flex-1 py-2.5 px-3 rounded-full font-bold text-xs bg-[#F7CA00] text-[#111] shadow-sm flex items-center justify-center gap-1.5"
        >
          <ShoppingBag size={15} />
          <span>{t('addToCart')}</span>
        </button>

        <button 
          onClick={handleBuyNow}
          className="flex-1 py-2.5 px-3 rounded-full font-bold text-xs bg-[#FA8900] text-white shadow-sm flex items-center justify-center gap-1.5"
        >
          <Zap size={15} />
          <span>{t('buyNow')}</span>
        </button>
      </div>

    </div>
  );
};
