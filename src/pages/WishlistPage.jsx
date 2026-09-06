import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist, navigateTo, lang, t } = useApp();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="wishlist-page-container py-8">
        <div className="container text-center py-6">
          <div className="empty-cart-icon-box mx-auto mb-3">
            <Heart size={48} className="text-muted" />
          </div>
          <h2 className="text-xl font-bold">{lang === 'hi' ? 'आपकी विशलिस्ट खाली है' : 'Nothing Saved in Wishlist Yet'}</h2>
          <p className="text-muted text-sm max-w-sm mx-auto mt-1">
            {lang === 'hi' ? 'किसी भी प्लांटर पर ♡ दबाकर उसे बाद में खरीदने के लिए सहेजें।' : 'Tap ♡ on any handcrafted planter you love to save it for later.'}
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
    <div className="wishlist-page-container py-4">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h1 className="page-heading flex items-center gap-2">
            <Heart size={22} className="text-crimson" fill="var(--color-accent-crimson)" />
            <span>{t('wishlist')} ({wishlistedProducts.length} {lang === 'hi' ? 'सहेजे गए प्लांटर्स' : 'saved planters'})</span>
          </h1>

          <span className="text-xs text-forest font-bold bg-surface-muted px-2 py-1 rounded">
            🏷️ {lang === 'hi' ? 'मूल्य में गिरावट ट्रैक हो रही है' : 'Price Drops Tracked'}
          </span>
        </div>

        <div className="product-grid grid-5-col">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} showBuyNow={true} />
          ))}
        </div>
      </div>
    </div>
  );
};
