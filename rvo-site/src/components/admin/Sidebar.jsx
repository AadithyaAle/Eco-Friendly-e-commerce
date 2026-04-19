import { NavLink } from 'react-router-dom';
import { 
  FiGrid, FiBox, FiPlusSquare, FiList, 
  FiShoppingCart, FiUsers, FiBarChart2, FiSettings, FiLogOut, FiMenu, FiX
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Sidebar = () => {
  const { logout, userProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { path: '/admin/products', icon: <FiBox />, label: 'Products' },
    { path: '/admin/products/new', icon: <FiPlusSquare />, label: 'Add Product' },
    { path: '/admin/categories', icon: <FiList />, label: 'Categories' },
    { path: '/admin/orders', icon: <FiShoppingCart />, label: 'Orders' },
    { path: '/admin/customers', icon: <FiUsers />, label: 'Customers' },
    { path: '/admin/analytics', icon: <FiBarChart2 />, label: 'Analytics' },
    { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button - Fixed independent of layout to ensure visibility */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-forest-green text-premium-gold rounded-md shadow-lg"
      >
        <FiMenu size={24} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-forest-green text-ivory-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:w-64 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div>
            <h2 className="text-2xl font-accent text-premium-gold">RVO Admin</h2>
            <p className="text-sm opacity-70 mt-1">Hello, {userProfile?.full_name}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-white/70 hover:text-white">
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-premium-gold text-forest-green font-semibold' 
                        : 'hover:bg-white/10 text-white/80 hover:text-white'
                    }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => {
               logout();
               window.location.href = '/';
            }}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg text-red-300 hover:bg-white/10 hover:text-red-200 transition-colors"
          >
            <FiLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
