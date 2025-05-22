import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { categories as allCategories } from '@/data/products';

const ProductFilters = ({
  selectedCategory,
  priceRange,
  sortBy,
  onCategorySelect,
  onPriceChange,
  onSortChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="text-xs h-8"
        >
          Clear All
        </Button>
      </div>
      
      <Separator className="my-4" />
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {allCategories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Button
                variant="ghost"
                className={`justify-start px-2 py-1 h-auto text-sm w-full ${
                  selectedCategory === category.id ? 'bg-primary/10 text-primary' : ''
                }`}
                onClick={() => onCategorySelect(category.id)}
              >
                {category.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          aria-label="Price range slider"
        />
      </div>
      
      <Separator className="my-4" />
      
      <div>
        <h3 className="font-medium mb-3">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'discount', label: 'Highest Discount' },
          ].map(option => (
            <Button
              key={option.value}
              variant="ghost"
              className={`justify-start px-2 py-1 h-auto text-sm w-full ${
                sortBy === option.value ? 'bg-primary/10 text-primary' : ''
              }`}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;