import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ShoppingBag } from 'lucide-react';
import { getOrderById } from '@/data/orders';
import { useToast } from '@/components/ui/use-toast';

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const orderIdFromState = location.state?.orderId;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderIdFromState) {
      toast({ title: "No order ID found", description: "Redirecting to homepage.", variant: "destructive" });
      navigate('/');
      return;
    }

    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const fetchedOrder = await getOrderById(orderIdFromState);
        if (fetchedOrder) {
          setOrder(fetchedOrder);
        } else {
          toast({ title: "Order not found", description: `Could not find details for order ${orderIdFromState}.`, variant: "destructive" });
        }
      } catch (error) {
        toast({ title: "Error fetching order", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderIdFromState, navigate, toast]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4">
         <p className="text-white text-xl">Loading order details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4">
      <motion.div
        className="bg-white p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-2xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Thank You for Your Order!
        </motion.h1>

        <motion.p variants={itemVariants} className="text-gray-600 text-lg mb-6">
          Your order has been placed successfully. We'll notify you once it's shipped.
        </motion.p>

        {order && (
          <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-lg mb-8 text-left space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Order ID:</span> #{order.id}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Date:</span> {new Date(order.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Amount:</span> ₹{order.total?.toFixed(2)}
            </p>
             <p className="text-gray-700">
              <span className="font-semibold">Status:</span> <span className="capitalize">{order.status}</span>
            </p>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="space-y-3 md:space-y-0 md:flex md:gap-4 md:justify-center">
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link to="/products">
              <ShoppingBag className="mr-2 h-5 w-5" /> Continue Shopping
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
            <Link to="/admin"> 
              <Package className="mr-2 h-5 w-5" /> View My Orders
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;