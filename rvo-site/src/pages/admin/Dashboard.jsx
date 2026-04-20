import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FiBox, FiAlertCircle, FiShoppingCart, FiDollarSign } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    activeProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      const [
        { data: products },
        { data: orders }
      ] = await Promise.all([
        supabase.from('products').select('stock, active'),
        // Fetch created_at to plot time-series data
        supabase.from('orders').select('amount, created_at') 
      ]);
      
      let newStats = {
        totalProducts: 0, lowStock: 0, activeProducts: 0, totalOrders: 0, totalRevenue: 0,
      };

      if (products) {
        newStats.totalProducts = products.length;
        newStats.lowStock = products.filter(p => p.stock < 5).length;
        newStats.activeProducts = products.filter(p => p.active).length;
      }

      if (orders) {
        newStats.totalOrders = orders.length;
        newStats.totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

        // --- PIPELINE 2: Process data for the chart (Group by Month) ---
        const revenueByMonth = orders.reduce((acc, order) => {
          const date = new Date(order.created_at);
          // Gets short month name (e.g., "Jan", "Feb")
          const month = date.toLocaleString('default', { month: 'short' }); 
          
          if (!acc[month]) {
            acc[month] = { name: month, revenue: 0 };
          }
          acc[month].revenue += (order.amount || 0);
          return acc;
        }, {});

        // Convert the object into an array for Recharts
        setChartData(Object.values(revenueByMonth));
      }

      setStats(newStats);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: <FiBox />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Low Stock Alerts', value: stats.lowStock, icon: <FiAlertCircle />, color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Active Products', value: stats.activeProducts, icon: <FiBox />, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Total Orders', value: stats.totalOrders, icon: <FiShoppingCart />, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, icon: <FiDollarSign />, color: 'text-premium-gold', bg: 'bg-yellow-50' },
  ];

  return (
    <div>
      {/* --- HEADER & EXIT BUTTON --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-serif text-forest-green">Dashboard Overview</h1>
        
        <Link 
          to="/" 
          className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-forest-green hover:text-white hover:border-forest-green rounded-lg transition-all duration-200 group shadow-sm w-full sm:w-auto"
        >
          <FiArrowLeft className="text-lg transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Exit to Store</span>
        </Link>
      </div>
      
      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-black/5 flex items-center space-x-4">
            <div className={`p-4 rounded-full ${card.bg} ${card.color} text-2xl`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                {card.value}
                {card.title === 'Low Stock Alerts' && stats.lowStock > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    Action Needed
                  </span>
                )}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* --- LIVE REVENUE CHART --- */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-black/5">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue Timeline</h2>
        <div className="h-80 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {/* Premium Gold Gradient for RVO Theme */}
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8A96B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#C8A96B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                  tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#C8A96B" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No revenue data available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;