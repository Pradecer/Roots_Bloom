import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalog';
import { 
  Package, 
  Sparkles, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  HelpCircle, 
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const OrderTrackingPage = () => {
  const { activeOrderId, orders, navigateTo, lang, t, showToast } = useApp();

  const currentOrder = orders.find((o) => o.orderId === activeOrderId) || orders[0];

  // Milestone Steps
  const TRACKING_STEPS = [
    {
      id: 'placed',
      title: t('orderPlaced'),
      time: '06 Sep, 10:15 AM',
      desc: lang === 'hi' ? 'ऑर्डर प्राप्त हुआ और कारीगर को सौंपा गया' : 'Order verified and assigned to botanical artisan'
    },
    {
      id: 'being_handcrafted',
      title: t('beingHandcrafted'),
      time: '06 Sep, 11:30 AM',
      desc: lang === 'hi' ? 'पौधों का चुनाव और मिनिएचर लैंडस्केप असेंबली जारी' : 'Curating live succulents, assembling tray & adding figurines'
    },
    {
      id: 'packed',
      title: t('packedDispatched'),
      time: '07 Sep, 04:00 PM',
      desc: lang === 'hi' ? 'हाइड्रो-जेल रूट प्रोटेक्शन और शॉक-प्रूफ बॉक्स में पैक' : 'Secured in shock-proof transit box with root-hydration gel'
    },
    {
      id: 'out_for_delivery',
      title: t('outForDelivery'),
      time: '10 Sep, 08:30 AM',
      desc: lang === 'hi' ? 'डिलीवरी पार्टनर आपके पते के लिए निकल चुका है' : 'Courier partner is out for doorstep delivery'
    },
    {
      id: 'delivered',
      title: t('delivered'),
      time: '10 Sep, 02:15 PM',
      desc: lang === 'hi' ? 'सफलतापूर्वक हैंडओवर किया गया' : 'Handed over securely to customer'
    }
  ];

  // Simulator for demo purposes
  const [currentStatusIndex, setCurrentStatusIndex] = useState(() => {
    if (currentOrder?.status === 'placed') return 0;
    if (currentOrder?.status === 'being_handcrafted') return 1;
    if (currentOrder?.status === 'packed') return 2;
    if (currentOrder?.status === 'out_for_delivery') return 3;
    if (currentOrder?.status === 'delivered') return 4;
    return 1;
  });

  const handleSimulateNextStep = () => {
    const nextIdx = (currentStatusIndex + 1) % TRACKING_STEPS.length;
    setCurrentStatusIndex(nextIdx);
    showToast(lang === 'hi' ? `स्टेटस अपडेट: ${TRACKING_STEPS[nextIdx].title}` : `Status updated to: ${TRACKING_STEPS[nextIdx].title}`);
  };

  return (
    <div className="order-tracking-page py-4">
      <div className="container max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="breadcrumb-bar mb-3">
          <button onClick={() => navigateTo('home')} className="breadcrumb-link">{t('home')}</button>
          <ChevronRight size={14} className="text-muted" />
          <button onClick={() => navigateTo('account')} className="breadcrumb-link">{t('orders')}</button>
          <ChevronRight size={14} className="text-muted" />
          <span className="breadcrumb-current">{currentOrder?.orderId || 'RB-2026-89412'}</span>
        </div>

        <div className="tracking-main-card p-4 border rounded-md bg-white">
          {/* Header Card */}
          <div className="flex items-center justify-between border-b pb-3 mb-4 flex-wrap gap-2">
            <div>
              <span className="text-xs text-muted uppercase tracking-wider">{t('orderId')}</span>
              <h2 className="text-lg font-bold text-forest">{currentOrder?.orderId || 'RB-2026-89412'}</h2>
              <span className="text-xs text-muted">Placed on {currentOrder?.date || '06 Sep 2026'}</span>
            </div>

            <div className="tracking-sla-pill p-2 bg-surface-muted rounded text-right text-xs">
              <span className="text-muted block">{t('estimatedDelivery')}</span>
              <strong className="text-forest text-sm font-bold">{currentOrder?.estimatedArrival || 'Thu, 10 Sep'}</strong>
            </div>
          </div>

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

          {/* Interactive Simulation Button for Testing */}
          <div className="simulator-banner p-3 my-3 bg-surface-muted border rounded flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <RefreshCw size={14} className="text-forest" />
              <span>{lang === 'hi' ? 'डेमो सिमुलेटर: अगला ट्रांजिट स्टेप चेक करें' : 'Demo Mode: Advance milestone status'}</span>
            </div>
            <button 
              className="btn btn-outline-neutral btn-sm text-xs"
              onClick={handleSimulateNextStep}
            >
              {lang === 'hi' ? 'अगला स्टेप टेस्ट करें' : 'Simulate Next Step'}
            </button>
          </div>

          {/* Order Items Snapshot */}
          <div className="order-items-snapshot mt-4 pt-3 border-t">
            <h4 className="text-xs font-bold uppercase text-muted mb-2">{lang === 'hi' ? 'ऑर्डर में शामिल वस्तुएं' : 'Items in this Shipment'}</h4>
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
              onClick={() => window.open('https://api.whatsapp.com/send?phone=919876543210', '_blank')}
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
