import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Plus, 
  Truck, 
  Banknote, 
  QrCode,
  Lock,
  ChevronRight
} from 'lucide-react';

export const CheckoutPage = () => {
  const { 
    cartItemsWithDetails, 
    cartGrandTotal, 
    cartSubtotal, 
    discountSavings, 
    deliveryFee, 
    addresses, 
    setAddresses, 
    selectedAddressId, 
    setSelectedAddressId, 
    placeOrder, 
    navigateTo, 
    lang, 
    t,
    showToast 
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('COD'); // COD | UPI | Card | NetBanking
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: 'Home',
    name: 'Priya Sharma',
    phone: '9876543210',
    line1: '',
    line2: '',
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi'
  });

  const handleAddNewAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.line1 || !newAddr.pincode) {
      showToast('Please fill all required address fields');
      return;
    }
    const createdId = `addr-${Date.now()}`;
    const newAddressObj = {
      ...newAddr,
      id: createdId,
      isDefault: false
    };
    setAddresses([...addresses, newAddressObj]);
    setSelectedAddressId(createdId);
    setIsAddingAddress(false);
    showToast('New address saved!');
  };

  const handleFinalOrderSubmit = () => {
    placeOrder(paymentMethod);
  };

  return (
    <div className="checkout-page-container py-4">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb-bar mb-3">
          <button onClick={() => navigateTo('cart')} className="breadcrumb-link">{t('cart')}</button>
          <ChevronRight size={14} className="text-muted" />
          <span className="breadcrumb-current">{t('checkoutTitle')}</span>
        </div>

        <h1 className="page-heading mb-4 flex items-center gap-2">
          <Lock size={20} className="text-forest" />
          <span>{t('checkoutTitle')}</span>
        </h1>

        <div className="checkout-grid-layout">
          {/* Left Column: 3 Accordion Steps */}
          <div className="checkout-steps-col">
            {/* Step 1: Delivery Address */}
            <div className="checkout-step-card p-4 mb-3 border rounded-md bg-white">
              <div className="step-card-header flex items-center justify-between border-b pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="step-number-chip">1</span>
                  <h3 className="section-title text-sm">{t('step1Address')}</h3>
                </div>
                {!isAddingAddress && (
                  <button 
                    className="btn btn-outline-neutral btn-sm flex items-center gap-1"
                    onClick={() => setIsAddingAddress(true)}
                  >
                    <Plus size={14} />
                    <span>{t('addNewAddress')}</span>
                  </button>
                )}
              </div>

              {/* Saved Address Selector */}
              {!isAddingAddress ? (
                <div className="saved-addresses-list">
                  {addresses.map((addr) => (
                    <label 
                      key={addr.id} 
                      className={`address-option-card p-3 mb-2 border rounded cursor-pointer flex items-start gap-3 ${selectedAddressId === addr.id ? 'selected border-forest' : ''}`}
                    >
                      <input
                        type="radio"
                        name="addressSelection"
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mt-1"
                      />
                      <div className="address-details flex-1 text-xs">
                        <div className="flex items-center gap-2">
                          <strong className="text-dark font-bold text-sm">{addr.name}</strong>
                          <span className="badge-chip">{addr.label}</span>
                          <span className="text-muted">{addr.phone}</span>
                        </div>
                        <p className="text-secondary mt-1">{addr.line1}, {addr.line2}</p>
                        <p className="text-secondary">{addr.city}, {addr.state} - <strong>{addr.pincode}</strong></p>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                /* Inline Add Address Form */
                <form onSubmit={handleAddNewAddressSubmit} className="new-address-form p-3 border rounded bg-surface-muted">
                  <h4 className="text-xs font-bold mb-2">{lang === 'hi' ? 'नया पता दर्ज करें' : 'Enter New Shipping Details'}</h4>
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
                    placeholder="Flat / House No. / Building Name"
                    value={newAddr.line1}
                    onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })}
                    className="form-control text-xs mb-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Street / Area / Landmark"
                    value={newAddr.line2}
                    onChange={(e) => setNewAddr({ ...newAddr, line2: e.target.value })}
                    className="form-control text-xs mb-2"
                  />
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Pincode (e.g. 110001)"
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
                      {lang === 'hi' ? 'पता सहेजें' : 'Save Address'}
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
            </div>

            {/* Step 2: Payment Method */}
            <div className="checkout-step-card p-4 mb-3 border rounded-md bg-white">
              <div className="step-card-header flex items-center gap-2 border-b pb-2 mb-3">
                <span className="step-number-chip">2</span>
                <h3 className="section-title text-sm">{t('step2Payment')}</h3>
              </div>

              <div className="payment-options-list">
                {/* COD Option (Default) */}
                <label className={`payment-option-card p-3 mb-2 border rounded cursor-pointer flex items-start gap-3 ${paymentMethod === 'COD' ? 'selected border-forest bg-surface-muted' : ''}`}>
                  <input
                    type="radio"
                    name="paymentOption"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Banknote size={18} className="text-forest" />
                        <strong className="text-sm font-bold">{t('cashOnDelivery')}</strong>
                      </div>
                      <span className="text-xs text-success font-bold">{lang === 'hi' ? 'मुफ़्त COD' : 'FREE COD'}</span>
                    </div>
                    <p className="text-xs text-muted mt-1">{t('codSubtext')}</p>
                  </div>
                </label>

                {/* UPI Option */}
                <label className={`payment-option-card p-3 mb-2 border rounded cursor-pointer flex items-start gap-3 ${paymentMethod === 'UPI' ? 'selected border-forest bg-surface-muted' : ''}`}>
                  <input
                    type="radio"
                    name="paymentOption"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <QrCode size={18} className="text-forest" />
                        <strong className="text-sm font-bold">{t('upiPayment')}</strong>
                      </div>
                      <span className="text-xs text-forest font-bold">{lang === 'hi' ? 'तुरंत पुष्टि' : 'Instant'}</span>
                    </div>
                    <p className="text-xs text-muted mt-1">Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                </label>

                {/* Card Option */}
                <label className={`payment-option-card p-3 mb-2 border rounded cursor-pointer flex items-start gap-3 ${paymentMethod === 'Card' ? 'selected border-forest bg-surface-muted' : ''}`}>
                  <input
                    type="radio"
                    name="paymentOption"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-forest" />
                      <strong className="text-sm font-bold">{t('cardPayment')}</strong>
                    </div>
                    <p className="text-xs text-muted mt-1">Visa, MasterCard, RuPay</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Order Review */}
            <div className="checkout-step-card p-4 border rounded-md bg-white">
              <div className="step-card-header flex items-center gap-2 border-b pb-2 mb-3">
                <span className="step-number-chip">3</span>
                <h3 className="section-title text-sm">{t('step3Review')}</h3>
              </div>

              <div className="checkout-items-mini-list">
                {cartItemsWithDetails.map(({ product, qty }) => (
                  <div key={product.id} className="mini-item-row flex items-center justify-between py-2 border-b text-xs">
                    <div className="flex items-center gap-2">
                      <img src={product.visual_assets.primary_image} alt="" className="mini-item-img" />
                      <div>
                        <div className="font-semibold">{lang === 'hi' ? product.name_hi : product.name}</div>
                        <span className="text-muted">Qty: {qty}</span>
                      </div>
                    </div>
                    <span className="font-bold">₹{(product.pricing.offer_price * qty).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Total & Place Order Button */}
          <div className="checkout-summary-col">
            <div className="bill-summary-card p-4 border rounded-md bg-white sticky-card">
              <h3 className="section-title text-sm mb-3 border-b pb-2">{lang === 'hi' ? 'भुगतान सारांश' : 'Final Order Total'}</h3>

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
                <span className="text-success font-bold">{t('free')}</span>
              </div>

              <div className="bill-row grand-total flex justify-between pt-3 mt-2 border-t text-lg font-extrabold">
                <span>{t('totalAmount')}</span>
                <span className="text-forest">₹{cartGrandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="security-badge-box flex items-center gap-2 p-2 bg-surface-muted rounded mt-3 text-xs text-muted">
                <ShieldCheck size={18} className="text-forest" />
                <span>{lang === 'hi' ? '100% सुरक्षित भुगतान एवं लाइव प्लांट ट्रांजिट सुरक्षा' : '100% Secure Checkout & Live Plant Guarantee'}</span>
              </div>

              <button 
                className="btn btn-buy-now btn-block btn-lg mt-4 text-base font-bold flex items-center justify-center gap-2"
                onClick={handleFinalOrderSubmit}
              >
                <span>{t('placeOrder')} — ₹{cartGrandTotal.toLocaleString('en-IN')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
