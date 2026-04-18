export default function Wishlist() {
  return (
    <div className="animate-fade-in-up w-full">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-rvo-dark mb-2">
          Your Wishlist
        </h1>
        <p className="text-rvo-dark-light">
          Products you've saved for later.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Wishlist Items Skeleton */}
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="group border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="aspect-square bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
            </div>
            <button className="w-full py-2.5 bg-rvo-green/10 text-rvo-green font-medium rounded-xl hover:bg-rvo-green hover:text-white transition-colors text-sm">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
