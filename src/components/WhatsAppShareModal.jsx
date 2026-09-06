import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Share2, Copy, Check, MessageSquare } from 'lucide-react';

export const WhatsAppShareModal = () => {
  const { 
    isShareModalOpen, 
    setIsShareModalOpen, 
    shareProductData, 
    showToast,
    lang,
    t
  } = useApp();

  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen || !shareProductData) return null;

  const productName = lang === 'hi' && shareProductData.name_hi ? shareProductData.name_hi : shareProductData.name;
  const shareText = `🌿 Check out this handcrafted live planter: *${productName}* on Roots_Bloom for just ₹${shareProductData.pricing.offer_price}! Use my referral link to get ₹100 OFF: https://rootsbloom.in/p/${shareProductData.id}?ref=PRIYA100`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    showToast(t('linkCopied'));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppRedirect = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
    setIsShareModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsShareModalOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-forest" />
            <h3 className="modal-title">{lang === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share with Family & Friends'}</h3>
          </div>
          <button className="modal-close-btn" onClick={() => setIsShareModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Product Mini Preview */}
          <div className="share-product-preview">
            <img src={shareProductData.visual_assets.primary_image} alt={productName} className="share-product-img" />
            <div className="share-product-details">
              <h4 className="share-product-name">{productName}</h4>
              <div className="share-product-price">
                <span className="font-bold text-forest">₹{shareProductData.pricing.offer_price}</span>
                <span className="text-muted line-through text-xs ml-2">₹{shareProductData.pricing.base_price}</span>
                <span className="text-success font-bold text-xs ml-2">{shareProductData.pricing.discount_percent}% OFF</span>
              </div>
            </div>
          </div>

          <div className="share-rewards-callout mt-3">
            <strong>🎁 {lang === 'hi' ? 'रेफरल रिवार्ड:' : 'Referral Reward:'}</strong> {lang === 'hi' ? 'मित्र को ₹100 की छूट मिलेगी और उनके पहले ऑर्डर पर आपको ₹150 मिलेंगे!' : 'Your friend gets ₹100 off, and you earn ₹150 credits when they receive their planter!'}
          </div>

          {/* Share Preview Text */}
          <div className="share-text-box mt-3">
            <code>{shareText}</code>
          </div>

          <div className="share-actions-row mt-4">
            <button 
              className="btn btn-whatsapp flex-1 flex items-center justify-center gap-2"
              onClick={handleWhatsAppRedirect}
            >
              <MessageSquare size={18} />
              <span>{t('shareWhatsApp')}</span>
            </button>

            <button 
              className="btn btn-outline-neutral flex items-center justify-center gap-2"
              onClick={handleCopy}
            >
              {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              <span>{copied ? 'Copied' : t('copyLink')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
