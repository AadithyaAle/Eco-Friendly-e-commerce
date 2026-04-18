export default function Checkout() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 animate-fade-in-up w-full">
      <h1 className="font-heading text-3xl font-bold text-rvo-dark mb-10 text-center">
        Secure Checkout
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-5xl mx-auto">
        {/* Left: Forms */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-rvo-dark">1. Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-50 rounded-xl border border-gray-100" />
              <div className="h-12 bg-gray-50 rounded-xl border border-gray-100" />
            </div>
            <div className="h-12 bg-gray-50 rounded-xl border border-gray-100 w-full" />
            <div className="h-12 bg-gray-50 rounded-xl border border-gray-100 w-full" />
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-rvo-dark">2. Payment Method</h2>
            <div className="h-32 bg-gray-50 rounded-xl border border-gray-100 w-full" />
          </div>
        </div>

        {/* Right: Summary */}
        <div>
          <div className="bg-rvo-cream p-8 rounded-3xl sticky top-32">
             <h2 className="font-heading text-xl font-bold text-rvo-dark mb-6">In Your Bag</h2>
             <div className="space-y-4 mb-8">
               <div className="flex gap-4">
                 <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0" />
                 <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                 </div>
               </div>
             </div>
             <div className="h-14 bg-rvo-green rounded-xl w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
