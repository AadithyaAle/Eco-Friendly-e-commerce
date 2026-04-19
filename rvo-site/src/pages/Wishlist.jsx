import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const [items, setItems] = useState([
    { id: 3, name: 'Eco Minimalist Bottle Cover', price: 599, image: 'https://images.unsplash.com/photo-1620330925769-d4cbae08c5c7?auto=format&fit=crop&w=400&q=80', inStock: true },
    { id: 4, name: 'Heritage Upcycled Tiffin Bag', price: 899, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=400&q=80', inStock: false },
    { id: 5, name: 'Canvas Travel Organizer', price: 1199, image: 'https://images.unsplash.com/photo-1584305581177-84bc3623fa55?auto=format&fit=crop&w=400&q=80', inStock: true }
  ]);

  const removeItem = (id) => setItems(items.filter(item => item.id !== id));

  if (items.length === 0) {
    return (
      <div className="section-padding py-32 bg-ivory-white min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-forest-green/5 rounded-full flex items-center justify-center text-4xl text-premium-gold mb-6">
          <FiHeart />
        </div>
        <h1 className="text-4xl font-serif text-forest-green mb-4">Your Wishlist is Empty</h1>
        <p className="text-forest-green/70 mb-8 max-w-md">Save your favorite eco-friendly items here while you shop.</p>
        <Link to="/products" className="premium-btn">
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="section-padding py-24 pt-32 bg-ivory-white min-h-screen">
      <div className="flex justify-between items-end mb-10 border-b border-forest-green/10 pb-6">
        <div>
          <h1 className="text-4xl font-serif text-forest-green mb-2">My Wishlist</h1>
          <p className="text-forest-green/70">You have {items.length} items saved</p>
        </div>
        <button className="hidden sm:flex text-forest-green hover:text-premium-gold items-center space-x-2 transition-colors">
          <span>Move all to Cart</span> <FiArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 rounded-xl">
        {items.map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={item.id} 
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-forest-green/5 group"
          >
            <div className="relative h-64 overflow-hidden bg-gray-50">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-red-400 hover:text-red-600 hover:bg-white shadow-sm transition-all"
                title="Remove from wishlist"
              >
                <FiTrash2 />
              </button>
              
              {!item.inStock && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="bg-forest-green text-white px-4 py-2 font-semibold uppercase text-xs tracking-widest rounded-full shadow-lg">Out of Stock</span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="font-serif text-lg text-forest-green mb-3 line-clamp-1">{item.name}</h3>
              <div className="font-sans font-semibold text-xl text-forest-green mb-6">₹{item.price}</div>
              
              <button 
                disabled={!item.inStock}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-full font-medium transition-all ${
                  item.inStock 
                    ? 'border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FiShoppingBag /> <span>{item.inStock ? 'Move to Cart' : 'Notify Me'}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
