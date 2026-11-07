import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/catalog';
import { TRANSLATIONS } from '../data/translations';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Page routing
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(() => PRODUCTS[0]?.id || 'shiv-tray-garden');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
        phone: '',
        name: 'Guest User',
        isLoggedIn: false,
        credits: 0
      };
    } catch {
      return { phone: '', name: 'Guest User', isLoggedIn: false, credits: 0 };
    }
  });

  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('rb_saved_addresses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    try {
      const saved = localStorage.getItem('rb_saved_addresses');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed[0].id;
      }
      return '';
    } catch {
      return '';
    }
  });

  // Orders State (defaults to empty or loaded from storage)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('rb_saved_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrderId, setActiveOrderId] = useState(() => {
    try {
      const saved = localStorage.getItem('rb_saved_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed[0].orderId;
      }
      return '';
    } catch {
      return '';
    }
  });

  // Fetch user addresses from Supabase
  const fetchUserAddresses = async (userId) => {
    if (!isSupabaseConfigured || !userId) return;
    try {
      const { data, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted = data.map((row) => ({
          id: row.id,
          label: row.label || 'Home',
          name: row.name,
          phone: row.phone,
          line1: row.line1,
          line2: row.line2 || '',
          city: row.city,
          state: row.state,
          pincode: row.pincode,
          isDefault: !!row.is_default
        }));
        setAddresses(formatted);
        try {
          localStorage.setItem('rb_saved_addresses', JSON.stringify(formatted));
        } catch {}
        const defaultAddr = formatted.find((a) => a.isDefault) || formatted[0];
        setSelectedAddressId(defaultAddr.id);
      }
    } catch (err) {
      console.warn('Supabase user_addresses table not queried or not yet created:', err);
    }
  };

  // Fetch user orders from Supabase
  const fetchUserOrders = async (userId) => {
    if (!isSupabaseConfigured || !userId) return;
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted = data.map((row) => ({
          orderId: row.id,
          date: new Date(row.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          items: row.items || [],
          total: row.total,
          paymentMethod: row.payment_method,
          status: row.status || 'placed',
          address: row.shipping_address || {},
          estimatedArrival: 'In 3-5 Days'
        }));
        setOrders(formatted);
        try {
          localStorage.setItem('rb_saved_orders', JSON.stringify(formatted));
        } catch {}
        if (formatted.length > 0) {
          setActiveOrderId(formatted[0].orderId);
        }
      }
    } catch (err) {
      console.warn('Supabase orders table not queried or not yet created:', err);
    }
  };

  const loginUser = (userData) => {
    const fullUser = {
      ...userData,
      isLoggedIn: true
    };
    setUser(fullUser);
    try {
      localStorage.setItem('rb_user', JSON.stringify(fullUser));
    } catch {
      // storage quota
    }
    if (fullUser.id) {
      fetchUserAddresses(fullUser.id);
      fetchUserOrders(fullUser.id);
    }
  };

  const logoutUser = () => {
    const guest = {
      phone: '',
      name: 'Guest User',
      isLoggedIn: false,
      credits: 0
    };
    setUser(guest);
    try {
      localStorage.removeItem('rb_user');
      localStorage.removeItem('rb_saved_addresses');
      localStorage.removeItem('rb_saved_orders');
    } catch {
      // storage quota
    }
    setAddresses([]);
    setOrders([]);
    setSelectedAddressId('');
    setActiveOrderId('');
    if (isSupabaseConfigured) {
      supabase.auth.signOut().catch(() => {});
    }
  };

  // Sync Supabase Auth state automatically
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const profileName = u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Valued Customer';
        setUser({
          id: u.id,
          name: profileName,
          email: u.email,
          phone: u.user_metadata?.phone || '',
          isLoggedIn: true,
          credits: 150
        });
        fetchUserAddresses(u.id);
        fetchUserOrders(u.id);
      }
    }).catch(() => {});

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        const profileName = u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Valued Customer';
        setUser({
          id: u.id,
          name: profileName,
          email: u.email,
          phone: u.user_metadata?.phone || '',
          isLoggedIn: true,
          credits: 150
        });
        fetchUserAddresses(u.id);
        fetchUserOrders(u.id);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

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

  // Save Address (syncs locally and to Supabase user_addresses if user is logged in)
  const saveAddress = async (newAddr) => {
    const tempId = newAddr.id || `addr-${Date.now()}`;
    let finalId = tempId;

    if (isSupabaseConfigured && user?.id) {
      try {
        const { data, error } = await supabase
          .from('user_addresses')
          .insert({
            user_id: user.id,
            label: newAddr.label || 'Home',
            name: newAddr.name,
            phone: newAddr.phone,
            line1: newAddr.line1,
            line2: newAddr.line2 || '',
            city: newAddr.city,
            state: newAddr.state,
            pincode: newAddr.pincode,
            is_default: !!newAddr.isDefault
          })
          .select()
          .single();

        if (!error && data) {
          finalId = data.id;
        } else if (error) {
          console.warn('Supabase user_addresses insert warning:', error);
        }
      } catch (err) {
        console.warn('Failed to insert address into Supabase:', err);
      }
    }

    const addressObj = {
      ...newAddr,
      id: finalId
    };

    setAddresses((prev) => {
      const updated = [addressObj, ...prev.filter((a) => a.id !== addressObj.id)];
      try {
        localStorage.setItem('rb_saved_addresses', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setSelectedAddressId(finalId);
    showToast(lang === 'hi' ? 'पता सफलतापूर्वक सुरक्षित हो गया!' : 'Address saved successfully!');
    return addressObj;
  };

  // Delete Address (syncs locally and Supabase)
  const deleteAddress = async (addressId) => {
    if (isSupabaseConfigured && user?.id) {
      try {
        await supabase
          .from('user_addresses')
          .delete()
          .eq('id', addressId)
          .eq('user_id', user.id);
      } catch (err) {
        console.warn('Failed to delete address from Supabase:', err);
      }
    }

    setAddresses((prev) => {
      const updated = prev.filter((a) => a.id !== addressId);
      try {
        localStorage.setItem('rb_saved_addresses', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (selectedAddressId === addressId) {
      setSelectedAddressId('');
    }
    showToast(lang === 'hi' ? 'पता हटा दिया गया' : 'Address removed');
  };

  const placeOrder = async (paymentMethod = 'COD') => {
    const selectedAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0] || {
      line1: 'Selected Delivery Location',
      city: 'Delhi',
      pincode: pincode,
      name: user?.name || 'Customer',
      phone: user?.phone || ''
    };
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
      status: 'placed',
      address: {
        name: selectedAddr.name || user?.name || 'Customer',
        phone: selectedAddr.phone || user?.phone || '',
        line1: selectedAddr.line1,
        line2: selectedAddr.line2 || '',
        city: selectedAddr.city,
        state: selectedAddr.state || '',
        pincode: selectedAddr.pincode
      },
      estimatedArrival: 'In 3-5 Days'
    };

    // Sync order to Supabase orders table if configured & logged in
    if (isSupabaseConfigured && user?.id) {
      try {
        await supabase.from('orders').insert({
          id: newOrderId,
          user_id: user.id,
          user_email: user.email,
          items: newOrder.items,
          total: newOrder.total,
          payment_method: newOrder.paymentMethod,
          status: newOrder.status,
          shipping_address: newOrder.address
        });
      } catch (err) {
        console.warn('Supabase orders table insert warning:', err);
      }
    }

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem('rb_saved_orders', JSON.stringify(updated));
      } catch {}
      return updated;
    });

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
        loginUser,
        logoutUser,
        addresses,
        setAddresses,
        saveAddress,
        deleteAddress,
        fetchUserAddresses,
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
