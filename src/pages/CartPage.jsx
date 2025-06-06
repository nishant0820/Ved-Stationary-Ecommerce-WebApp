import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { cn } from '@/lib/utils';

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 3000,
    });
  };

  return (
    <div className={cn("container mx-auto px-4 py-8", theme === 'dark' ? 'text-slate-100' : 'text-gray-900')}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
        {cartItems.length > 0 && (
          <Button
            variant="outline"
            className={cn(
              "text-destructive hover:text-destructive/90",
              theme === 'dark' ? 'border-red-500/50 hover:bg-red-500/10' : 'hover:bg-destructive/10'
            )}
            onClick={handleClearCart}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={cn("rounded-lg shadow-sm p-6", theme === 'dark' ? 'bg-slate-800' : 'bg-card')}>
              <AnimatePresence>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>

              <div className={cn("mt-6 pt-6", theme === 'dark' ? 'border-t border-slate-700' : 'border-t')}>
                <Link to="/products">
                  <Button variant="outline" className="flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="lg:w-1/3">
            <OrderSummary />
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Button asChild className="w-full" size="lg">
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={cn("inline-flex items-center justify-center w-24 h-24 rounded-full mb-6", theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100')}>
            <ShoppingCart className={cn("h-12 w-12", theme === 'dark' ? 'text-slate-400' : 'text-gray-400')} />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet. Browse our collection and find something you'll love!
          </p>
          <Button asChild size="lg">
            <Link to="/products">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default CartPage;