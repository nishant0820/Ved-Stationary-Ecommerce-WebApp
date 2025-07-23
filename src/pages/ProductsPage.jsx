import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters.jsx';
import ProductSearchBar from '@/components/products/ProductSearchBar.jsx';
import ActiveFiltersDisplay from '@/components/products/ActiveFiltersDisplay.jsx';
import { getAllProducts, getProductsByCategory, searchProducts as searchProductsDb } from '@/data/products'; // Renamed to avoid conflict
import { useToast } from '@/components/ui/use-toast';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(() => {
    const search = queryParams.get('search');
    return search ? search : '';
  });
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const category = queryParams.get('category');
    return category ? category : '';
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState(() => {
    const sort = queryParams.get('sort');
    return sort ? sort : '';
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsData = await getAllProducts();
        // Validate and clean the products data
        const validProducts = (productsData || []).map(product => ({
          ...product,
          name: product.name || '',
          description: product.description || '',
          price: product.price || 0,
          discount: product.discount || 0
        }));
        setAllProducts(validProducts);
      } catch (error) {
        toast({ title: "Error fetching products", description: error.message, variant: "destructive"});
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [toast]);
  
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory.trim()) params.set('category', selectedCategory);
    if (searchQuery && searchQuery.trim()) params.set('search', searchQuery);
    if (sortBy && sortBy.trim()) params.set('sort', sortBy);
    
    const newSearch = params.toString();
    if (newSearch !== location.search.slice(1)) {
      navigate({ search: newSearch }, { replace: true });
    }
  }, [selectedCategory, searchQuery, sortBy, navigate, location.search]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts]; // Create a new array to avoid mutating state

    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (searchQuery && searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(product => {
        const productName = product.name || '';
        const productDescription = product.description || '';
        return productName.toLowerCase().includes(lowerQuery) || 
               productDescription.toLowerCase().includes(lowerQuery);
      });
    }
    
    result = result.filter(product => {
      const finalPrice = product.discount > 0 
        ? product.price * (1 - product.discount / 100) 
        : product.price;
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });
    
    if (sortBy === 'price-low') {
      result.sort((a, b) => {
        const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
        const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => {
        const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
        const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
        return priceB - priceA;
      });
    } else if (sortBy === 'discount') {
      result.sort((a, b) => b.discount - a.discount);
    }
    
    return result;
  }, [allProducts, selectedCategory, searchQuery, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setPriceRange([0, 1000]);
    setSortBy('');
    // Also clear URL parameters
    navigate({ search: '' }, { replace: true });
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="w-full md:hidden mb-4">
          <Button 
            onClick={() => setShowFilters(!showFilters)} 
            variant="outline" 
            className="w-full flex items-center justify-center"
            aria-expanded={showFilters}
            aria-controls="filters-sidebar"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        
        <motion.aside 
          id="filters-sidebar"
          className={`w-full md:w-64 md:sticky md:top-24 self-start ${showFilters ? 'block' : 'hidden md:block'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProductFilters
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            sortBy={sortBy}
            onCategorySelect={(catId) => setSelectedCategory(catId === selectedCategory ? '' : catId)}
            onPriceChange={setPriceRange}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />
        </motion.aside>
        
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <ProductSearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={(e) => e.preventDefault()} 
            />
          </div>
          
          <ActiveFiltersDisplay
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onClearCategory={() => setSelectedCategory('')}
            onClearSearch={() => setSearchQuery('')}
            onClearSort={() => setSortBy('')}
          />
          
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
              <Button onClick={handleClearFilters} variant="outline">Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
