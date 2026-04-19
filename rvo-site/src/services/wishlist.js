import { supabase } from '../lib/supabase';

export const getWishlist = async (uid) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*, product:products(*)')
    .eq('user_id', uid);

  if (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }
  return data;
};

export const addToWishlist = async (uid, productId) => {
  const { data: existing, error: fetchErr } = await supabase
    .from('wishlist')
    .select('*')
    .eq('user_id', uid)
    .eq('product_id', productId)
    .maybeSingle();

  if (fetchErr) throw fetchErr;
  
  if (existing) {
    return existing; // already in wishlist
  }

  const { data, error } = await supabase
    .from('wishlist')
    .insert([{ user_id: uid, product_id: productId }])
    .select();

  if (error) throw error;
  return data[0];
};

export const removeFromWishlist = async (id) => {
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
