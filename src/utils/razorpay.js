
// Check if Razorpay script is already loaded
const isRazorpayLoaded = () => {
  return typeof window !== 'undefined' && window.Razorpay;
};

// Load Razorpay script with timeout and retry mechanism
const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (isRazorpayLoaded()) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    const timeout = setTimeout(() => {
      reject(new Error('Razorpay script loading timeout'));
    }, 10000); // 10 second timeout

    script.onload = () => {
      clearTimeout(timeout);
      resolve();
    };
    
    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Failed to load Razorpay SDK'));
    };
    
    document.head.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initializeRazorpayPayment = async (orderData, onSuccess, onError) => {
  try {
    // Show loading indicator
    console.log('Initializing Razorpay payment...');
    
    // Ensure Razorpay is loaded
    if (!isRazorpayLoaded()) {
      console.log('Loading Razorpay script...');
      await loadRazorpayScript();
    }
    
    // Create and process the order
    await createRazorpayOrder(orderData, onSuccess, onError);
  } catch (error) {
    console.error('Razorpay initialization error:', error);
    onError(error);
  }
};

// Create Razorpay order
const createRazorpayOrder = async (orderData, onSuccess, onError) => {
  try {
    // Check if Razorpay key is available
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    console.log('Razorpay Key:', razorpayKey ? 'Available' : 'Missing');
    console.log('Order data:', orderData);
    
    if (!razorpayKey) {
      throw new Error('Razorpay key is not configured. Please check environment variables.');
    }

    console.log('Making request to server...');
    
    // Use local server when in development, deployed server in production
    const apiUrl = import.meta.env.DEV 
      ? 'http://localhost:3000/create-order/api' 
      : 'https://server-yoy0.onrender.com/create-order/api';
    
    console.log('API URL:', apiUrl);
    
    // Call your backend API to create a Razorpay order
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: orderData.total
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response:', errorText);
      throw new Error(`Failed to create order: ${response.status} ${response.statusText}`);
    }

    const order = await response.json();
    console.log('Order created successfully:', order);


    const options = {
      key: razorpayKey, // Your Razorpay key
      amount: order.amount, // Use amount from backend response
      currency: "INR",
      name: 'Ved Stationary and Graphics',
      description: `Order fx`,
      order_id: order.id, // Use the actual order ID from backend


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
     handler: async function (response){
        try {
          console.log('Payment successful, validating...', response);
          
          const body = {
            ...response,
          }
          
          // Use local server when in development, deployed server in production
          const validateUrl = import.meta.env.DEV 
            ? 'http://localhost:3000/create-order/validate' 
            : 'https://server-yoy0.onrender.com/create-order/validate';
          
          const validateRes = await fetch(validateUrl, { 
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (validateRes.ok) {
            const result = await validateRes.json();
            console.log('Payment validation successful:', result);
            onSuccess(response);
          } else {
            const error = await validateRes.text();
            console.error('Payment validation failed:', error);
            onError(new Error('Payment validation failed'));
          }
        } catch (error) {
          console.error('Payment handler error:', error);
          onError(error);
        }
      },

 
      modal: {
        ondismiss: function() {
          onError(new Error('Payment cancelled by user'));
        }
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
razorpayInstance.on('payment.failed', function (response){
   
    alert(response.error.reason);
   
})


  } catch (error) {
    onError(error);
  }
};
