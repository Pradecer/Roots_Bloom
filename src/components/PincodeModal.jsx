import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, X, Check, Navigation } from 'lucide-react';

export const PincodeModal = () => {
  const { 
    isPincodeModalOpen, 
    setIsPincodeModalOpen, 
    pincode, 
    setPincode, 
    showToast,
    lang 
  } = useApp();

  const [inputPincode, setInputPincode] = useState(pincode);
  const [error, setError] = useState('');

  if (!isPincodeModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (/^\d{6}$/.test(inputPincode)) {
      setPincode(inputPincode);
      setIsPincodeModalOpen(false);
      showToast(lang === 'hi' ? `पिनकोड बदलकर ${inputPincode} कर दिया गया` : `Delivery location set to ${inputPincode}`);
    } else {
      setError(lang === 'hi' ? 'कृपया 6-अंकों का मान्य भारतीय पिनकोड दर्ज करें' : 'Please enter a valid 6-digit Indian postal code');
    }
  };

  const handleUseCurrentLocation = () => {
    setInputPincode('110001');
    setPincode('110001');
    setIsPincodeModalOpen(false);
    showToast(lang === 'hi' ? 'करंट लोकेशन (110001 - नई दिल्ली) डिटेक्ट की गई' : 'Detected location (110001 - New Delhi)');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsPincodeModalOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-forest" />
            <h3 className="modal-title">{lang === 'hi' ? 'डिलीवरी लोकेशन चुनें' : 'Select Delivery Location'}</h3>
          </div>
          <button className="modal-close-btn" onClick={() => setIsPincodeModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-desc">
            {lang === 'hi' 
              ? 'सटीक डिलीवरी समय और कैश ऑन डिलीवरी (COD) उपलब्धता जांचने के लिए पिनकोड दर्ज करें।'
              : 'Enter your 6-digit pincode to check accurate delivery dates and COD serviceability for live planters.'}
          </p>

          <form onSubmit={handleSave} className="pincode-modal-form mt-3">
            <div className="input-group">
              <input
                type="text"
                maxLength={6}
                value={inputPincode}
                onChange={(e) => {
                  setInputPincode(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="e.g. 110001, 560001, 400001"
                className="form-control"
                autoFocus
              />
              <button type="submit" className="btn btn-primary">
                {lang === 'hi' ? 'लागू करें' : 'Apply'}
              </button>
            </div>
            {error && <p className="form-error">{error}</p>}
          </form>

          <div className="modal-divider">
            <span>{lang === 'hi' ? 'या' : 'OR'}</span>
          </div>

          <button 
            type="button" 
            className="btn btn-outline-neutral btn-block flex items-center justify-center gap-2"
            onClick={handleUseCurrentLocation}
          >
            <Navigation size={16} />
            <span>{lang === 'hi' ? 'वर्तमान लोकेशन उपयोग करें (110001 - दिल्ली)' : 'Use Current Location (110001 - Delhi NCR)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
