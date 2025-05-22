
// Initial orders data (will be stored in localStorage)
export const initialOrders = [
  {
    id: 'ORD-001',
    customerId: 'user1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '9876543210',
    items: [
      { id: '1', name: 'Premium Hardcover Notebook', price: 299, discount: 10, quantity: 2 },
      { id: '3', name: 'Professional Art Pencil Set', price: 499, discount: 15, quantity: 1 }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    paymentMethod: 'razorpay',
    paymentId: 'pay_123456789',
    subtotal: 847.10,
    shipping: 0,
    tax: 152.48,
    total: 999.58,
    status: 'delivered',
    createdAt: '2025-05-15T10:30:00Z'
  },
  {
    id: 'ORD-002',
    customerId: 'user2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '8765432109',
    items: [
      { id: '5', name: 'Watercolor Paint Set', price: 799, discount: 20, quantity: 1 },
      { id: '8', name: 'Sticky Notes Assorted Set', price: 149, discount: 0, quantity: 3 }
    ],
    shippingAddress: {
      street: '456 Park Avenue',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001'
    },
    paymentMethod: 'razorpay',
    paymentId: 'pay_987654321',
    subtotal: 1086.20,
    shipping: 0,
    tax: 195.52,
    total: 1281.72,
    status: 'processing',
    createdAt: '2025-05-18T14:45:00Z'
  }
];

// Get all orders
export const getOrders = () => {
  try {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      return JSON.parse(savedOrders);
    }
    // Initialize with sample data if no orders exist
    localStorage.setItem('orders', JSON.stringify(initialOrders));
    return initialOrders;
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

// Add a new order
export const addOrder = (orderData) => {
  try {
    const orders = getOrders();
    const newOrder = {
      ...orderData,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    const updatedOrders = [...orders, newOrder];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    return newOrder;
  } catch (error) {
    console.error('Error adding order:', error);
    throw new Error('Failed to add order');
  }
};

// Update order status
export const updateOrderStatus = (orderId, status) => {
  try {
    const orders = getOrders();
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    return updatedOrders.find(order => order.id === orderId);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
};

// Get order by ID
export const getOrderById = (orderId) => {
  try {
    const orders = getOrders();
    return orders.find(order => order.id === orderId);
  } catch (error) {
    console.error('Error getting order by ID:', error);
    return null;
  }
};

// Get orders by customer ID
export const getOrdersByCustomerId = (customerId) => {
  try {
    const orders = getOrders();
    return orders.filter(order => order.customerId === customerId);
  } catch (error) {
    console.error('Error getting orders by customer ID:', error);
    return [];
  }
};
