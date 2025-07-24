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

    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert([
        { 
          customer_id: customerId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          shipping_address: shippingAddress, 
          payment_method: paymentMethod,
          payment_id: paymentId, // This will be the Razorpay payment ID
          subtotal: subtotal,
          shipping: shipping,
          tax: tax,
          total: total,
          status: 'completed', // Mark as completed since payment is successful
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

    if (newOrder && items && items.length > 0) {
      const orderItemsData = items.map(item => ({
        order_id: newOrder.id,
        product_id: item.id, 
        quantity: item.quantity,
        price_at_purchase: item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price,
        product_name: item.name 
      }));

      console.log('Inserting order items:', orderItemsData);

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsData);

      if (itemsError) {
        console.error('Error inserting order items:', itemsError);
        // Try to rollback the order
        await supabase.from('orders').delete().eq('id', newOrder.id);
        throw new Error(`Failed to save order items: ${itemsError.message}`);
      }

      console.log('Order items saved successfully');
    }
    
    return { ...newOrder, items }; // Return the order with its items
  } catch (error) {
    console.error('Error adding order:', error);
    throw new Error(error.message || 'Failed to add order');
  }
};


export const getAllOrders = async () => {
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
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all orders:', error);
    throw new Error(error.message || 'Failed to fetch orders');
  }
  return orders.map(order => ({
    ...order,
    items: order.order_items 
  }));
};


export const getOrderById = async (orderId) => {
  const { data: order, error } = await supabase
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
    .eq('id', orderId)
    .single();
  
  if (error) {
    console.error('Error fetching order by ID:', error);
    return null; 
  }
  return order ? { ...order, items: order.order_items } : null;
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