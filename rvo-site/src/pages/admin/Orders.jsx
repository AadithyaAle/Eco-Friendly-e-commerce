import { useState, useEffect } from 'react';
import { getAdminOrders, updateOrderStatus } from '../../services/orders';
import toast from 'react-hot-toast';
import { FiBox } from 'react-icons/fi';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAdminOrders();
      setOrders(data);
    } catch (err) {
      toast.error('Failed to load orders');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      // Update local state to reflect change without full refetch
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const statusOptions = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif text-forest-green">Orders Management</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b">
                <th className="p-4 font-semibold">Order ID & Date</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Items</th>
                <th className="p-4 font-semibold">Total Amount</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center p-8">Loading orders...</td></tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-800 text-sm">#{order.id.slice(0, 8)}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-800 text-sm font-medium">{order.shipping_name || 'N/A'}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {order.shipping_address ? 
                        (typeof order.shipping_address === 'string' ? order.shipping_address : order.shipping_address.address || 'Address hidden')
                        : 'No Address'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                       {order.order_items?.slice(0, 3).map(item => (
                         <div key={item.id} className="w-10 h-10 rounded bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0" title={item.product?.name || 'Product'}>
                           {item.product?.image ? (
                             <img src={item.product.image} alt="product" className="w-full h-full object-cover" />
                           ) : (
                             <span className="flex items-center justify-center w-full h-full text-gray-400"><FiBox /></span>
                           )}
                         </div>
                       ))}
                       {order.order_items?.length > 3 && (
                         <div className="w-10 h-10 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-500 font-medium tracking-tighter">
                           +{order.order_items.length - 3}
                         </div>
                       )}
                    </div>
                  </td>
                  <td className="p-4 text-gray-800 font-medium">₹{order.amount}</td>
                  <td className="p-4">
                    <select
                      value={order.status || 'Pending'}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`text-sm rounded-lg px-3 py-1.5 border font-medium outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors cursor-pointer
                        ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' : 
                          order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' : 
                          'bg-yellow-50 text-yellow-700 border-yellow-200'}`}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt} className="bg-white text-gray-800">{opt}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && orders.length === 0 && (
             <div className="text-center p-8 text-gray-500">No orders placed yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
