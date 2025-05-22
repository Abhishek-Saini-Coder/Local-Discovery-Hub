import React from 'react';
import { BusinessCategory } from '../types';
import { CATEGORIES_AVAILABLE } from '../constants';

interface CategoryFilterProps {
  selectedCategory: BusinessCategory | 'All';
  setSelectedCategory: (category: BusinessCategory | 'All') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories: (BusinessCategory | 'All')[] = ['All', ...CATEGORIES_AVAILABLE];

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
      <label htmlFor="category-select" className="text-sm font-medium text-text-body mr-2 whitespace-nowrap shrink-0"> {/* Updated label color */}
        Filter by Category:
      </label>
      <select 
        id="category-select"
        name="category" // Added name for better form semantics
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value as BusinessCategory | 'All')}
        className={`block w-full sm:w-auto py-3 px-4 border-2 border-border-color bg-input-bg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-base transition-colors ${selectedCategory === 'All' ? 'text-text-muted' : 'text-text-header'}`} // Updated text, border, bg colors, dynamic color for "All Categories"
        aria-label="Filter businesses by category"
      >
        {categories.map(category => (
          <option key={category} value={category} className={category === 'All' ? 'text-text-muted' : 'text-text-header'}>
            {category === 'All' ? 'All Categories' : category}
          </option>
        ))}
      </select>
    </div>
  );
};