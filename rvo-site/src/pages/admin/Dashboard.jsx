import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FiBox, FiAlertCircle, FiShoppingCart, FiDollarSign } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    activeProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      const { data: products } = await supabase.from('products').select('stock, active');
      
      if (products) {
        setStats({
          totalProducts: products.length,
          lowStock: products.filter(p => p.stock < 5).length,
          activeProducts: products.filter(p => p.active).length,
        });
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: <FiBox />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Low Stock Alerts', value: stats.lowStock, icon: <FiAlertCircle />, color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Active Products', value: stats.activeProducts, icon: <FiBox />, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Total Orders', value: '142', icon: <FiShoppingCart />, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Revenue', value: '₹42,500', icon: <FiDollarSign />, color: 'text-premium-gold', bg: 'bg-yellow-50' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif text-forest-green mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-black/5 flex items-center space-x-4">
            <div className={`p-4 rounded-full ${card.bg} ${card.color} text-2xl`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                {card.value}
                {card.title === 'Low Stock Alerts' && card.value > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    Action Needed
                  </span>
                )}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
