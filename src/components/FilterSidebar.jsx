import React from 'react';
import { useApp } from '../context/AppContext';
import { Filter, Star, Check, X } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';

export const FilterSidebar = ({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  careFilter,
  onCareFilterChange,
  onResetFilters,
  totalResults
}) => {
  const { lang, t } = useApp();

  return (
    <aside className="filter-sidebar">
      {/* Header */}
      <div className="filter-header">
        <div className="flex items-center gap-2">
          <Filter size={16} />
          <span className="filter-title">{t('filters')}</span>
        </div>
        <button className="filter-clear-btn" onClick={onResetFilters}>
          {t('clearAll')}
        </button>
      </div>

      {/* Category Facet */}
      <div className="filter-group">
        <h4 className="filter-group-title">{t('categories')}</h4>
        <div className="filter-options-list">
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="filter-radio-item">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.id}
                onChange={() => onSelectCategory(cat.id)}
              />
              <span className="filter-label">{lang === 'hi' ? cat.name_hi : cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Facet */}
      <div className="filter-group">
        <h4 className="filter-group-title">{t('priceRange')}</h4>
        <div className="filter-options-list">
          <label className="filter-radio-item">
            <input
              type="radio"
              name="price"
              checked={priceRange === 'all'}
              onChange={() => onPriceChange('all')}
            />
            <span className="filter-label">{lang === 'hi' ? 'सभी मूल्य' : 'All Prices'}</span>
          </label>
          <label className="filter-radio-item">
            <input
              type="radio"
              name="price"
              checked={priceRange === 'under-799'}
              onChange={() => onPriceChange('under-799')}
            />
            <span className="filter-label">{lang === 'hi' ? '₹799 से कम' : 'Under ₹799'}</span>
          </label>
          <label className="filter-radio-item">
            <input
              type="radio"
              name="price"
              checked={priceRange === '800-1299'}
              onChange={() => onPriceChange('800-1299')}
            />
            <span className="filter-label">₹800 - ₹1,299</span>
          </label>
          <label className="filter-radio-item">
            <input
              type="radio"
              name="price"
              checked={priceRange === 'above-1300'}
              onChange={() => onPriceChange('above-1300')}
            />
            <span className="filter-label">{lang === 'hi' ? '₹1,300 से अधिक' : '₹1,300 & Above'}</span>
          </label>
        </div>
      </div>

      {/* Minimum Rating Facet */}
      <div className="filter-group">
        <h4 className="filter-group-title">{t('customerRating')}</h4>
        <div className="filter-options-list">
          <label className="filter-radio-item">
            <input
              type="radio"
              name="rating"
              checked={minRating === 0}
              onChange={() => onRatingChange(0)}
            />
            <span className="filter-label">{lang === 'hi' ? 'सभी रेटिंग्स' : 'All Ratings'}</span>
          </label>
          <label className="filter-radio-item">
            <input
              type="radio"
              name="rating"
              checked={minRating === 4.5}
              onChange={() => onRatingChange(4.5)}
            />
            <span className="filter-label flex items-center gap-1">
              4.5 ★ & {lang === 'hi' ? 'अधिक' : 'Above'}
            </span>
          </label>
          <label className="filter-radio-item">
            <input
              type="radio"
              name="rating"
              checked={minRating === 4.0}
              onChange={() => onRatingChange(4.0)}
            />
            <span className="filter-label flex items-center gap-1">
              4.0 ★ & {lang === 'hi' ? 'अधिक' : 'Above'}
            </span>
          </label>
        </div>
      </div>

      {/* Plant Care Level Facet */}
      <div className="filter-group">
        <h4 className="filter-group-title">{t('careLevel')}</h4>
        <div className="filter-options-list">
          <label className="filter-radio-item">
            <input
              type="radio"
              name="care"
              checked={careFilter === 'all'}
              onChange={() => onCareFilterChange('all')}
            />
            <span className="filter-label">{lang === 'hi' ? 'सभी प्रकार' : 'All Care Types'}</span>
          </label>
          <label className="filter-radio-item">
            <input
              type="radio"
              name="care"
              checked={careFilter === 'easy'}
              onChange={() => onCareFilterChange('easy')}
            />
            <span className="filter-label">{t('easyCare')}</span>
          </label>
        </div>
      </div>
    </aside>
  );
};
