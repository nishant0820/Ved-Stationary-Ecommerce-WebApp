// Initialize Razorpay payment
export const initializeRazorpayPayment = (orderData, onSuccess, onError) => {
  // Check if Razorpay is loaded
  if (!window.Razorpay) {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => createRazorpayOrder(orderData, onSuccess, onError);
    script.onerror = () => {
      onError(new Error('Failed to load Razorpay SDK'));
    };
    document.body.appendChild(script);
  } else {
    createRazorpayOrder(orderData, onSuccess, onError);
  }
};

// Create Razorpay order
const createRazorpayOrder = (orderData, onSuccess, onError) => {
  try {
    // In a real implementation, you would make an API call to your backend
    // to create a Razorpay order and get the order ID
    // For demo purposes, we'll simulate this with a fake order ID
    const orderId = `order_${Date.now()}`;
    
    const options = {
      key: 'rzp_test_cHvM6ejaGkEjrs', // Replace with your actual Razorpay key
      amount: orderData.total * 100, // Amount in paise
      currency: 'INR',
      name: 'Ved Stationary and Graphics',
      description: `Order #${orderData.id}`,
      order_id: 'order_QtbbvAZuacg5yc',
      handler: function(response) {
        // Handle successful payment
        onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature
        });
      },
      prefill: {
        name: orderData.customerName,
        email: orderData.customerEmail,
        contact: orderData.customerPhone
      },
      notes: {
        address: `${orderData.shippingAddress.street}, ${orderData.shippingAddress.city}`
      },
      theme: {
        color: '#4f46e5'
      },
      modal: {
        ondismiss: function() {
          onError(new Error('Payment cancelled by user'));
        }
      }
    };
    
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  } catch (error) {
    onError(error);
  }
};
