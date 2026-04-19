import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingCart } from 'react-icons/fi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-forest-green/10 py-4'
          : 'bg-transparent py-6'
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

        {/* Icons */}
        <div className="flex space-x-6 items-center">
          <button className="text-forest-green hover:text-premium-gold transition-colors">
            <FiSearch className="text-xl" />
          </button>
          <Link to="/wishlist" className="text-forest-green hover:text-premium-gold transition-colors">
            <FiHeart className="text-xl" />
          </Link>
          <Link to="/cart" className="relative text-forest-green hover:text-premium-gold transition-colors">
            <FiShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-premium-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
