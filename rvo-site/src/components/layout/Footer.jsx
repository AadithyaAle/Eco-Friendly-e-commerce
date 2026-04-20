import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-forest-green text-ivory-white py-16 border-t-4 border-premium-gold">
      
      <div className="section-padding py-0 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-accent mb-4 text-premium-gold">RVO</h2>
          <p className="text-ivory-white/80 max-w-sm font-sans mx-auto md:mx-0">
            Crafted Sustainably. Designed Elegantly. Premium lifestyle products made from recycled cloth.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-serif mb-4 text-premium-gold">Explore</h3>
          <ul className="flex flex-col space-y-3">
            <li><Link to="/about" className="hover:text-premium-gold transition-colors">About Us</Link></li>
            <li><Link to="/products" className="hover:text-premium-gold transition-colors">Shop Collection</Link></li>
            <li><Link to="/faq" className="hover:text-premium-gold transition-colors">FAQ</Link></li>
            <li><Link to="/policies" className="hover:text-premium-gold transition-colors">Store Policies</Link></li>
            <li><Link to="/contact" className="hover:text-premium-gold transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-serif mb-4 text-premium-gold">Connect</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-premium-gold hover:text-forest-green transition-all">
              <FiInstagram className="text-xl" />
            </a>
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-premium-gold hover:text-forest-green transition-all">
              <FiFacebook className="text-xl" />
            </a>
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-premium-gold hover:text-forest-green transition-all">
              <FiTwitter className="text-xl" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-ivory-white/60 mt-12 pt-8 border-t border-white/10 mx-6 md:mx-12 lg:mx-24">
        &copy; {new Date().getFullYear()} RVO Fabric Essentials. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
