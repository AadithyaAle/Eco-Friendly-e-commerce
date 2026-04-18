import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HiOutlineUser, 
  HiOutlineShoppingBag, 
  HiOutlineHeart, 
  HiOutlineLogout 
} from 'react-icons/hi';
import toast from 'react-hot-toast';

/**
 * DashboardLayout — Sidebar + Content Area for account management.
 * Designed to be nested inside MainLayout so Navbar/Footer remain visible.
 */
export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      toast.error('Failed to log out');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HiOutlineUser },
    { name: 'Orders', path: '/orders', icon: HiOutlineShoppingBag },
    { name: 'Wishlist', path: '/wishlist', icon: HiOutlineHeart },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20 w-full flex flex-col md:flex-row gap-10">
      
      {/* Sidebar Sidebar Menu */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:sticky md:top-[120px]">
          
          {/* User Profile Summary */}
          <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-rvo-green/10 flex items-center justify-center text-xl text-rvo-green font-heading font-bold mb-4">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
            <h2 className="font-heading font-bold text-lg text-rvo-dark text-center leading-none mb-2">
              {user?.displayName || 'My Account'}
            </h2>
            <p className="text-xs text-rvo-dark-light text-center break-all">
              {user?.email}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                    isActive
                      ? 'bg-rvo-green text-white shadow-md shadow-rvo-green/20'
                      : 'text-rvo-dark hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.name}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm text-rvo-error hover:bg-red-50 mt-4"
            >
              <HiOutlineLogout className="w-5 h-5 shrink-0" />
              Sign Out
            </button>
          </nav>

        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
        <Outlet />
      </div>

    </div>
  );
}
