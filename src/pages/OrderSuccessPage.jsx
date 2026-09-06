import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Package, 
  Share2, 
  ArrowRight, 
  Truck, 
  MessageSquare, 
  Sparkles,
  Calendar
} from 'lucide-react';

export const OrderSuccessPage = () => {
  const { 
    activeOrderId, 
    orders, 
    navigateTo, 
    openShareModal, 
    lang, 
    t 
  } = useApp();

  const currentOrder = orders.find((o) => o.orderId === activeOrderId) || orders[0];

  const handleShareFamily = () => {
    const text = `🎉 I just ordered a beautiful handcrafted live miniature garden from Roots_Bloom! Order ID: ${currentOrder?.orderId}. Check them out: https://rootsbloom.in`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="order-success-page py-8">
      <div className="container max-w-lg mx-auto">
        <div className="order-success-card p-6 border rounded-md bg-white text-center">
          <div className="success-icon-wrap mx-auto mb-3">
            <CheckCircle2 size={56} className="text-success" />
          </div>

          <h1 className="text-2xl font-bold text-forest">{t('orderConfirmed')}</h1>
          <p className="text-muted text-sm mt-1">
            {lang === 'hi' 
              ? 'आपका ऑर्डर स्वीकार कर लिया गया है और हमारे कुशल कारीगर इसे तैयार कर रहे हैं।'
              : 'Thank you! Your order has been placed. Our master artisans are preparing your live botanical garden.'}
          </p>

          {/* Order Details Chip Box */}
          <div className="order-meta-box p-3 my-4 border rounded bg-surface-muted text-left text-xs">
            <div className="flex justify-between py-1">
              <span className="text-muted">{t('orderId')}:</span>
              <strong className="text-forest font-bold">{currentOrder?.orderId}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted">{lang === 'hi' ? 'भुगतान विधि:' : 'Payment Method:'}</span>
              <strong>{currentOrder?.paymentMethod === 'COD' ? t('cashOnDelivery') : currentOrder?.paymentMethod}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted">{t('totalAmount')}:</span>
              <strong className="text-base text-dark">₹{currentOrder?.total?.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between py-1 border-t mt-1 pt-1">
              <span className="text-muted flex items-center gap-1">
                <Calendar size={13} /> {t('estimatedDelivery')}:
              </span>
              <span className="text-forest font-bold">{currentOrder?.estimatedArrival || 'Thu, 10 Sep 2026'}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="order-success-actions flex flex-col gap-2 mt-4">
            <button 
              className="btn btn-primary btn-block flex items-center justify-center gap-2"
              onClick={() => navigateTo('order-tracking', { orderId: currentOrder?.orderId })}
            >
              <Truck size={18} />
              <span>{t('trackOrder')}</span>
            </button>

            <button 
              className="btn btn-whatsapp btn-block flex items-center justify-center gap-2"
              onClick={handleShareFamily}
            >
              <MessageSquare size={18} />
              <span>{t('shareWithFamily')}</span>
            </button>

            <button 
              className="btn btn-link text-forest text-xs mt-2"
              onClick={() => navigateTo('home')}
            >
              {lang === 'hi' ? 'शॉपिंग जारी रखें' : 'Continue Shopping'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
