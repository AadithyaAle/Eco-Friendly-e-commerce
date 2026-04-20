import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, subtotal, isLoading } = useCart();

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="section-padding py-24 pt-48 bg-ivory-white min-h-screen">
        <h1 className="text-4xl font-serif text-forest-green mb-10 border-b border-forest-green/10 pb-6">Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-12 animate-pulse">
          <div className="flex-grow space-y-6">
            {[1,2].map((i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-gray-100 h-40"></div>
            ))}
          </div>
          <div className="w-full lg:w-96 flex-shrink-0 bg-gray-100 h-96 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="section-padding py-32 bg-ivory-white min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-forest-green/5 rounded-full flex items-center justify-center text-4xl text-premium-gold mb-6">
          <FiShoppingBag />
        </div>
        <h1 className="text-4xl font-serif text-forest-green mb-4">Your cart is empty</h1>
        <p className="text-forest-green/70 mb-8 max-w-md">Looks like you haven't added any sustainable products to your cart yet.</p>
        <Link to="/products" className="premium-btn">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory-white min-h-screen">
      {/* Spacer for fixed navbar */}
      <div className="h-32 md:h-40"></div>
      
      <div className="section-padding pb-32 pt-0">
        <h1 className="text-4xl font-serif text-forest-green mb-10 border-b border-forest-green/10 pb-6">Your Cart ({cartItems.length})</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-grow space-y-6">
          {cartItems.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={item.id} 
              className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-white border border-forest-green/5 shadow-sm relative group"
            >
              <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow w-full">
                <Link to={`/product/${item.id}`} className="text-xl font-serif text-forest-green hover:text-premium-gold mb-1 block line-clamp-1">{item.name}</Link>
                <div className="text-sm text-forest-green/60 mb-4">Eco-friendly Selection</div>
                
                <div className="flex justify-between items-center w-full">
                  <div className="font-sans font-semibold text-lg text-forest-green">₹{item.price}</div>
                  
                  <div className="flex items-center space-x-1 sm:space-x-4">
                    <div className="flex items-center border border-forest-green/20 rounded-full">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-forest-green hover:text-premium-gold"><FiMinus /></button>
                      <span className="w-6 sm:w-8 text-center font-medium text-forest-green select-none">{item.qty}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-forest-green hover:text-premium-gold"><FiPlus /></button>
                    </div>
                    
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors ml-2" title="Remove Item">
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white p-8 rounded-2xl border border-forest-green/5 shadow-sm sticky top-40 z-10">
            <h2 className="text-2xl font-serif text-forest-green mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
            
            <div className="space-y-4 text-forest-green/80 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-forest-green">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Estimate</span>
                <span className="font-medium text-forest-green">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="mb-6">
              <p className="text-sm text-forest-green/70 mb-2">Gift card or discount code</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow px-4 py-2 border border-forest-green/20 rounded-lg focus:outline-none focus:border-premium-gold text-forest-green uppercase" 
                  placeholder="Code"
                />
                <button className="px-4 py-2 bg-forest-green/10 text-forest-green rounded-lg hover:bg-forest-green hover:text-white transition-colors font-medium">Apply</button>
              </div>
            </div>

            <div className="border-t border-forest-green/10 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-forest-green">Total</span>
                <span className="text-2xl font-bold font-sans text-forest-green">₹{total}</span>
              </div>
              <p className="text-xs text-forest-green/50 text-right mt-1">Including GST</p>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full premium-btn text-lg py-4 flex items-center justify-center space-x-2"
            >
              <span>Checkout</span> <FiArrowRight />
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
