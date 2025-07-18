
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
    // Call your backend API to create a Razorpay order
    const response = await fetch('http://localhost:3001/create-order/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: orderData.total,
      
    
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const order = await response.json();


    const options = {
      key: 'rzp_test_7VpdGBzTReIP2W', // Your Razorpay key
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

const body = {
  ...response,
}
 const validateRes = await fetch("http://localhost:3001/create-order/validate" ,{ 

   method: 'POST',
   body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      
       
    })
   
      alert("Payment is successful ! , You will be redirected after 5 seconds")
       setTimeout(function() {
          
     window.location.href = "/"; // Replace with your target URL
 }, 5000); // 9000 milliseconds = 9 seconds

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
