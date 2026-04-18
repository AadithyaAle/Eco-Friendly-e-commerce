import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 animate-fade-in-up w-full">
      <h1 className="font-heading text-4xl font-bold text-rvo-dark mb-10">
        Shopping Cart
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-2xl">
              <div className="w-24 h-24 bg-gray-100 rounded-xl shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-100 rounded w-1/2" />
                <div className="h-4 bg-gray-100 rounded w-1/4" />
                <div className="h-8 bg-gray-100 rounded w-24 mt-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-32">
            <h2 className="font-heading text-xl font-bold text-rvo-dark mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-px bg-gray-100 w-full my-4" />
              <div className="h-6 bg-gray-100 rounded w-3/4" />
            </div>
            <Link to="/checkout" className="btn-primary w-full text-center block">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
