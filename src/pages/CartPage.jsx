import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalog';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const CartPage = () => {
  const { 
    cartItemsWithDetails, 
    updateCartQty, 
    removeFromCart, 
    cartSubtotal, 
    cartBaseTotal, 
    discountSavings, 
    deliveryFee, 
    cartGrandTotal, 
    appliedCoupon, 
    setAppliedCoupon,
    navigateTo, 
    addToCart,
    showToast,
    lang, 
    t 
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'FESTIVE200') {
      setAppliedCoupon({ code: 'FESTIVE200', discount: 200 });
      setCouponError('');
      showToast(lang === 'hi' ? 'कूपन FESTIVE200 लागू हो गया! ₹200 की बचत' : 'Coupon FESTIVE200 applied! Saved ₹200');
    } else if (code === 'BLOOM10') {
      const discountVal = Math.round(cartSubtotal * 0.1);
      setAppliedCoupon({ code: 'BLOOM10', discount: discountVal });
      setCouponError('');
      showToast(lang === 'hi' ? 'कूपन BLOOM10 लागू हो गया! 10% की बचत' : `Coupon BLOOM10 applied! Saved ₹${discountVal}`);
    } else {
      setCouponError(lang === 'hi' ? 'अमान्य कूपन कोड। कृपया FESTIVE200 या BLOOM10 आज़माएं' : 'Invalid promo code. Try FESTIVE200 or BLOOM10');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    showToast('Coupon removed');
  };

  if (cartItemsWithDetails.length === 0) {
    return (
      <div className="cart-page-container py-8">
        <div className="container text-center py-6">
          <div className="empty-cart-icon-box mx-auto mb-3">
            <ShoppingBag size={48} className="text-muted" />
          </div>
          <h2 className="text-xl font-bold">{t('emptyCart')}</h2>
          <p className="text-muted text-sm max-w-sm mx-auto mt-1">
            {lang === 'hi' ? 'अपने घर और प्रियजनों के लिए खूबसूरत जीवित मिनिएचर गार्डन चुनें।' : 'Discover handcrafted living miniature gardens to bring green peace to your home.'}
          </p>
          <button 
            className="btn btn-primary btn-lg mt-4"
            onClick={() => navigateTo('home')}
          >
            {t('explorePlants')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container py-4">
      <div className="container">
        <h1 className="page-heading mb-4 flex items-center gap-2">
          <ShoppingBag size={22} className="text-forest" />
          <span>{t('yourCart')} ({cartItemsWithDetails.length} {lang === 'hi' ? 'वस्तुएं' : 'items'})</span>
        </h1>

        <div className="cart-grid-layout">
          {/* Left Column: Cart Line Items & Add-ons */}
          <div className="cart-items-col">
            <div className="cart-items-list">
              {cartItemsWithDetails.map(({ product, qty }) => {
                const productName = lang === 'hi' && product.name_hi ? product.name_hi : product.name;
                const productCategory = lang === 'hi' && product.category_hi ? product.category_hi : product.category;

                return (
                  <div key={product.id} className="cart-item-card p-3 mb-3 border rounded-md bg-white">
                    <div className="flex gap-3">
                      {/* Product Thumbnail */}
                      <div 
                        className="cart-item-thumb cursor-pointer"
                        onClick={() => navigateTo('pdp', { productId: product.id })}
                      >
                        <img src={product.visual_assets.primary_image} alt={productName} />
                      </div>

                      {/* Product Info */}
                      <div className="cart-item-info flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-xs text-forest font-bold uppercase">{productCategory}</span>
                            <h3 
                              className="cart-item-title text-sm font-semibold cursor-pointer"
                              onClick={() => navigateTo('pdp', { productId: product.id })}
                            >
                              {productName}
                            </h3>
                          </div>
                          <button 
                            className="cart-remove-btn text-muted hover:text-crimson"
                            onClick={() => removeFromCart(product.id)}
                            title="Remove Item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Price & Quantity Controls Row */}
                        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                          <div className="price-block">
                            <span className="price-offer text-base">₹{(product.pricing.offer_price * qty).toLocaleString('en-IN')}</span>
                            <span className="price-base">₹{(product.pricing.base_price * qty).toLocaleString('en-IN')}</span>
                            <span className="price-discount">{product.pricing.discount_percent}% OFF</span>
                          </div>

                          {/* Stepper */}
                          <div className="qty-stepper flex items-center">
                            <button 
                              className="qty-btn"
                              onClick={() => updateCartQty(product.id, -1)}
                              aria-label="Decrease Quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="qty-value">{qty}</span>
                            <button 
                              className="qty-btn"
                              onClick={() => updateCartQty(product.id, 1)}
                              aria-label="Increase Quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cross-Sell Quick Add-On Banner Strip */}
            <div className="cart-addon-strip p-3 my-3 border rounded-md bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-marigold" />
                  <div>
                    <h4 className="text-xs font-bold">{lang === 'hi' ? 'कार्ट बूस्टर: मिनिएचर DIY एक्सेसरीज किट' : 'Cart Booster: 12-Pc Miniature DIY Accessories Kit'}</h4>
                    <p className="text-xs text-muted">{lang === 'hi' ? 'अपने प्लांटर को सजाने के लिए सिर्फ ₹349 में' : 'Decorate your miniature garden for just ₹349'}</p>
                  </div>
                </div>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => addToCart('miniature-diy-accessories-kit', 1, true)}
                >
                  <Plus size={14} />
                  <span>{lang === 'hi' ? 'जोड़ें ₹349' : 'Add ₹349'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Promo Code & Price Summary */}
          <div className="cart-summary-col">
            {/* Promo Code Card */}
            <div className="coupon-box p-3 mb-3 border rounded-md bg-white">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={16} className="text-forest" />
                <h4 className="text-xs font-bold uppercase tracking-wider">{t('applyCoupon')}</h4>
              </div>

              {appliedCoupon ? (
                <div className="applied-coupon-pill flex items-center justify-between p-2 bg-success-bg rounded border border-success">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" />
                    <span className="text-xs font-bold text-success">{appliedCoupon.code} (-₹{appliedCoupon.discount})</span>
                  </div>
                  <button className="text-xs font-bold text-crimson" onClick={handleRemoveCoupon}>
                    {lang === 'hi' ? 'हटाएं' : 'Remove'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-form flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. FESTIVE200"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError('');
                    }}
                    className="form-control text-xs flex-1 uppercase"
                  />
                  <button type="submit" className="btn btn-outline-neutral btn-sm">
                    {lang === 'hi' ? 'लागू करें' : 'Apply'}
                  </button>
                </form>
              )}
              {couponError && <p className="form-error text-xs mt-1">{couponError}</p>}
            </div>

            {/* Bill Details Breakdown Card */}
            <div className="bill-summary-card p-4 border rounded-md bg-white">
              <h3 className="section-title text-sm mb-3 border-b pb-2">{lang === 'hi' ? 'बिल विवरण' : 'Price Details'}</h3>

              <div className="bill-row flex justify-between py-1 text-xs">
                <span className="text-muted">{t('subtotal')}</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="bill-row flex justify-between py-1 text-xs">
                <span className="text-muted">{t('discount')}</span>
                <span className="text-success font-semibold">-₹{discountSavings.toLocaleString('en-IN')}</span>
              </div>

              <div className="bill-row flex justify-between py-1 text-xs">
                <span className="text-muted">{t('deliveryFee')}</span>
                <span className={deliveryFee === 0 ? "text-success font-bold" : ""}>
                  {deliveryFee === 0 ? t('free') : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="bill-row flex justify-between py-1 text-xs">
                <span className="text-muted">{t('codFee')}</span>
                <span className="text-success font-bold">{t('free')}</span>
              </div>

              <div className="bill-row grand-total flex justify-between pt-3 mt-2 border-t text-base font-extrabold">
                <span>{t('totalAmount')}</span>
                <span className="text-forest">₹{cartGrandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="free-shipping-note text-xs text-forest bg-surface-muted p-2 rounded mt-3">
                ✓ {lang === 'hi' ? 'इस ऑर्डर पर मुफ़्त डिलीवरी एवं लाइव प्लांट गारंटी लागू है' : 'You are getting Free Delivery & Safe Plant Transit Guarantee'}
              </div>

              <button 
                className="btn btn-primary btn-block btn-lg mt-4 flex items-center justify-center gap-2"
                onClick={() => navigateTo('checkout')}
              >
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
