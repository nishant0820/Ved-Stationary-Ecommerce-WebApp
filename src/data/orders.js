import { supabase } from '@/lib/supabaseClient';

export const addOrder = async (orderData) => {
  const { customerName, customerEmail, customerPhone, items, shippingAddress, paymentMethod, paymentId, subtotal, shipping, tax, total, customerId } = orderData;

  try {
    console.log('Saving order to Supabase:', orderData);

    // First, check if an order with this payment_id already exists
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('payment_id', paymentId)
      .single();

    if (existingOrder) {
      console.log('Order with this payment ID already exists:', existingOrder.id);
      return { ...existingOrder, items };
    }

    // Prepare shipping address string
    const shippingAddressString = typeof shippingAddress === 'object' 
      ? `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}`
      : shippingAddress;

    // Prepare product names and quantities as comma-separated strings
    const productNames = items.map(item => item.name).join(', ');
    const quantities = items.map(item => item.quantity.toString()).join(', ');

    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert([
        { 
          payment_id: paymentId, // This will be the Razorpay payment ID
          customer_name: customerName,
          shipping_address: shippingAddressString, 
          phone_no: customerPhone,
          shipping_product: productNames,
          quantity: quantities,
          price: total.toString(),
          order_success: true, // Mark as successful since payment is completed
          payment_method: paymentMethod
        }
      ])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    console.log('Order created successfully:', newOrder);
    
    return { ...newOrder, items }; // Return the order with its items
  } catch (error) {
    console.error('Error adding order:', error);
    throw new Error(error.message || 'Failed to add order');
  }
};


export const getAllOrders = async () => {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all orders:', error);
    throw new Error(error.message || 'Failed to fetch orders');
  }
  
  // Convert the order data to match the expected format
  return orders.map(order => ({
    ...order,
    total: parseFloat(order.price) || 0,
    status: order.order_success ? 'completed' : 'pending',
    items: order.shipping_product ? order.shipping_product.split(', ').map((product, index) => ({
      name: product,
      quantity: order.quantity ? parseInt(order.quantity.split(', ')[index]) || 1 : 1
    })) : []
  }));
};

export const getOrderById = async (orderId) => {
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();
  
  if (error) {
    console.error('Error fetching order by ID:', error);
    return null; 
  }

  if (!order) {
    return null;
  }

  // Convert the order data to match the expected format
  return {
    ...order,
    total: parseFloat(order.price) || 0,
    status: order.order_success ? 'completed' : 'pending',
    items: order.shipping_product ? order.shipping_product.split(', ').map((product, index) => ({
      name: product,
      quantity: order.quantity ? parseInt(order.quantity.split(', ')[index]) || 1 : 1
    })) : []
  };
};

export const getOrdersByCustomerId = async (customerId) => {
  if (!customerId) return [];
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders by customer ID:', error);
    return [];
  }
  return orders.map(order => ({
    ...order,
    total: parseFloat(order.price) || 0,
    status: order.order_success ? 'completed' : 'pending',
    items: order.shipping_product ? order.shipping_product.split(', ').map((product, index) => ({
      name: product,
      quantity: order.quantity ? parseInt(order.quantity.split(', ')[index]) || 1 : 1
    })) : []
  }));
};

export const updateOrderStatusSupabase = async (orderId, status) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ order_success: status === 'completed' })
    .eq('id', orderId)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    throw new Error(error.message || 'Failed to update order status');
  }
  
  return data ? {
    ...data,
    total: parseFloat(data.price) || 0,
    status: data.order_success ? 'completed' : 'pending',
    items: data.shipping_product ? data.shipping_product.split(', ').map((product, index) => ({
      name: product,
      quantity: data.quantity ? parseInt(data.quantity.split(', ')[index]) || 1 : 1
    })) : []
  } : null;
};

export const deleteOrderSupabase = async (orderId) => {
  // For the new table structure, we only need to delete the order record
  const { error: orderError } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId);
  
  if (orderError) {
    console.error('Error deleting order:', orderError);
    throw new Error(orderError.message || 'Failed to delete order');
  }
  return true;
};