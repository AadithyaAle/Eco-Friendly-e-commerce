import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HiOutlineSearch, 
  HiOutlineHeart, 
  HiOutlineShoppingBag, 
  HiOutlineUser,
  HiMenuAlt3,
  HiX
} from 'react-icons/hi';
import { FaLeaf } from 'react-icons/fa';

/**
 * Navbar — Global sticky top navigation.
 * Clean, uncluttered white-background bar.
 */
export default function Navbar() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Artisans', path: '/artisans' },
    { name: 'About', path: '/about' },
    { name: 'Impact', path: '/impact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EAE6DB] h-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* LEFT: Brand */}
          <Link to="/home" className="flex items-center gap-2 group z-50">
            <FaLeaf className="w-6 h-6 text-eco-sage" />
            <h1 className="font-bold text-xl text-eco-charcoal tracking-tight">EcoBag</h1>
            <span className="text-xl text-eco-charcoal font-normal">Marketplace</span>
          </Link>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-bold transition-colors ${
                    isActive ? 'text-eco-sage' : 'text-eco-charcoal hover:text-eco-sage'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {/* Added Cart to nav block as requested */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-sm font-bold transition-colors flex items-center gap-1.5 ${
                  isActive ? 'text-eco-sage' : 'text-eco-charcoal hover:text-eco-sage'
                }`
              }
            >
              <HiOutlineShoppingBag className="w-4 h-4" /> Cart
            </NavLink>
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-5 z-50">
            {/* User / Login */}
            {user ? (
              <Link to="/account" className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-eco-canvas border border-eco-canvas-dark text-eco-charcoal hover:text-eco-sage transition-colors">
                {user.displayName?.charAt(0)?.toUpperCase() || <HiOutlineUser className="w-4 h-4" />}
              </Link>
            ) : (
              <Link 
                to="/login"
                className="hidden sm:inline-block text-sm font-bold text-eco-charcoal hover:text-eco-sage transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-eco-charcoal p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
            </button>
          </div>
          
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-300 md:hidden flex flex-col pt-24 px-8 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col gap-6 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-xl font-bold transition-colors ${
                  isActive ? 'text-eco-sage' : 'text-eco-charcoal'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-xl font-bold transition-colors flex items-center gap-2 ${
                isActive ? 'text-eco-sage' : 'text-eco-charcoal'
              }`
            }
          >
            <HiOutlineShoppingBag className="w-6 h-6" /> Cart
          </NavLink>
          
          <div className="w-12 h-px bg-[#EAE6DB] my-4" />
          
          {user ? (
            <>
              <Link to="/account" className="text-lg text-eco-grey font-bold">My Account</Link>
              <Link to="/orders" className="text-lg text-eco-grey font-bold">Orders</Link>
            </>
          ) : (
            <Link 
              to="/login"
              className="w-full max-w-[200px] text-center px-6 py-3 text-base font-bold text-white bg-eco-sage rounded-lg"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
