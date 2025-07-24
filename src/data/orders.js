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

    // Prepare shipping products and quantities as JSON strings or concatenated strings
    const shippingProducts = items.map(item => item.name).join(', ');
    const quantities = items.map(item => item.quantity).join(', ');
    const prices = items.map(item => {
      const price = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
      return price.toFixed(2);
    }).join(', ');

    // Format shipping address as a string
    const formattedShippingAddress = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}`;

    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          payment_id: paymentId, // Razorpay payment ID
          customer_name: customerName,
          shipping_address: formattedShippingAddress,
          phone_no: customerPhone,
          shipping_product: shippingProducts, // All product names as comma-separated string
          quantity: quantities, // All quantities as comma-separated string  
          price: total.toFixed(2), // Total price as string
          order_success: true, // Mark as successful since payment completed
          payment_method: paymentMethod,
          created_at: new Date().toISOString()
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
    .select(`
      *,
      order_items (
        product_id,
        quantity,
        price_at_purchase,
        product_name
      )
    `)
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders by customer ID:', error);
    return [];
  }
  return orders.map(order => ({
    ...order,
    items: order.order_items
  }));
};

export const updateOrderStatusSupabase = async (orderId, status) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select(`
      *,
      order_items (
        product_id,
        quantity,
        price_at_purchase,
        product_name
      )
    `)
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    throw new Error(error.message || 'Failed to update order status');
  }
  return data ? { ...data, items: data.order_items } : null;
};

export const deleteOrderSupabase = async (orderId) => {
  // First delete related order_items
  const { error: itemsError } = await supabase
    .from('order_items')
    .delete()
    .eq('order_id', orderId);

  if (itemsError) {
    console.error('Error deleting order items:', itemsError);
    throw new Error(itemsError.message || 'Failed to delete order items');
  }

  // Then delete the order
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