import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getUserOrders } from '../services/orders';
import { FiBox, FiClock, FiCheck } from 'react-icons/fi';

const Profile = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        setIsLoading(true);
        const data = await getUserOrders(currentUser.uid);
        setOrders(data);
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser]);

  return (
    <div className="section-padding py-32 bg-ivory-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-forest-green mb-8">My Profile</h1>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-forest-green/10 mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-serif text-forest-green">{userProfile?.full_name || currentUser?.displayName || 'User'}</h2>
            <p className="text-forest-green/70">{currentUser?.email}</p>
            {userProfile?.role === 'admin' && (
               <span className="inline-block mt-2 px-3 py-1 bg-premium-gold/10 text-premium-gold text-xs font-bold uppercase rounded-full">Admin</span>
            )}
          </div>
          <button onClick={logout} className="px-6 py-2 border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-colors">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Stats */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-forest-green/10 md:col-span-1">
            <h3 className="text-xl font-serif text-forest-green mb-4">Account Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-forest-green/70">Items in Cart</span>
                <span className="font-semibold text-forest-green">{cartItems.length}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-forest-green/70">Items in Wishlist</span>
                <span className="font-semibold text-forest-green">{wishlistItems.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-forest-green/70">Total Orders</span>
                <span className="font-semibold text-forest-green">{isLoading ? '...' : orders.length}</span>
              </div>
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-forest-green/10 md:col-span-2 overflow-hidden">
            <h3 className="text-xl font-serif text-forest-green mb-6 border-b border-gray-100 pb-4">Order History</h3>
            
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[1,2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>)}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 text-forest-green/60">
                <FiBox className="text-4xl mx-auto mb-3 opacity-50" />
                <p>You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-96 overflow-y-auto pr-2 hide-scrollbar">
                {orders.map(order => (
                  <div key={order.id} className="border border-forest-green/10 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm text-forest-green/50 mb-1">Order #{order.id.slice(0,8)}</div>
                        <div className="font-semibold text-forest-green">₹{order.amount}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${order.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {order.status === 'Confirmed' ? <FiCheck /> : <FiClock />}
                        <span>{order.status}</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex gap-4 overflow-x-auto hide-scrollbar">
                       {order.order_items?.map(item => (
                         <div key={item.id} className="shrink-0 w-16 h-16 rounded-lg bg-gray-50 overflow-hidden border border-gray-100" title={item.product?.name}>
                           <img src={item.product?.image} alt="product" className="w-full h-full object-cover" />
                         </div>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
