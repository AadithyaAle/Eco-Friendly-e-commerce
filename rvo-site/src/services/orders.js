import { supabase } from '../lib/supabase';

// Create order and order items from cart
export const createOrder = async (uid, cartItems, amount, shippingAddress) => {
  // Insert order
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert([
      { 
        user_id: uid, 
        amount, 
        shipping_address: shippingAddress,
        status: 'Confirmed',
        payment_status: 'Pending'
      }
    ])
    .select()
    .single();

  if (orderErr) throw orderErr;

  // Insert order items
  const orderItemsData = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    qty: item.qty,
    price: item.product.price
  }));

  const { error: itemsErr } = await supabase
    .from('order_items')
    .insert(orderItemsData);

  if (itemsErr) throw itemsErr;

  return order;
};

export const getUserOrders = async (uid) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, product:products(*))')
    .eq('user_id', uid)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data;
};
