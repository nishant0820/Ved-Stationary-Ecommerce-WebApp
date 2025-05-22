import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { categories as allCategories } from '@/data/products';

const ActiveFiltersDisplay = ({
  selectedCategory,
  searchQuery,
  sortBy,
  onClearCategory,
  onClearSearch,
  onClearSort,
}) => {
  const getSortLabel = (sortValue) => {
    if (sortValue === 'price-low') return 'Price: Low to High';
    if (sortValue === 'price-high') return 'Price: High to Low';
    if (sortValue === 'discount') return 'Highest Discount';
    return '';
  };

  const hasActiveFilters = selectedCategory || searchQuery || sortBy;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium mr-2">Active Filters:</span>
      {selectedCategory && (
        <Badge variant="secondary" className="flex items-center gap-1 py-1 px-2">
          {allCategories.find(c => c.id === selectedCategory)?.name}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
            onClick={onClearCategory}
            aria-label={`Remove category filter: ${allCategories.find(c => c.id === selectedCategory)?.name}`}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      {searchQuery && (
        <Badge variant="secondary" className="flex items-center gap-1 py-1 px-2">
          Search: "{searchQuery}"
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
            onClick={onClearSearch}
            aria-label={`Remove search filter: ${searchQuery}`}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      {sortBy && (
        <Badge variant="secondary" className="flex items-center gap-1 py-1 px-2">
          Sort: {getSortLabel(sortBy)}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
            onClick={onClearSort}
            aria-label={`Remove sort filter: ${getSortLabel(sortBy)}`}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
    </div>
  );
};

export default ActiveFiltersDisplay;