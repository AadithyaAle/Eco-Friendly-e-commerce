import { useState, useEffect } from 'react';
import { FiFilter, FiHeart, FiShoppingBag, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { getProducts } from '../services/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Products = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [maxPrice, setMaxPrice] = useState(5000);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  // Fetch real data from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data || []);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  // Dynamically generate categories from the actual database products
  const CATEGORIES = [...new Set(products.map(p => p.category).filter(Boolean))];

  const handleCategoryChange = (cat) => {
    if (cat === 'All') return setSelectedCategories(['All']);

    let newCats = selectedCategories.filter(c => c !== 'All');

    if (newCats.includes(cat)) {
      newCats = newCats.filter(c => c !== cat);
      if (newCats.length === 0) newCats = ['All'];
    } else {
      newCats.push(cat);
    }
    setSelectedCategories(newCats);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch =
      selectedCategories.includes('All') ||
      selectedCategories.includes(product.category);

    const priceMatch = product.price <= maxPrice;
    
    // Apply search query filter if it exists
    const searchMatch = searchQuery === '' || 
                        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && priceMatch && searchMatch;
  });

  return (
    <div className="section-padding py-24 pt-40 md:pt-48 bg-ivory-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 border-b border-forest-green/10 pb-6">
        <div>
          <h1 className="text-4xl font-serif text-forest-green mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Collection'}
          </h1>
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
            <button className="flex items-center space-x-2 px-6 py-2 border border-forest-green/20 rounded-full bg-white hover:border-premium-gold transition-colors">
              <span>Sort By: Newest</span> <FiChevronDown />
            </button>
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
              {['All', ...CATEGORIES].map(cat => (
                <label key={cat} className="flex items-center space-x-3 mb-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded text-premium-gold focus:ring-premium-gold accent-premium-gold"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <span className="text-forest-green/80 hover:text-forest-green">{cat}</span>
                </label>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-forest-green mb-3">Price Range</h4>
              <input 
                type="range" 
                className="w-full accent-premium-gold" 
                min="0" 
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-sm text-forest-green/60 mt-2">
                <span>₹0</span>
                <span>₹{maxPrice}{maxPrice === 5000 ? '+' : ''}</span>
              </div>
            </div>

            <button 
              className="w-full py-2 bg-forest-green/10 text-forest-green rounded-full font-medium hover:bg-forest-green hover:text-white transition-colors"
              onClick={() => {
                setSelectedCategories(['All']);
                setMaxPrice(5000);
                setShowFilters(false);
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          {isLoading ? (
            // Skeleton Loaders
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-forest-green/5 animate-pulse">
                  <div className="h-72 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            // Empty State
            <div className="text-center py-12">
              <p className="text-forest-green/70 text-lg">No products match your selected filters.</p>
              <button 
                className="mt-4 px-6 py-2 border border-premium-gold text-premium-gold rounded-full hover:bg-premium-gold hover:text-white transition-colors"
                onClick={() => { setSelectedCategories(['All']); setMaxPrice(5000); }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            // Dynamic Data Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={product.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-forest-green/5 relative flex flex-col"
                >
                  <Link to={`/product/${product.id}`} className="block relative h-72 overflow-hidden bg-gray-50 flex-shrink-0">
                    <img 
                      src={product.image_url || product.image || 'https://placehold.co/400x400?text=No+Image'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <button 
                      className={`absolute top-4 right-4 p-2 backdrop-blur-sm rounded-full transition-all z-10 shadow-sm ${isInWishlist(product.id) ? 'bg-red-50 text-red-500' : 'bg-white/80 text-forest-green hover:text-premium-gold hover:bg-white'}`}
                      onClick={(e) => { 
                        e.preventDefault();
                        toggleWishlist(product);
                      }}
                    >
                      <FiHeart className={isInWishlist(product.id) ? "fill-current" : ""} />
                    </button>
                    <div className="mb-4 pt-2">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-serif text-lg text-forest-green hover:text-premium-gold transition-colors line-clamp-1">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-forest-green/60 mt-1">{product.category || 'Upcycled Material'}</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                      <div className="flex flex-col">
                         {product.discount_price && product.discount_price < product.price ? (
                           <>
                             <span className="font-sans font-semibold text-xl text-forest-green">₹{product.discount_price}</span>
                             <span className="font-sans text-sm text-forest-green/60 line-through">₹{product.price}</span>
                           </>
                         ) : (
                           <span className="font-sans font-semibold text-xl text-forest-green">₹{product.price}</span>
                         )}
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="text-premium-gold flex items-center space-x-2 font-medium hover:text-forest-green transition-colors"
                      >
                        <FiShoppingBag /> <span>Add</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;