import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const discountedPrice = item.discount > 0 
    ? item.price * (1 - item.discount / 100) 
    : item.price;

  return (
    <motion.div 
      className="flex items-center border-b py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <div className="flex items-center mt-1">
          <span className="text-primary font-semibold">₹{discountedPrice.toFixed(2)}</span>
          {item.discount > 0 && (
            <span className="text-sm text-muted-foreground line-through ml-2">
              ₹{item.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CartItem;