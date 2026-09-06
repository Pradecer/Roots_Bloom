import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Truck, Sparkles, RefreshCw } from 'lucide-react';

export const TrustBar = () => {
  const { lang } = useApp();

  return (
    <section className="trust-bar-section">
      <div className="container trust-grid">
        <div className="trust-item">
          <div className="trust-icon-box">
            <ShieldCheck size={24} className="trust-icon" />
          </div>
          <div className="trust-text">
            <h4>{lang === 'hi' ? '100% जीवित पौधे की गारंटी' : '100% Live Plant Guarantee'}</h4>
            <p>{lang === 'hi' ? 'पौधों को विशेष हाइड्रो-जेल और प्रोटेक्टिव बॉक्स में सुरक्षित भेजा जाता है' : 'Shipped with specialized root-hydration & impact-proof boxes'}</p>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon-box">
            <Sparkles size={24} className="trust-icon" />
          </div>
          <div className="trust-text">
            <h4>{lang === 'hi' ? 'हस्तनिर्मित शिल्पकारी' : 'Handcrafted Artisan Quality'}</h4>
            <p>{lang === 'hi' ? 'हर पीस भारतीय कलाकारों द्वारा प्यार से हाथ से तैयार किया गया है' : 'Every planter sculpts a personal story of emotion and craft'}</p>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon-box">
            <Truck size={24} className="trust-icon" />
          </div>
          <div className="trust-text">
            <h4>{lang === 'hi' ? 'अखिल भारतीय सुरक्षित डिलीवरी' : 'Pan-India Safe Transit'}</h4>
            <p>{lang === 'hi' ? '20,000+ पिनकोड पर कैश ऑन डिलीवरी और फ्री शिपिंग उपलब्ध' : 'Reliable door-delivery with COD available across 20,000+ pincodes'}</p>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon-box">
            <RefreshCw size={24} className="trust-icon" />
          </div>
          <div className="trust-text">
            <h4>{lang === 'hi' ? '7-दिन नो-क्वेश्चन रिप्लेसमेंट' : '7-Day Free Replacement'}</h4>
            <p>{lang === 'hi' ? 'ट्रांजिट में कोई भी खराबी होने पर तुरंत नया पौधा भेजा जाएगा' : 'Instant transit-damage replacement without hassle'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
