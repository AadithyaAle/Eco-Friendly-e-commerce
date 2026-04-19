import { supabase } from '../lib/supabase';

export const createOrder = async (userId, cartItems, total, shippingAddress, paymentDetails = {}) => {
  // 1. Insert the main order document
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert([{ 
      user_id: userId, 
      amount: total, 
      shipping_address: shippingAddress.address || shippingAddress,
      shipping_name: shippingAddress.name || '',
      payment_id: paymentDetails.paymentId || null,
      status: paymentDetails.status || 'Pending'
    }])
    .select()
    .single();

  if (orderErr) {
    console.error("Order Creation Failed:", orderErr);
    throw orderErr;
  }

  // 2. Insert the relational order items (RESTORED)
  const orderItemsData = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id || item.id,
    qty: item.qty,
    price: item.price || (item.product && item.product.price)
  }));

  const { error: itemsErr } = await supabase
    .from('order_items')
    .insert(orderItemsData);

  if (itemsErr) {
    console.error("Order Items Creation Failed:", itemsErr);
    throw itemsErr;
  }

  return order;
};

export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, product:products(*))') // RESTORED: Fetches product details!
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
  
  return data;
};