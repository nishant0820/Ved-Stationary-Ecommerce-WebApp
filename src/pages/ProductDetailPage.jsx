import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, ThumbsUp, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useToast } from '@/components/ui/use-toast';
import { getProductById } from '@/data/products';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { cn } from '@/lib/utils';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          toast({ title: "Product not found", variant: "destructive" });
          navigate('/products');
        }
      } catch (error) {
        toast({ title: "Error fetching product", description: error.message, variant: "destructive" });
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate, toast]);

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    if (product) {
      addToCart({ ...product, quantity });
      toast({
        title: `${product.name} added to cart!`,
        description: `Quantity: ${quantity}`,
      });
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center text-foreground">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Product not found</h1>
        <Button asChild variant="link" className="mt-4">
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back to products
          </Link>
        </Button>
      </div>
    );
  }

  const finalPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;
  const itemInCart = cartItems.find(item => item.id === product.id);

  return (
    <div className={cn("container mx-auto px-4 py-8", theme === 'dark' ? 'text-slate-100' : 'text-gray-900')}>
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-foreground hover:bg-muted">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <motion.div
          className={cn("rounded-lg shadow-lg overflow-hidden", theme === 'dark' ? 'bg-slate-800' : 'bg-card')}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover aspect-square"/>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{product.name}</h1>

          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(125 reviews)</span>
          </div>

          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-primary">₹{finalPrice.toFixed(2)}</span>
              {product.discount > 0 && (
                <span className={cn("text-xl line-through", theme === 'dark' ? 'text-slate-400' : 'text-gray-500')}>₹{product.price.toFixed(2)}</span>
              )}
            </div>
            {product.discount > 0 && (
              <div className="mt-1 flex items-center text-sm font-medium text-green-500 dark:text-green-400">
                <Percent className="h-4 w-4 mr-1" />
                <span>{product.discount}% OFF</span>
              </div>
            )}
          </div>

          <p className={cn("leading-relaxed", theme === 'dark' ? 'text-slate-300' : 'text-gray-700')}>{product.description}</p>

          <div className="flex items-center space-x-3">
            <span className={cn(theme === 'dark' ? 'text-slate-300' : 'text-gray-700')}>Quantity:</span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className={cn("w-20 p-2 border rounded-md text-center", theme === 'dark' ? 'bg-slate-700 border-slate-600 text-slate-100' : 'border-gray-300')}
            />
          </div>

          {product.instock ? (
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={handleAddToCart}
              disabled={itemInCart && itemInCart.quantity >= 10}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {itemInCart ? 'Add More' : 'Add to Cart'}
            </Button>
          ) : (
            <Button size="lg" className="w-full md:w-auto" disabled>
              Out of Stock
            </Button>
          )}
          {itemInCart && itemInCart.quantity >= 10 && (
             <p className="text-sm text-red-500 mt-1">Maximum quantity (10) already in cart.</p>
          )}

          <div className={cn("border-t pt-6 space-y-3", theme === 'dark' ? 'border-slate-700' : 'border-gray-200')}>
            <div className="flex items-center text-sm">
              <ThumbsUp className="h-5 w-5 mr-2 text-green-500 dark:text-green-400" />
              <span className={cn(theme === 'dark' ? 'text-slate-300' : 'text-gray-700')}>95% of customers recommend this product.</span>
            </div>
            <div className="flex items-center text-sm">
              <span className={cn("font-medium mr-2", theme === 'dark' ? 'text-slate-100' : 'text-gray-900')}>Category:</span>
              <Link to={`/products?category=${product.category}`} className="text-primary hover:underline capitalize">
                {product.category}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;