import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiFilter, FiHeart, FiShoppingBag, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'react-hot-toast';

const Products = () => {
  const { products } = useProduct();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceLimit, setPriceLimit] = useState(5000);
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Tote Bags', 'Yoga Covers', 'Bottle Covers', 'Accessories'];

  const toggleCategory = (cat) => {
    if (cat === 'All') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => 
        prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      );
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    result = result.filter(p => p.price <= priceLimit);

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, selectedCategories, priceLimit, sortBy]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    toggleWishlist(product);
    if (!isInWishlist(product.id)) {
      toast.success(`${product.name} added to wishlist`);
    } else {
      toast.success(`${product.name} removed from wishlist`);
    }
  };

  return (
    <div className="section-padding py-24 bg-ivory-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 border-b border-forest-green/10 pb-6">
        <div>
          <h1 className="text-4xl font-serif text-forest-green mb-2">Our Collection</h1>
          <p className="text-forest-green/70">Showing {filteredProducts.length} sustainable products</p>
        </div>
        <div className="flex space-x-4 mt-6 md:mt-0">
          <button 
            className="md:hidden flex items-center space-x-2 px-4 py-2 border border-forest-green/20 rounded-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> <span>Filters</span>
          </button>
          <div className="relative group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none flex items-center space-x-2 px-6 py-2 pr-10 border border-forest-green/20 rounded-full bg-white hover:border-premium-gold transition-colors focus:outline-none"
            >
              <option value="newest">Sort By: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-forest-green" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
        <div className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-6 rounded-xl border border-forest-green/5 shadow-sm sticky top-32">
            <h3 className="text-xl font-serif text-forest-green mb-6 border-b border-gray-100 pb-4">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-forest-green mb-3">Category</h4>
              {categories.map(cat => (
                <label key={cat} className="flex items-center space-x-3 mb-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={cat === 'All' ? selectedCategories.length === 0 : selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="rounded text-premium-gold focus:ring-premium-gold accent-premium-gold" 
                  />
                  <span className="text-forest-green/80 hover:text-forest-green">{cat}</span>
                </label>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-forest-green mb-3">Price Limit: ₹{priceLimit}</h4>
              <input 
                type="range" 
                className="w-full accent-premium-gold" 
                min="0" max="5000" step="500"
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
              />
              <div className="flex justify-between text-sm text-forest-green/60 mt-2">
                <span>₹0</span>
                <span>₹5000</span>
              </div>
            </div>

            <button 
              onClick={() => { setSelectedCategories([]); setPriceLimit(5000); }}
              className="w-full py-2 bg-forest-green/10 text-forest-green rounded-full font-medium hover:bg-forest-green hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length === 0 && (
             <div className="col-span-full text-center py-20 text-forest-green/60">
                No products found matching these filters.
             </div>
          )}
          {filteredProducts.map((product, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={product.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-forest-green/5 relative"
            >
              <Link to={`/product/${product.id}`} className="block relative h-72 overflow-hidden bg-gray-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-forest-green text-white px-4 py-2 font-semibold uppercase text-xs tracking-widest rounded-full shadow-lg">Out of Stock</span>
                  </div>
                )}
              </Link>
              <div className="p-6">
                <button 
                  className={`absolute top-4 right-4 p-2 rounded-full shadow-sm transition-all z-10 ${isInWishlist(product.id) ? 'bg-forest-green text-white hover:bg-forest-green/90' : 'bg-white/80 backdrop-blur-sm text-forest-green hover:text-premium-gold hover:bg-white'}`}
                  onClick={(e) => handleToggleWishlist(e, product)}
                >
                  <FiHeart className={isInWishlist(product.id) ? 'fill-current' : ''} />
                </button>
                <div className="mb-4 pt-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-lg text-forest-green hover:text-premium-gold transition-colors line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-forest-green/60 mt-1">{product.category}</p>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <span className="font-sans font-semibold text-xl text-forest-green">₹{product.price}</span>
                  <button 
                    disabled={!product.inStock}
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`flex items-center space-x-2 font-medium transition-colors ${product.inStock ? 'text-premium-gold hover:text-forest-green' : 'text-gray-400 cursor-not-allowed'}`}
                  >
                    <FiShoppingBag /> <span>{product.inStock ? 'Add' : 'Sold Out'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
