import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { 
  ChevronRight, 
  ArrowUpDown, 
  FilterX, 
  Sparkles, 
  Plus, 
  ShoppingBag,
  SlidersHorizontal,
  ArrowLeft,
  X,
  Filter
} from 'lucide-react';

export const CategoryPage = () => {
  const { 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    navigateTo, 
    goBack,
    lang, 
    t,
    addToCart 
  } = useApp();

  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [careFilter, setCareFilter] = useState('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => 
        p.name.toLowerCase().includes(q) ||
        (p.name_hi && p.name_hi.includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.search_aliases.some((alias) => alias.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      const catObj = CATEGORIES.find((c) => c.id === activeCategory);
      if (catObj && catObj.categoryKey) {
        list = list.filter((p) => p.category === catObj.categoryKey);
      }
    }

    // Price range filter
    if (priceRange === 'under-799') {
      list = list.filter((p) => p.pricing.offer_price < 800);
    } else if (priceRange === '800-1299') {
      list = list.filter((p) => p.pricing.offer_price >= 800 && p.pricing.offer_price <= 1299);
    } else if (priceRange === 'above-1300') {
      list = list.filter((p) => p.pricing.offer_price > 1299);
    }

    // Min rating filter
    if (minRating > 0) {
      list = list.filter((p) => p.rating.average >= minRating);
    }

    // Care filter
    if (careFilter === 'easy') {
      list = list.filter((p) => p.care_level === 'easy');
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.pricing.offer_price - b.pricing.offer_price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.pricing.offer_price - a.pricing.offer_price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating.average - a.rating.average);
    } else if (sortBy === 'popularity') {
      list.sort((a, b) => b.rating.count - a.rating.count);
    }

    return list;
  }, [searchQuery, activeCategory, priceRange, minRating, careFilter, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setPriceRange('all');
    setMinRating(0);
    setCareFilter('all');
    setSortBy('popularity');
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const activeCategoryTitle = lang === 'hi' ? activeCategoryObj.name_hi : activeCategoryObj.name;

  const activeFilterCount = (activeCategory !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (careFilter !== 'all' ? 1 : 0);

  // Lock scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  return (
    <div className="category-page-container py-4">
      <div className="container">
        {/* Breadcrumb Navigation & Back Button */}
        <div className="breadcrumb-bar mb-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button 
              onClick={goBack} 
              className="pdp-back-btn mr-1 flex items-center gap-1"
              title={t('back')}
              aria-label="Go Back"
            >
              <ArrowLeft size={16} />
              <span className="font-bold text-xs">{t('back')}</span>
            </button>
            <span className="text-muted text-xs">/</span>
            <button onClick={() => navigateTo('home')} className="breadcrumb-link">
              {t('home')}
            </button>
            <ChevronRight size={14} className="text-muted" />
            <span className="breadcrumb-current">
              {searchQuery ? `${lang === 'hi' ? 'खोज:' : 'Search:'} "${searchQuery}"` : activeCategoryTitle}
            </span>
          </div>
        </div>

        {/* Category Header & Sort Controls */}
        <div className="plp-header-strip mb-4">
          <div>
            <h1 className="plp-title">
              {searchQuery ? `${lang === 'hi' ? 'खोज परिणाम' : 'Search Results for'} "${searchQuery}"` : activeCategoryTitle}
            </h1>
            <p className="text-muted text-xs">
              {filteredProducts.length} {lang === 'hi' ? 'हस्तनिर्मित उत्पाद उपलब्ध' : 'handcrafted planters available'}
            </p>
          </div>

          <div className="plp-controls flex items-center gap-2">
            {/* Mobile Filter Trigger */}
            <button 
              className={`btn btn-outline-neutral btn-sm mobile-filter-btn flex items-center gap-1.5 ${activeFilterCount > 0 ? 'border-forest font-bold text-forest' : ''}`}
              onClick={() => setIsMobileFilterOpen(true)}
              aria-label="Open Filters"
            >
              <SlidersHorizontal size={14} />
              <span>{t('filters')}</span>
              {activeFilterCount > 0 && (
                <span className="filter-badge-pill">{activeFilterCount}</span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-wrap flex items-center gap-1">
              <ArrowUpDown size={14} className="text-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popularity">{t('popularity')}</option>
                <option value="price-asc">{t('priceLowHigh')}</option>
                <option value="price-desc">{t('priceHighLow')}</option>
                <option value="rating">{t('customerRating')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main PLP Layout: Left Sticky Sidebar + Right Product Grid */}
        <div className="plp-layout-grid">
          {/* Desktop Left-Hand Filter Sidebar */}
          <div className="desktop-filter-col">
            <FilterSidebar
              selectedCategory={activeCategory}
              onSelectCategory={(catId) => setActiveCategory(catId)}
              priceRange={priceRange}
              onPriceChange={(val) => setPriceRange(val)}
              minRating={minRating}
              onRatingChange={(val) => setMinRating(val)}
              careFilter={careFilter}
              onCareFilterChange={(val) => setCareFilter(val)}
              onResetFilters={handleResetFilters}
              totalResults={filteredProducts.length}
            />
          </div>

          {/* Product Grid / Empty State */}
          <div className="plp-products-col">
            {filteredProducts.length > 0 ? (
              <>
                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} showBuyNow={true} />
                  ))}
                </div>

                {/* Cross-Sell Injection Strip */}
                <div className="cross-sell-banner-strip my-4">
                  <div className="cross-sell-content">
                    <div className="cross-sell-info">
                      <span className="badge-chip inline-block mb-1">RECOMMENDED ADD-ON</span>
                      <h4>{lang === 'hi' ? '12-पीस मिनिएचर DIY लैंडस्केपिंग किट' : '12-Piece Miniature DIY Landscaping Kit'}</h4>
                      <p className="text-muted text-xs">
                        {lang === 'hi' ? 'अपने प्लांटर को रंग-बिरंगे पेबल्स, वुडन फेंस और मशरूम के साथ सजाएं।' : 'Personalize your miniature gardens with stone pathways, mini fences & moss.'}
                      </p>
                      <div className="price-block mt-1">
                        <span className="price-offer">₹349</span>
                        <span className="price-base">₹499</span>
                        <span className="price-discount">30% OFF</span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-primary btn-sm flex items-center gap-1"
                      onClick={() => addToCart('miniature-diy-accessories-kit', 1, true)}
                    >
                      <Plus size={15} />
                      <span>{t('addToCart')}</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Clean Anti-Cartoon Empty State */
              <div className="empty-state-box py-6 text-center">
                <div className="empty-state-icon-box">
                  <FilterX size={36} className="text-muted" />
                </div>
                <h3 className="empty-state-title mt-2">{t('noProductsFound')}</h3>
                <p className="empty-state-desc text-muted text-sm max-w-md mx-auto mt-1">
                  {t('tryAdjustingFilters')}
                </p>
                <button 
                  className="btn btn-primary mt-4"
                  onClick={handleResetFilters}
                >
                  {t('clearAll')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Slide-Up Bottom Sheet Drawer */}
      {isMobileFilterOpen && (
        <div className="mobile-filter-drawer-wrapper">
          <div 
            className="mobile-filter-backdrop" 
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="mobile-filter-drawer">
            <div className="mobile-filter-header">
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <SlidersHorizontal size={17} className="text-forest flex-shrink-0" />
                <h3 className="font-bold text-sm text-dark">{t('filters')}</h3>
                {activeFilterCount > 0 && (
                  <span className="filter-badge-pill">{activeFilterCount}</span>
                )}
                <span className="text-xs text-muted truncate">
                  ({filteredProducts.length})
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {activeFilterCount > 0 && (
                  <button 
                    className="filter-clear-btn"
                    onClick={handleResetFilters}
                  >
                    {lang === 'hi' ? 'साफ़ करें' : 'Clear All'}
                  </button>
                )}
                <button 
                  className="mobile-filter-close-btn"
                  onClick={() => setIsMobileFilterOpen(false)}
                  aria-label="Close Filters"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mobile-filter-body">
              <FilterSidebar
                selectedCategory={activeCategory}
                onSelectCategory={(catId) => setActiveCategory(catId)}
                priceRange={priceRange}
                onPriceChange={(val) => setPriceRange(val)}
                minRating={minRating}
                onRatingChange={(val) => setMinRating(val)}
                careFilter={careFilter}
                onCareFilterChange={(val) => setCareFilter(val)}
                onResetFilters={handleResetFilters}
                totalResults={filteredProducts.length}
              />
            </div>

            <div className="mobile-filter-footer">
              <button 
                className="btn btn-outline-neutral flex-1 py-2.5"
                onClick={handleResetFilters}
              >
                {t('clearAll')}
              </button>
              <button 
                className="btn btn-primary flex-1 py-2.5"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                {t('applyFilters')} ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
