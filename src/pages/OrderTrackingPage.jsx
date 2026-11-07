import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalog';
import { 
  Package, 
  Sparkles, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';

export const OrderTrackingPage = () => {
  const { activeOrderId, orders, navigateTo, goBack, lang, t } = useApp();

  const currentOrder = orders.find((o) => o.orderId === activeOrderId) || orders[0];

  // Milestone Steps
  const TRACKING_STEPS = [
    {
      id: 'placed',
      title: t('orderPlaced'),
      time: currentOrder?.date ? `${currentOrder.date}, 10:15 AM` : 'Today, 10:15 AM',
      desc: lang === 'hi' ? 'ऑर्डर प्राप्त हुआ और कारीगर को सौंपा गया' : 'Order verified and assigned to botanical artisan'
    },
    {
      id: 'being_handcrafted',
      title: t('beingHandcrafted'),
      time: 'In Progress',
      desc: lang === 'hi' ? 'पौधों का चुनाव और मिनिएचर लैंडस्केप असेंबली जारी' : 'Curating live succulents, assembling tray & adding figurines'
    },
    {
      id: 'packed',
      title: t('packedDispatched'),
      time: 'Expected Tomorrow',
      desc: lang === 'hi' ? 'हाइड्रो-जेल रूट प्रोटेक्शन और शॉक-प्रूफ बॉक्स में पैक' : 'Secured in shock-proof transit box with root-hydration gel'
    },
    {
      id: 'out_for_delivery',
      title: t('outForDelivery'),
      time: 'Upcoming',
      desc: lang === 'hi' ? 'डिलीवरी पार्टनर आपके पते के लिए निकलेगा' : 'Courier partner assigned for doorstep delivery'
    },
    {
      id: 'delivered',
      title: t('delivered'),
      time: 'Estimated 3-5 days',
      desc: lang === 'hi' ? 'सफलतापूर्वक हैंडओवर' : 'Secure handover at your doorstep'
    }
  ];

  // Map order status to progress index
  const getStatusIndex = (status) => {
    switch (status) {
      case 'placed': return 0;
      case 'being_handcrafted': return 1;
      case 'packed': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentStatusIndex = getStatusIndex(currentOrder?.status);

  if (!currentOrder) {
    return (
      <div className="order-tracking-page py-6">
        <div className="container max-w-2xl mx-auto">
          <div className="breadcrumb-bar mb-3">
            <button 
              onClick={goBack} 
              className="pdp-back-btn flex items-center gap-1"
              title={t('back')}
            >
              <ArrowLeft size={16} />
              <span>{t('back')}</span>
            </button>
          </div>

          <div className="tracking-main-card p-8 border rounded-md bg-white text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-muted flex items-center justify-center text-forest">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-xl font-bold text-forest mb-2">
              {lang === 'hi' ? 'अभी कोई सक्रिय ऑर्डर नहीं है' : 'No Active Orders Found'}
            </h2>
            <p className="text-xs text-muted mb-6 max-w-sm mx-auto">
              {lang === 'hi' 
                ? 'आपने अभी तक कोई ऑर्डर नहीं दिया है। हमारे हस्तनिर्मित मिनिएचर प्लांट्स और बोन्साई ट्रे देखें।' 
                : 'You have not placed any orders yet. Discover our living miniature garden art crafted with love.'}
            </p>
            <button 
              onClick={() => navigateTo('home')}
              className="btn btn-primary px-6 py-2.5 text-sm"
            >
              {lang === 'hi' ? 'पौधे और ट्रे गार्डन देखें' : 'Explore Miniature Gardens'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-tracking-page py-4">
      <div className="container max-w-2xl mx-auto">
        {/* Breadcrumb & Back */}
        <div className="breadcrumb-bar mb-3 flex items-center gap-1.5">
          <button 
            onClick={goBack} 
            className="pdp-back-btn mr-1 flex items-center gap-1"
            title={t('back')}
          >
            <ArrowLeft size={16} />
            <span>{t('back')}</span>
          </button>
          <span className="text-muted text-xs">/</span>
          <button onClick={() => navigateTo('home')} className="breadcrumb-link">{t('home')}</button>
          <ChevronRight size={14} className="text-muted" />
          <button onClick={() => navigateTo('account')} className="breadcrumb-link">{t('orders')}</button>
          <ChevronRight size={14} className="text-muted" />
          <span className="breadcrumb-current">{currentOrder.orderId}</span>
        </div>

        <div className="tracking-main-card p-4 border rounded-md bg-white">
          {/* Header Card */}
          <div className="flex items-center justify-between border-b pb-3 mb-4 flex-wrap gap-2">
            <div>
              <span className="text-xs text-muted uppercase tracking-wider">{t('orderId')}</span>
              <h2 className="text-lg font-bold text-forest">{currentOrder.orderId}</h2>
              <span className="text-xs text-muted">
                {lang === 'hi' ? 'ऑर्डर की तारीख:' : 'Placed on'} {currentOrder.date}
              </span>
            </div>

            <div className="tracking-sla-pill p-2 bg-surface-muted rounded text-right text-xs">
              <span className="text-muted block">{t('estimatedDelivery')}</span>
              <strong className="text-forest text-sm font-bold">{currentOrder.estimatedArrival || 'In 3-5 Days'}</strong>
            </div>
          </div>

          {/* Delivery Address Information */}
          {currentOrder.address && (
            <div className="delivery-destination-card mb-4 p-3 bg-surface-muted rounded border text-xs">
              <div className="flex items-center gap-1.5 font-bold text-forest mb-1">
                <MapPin size={14} />
                <span>{lang === 'hi' ? 'डिलीवरी का पता' : 'Delivery Address'}</span>
              </div>
              <p className="text-ink">
                {currentOrder.address.name && <strong>{currentOrder.address.name} — </strong>}
                {currentOrder.address.line1}
                {currentOrder.address.line2 ? `, ${currentOrder.address.line2}` : ''}, {currentOrder.address.city} - {currentOrder.address.pincode}
              </p>
              {currentOrder.address.phone && (
                <span className="text-muted block mt-0.5">Phone: {currentOrder.address.phone}</span>
              )}
            </div>
          )}

          {/* Blinkit-Style Live Milestone Timeline */}
          <div className="tracking-timeline-container py-2">
            <h3 className="section-title text-sm mb-3 flex items-center gap-2">
              <Truck size={17} className="text-forest" />
              <span>{lang === 'hi' ? 'लाइव स्टेटस टाइमलाइन' : 'Live Shipment Timeline'}</span>
            </h3>

            <div className="timeline-steps-list">
              {TRACKING_STEPS.map((step, idx) => {
                const isCompleted = idx <= currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;

                return (
                  <div 
                    key={step.id} 
                    className={`timeline-step-item flex gap-3 ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                  >
                    <div className="timeline-marker-col flex flex-col items-center">
                      <div className={`timeline-dot ${isCurrent ? 'pulse-dot' : ''} ${isCompleted ? 'active-dot' : ''}`}>
                        {isCompleted ? <CheckCircle2 size={16} /> : <span className="dot-inner"></span>}
                      </div>
                      {idx < TRACKING_STEPS.length - 1 && <div className={`timeline-line ${idx < currentStatusIndex ? 'completed-line' : ''}`}></div>}
                    </div>

                    <div className="timeline-content-col pb-4 flex-1">
                      <div className="flex items-center justify-between">
                        <strong className={`timeline-step-title text-sm ${isCurrent ? 'text-forest font-extrabold' : ''}`}>
                          {step.title}
                        </strong>
                        <span className="text-xs text-muted">{step.time}</span>
                      </div>
                      <p className="text-xs text-secondary mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items Snapshot */}
          <div className="order-items-snapshot mt-4 pt-3 border-t">
            <h4 className="text-xs font-bold uppercase text-muted mb-2">
              {lang === 'hi' ? 'ऑर्डर में शामिल वस्तुएं' : 'Items in this Shipment'}
            </h4>
            {currentOrder?.items?.map((item, idx) => {
              const product = PRODUCTS.find((p) => p.id === item.productId) || PRODUCTS[0];
              const pName = lang === 'hi' && product.name_hi ? product.name_hi : product.name;

              return (
                <div key={idx} className="flex items-center justify-between py-2 border-b text-xs">
                  <div className="flex items-center gap-2">
                    <img src={product.visual_assets.primary_image} alt="" className="mini-item-img" />
                    <div>
                      <div className="font-semibold">{pName}</div>
                      <span className="text-muted">Qty: {item.qty}</span>
                    </div>
                  </div>
                  <span className="font-bold">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              );
            })}
          </div>

          {/* Plant Care Continuity Nudge & WhatsApp Help */}
          <div className="tracking-help-box mt-4 p-3 bg-forest-subtle border rounded flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-forest" />
              <div>
                <h5 className="text-xs font-bold text-forest">{lang === 'hi' ? 'पौधे की देखभाल सपोर्ट' : 'Plant Survival & Care Assistance'}</h5>
                <p className="text-xs text-muted">{lang === 'hi' ? 'पार्सल मिलने के बाद हमारे विशेषज्ञों से व्हाट्सएप पर सलाह लें' : 'Connect with our botanical experts for unboxing & care advice'}</p>
              </div>
            </div>
            <button 
              className="btn btn-whatsapp btn-sm flex items-center gap-1"
              onClick={() => window.open('https://www.whatsapp.com/catalog/918527733901/?app_absent=0', '_blank')}
            >
              <MessageSquare size={14} />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};