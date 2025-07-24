import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner.jsx';
import { useProductRecommendations } from '@/utils/recommendations';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ProductRecommendations = ({ 
  currentProduct = null, 
  category = null, 
  title = "Recommended for You",
  maxItems = 4,
  showReasonBadges = true,
  className = ""
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendationType, setRecommendationType] = useState('hybrid');
  const { getRecommendations } = useProductRecommendations();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, [currentProduct, category, recommendationType]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const context = {
        currentProduct,
        category,
        type: recommendationType
      };
      
      const results = await getRecommendations(context);
      setRecommendations(results.slice(0, maxItems));
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'trending': return <TrendingUp className="h-3 w-3" />;
      case 'cart': return <ShoppingCart className="h-3 w-3" />;
      case 'content': return <Eye className="h-3 w-3" />;
      default: return <Sparkles className="h-3 w-3" />;
    }
  };

  const getRecommendationLabel = (source) => {
    switch (source) {
      case 'trending': return 'Trending';
      case 'cart': return 'Cart Match';
      case 'content': return 'Similar';
      case 'category': return 'Category';
      default: return 'AI Pick';
    }
  };

  const recommendationTypes = [
    { id: 'hybrid', label: 'Smart Picks', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'trending', label: 'Trending', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'similar', label: 'Similar Items', icon: <Eye className="h-4 w-4" /> }
  ];

  if (loading) {
    return (
      <div className={cn("py-8", className)}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            {title}
          </h2>
        </div>
        <LoadingSpinner 
          size="md" 
          text="Finding perfect recommendations..."
          showText={true}
        />
      </div>
    );
  }

  if (!recommendations.length) {
    return null;
  }

  return (
    <motion.div 
      className={cn("py-8", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          {title}
        </h2>
        
        {/* Recommendation Type Toggle */}
        <div className="flex gap-2">
          {recommendationTypes.map((type) => (
            <Button
              key={type.id}
              variant={recommendationType === type.id ? "default" : "outline"}
              size="sm"
              onClick={() => setRecommendationType(type.id)}
              className="flex items-center gap-1"
            >
              {type.icon}
              <span className="hidden sm:inline">{type.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Recommendation Badge */}
            {showReasonBadges && product.source && (
              <motion.div
                className="absolute top-2 left-2 z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "flex items-center gap-1 text-xs",
                    "bg-primary/10 text-primary border-primary/20",
                    "group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  )}
                >
                  {getRecommendationIcon(product.source)}
                  {getRecommendationLabel(product.source)}
                </Badge>
              </motion.div>
            )}

            <ProductCard product={product} />

            {/* AI Confidence Indicator */}
            {product.weight && product.weight > 0.3 && (
              <motion.div
                className="absolute top-2 right-2 z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  product.weight > 0.7 ? "bg-green-500" :
                  product.weight > 0.5 ? "bg-yellow-500" : "bg-blue-500"
                )} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* View More Button */}
      {recommendations.length >= maxItems && (
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            variant="outline" 
            onClick={() => navigate('/products')}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Discover More Products
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductRecommendations;
