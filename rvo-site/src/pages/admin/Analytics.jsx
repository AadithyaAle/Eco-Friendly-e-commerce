import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Analytics = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      // Fetch all confirmed orders with their amounts and dates
      const { data: orders, error } = await supabase
        .from('orders')
        .select('total_amount, created_at'); 
        // Add .eq('status', 'Confirmed') if needed

      if (orders && !error) {
        // Group revenue and order count by Month
        const metricsByMonth = orders.reduce((acc, order) => {
          const date = new Date(order.created_at);
          const month = date.toLocaleString('default', { month: 'short' }); 
          
          if (!acc[month]) {
            acc[month] = { name: month, revenue: 0, orders: 0 };
          }
          acc[month].revenue += (order.total_amount || 0);
          acc[month].orders += 1;
          return acc;
        }, {});

        setChartData(Object.values(metricsByMonth));
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="animate-pulse flex space-x-4 p-6">Loading analytics engine...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-forest-green">Financial Analytics</h1>
        <p className="text-gray-500 mt-1">Live transaction data from Razorpay & Supabase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* REVENUE CHART */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Gross Revenue Timeline</h3>
          <div className="h-80 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8A96B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#C8A96B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#C8A96B" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">No transaction data yet.</div>
            )}
          </div>
        </div>

        {/* ORDER VOLUME CHART */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Order Volume</h3>
          <div className="h-80 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip formatter={(val) => [val, 'Total Orders']} cursor={{ fill: '#f9fafb' }} />
                  <Bar dataKey="orders" fill="#2d3748" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">No order data yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;