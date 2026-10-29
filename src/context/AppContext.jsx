import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/catalog';
import { TRANSLATIONS } from '../data/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Page routing
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(() => PRODUCTS[0]?.id || 'shiv-tray-garden');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrderId, setActiveOrderId] = useState('RB-2026-89412');

  // Language Preference ('en' | 'hi')
  const [lang, setLang] = useState(() => localStorage.getItem('rb_lang') || 'en');

  // Pincode & Delivery SLA
  const [pincode, setPincode] = useState(() => localStorage.getItem('rb_pincode') || '110001');
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  // Cart State with LocalStorage (defaults to empty, auto-purges any obsolete dummy items)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('rb_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed)
        ? parsed.filter((item) => PRODUCTS.some((p) => p.id === item.productId))
        : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage (defaults to empty, auto-purges any obsolete dummy items)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('rb_wishlist');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed)
        ? parsed.filter((id) => PRODUCTS.some((p) => p.id === id))
        : [];
    } catch {
      return [];
    }
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // User Auth & Addresses
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rb_user');
      return saved ? JSON.parse(saved) : {
        phone: '9876543210',
        name: 'Priya Sharma',
        isLoggedIn: true,
        credits: 150
      };
    } catch {
      return { phone: '9876543210', name: 'Priya Sharma', isLoggedIn: true, credits: 150 };
    }
  });

  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Home',
      name: 'Priya Sharma',
      phone: '9876543210',
      line1: 'Flat 402, Green Meadows Tower B',
      line2: 'Near Central Park',
      pincode: '110001',
      city: 'New Delhi',
      state: 'Delhi',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Work',
      name: 'Priya Sharma',
      phone: '9876543210',
      line1: 'Level 5, Cyber Park Building',
      line2: 'DLF Phase 2',
      pincode: '122002',
      city: 'Gurugram',
      state: 'Haryana',
      isDefault: false
    }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState('addr-1');

  // Orders State
  const [orders, setOrders] = useState([
    {
      orderId: 'RB-2026-89412',
      date: '06 Sep 2026',
      items: [
        { productId: 'fairy-dream-miniature-tray-garden', qty: 1, price: 1499 },
        { productId: 'miniature-diy-accessories-kit', qty: 1, price: 349 }
      ],
      total: 1848,
      paymentMethod: 'COD',
      status: 'being_handcrafted', // placed | being_handcrafted | packed | out_for_delivery | delivered
      address: {
        line1: 'Flat 402, Green Meadows Tower B',
        city: 'New Delhi',
        pincode: '110001'
      },
      estimatedArrival: 'Thu, 10 Sep 2026'
    }
  ]);

  // Modals & Feedback Toast
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareProductData, setShareProductData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('rb_lang', lang);
    document.documentElement.lang = lang;
    if (lang === 'hi') {
      document.body.classList.add('lang-hi');
    } else {
      document.body.classList.remove('lang-hi');
    }
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('rb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('rb_pincode', pincode);
  }, [pincode]);

  useEffect(() => {
    localStorage.setItem('rb_user', JSON.stringify(user));
  }, [user]);

  // Helper Functions
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'hi' : 'en';
    setLang(nextLang);
    showToast(nextLang === 'hi' ? 'भाषा बदलकर हिंदी कर दी गई है' : 'Language switched to English');
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // Cart operations
  const addToCart = (productId, qty = 1, showFeedback = true) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { productId, qty }];
    });
    if (showFeedback) {
      showToast(t('addedToCart'));
    }
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    showToast('Item removed from cart');
  };

  const clearCart = () => setCart([]);

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist ♡');
        return [...prev, productId];
      }
    });
  };

  // Calculate cart totals
  const cartItemsWithDetails = cart.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return {
      ...item,
      product
    };
  }).filter((item) => item.product);

  const cartSubtotal = cartItemsWithDetails.reduce((sum, item) => {
    return sum + (item.product.pricing.offer_price * item.qty);
  }, 0);

  const cartBaseTotal = cartItemsWithDetails.reduce((sum, item) => {
    return sum + (item.product.pricing.base_price * item.qty);
  }, 0);

  const discountSavings = (cartBaseTotal - cartSubtotal) + (appliedCoupon ? appliedCoupon.discount : 0);
  const deliveryFee = cartSubtotal >= 500 || cartSubtotal === 0 ? 0 : 70;
  const codFee = 0; // Transparent zero fee promotion
  const cartGrandTotal = Math.max(0, cartSubtotal - (appliedCoupon ? appliedCoupon.discount : 0) + deliveryFee);

  // History synchronization & Back Navigation
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ page: 'home', category: 'all' }, '');
    }

    const handlePopState = (e) => {
      if (e.state && e.state.page) {
        if (e.state.productId) setSelectedProductId(e.state.productId);
        if (e.state.category) setActiveCategory(e.state.category);
        if (e.state.orderId) setActiveOrderId(e.state.orderId);
        if (e.state.searchQuery !== undefined) setSearchQuery(e.state.searchQuery);
        setCurrentPage(e.state.page);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation handlers
  const navigateTo = (page, params = {}, replace = false) => {
    const nextProdId = params.productId || selectedProductId;
    const nextCat = params.category || activeCategory;
    const nextOrder = params.orderId || activeOrderId;
    const nextSearch = params.searchQuery !== undefined ? params.searchQuery : searchQuery;

    if (params.productId) setSelectedProductId(params.productId);
    if (params.category) setActiveCategory(params.category);
    if (params.orderId) setActiveOrderId(params.orderId);
    if (params.searchQuery !== undefined) setSearchQuery(params.searchQuery);

    const stateObj = {
      page,
      productId: nextProdId,
      category: nextCat,
      orderId: nextOrder,
      searchQuery: nextSearch
    };

    try {
      if (replace) {
        window.history.replaceState(stateObj, '');
      } else {
        window.history.pushState(stateObj, '');
      }
    } catch {
      // Fallback if environment restricts history state
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (window.history.state && window.history.length > 1) {
      window.history.back();
    } else {
      if (currentPage === 'pdp') {
        navigateTo('category', { category: activeCategory || 'all' });
      } else {
        navigateTo('home');
      }
    }
  };

  const openShareModal = (product) => {
    setShareProductData(product);
    setIsShareModalOpen(true);
  };

  const placeOrder = (paymentMethod = 'COD') => {
    const selectedAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
    const newOrderId = `RB-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    
    const newOrder = {
      orderId: newOrderId,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: cartItemsWithDetails.map((item) => ({
        productId: item.productId,
        qty: item.qty,
        price: item.product.pricing.offer_price
      })),
      total: cartGrandTotal,
      paymentMethod,
      status: 'being_handcrafted',
      address: {
        line1: selectedAddr.line1,
        city: selectedAddr.city,
        pincode: selectedAddr.pincode
      },
      estimatedArrival: 'Thu, 10 Sep 2026'
    };

    setOrders([newOrder, ...orders]);
    setActiveOrderId(newOrderId);
    clearCart();
    setAppliedCoupon(null);
    navigateTo('order-success', { orderId: newOrderId });
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        goBack,
        selectedProductId,
        setSelectedProductId,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        activeOrderId,
        setActiveOrderId,
        lang,
        setLang,
        toggleLanguage,
        t,
        pincode,
        setPincode,
        isPincodeModalOpen,
        setIsPincodeModalOpen,
        cart,
        cartItemsWithDetails,
        cartSubtotal,
        cartBaseTotal,
        discountSavings,
        deliveryFee,
        codFee,
        cartGrandTotal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        appliedCoupon,
        setAppliedCoupon,
        wishlist,
        toggleWishlist,
        user,
        setUser,
        addresses,
        setAddresses,
        selectedAddressId,
        setSelectedAddressId,
        orders,
        placeOrder,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        shareProductData,
        openShareModal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
