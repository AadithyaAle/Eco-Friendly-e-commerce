export default function Orders() {
  return (
    <div className="animate-fade-in-up w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-rvo-dark mb-2">
            Order History
          </h1>
          <p className="text-rvo-dark-light">
            Track, return, or repurchase items from your past orders.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Orders Skeleton */}
        {[1, 2, 3].map(i => (
          <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex gap-8">
                <div className="space-y-1">
                  <div className="text-xs text-gray-400">Order Placed</div>
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-400">Total</div>
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
              </div>
              <div className="space-y-1 text-right border-l pl-8 border-gray-200">
                <div className="text-xs text-gray-400">Order #</div>
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
            </div>
            <div className="p-6 flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-100 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-100 rounded w-1/3" />
                <div className="h-4 bg-gray-100 rounded w-1/4" />
              </div>
              <button className="px-5 py-2 bg-white border border-gray-200 text-rvo-dark hover:border-rvo-green rounded-xl text-sm font-medium transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
