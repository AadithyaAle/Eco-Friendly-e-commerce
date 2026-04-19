import { supabase } from '../lib/supabase';

export const createProfile = async (uid, email, fullName) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      { id: uid, email, full_name: fullName, role: 'customer' }
    ]);
    
  if (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
  return data;
};

export const getProfile = async (uid) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', uid)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is 'not found'
    console.error('Error fetching profile:', error);
    return null;
  }
  return data;
};
