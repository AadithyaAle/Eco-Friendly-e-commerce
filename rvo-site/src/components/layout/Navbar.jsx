import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');


  const { cartItems } = useCart();
  const cartTotal = cartItems ? cartItems.length : 0;

  const { wishlistItems } = useWishlist();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync search input with URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    if (query !== null) {
      setSearchQuery(query);
    } else {
      setSearchQuery('');
    }
  }, [location.search]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Only navigate instantly if already on the products page to avoid abrupt redirects,
    // otherwise wait for form submit.
    if (location.pathname === '/products') {
      if (value.trim()) {
        navigate(`/products?search=${encodeURIComponent(value)}`);
      } else {
        navigate(`/products`);
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-forest-green/10 py-4'
          : 'bg-ivory-white py-6'
      }`}
    >
      <div className="section-padding py-0 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center`}
        >
          <img src="/logo.png" alt="RVO Logo" className={`transition-all duration-300 object-contain ${isScrolled ? 'h-12' : 'h-16'}`} />
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-forest-green hover:text-premium-gold transition-colors font-medium hover:-translate-y-0.5 inline-block">Home</Link>
          <Link to="/products" className="text-forest-green hover:text-premium-gold transition-colors font-medium hover:-translate-y-0.5 inline-block">Products</Link>
          <Link to="/about" className="text-forest-green hover:text-premium-gold transition-colors font-medium hover:-translate-y-0.5 inline-block">About Us</Link>
        </div>

        {/* Icons & Search */}
        <div className="flex space-x-4 lg:space-x-6 items-center">
          
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center bg-white border border-forest-green/20 rounded-full px-3 py-1.5 focus-within:border-premium-gold focus-within:ring-1 focus-within:ring-premium-gold transition-all w-32 lg:w-48 xl:w-64">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-forest-green placeholder-forest-green/40"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="text-forest-green hover:text-premium-gold ml-1">
              <FiSearch className="text-lg" />
            </button>
          </form>
          
          <Link to="/wishlist" className="relative text-forest-green hover:text-premium-gold transition-colors">
            <FiHeart className="text-xl" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-forest-green text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          
          <Link to="/cart" className="relative text-forest-green hover:text-premium-gold transition-colors">
            <FiShoppingCart className="text-xl" />
            {cartTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-premium-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartTotal}
              </span>
            )}
          </Link>

          {/* User Auth Link */}
          <div className="relative group">
            <Link to={currentUser ? "/profile" : "/login"} className="text-forest-green hover:text-premium-gold transition-colors flex items-center space-x-1">
              <FiUser className="text-xl" />
            </Link>
            
            {/* User Dropdown Profile menu */}
            {currentUser && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg py-2 border border-forest-green/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/profile" className="block px-4 py-2 text-sm text-forest-green hover:bg-forest-green/5">My Profile</Link>
                <Link to="/wishlist" className="block px-4 py-2 text-sm text-forest-green hover:bg-forest-green/5">Wishlist</Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
