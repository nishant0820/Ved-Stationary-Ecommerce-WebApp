
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
    
    // Call your backend API to create a Razorpay order
    const response = await fetch('http://localhost:3001/create-order/api', {
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
          
          const validateRes = await fetch("http://localhost:3001/create-order/validate", { 
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
