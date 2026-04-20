import { supabase } from '../lib/supabase';

export const getLiveRevenueData = async () => {
  // Fetch all confirmed orders
  const { data, error } = await supabase
    .from('orders')
    .select('created_at, total_amount')
    .eq('status', 'Confirmed')
    .order('created_at', { ascending: true });

  if (error) throw error;

  // Process raw data into Recharts format (Group by Month)
  const monthlyData = data.reduce((acc, order) => {
    const month = new Date(order.created_at).toLocaleString('default', { month: 'short' });
    
    if (!acc[month]) {
      acc[month] = { name: month, revenue: 0, orders: 0 };
    }
    
    acc[month].revenue += order.total_amount;
    acc[month].orders += 1;
    
    return acc;
  }, {});

  return Object.values(monthlyData);
};