import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES, EMOTIONAL_SHELVES, HERO_SLIDES } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { TrustBar } from '../components/TrustBar';
import { 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  HeartHandshake, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export const HomePage = () => {
  const { navigateTo, lang, t } = useApp();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Auto-advance hero carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = HERO_SLIDES[currentHeroIndex];

  return (
    <div className="home-page-container">
      {/* Category Horizontal Quick-Links Rail (Mobile & Tablet) */}
      <div className="mobile-category-bar">
        <div className="container">
          <div className="category-rail">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className="category-chip"
                onClick={() => navigateTo('category', { category: cat.id })}
              >
                <span>{lang === 'hi' ? cat.name_hi : cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner Carousel */}
      <section className="hero-carousel-section">
        <div className="container">
          <div 
            className="hero-slide-card"
            style={{ background: currentHero.bg }}
          >
            <div className="hero-slide-grid">
              <div className="hero-text-content">
                <span className="hero-badge">
                  <Sparkles size={12} />
                  {lang === 'hi' ? currentHero.badge_hi : currentHero.badge}
                </span>
                <h1 className="hero-title">
                  {lang === 'hi' ? currentHero.title_hi : currentHero.title}
                </h1>
                <p className="hero-subtitle">
                  {lang === 'hi' ? currentHero.subtitle_hi : currentHero.subtitle}
                </p>
                <div className="hero-cta-wrap">
                  <button 
                    className="btn btn-buy-now btn-lg"
                    onClick={() => navigateTo('pdp', { productId: currentHero.link })}
                  >
                    <span>{lang === 'hi' ? currentHero.cta_hi : currentHero.cta}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              <div className="hero-image-wrap">
                <img 
                  src={currentHero.image} 
                  alt={currentHero.title} 
                  className="hero-product-img" 
                />
              </div>
            </div>

            {/* Carousel Navigation Dots */}
            <div className="hero-dots">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  className={`dot-indicator ${idx === currentHeroIndex ? 'active' : ''}`}
                  onClick={() => setCurrentHeroIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* "Shop by Feeling / Emotion" Curated Shelves */}
      <section className="emotional-shelves-section py-6">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title flex items-center gap-2">
                <HeartHandshake size={22} className="text-forest" />
                <span>{t('shopByFeeling')}</span>
              </h2>
              <p className="text-muted text-xs mt-1">
                {lang === 'hi' ? 'हर रिश्ता और अवसर के लिए विशेष रूप से तैयार किए गए लाइव प्लांटर्स' : 'Living botanical gifts curated for relationships, gratitude & celebrations'}
              </p>
            </div>
            <button 
              className="section-link"
              onClick={() => navigateTo('category', { category: 'theme-planters' })}
            >
              <span>{t('viewAll')}</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="emotional-shelves-grid">
            {EMOTIONAL_SHELVES.map((shelf) => {
              const shelfProducts = PRODUCTS.filter((p) => shelf.productIds.includes(p.id));
              return (
                <div key={shelf.id} className="shelf-card">
                  <div className="shelf-card-header">
                    <h3 className="shelf-title">{lang === 'hi' ? shelf.title_hi : shelf.title}</h3>
                    <span className="shelf-subtitle">{lang === 'hi' ? shelf.subtitle_hi : shelf.subtitle}</span>
                  </div>
                  <div className="shelf-products-row">
                    {shelfProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className="shelf-mini-item"
                        onClick={() => navigateTo('pdp', { productId: product.id })}
                      >
                        <div className="shelf-mini-img-wrap">
                          <img src={product.visual_assets.primary_image} alt={product.name} />
                          <span className="shelf-price-pill">₹{product.pricing.offer_price}</span>
                        </div>
                        <span className="shelf-mini-name">{lang === 'hi' ? product.name_hi : product.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Sellers High-Density Grid */}
      <section className="best-sellers-section py-6 bg-white border-t border-b">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title flex items-center gap-2">
                <Flame size={22} className="text-marigold" />
                <span>{t('bestSellers')}</span>
              </h2>
              <p className="text-muted text-xs mt-1">
                {lang === 'hi' ? 'ग्राहकों द्वारा सबसे ज्यादा पसंद किए गए टॉप-रेटेड मिनिएचर गार्डन्स' : 'Highest rated handcrafted living plant arrangements with verified buyer reviews'}
              </p>
            </div>
            <button 
              className="section-link"
              onClick={() => navigateTo('category', { category: 'all' })}
            >
              <span>{t('viewAll')}</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="product-grid grid-5-col">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} showBuyNow={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <TrustBar />
    </div>
  );
};
