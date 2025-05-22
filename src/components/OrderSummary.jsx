
import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';

const OrderSummary = () => {
  const { cartItems } = useCart();
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.discount > 0 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    return total + (price * item.quantity);
  }, 0);
  
  // Calculate discount
  const discount = cartItems.reduce((total, item) => {
    return total + (item.discount > 0 ? (item.price * item.discount / 100) * item.quantity : 0);
  }, 0);
  
  // Shipping cost (free over ₹500)
  const shipping = subtotal > 500 ? 0 : 50;
  
  // Calculate tax (18% GST)
  const tax = subtotal * 0.18;
  
  // Calculate total
  const total = subtotal + shipping + tax;

  return (
    <motion.div 
      className="bg-gray-50 p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (18% GST)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        
        {subtotal < 500 && shipping > 0 && (
          <p className="text-sm text-muted-foreground mt-4">
            Add ₹{(500 - subtotal).toFixed(2)} more to get free shipping!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default OrderSummary;
