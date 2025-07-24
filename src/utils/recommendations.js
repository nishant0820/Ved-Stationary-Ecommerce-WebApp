import { getAllProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

// AI-powered recommendation algorithms
export class ProductRecommendationEngine {
  constructor() {
    this.products = [];
    this.userHistory = [];
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      this.products = await getAllProducts();
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing recommendation engine:', error);
      this.products = [];
    }
  }

  // Content-based filtering: Recommend products similar to viewed/purchased items
  getContentBasedRecommendations(targetProduct, limit = 4) {
    if (!targetProduct || !this.products.length) return [];

    const similarities = this.products
      .filter(product => product.id !== targetProduct.id)
      .map(product => ({
        product,
        similarity: this.calculateContentSimilarity(targetProduct, product)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(item => item.product);

    return similarities;
  }

  // Collaborative filtering: Recommend based on user behavior patterns
  getCollaborativeRecommendations(userPreferences, limit = 4) {
    if (!this.products.length) return [];

    const scored = this.products
      .map(product => ({
        product,
        score: this.calculateCollaborativeScore(product, userPreferences)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);

    return scored;
  }

  // Trending products based on popularity metrics
  getTrendingRecommendations(limit = 4) {
    if (!this.products.length) return [];

    return this.products
      .map(product => ({
        product,
        trendScore: this.calculateTrendScore(product)
      }))
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, limit)
      .map(item => item.product);
  }

  // Smart recommendations based on current cart items
  getCartBasedRecommendations(cartItems, limit = 4) {
    if (!cartItems.length || !this.products.length) return [];

    const cartCategories = [...new Set(cartItems.map(item => item.category))];
    const cartPriceRange = this.getCartPriceRange(cartItems);
    
    const recommendations = this.products
      .filter(product => !cartItems.some(cartItem => cartItem.id === product.id))
      .map(product => ({
        product,
        relevance: this.calculateCartRelevance(product, cartCategories, cartPriceRange)
      }))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit)
      .map(item => item.product);

    return recommendations;
  }

  // Category-based recommendations
  getCategoryRecommendations(category, excludeProductId, limit = 4) {
    if (!category || !this.products.length) return [];

    return this.products
      .filter(product => 
        product.category === category && 
        product.id !== excludeProductId
      )
      .sort((a, b) => {
        // Sort by rating and discount
        const aScore = (a.rating || 0) + (a.discount || 0) * 0.1;
        const bScore = (b.rating || 0) + (b.discount || 0) * 0.1;
        return bScore - aScore;
      })
      .slice(0, limit);
  }

  // Hybrid recommendation combining multiple algorithms
  getHybridRecommendations(context, limit = 6) {
    const { currentProduct, cartItems, userPreferences, category } = context;
    
    let recommendations = [];

    // Content-based (40% weight)
    if (currentProduct) {
      const contentBased = this.getContentBasedRecommendations(currentProduct, 3);
      recommendations.push(...contentBased.map(p => ({ ...p, source: 'content', weight: 0.4 })));
    }

    // Cart-based (30% weight)
    if (cartItems?.length) {
      const cartBased = this.getCartBasedRecommendations(cartItems, 3);
      recommendations.push(...cartBased.map(p => ({ ...p, source: 'cart', weight: 0.3 })));
    }

    // Category-based (20% weight)
    if (category) {
      const categoryBased = this.getCategoryRecommendations(category, currentProduct?.id, 2);
      recommendations.push(...categoryBased.map(p => ({ ...p, source: 'category', weight: 0.2 })));
    }

    // Trending (10% weight)
    const trending = this.getTrendingRecommendations(2);
    recommendations.push(...trending.map(p => ({ ...p, source: 'trending', weight: 0.1 })));

    // Remove duplicates and score
    const uniqueRecommendations = this.removeDuplicatesAndScore(recommendations);
    
    return uniqueRecommendations.slice(0, limit);
  }

  // Helper methods for similarity calculations
  calculateContentSimilarity(product1, product2) {
    let similarity = 0;

    // Category similarity (high weight)
    if (product1.category === product2.category) {
      similarity += 0.4;
    }

    // Price similarity (medium weight)
    const priceDiff = Math.abs((product1.price || 0) - (product2.price || 0));
    const maxPrice = Math.max(product1.price || 0, product2.price || 0);
    const priceScore = maxPrice > 0 ? 1 - (priceDiff / maxPrice) : 1;
    similarity += priceScore * 0.3;

    // Name/description similarity (medium weight)
    const textSimilarity = this.calculateTextSimilarity(
      (product1.name || '') + ' ' + (product1.description || ''),
      (product2.name || '') + ' ' + (product2.description || '')
    );
    similarity += textSimilarity * 0.3;

    return similarity;
  }

  calculateCollaborativeScore(product, userPreferences) {
    let score = 0;

    // Prefer user's favorite categories
    if (userPreferences.favoriteCategories?.includes(product.category)) {
      score += 0.4;
    }

    // Price preference
    const priceRange = userPreferences.priceRange || [0, 1000];
    if (product.price >= priceRange[0] && product.price <= priceRange[1]) {
      score += 0.3;
    }

    // Rating preference
    if (product.rating >= 4) {
      score += 0.2;
    }

    // Discount preference
    if (product.discount > 0) {
      score += 0.1;
    }

    return score;
  }

  calculateTrendScore(product) {
    let score = 0;

    // High rating products
    score += (product.rating || 0) * 0.3;

    // Products with discounts
    score += (product.discount || 0) * 0.02;

    // Newer products (if created_at exists)
    if (product.created_at) {
      const daysSinceCreated = (Date.now() - new Date(product.created_at).getTime()) / (1000 * 60 * 60 * 24);
      const recencyScore = Math.max(0, 1 - daysSinceCreated / 30); // Prefer products created within 30 days
      score += recencyScore * 0.2;
    }

    // Random factor for diversity
    score += Math.random() * 0.1;

    return score;
  }

  calculateCartRelevance(product, cartCategories, cartPriceRange) {
    let relevance = 0;

    // Same category as cart items
    if (cartCategories.includes(product.category)) {
      relevance += 0.5;
    }

    // Similar price range
    if (product.price >= cartPriceRange.min * 0.5 && product.price <= cartPriceRange.max * 2) {
      relevance += 0.3;
    }

    // Complementary products (office supplies with pens, etc.)
    const complementaryMap = {
      'notebooks': ['pens', 'office'],
      'pens': ['notebooks', 'papers'],
      'art': ['papers', 'office'],
      'office': ['pens', 'papers'],
      'papers': ['pens', 'office']
    };

    cartCategories.forEach(category => {
      if (complementaryMap[category]?.includes(product.category)) {
        relevance += 0.2;
      }
    });

    return relevance;
  }

  calculateTextSimilarity(text1, text2) {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const commonWords = words1.filter(word => words2.includes(word));
    const totalWords = new Set([...words1, ...words2]).size;
    
    return totalWords > 0 ? commonWords.length / totalWords : 0;
  }

  getCartPriceRange(cartItems) {
    const prices = cartItems.map(item => item.price || 0);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: prices.reduce((sum, price) => sum + price, 0) / prices.length
    };
  }

  removeDuplicatesAndScore(recommendations) {
    const seen = new Set();
    const unique = [];

    recommendations.forEach(item => {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        unique.push(item);
      }
    });

    return unique.sort((a, b) => (b.weight || 0) - (a.weight || 0));
  }
}

// Singleton instance
export const recommendationEngine = new ProductRecommendationEngine();

// Hook for using recommendations in components
export const useProductRecommendations = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();

  const getRecommendations = async (context) => {
    await recommendationEngine.initialize();
    
    const userPreferences = {
      favoriteCategories: user?.user_metadata?.favorite_categories || [],
      priceRange: user?.user_metadata?.price_range || [0, 1000]
    };

    return recommendationEngine.getHybridRecommendations({
      ...context,
      cartItems,
      userPreferences
    });
  };

  return { getRecommendations };
};
