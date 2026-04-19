import { supabase } from '../lib/supabase';

// Returns cart items for a user, expanding the product details
export const getCart = async (uid) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, product:products(*)')
    .eq('user_id', uid);

  if (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
  return data;
};

export const addToCart = async (uid, productId, qty = 1) => {
  // Check if item already exists in cart
  const { data: existing, error: fetchErr } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', uid)
    .eq('product_id', productId)
    .maybeSingle();

  if (fetchErr) {
    console.error('Error checking cart item:', fetchErr);
    throw fetchErr;
  }

  if (existing) {
    // update qty
    const { data, error } = await supabase
      .from('cart_items')
      .update({ qty: existing.qty + qty })
      .eq('id', existing.id)
      .select();
    if (error) throw error;
    return data[0];
  } else {
    // insert new
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ user_id: uid, product_id: productId, qty }])
      .select();
    if (error) throw error;
    return data[0];
  }
};

export const updateCartItemQty = async (id, newQty) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ qty: newQty })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

export const removeFromCart = async (id) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const clearUserCart = async (uid) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', uid);

  if (error) throw error;
};
