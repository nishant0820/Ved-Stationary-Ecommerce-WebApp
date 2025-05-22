
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2, ArrowLeft, Check, Truck, RefreshCw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { getProductById, products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    // Get product by ID
    const foundProduct = getProductById(id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Get related products (same category, excluding current product)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
    }
    
    setLoading(false);
  }, [id]);
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      // Add product to cart with selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity}) has been added to your cart.`,
        duration: 3000,
      });
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={handleGoBack}>Go Back</Button>
      </div>
    );
  }
  
  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-gray-600"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        {/* Product Image */}
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
        
        {/* Product Details */}
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col h-full">
            <div>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                {product.discount > 0 ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-primary mr-2">
                      ₹{discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-500 line-through">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <Badge variant="destructive" className="ml-2">
                      {product.discount}% OFF
                    </Badge>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    ₹{product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <span className="mr-2">Availability:</span>
                  {product.inStock ? (
                    <span className="text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Buy Now
                </Button>
              </div>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">Easy Returns</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">Quality Guarantee</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Product Description</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
          </TabsContent>
          
          <TabsContent value="specifications" className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Brand</span>
                <span>Ved Stationary</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Material</span>
                <span>Premium Quality</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Dimensions</span>
                <span>Standard</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Weight</span>
                <span>0.5 kg</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Country of Origin</span>
                <span>India</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Warranty</span>
                <span>1 Year</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <p className="text-gray-700 mb-4">
              We offer free shipping on all orders above ₹500. Orders are typically processed within 24 hours and delivered within 3-5 business days.
            </p>
            
            <h3 className="text-lg font-semibold mb-4 mt-6">Return Policy</h3>
            <p className="text-gray-700 mb-4">
              If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be unused and in their original packaging.
            </p>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
