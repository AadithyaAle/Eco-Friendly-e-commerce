import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { cartItems, subtotal } = useCart();
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const onSubmit = (data) => {
    setProcessing(true);
    // Mock processing logic
    setTimeout(() => {
      setProcessing(false);
      toast.success('Order placed successfully (Mock)!');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="section-padding py-32 bg-ivory-white min-h-screen text-center">
        <h1 className="text-4xl font-serif text-forest-green mb-4">Your Cart is Empty</h1>
        <Link to="/products" className="premium-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="section-padding py-24 min-h-screen bg-ivory-white">
      <h1 className="text-4xl font-serif text-forest-green mb-10 border-b border-forest-green/10 pb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow">
          <div className="bg-white p-8 rounded-2xl border border-forest-green/10 shadow-sm">
            <h2 className="text-2xl font-serif text-forest-green mb-6 border-b border-gray-100 pb-4">Shipping Address</h2>
            
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-forest-green/80 mb-2">Full Name</label>
                  <input type="text" {...register('fullName', { required: 'Required' })} className="w-full px-4 py-2 rounded-lg border border-forest-green/20 focus:outline-none focus:border-premium-gold" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-green/80 mb-2">Phone</label>
                  <input type="text" {...register('phone', { required: 'Required' })} className="w-full px-4 py-2 rounded-lg border border-forest-green/20 focus:outline-none focus:border-premium-gold" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-green/80 mb-2">Street Address</label>
                <input type="text" {...register('address', { required: 'Required' })} className="w-full px-4 py-2 rounded-lg border border-forest-green/20 focus:outline-none focus:border-premium-gold" />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-forest-green/80 mb-2">City</label>
                  <input type="text" {...register('city', { required: 'Required' })} className="w-full px-4 py-2 rounded-lg border border-forest-green/20 focus:outline-none focus:border-premium-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-green/80 mb-2">State</label>
                  <input type="text" {...register('state', { required: 'Required' })} className="w-full px-4 py-2 rounded-lg border border-forest-green/20 focus:outline-none focus:border-premium-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-green/80 mb-2">Pincode</label>
                  <input type="text" {...register('pincode', { required: 'Required' })} className="w-full px-4 py-2 rounded-lg border border-forest-green/20 focus:outline-none focus:border-premium-gold" />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white p-8 rounded-2xl border border-forest-green/10 shadow-sm sticky top-32">
            <h2 className="text-2xl font-serif text-forest-green mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{item.qty}x</span>
                    <span className="text-forest-green/80 line-clamp-1">{item.name}</span>
                  </div>
                  <span className="font-medium">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-forest-green/10 pt-4 space-y-4 text-forest-green/80 mb-6 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-forest-green">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-forest-green">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
            </div>

            <div className="border-t border-forest-green/10 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-forest-green">Total</span>
                <span className="text-2xl font-bold font-sans text-forest-green">₹{total}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={processing}
              className="w-full premium-btn py-4 disabled:opacity-70"
            >
              {processing ? 'Processing...' : 'Proceed to Payment (Mock)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
