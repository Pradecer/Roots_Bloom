import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  HelpCircle,
  PackageCheck
} from 'lucide-react';

const InstagramIcon = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Footer = () => {
  const { navigateTo, lang } = useApp();

  const instagramUrl = "https://www.instagram.com/roots_and_bloom.shop?obrf=ZDNlZDc0MzIxNw==";
  const whatsappCatalogUrl = "https://www.whatsapp.com/catalog/918527733901/?app_absent=0";
  const phoneNumber = "+918527733901";

  return (
    <>
      <footer className="retail-dark-footer">
        <div className="retail-footer-container">
          
          {/* Main 6-Column Section (Flipkart Architecture) */}
          <div className="retail-footer-main-row">
            
            {/* LEFT GROUP: 4 Navigation Columns */}
            <div className="retail-footer-left-group">
              
              {/* Col 1: ABOUT */}
              <div className="retail-footer-col">
                <span className="retail-footer-heading">{lang === 'hi' ? 'कंपनी के बारे में' : 'ABOUT'}</span>
                <ul>
                  <li>
                    <button onClick={() => navigateTo('home')} className="retail-footer-link">
                      {lang === 'hi' ? 'होम' : 'Contact Us'}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('home')} className="retail-footer-link">
                      {lang === 'hi' ? 'हमारे बारे में' : 'About Us'}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('referral')} className="retail-footer-link">
                      {lang === 'hi' ? 'शेयर करें और कमाएं' : 'Referral & Rewards'}
                    </button>
                  </li>
                  <li>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="retail-footer-link">
                      {lang === 'hi' ? 'इंस्टाग्राम स्टोरीज' : 'Brand Stories'}
                    </a>
                  </li>
                  <li>
                    <span className="retail-footer-link" style={{ cursor: 'default' }}>
                      {lang === 'hi' ? 'हस्तनिर्मित गुणवत्ता' : 'Artisan Crafted'}
                    </span>
                  </li>
                  <li>
                    <span className="retail-footer-link" style={{ cursor: 'default' }}>
                      {lang === 'hi' ? 'कॉर्पोरेट जानकारी' : 'Corporate Information'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Col 2: COLLECTIONS */}
              <div className="retail-footer-col">
                <span className="retail-footer-heading">{lang === 'hi' ? 'कलेक्शन्स' : 'COLLECTIONS'}</span>
                <ul>
                  <li>
                    <button onClick={() => navigateTo('category', { category: 'tray-gardens' })} className="retail-footer-link">
                      {lang === 'hi' ? 'ट्रे गार्डन्स' : 'Tray Gardens'}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('category', { category: 'theme-planters' })} className="retail-footer-link">
                      {lang === 'hi' ? 'पॉट्स एवं प्लांटर्स' : 'Pots & Planters'}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('category', { category: 'bird-feeders' })} className="retail-footer-link">
                      {lang === 'hi' ? 'बर्ड फीडर्स' : 'Bird Feeders'}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('category', { category: 'couples-gifting' })} className="retail-footer-link">
                      {lang === 'hi' ? 'युगल एवं उपहार' : 'Couples & Gifting'}
                    </button>
                  </li>
                  <li>
                    <a href={whatsappCatalogUrl} target="_blank" rel="noopener noreferrer" className="retail-footer-link" style={{ color: '#25D366' }}>
                      {lang === 'hi' ? 'व्हाट्सएप कैटलॉग' : 'WhatsApp Catalog'}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 3: HELP */}
              <div className="retail-footer-col">
                <span className="retail-footer-heading">{lang === 'hi' ? 'सहायता' : 'HELP'}</span>
                <ul>
                  <li>
                    <button onClick={() => navigateTo('order-tracking')} className="retail-footer-link">
                      {lang === 'hi' ? 'ऑर्डर ट्रैक करें' : 'Track Order'}
                    </button>
                  </li>
                  <li>
                    <span className="retail-footer-link" style={{ cursor: 'default' }}>
                      {lang === 'hi' ? 'सुरक्षित भुगतान एवं COD' : 'Payments & COD'}
                    </span>
                  </li>
                  <li>
                    <span className="retail-footer-link" style={{ cursor: 'default' }}>
                      {lang === 'hi' ? 'अखिल भारतीय डिलीवरी' : 'Shipping & Transit'}
                    </span>
                  </li>
                  <li>
                    <span className="retail-footer-link" style={{ cursor: 'default' }}>
                      {lang === 'hi' ? '7-दिन सुरक्षित रिप्लेसमेंट' : '7-Day Replacement'}
                    </span>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('home')} className="retail-footer-link">
                      {lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल' : 'FAQ'}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 4: CONSUMER POLICY */}
              <div className="retail-footer-col">
                <span className="retail-footer-heading">{lang === 'hi' ? 'उपभोक्ता नीति' : 'CONSUMER POLICY'}</span>
                <ul>
                  <li>
                    <span className="retail-footer-link" style={{ cursor: 'default' }}>
                      {lang === 'hi' ? 'रद्दीकरण एवं वापसी' : 'Cancellation & Returns'}
                    </span>
                  </li>
                  <li>
                    <span className="retail-footer-link" style={{ cursor: 'default' }}>
                      {lang === 'hi' ? 'उपयोग की शर्तें' : 'Terms Of Use'}
                    </span>
                  </li>
                  <li>
                    <span className="retail-footer-link" style={{ cursor: 'default' }}>
                      {lang === 'hi' ? 'सुरक्षा एवं प्रामाणिकता' : 'Security & Trust'}
                    </span>
                  </li>
                  <li>
                    <span className="retail-footer-link" style={{ cursor: 'default' }}>
                      {lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                    </span>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('category', { category: 'all' })} className="retail-footer-link">
                      {lang === 'hi' ? 'साइटमैप' : 'Sitemap'}
                    </button>
                  </li>
                  <li>
                    <span className="retail-footer-link" style={{ cursor: 'default', color: '#88C057' }}>
                      {lang === 'hi' ? '100% लाइव प्लांट गारंटी' : 'Live Plant Guarantee'}
                    </span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Vertical Divider Line (Flipkart style) */}
            <div className="retail-footer-divider" />

            {/* RIGHT GROUP: Contact & Addresses */}
            <div className="retail-footer-right-group">
              
              {/* Col 5: Mail Us */}
              <div className="retail-footer-col" style={{ flex: 1 }}>
                <span className="retail-footer-heading">{lang === 'hi' ? 'हमें ईमेल करें:' : 'Mail Us:'}</span>
                <p className="retail-footer-text">
                  Roots & Bloom Living Art Studio,<br />
                  Botanical Dispatch Center,<br />
                  New Delhi - 110001,<br />
                  Delhi, India<br />
                  <a href="mailto:care@rootsbloom.com">care@rootsbloom.com</a>
                </p>

                <div style={{ marginTop: '12px' }}>
                  <span className="retail-footer-heading" style={{ display: 'block', marginBottom: '8px' }}>
                    {lang === 'hi' ? 'सोशल:' : 'Social:'}
                  </span>
                  <div className="retail-footer-social-row">
                    <a 
                      href={instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="retail-social-btn"
                      title="Follow us on Instagram"
                      aria-label="Instagram"
                    >
                      <InstagramIcon size={16} />
                    </a>

                    <a 
                      href={whatsappCatalogUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="retail-social-btn"
                      title="WhatsApp Catalog"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </a>

                    <a 
                      href={`tel:${phoneNumber}`} 
                      className="retail-social-btn"
                      title="Call Us"
                      aria-label="Phone"
                    >
                      <Phone size={15} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Col 6: Registered Office Address */}
              <div className="retail-footer-col" style={{ flex: 1 }}>
                <span className="retail-footer-heading">{lang === 'hi' ? 'पंजीकृत कार्यालय पता:' : 'Registered Office Address:'}</span>
                <p className="retail-footer-text">
                  Roots & Bloom Living Art,<br />
                  Connaught Place Commercial Area,<br />
                  New Delhi - 110001,<br />
                  Delhi, India<br />
                  <span style={{ color: '#878787', display: 'block', marginTop: '4px' }}>
                    Helpline: <a href={`tel:${phoneNumber}`} style={{ color: '#ffffff' }}>+91 85277 33901</a>
                  </span>
                  <span style={{ color: '#878787', display: 'block' }}>
                    WhatsApp: <a href={whatsappCatalogUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366' }}>+91 85277 33901</a>
                  </span>
                </p>
              </div>

            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="retail-footer-bottom-row">
            <div className="retail-footer-brand-badge">
              <img src="/logo.png" alt="Roots & Bloom" />
              <div>
                <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '13px', display: 'block' }}>
                  Roots & Bloom
                </span>
                <span style={{ color: '#E29547', fontSize: '11px', fontStyle: 'italic' }}>
                  Roots of care, blooms of love
                </span>
              </div>
            </div>

            <div>
              <span>© 2026 Roots & Bloom. All Rights Reserved. Handcrafted Botanical Living Art.</span>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <span style={{ color: '#878787' }}>100% Live Plants</span>
              <span>•</span>
              <span style={{ color: '#878787' }}>Safe Transit Guarantee</span>
              <span>•</span>
              <span style={{ color: '#878787' }}>Handcrafted in India</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Action Buttons (WhatsApp & Call) */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-3">
        <a 
          href={`tel:${phoneNumber}`}
          className="w-12 h-12 rounded-full bg-[#1E3E2B] text-white flex items-center justify-center shadow-lg hover:scale-105 hover:bg-[#28573D] transition-transform duration-200 border border-white/20"
          aria-label="Call Roots & Bloom"
          title="Call Customer Care"
        >
          <Phone size={20} />
        </a>

        <a 
          href={whatsappCatalogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200"
          aria-label="Chat on WhatsApp Catalog"
          title="Open WhatsApp Catalog"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </>
  );
};
