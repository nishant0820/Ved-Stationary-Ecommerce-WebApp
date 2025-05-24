import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext.jsx';
import OrderSummary from '@/components/OrderSummary';
import CheckoutForm from '@/components/checkout/CheckoutForm.jsx';
import CheckoutSubmitButton from '@/components/checkout/CheckoutSubmitButton.jsx';
import { addOrder } from '@/data/orders';
import { initializeRazorpayPayment } from '@/utils/razorpay';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'razorpay'
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    if (cartItems.length === 0 && !isProcessing) {
      toast({ title: "Your cart is empty", description: "Redirecting to cart...", variant: "destructive" });
      navigate('/cart');
    }
  }, [cartItems, navigate, isProcessing, toast]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.user_metadata?.full_name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processOrder = async (paymentDetails = {}) => {
    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.18; 
    const total = subtotal + shipping + tax;

    const orderData = {
      customerId: user?.id || null, 
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        discount: item.discount,
        quantity: item.quantity
      })),
      shippingAddress: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      paymentMethod: formData.paymentMethod,
      paymentId: paymentDetails.razorpay_payment_id || `sim_${Date.now()}`,
      subtotal,
      shipping,
      tax,
      total
    };

    try {
      const newOrder = await addOrder(orderData);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${newOrder.id} has been placed.`,
        duration: 5000,
      });
      navigate('/order-success', { state: { orderId: newOrder.id } });
    } catch (error) {
      console.error('Error saving order:', error);
      toast({
        title: "Error Saving Order",
        description: error.message || "There was an error saving your order. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Form Error",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);

    if (formData.paymentMethod === 'razorpay') {
      const subtotal = getCartTotal();
      const shipping = subtotal > 500 ? 0 : 50;
      const tax = subtotal * 0.18;
      const total = subtotal + shipping + tax;

      const razorpayOrderData = {
        total: total,
        id: `order_temp_${Date.now()}`, 
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
        }
      };

      initializeRazorpayPayment(
        razorpayOrderData,
        (paymentResponse) => {
          processOrder(paymentResponse);
        },
        (error) => {
          console.error('Razorpay payment error:', error);
          toast({
            title: "Payment Failed",
            description: error.message || "An error occurred during payment. Please try again.",
            variant: "destructive",
          });
          setIsProcessing(false);
        }
      );
    } else {
      await new Promise(resolve => setTimeout(resolve, 1500));
      processOrder();
    }
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty.</h1>
        <p className="text-gray-600">Redirecting you to the cart page...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div 
          className="lg:w-2/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit}>
            <CheckoutForm formData={formData} handleChange={handleChange} errors={errors} />
            <div className="lg:hidden mb-6">
              <OrderSummary />
            </div>
            <CheckoutSubmitButton isProcessing={isProcessing} />
          </form>
        </motion.div>
        <div className="hidden lg:block lg:w-1/3">
          <div className="sticky top-24">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;