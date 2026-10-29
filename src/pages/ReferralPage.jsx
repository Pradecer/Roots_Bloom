import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Share2, 
  Copy, 
  Check, 
  MessageSquare, 
  Gift, 
  Users, 
  Coins, 
  ChevronRight,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const ReferralPage = () => {
  const { user, navigateTo, goBack, lang, t, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const referralCode = 'PRIYA100';
  const referralLink = `https://rootsbloom.in?ref=${referralCode}`;
  const shareText = `🌿 Hey! I love these handcrafted live miniature gardens from Roots_Bloom. Use my link to get flat ₹100 OFF on your first order: ${referralLink}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showToast(t('linkCopied'));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="referral-page-container py-4">
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
          <span className="breadcrumb-current">{t('referAndEarn')}</span>
        </div>

        {/* Hero Referral Card */}
        <div className="referral-hero-card p-6 border rounded-md bg-white text-center mb-4">
          <div className="referral-icon-wrap mx-auto mb-3">
            <Gift size={44} className="text-marigold" />
          </div>

          <h1 className="text-xl font-bold text-forest">{t('referAndEarn')}</h1>
          <p className="text-muted text-xs max-w-md mx-auto mt-1">
            {t('referralSubtext')}
          </p>

          {/* Referral Code Box */}
          <div className="referral-code-container p-3 my-4 border rounded bg-surface-muted max-w-sm mx-auto flex items-center justify-between">
            <div>
              <span className="text-xs text-muted block text-left">{lang === 'hi' ? 'आपका रेफरल कोड' : 'Your Referral Code'}</span>
              <strong className="text-lg font-mono text-forest">{referralCode}</strong>
            </div>
            <button 
              className="btn btn-outline-neutral btn-sm flex items-center gap-1"
              onClick={handleCopy}
            >
              {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : t('copyLink')}</span>
            </button>
          </div>

          {/* WhatsApp Share CTA */}
          <button 
            className="btn btn-whatsapp btn-lg max-w-sm mx-auto btn-block flex items-center justify-center gap-2"
            onClick={handleWhatsAppShare}
          >
            <MessageSquare size={18} />
            <span>{t('shareWhatsApp')}</span>
          </button>
        </div>

        {/* 3-Step Explainer */}
        <div className="referral-steps-card p-4 border rounded-md bg-white mb-4">
          <h3 className="section-title text-sm mb-3">{lang === 'hi' ? 'यह कैसे काम करता है?' : 'How Roots_Bloom Refer & Earn Works'}</h3>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="step-item p-2 border rounded bg-surface-muted">
              <div className="step-badge mx-auto mb-2 font-bold text-forest">1</div>
              <h4 className="text-xs font-bold">{lang === 'hi' ? 'लिंक शेयर करें' : 'Share Link'}</h4>
              <p className="text-xs text-muted mt-1">{lang === 'hi' ? 'व्हाट्सएप ग्रुप्स और परिजनों के साथ साझा करें' : 'Send catalog link to family on WhatsApp'}</p>
            </div>

            <div className="step-item p-2 border rounded bg-surface-muted">
              <div className="step-badge mx-auto mb-2 font-bold text-forest">2</div>
              <h4 className="text-xs font-bold">{lang === 'hi' ? 'मित्र को ₹100 छूट' : 'Friend Saves ₹100'}</h4>
              <p className="text-xs text-muted mt-1">{lang === 'hi' ? 'मित्र के पहले ऑर्डर पर सीधी छूट' : 'They get ₹100 off on their first planter'}</p>
            </div>

            <div className="step-item p-2 border rounded bg-surface-muted">
              <div className="step-badge mx-auto mb-2 font-bold text-forest">3</div>
              <h4 className="text-xs font-bold">{lang === 'hi' ? 'आपको ₹150 मिलेंगे' : 'You Earn ₹150'}</h4>
              <p className="text-xs text-muted mt-1">{lang === 'hi' ? 'डिलीवरी के बाद आपके वॉलेट में क्रेडिट' : 'Instant store credits on successful delivery'}</p>
            </div>
          </div>
        </div>

        {/* Earnings Stats */}
        <div className="referral-stats-card p-4 border rounded-md bg-white">
          <h3 className="section-title text-sm mb-3">{lang === 'hi' ? 'आपकी रेफरल कमाई' : 'Your Referral Activity'}</h3>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="stat-box p-3 border rounded bg-surface-muted">
              <Users size={20} className="text-forest mx-auto mb-1" />
              <div className="text-lg font-bold">3 {lang === 'hi' ? 'मित्र' : 'Friends'}</div>
              <span className="text-xs text-muted">{lang === 'hi' ? 'शॉपिंग की' : 'Referred successfully'}</span>
            </div>

            <div className="stat-box p-3 border rounded bg-surface-muted">
              <Coins size={20} className="text-marigold mx-auto mb-1" />
              <div className="text-lg font-bold text-forest">₹{user?.credits || 150}</div>
              <span className="text-xs text-muted">{lang === 'hi' ? 'उपलब्ध क्रेडिट्स' : 'Available Store Credits'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
