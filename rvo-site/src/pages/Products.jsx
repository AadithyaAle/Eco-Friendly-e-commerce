import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFilter, FiHeart, FiShoppingBag, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Products = () => {
  const [showFilters, setShowFilters] = useState(false);

  // Generate 12 dummy products
  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Eco-Friendly ${['Tote', 'Yoga Bag', 'Bottle Cover', 'Sleeve'][i % 4]} ${i + 1}`,
    price: 999 + (i * 250),
    image: `https://images.unsplash.com/photo-1544816155-12df9643f36${i % 10}?auto=format&fit=crop&w=400&q=80`,
    eco: `Saved ${1 + (i % 3)}.5kg CO2`
  }));

  return (
    <div className="section-padding py-24 pt-40 md:pt-48 bg-ivory-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 border-b border-forest-green/10 pb-6">
        <div>
          <h1 className="text-4xl font-serif text-forest-green mb-2">Our Collection</h1>
          <p className="text-forest-green/70">Showing all {products.length} sustainable products</p>
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
              {['All', 'Tote Bags', 'Yoga Covers', 'Bottle Covers', 'Accessories'].map(cat => (
                <label key={cat} className="flex items-center space-x-3 mb-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-premium-gold focus:ring-premium-gold accent-premium-gold" />
                  <span className="text-forest-green/80 hover:text-forest-green">{cat}</span>
                </label>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-forest-green mb-3">Price Range</h4>
              <input type="range" className="w-full accent-premium-gold" min="0" max="5000" />
              <div className="flex justify-between text-sm text-forest-green/60 mt-2">
                <span>₹0</span>
                <span>₹5000+</span>
              </div>
            </div>

            <button className="w-full py-2 bg-forest-green/10 text-forest-green rounded-full font-medium hover:bg-forest-green hover:text-white transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={product.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-forest-green/5 relative"
            >
              <Link to={`/product/${product.id}`} className="block relative h-72 overflow-hidden bg-gray-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
              <div className="p-6">
                <button 
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-forest-green hover:text-premium-gold hover:bg-white shadow-sm transition-all z-10"
                  onClick={(e) => { e.preventDefault(); /* handle favorites */ }}
                >
                  <FiHeart />
                </button>
                <div className="mb-4 pt-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-lg text-forest-green hover:text-premium-gold transition-colors line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-forest-green/60 mt-1">Upcycled Cotton</p>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <span className="font-sans font-semibold text-xl text-forest-green">₹{product.price}</span>
                  <button className="text-premium-gold flex items-center space-x-2 font-medium hover:text-forest-green transition-colors">
                    <FiShoppingBag /> <span>Add</span>
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
