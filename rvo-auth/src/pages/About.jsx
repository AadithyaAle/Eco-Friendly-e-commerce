export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center animate-fade-in-up w-full">
      <h1 className="font-heading text-4xl lg:text-5xl font-bold text-rvo-dark mb-6">
        Our Story
      </h1>
      <p className="text-xl text-rvo-dark-light leading-relaxed mb-12">
        Empowering global artisans and protecting our planet through sustainable, premium fabric essentials.
      </p>

      <div className="aspect-[21/9] bg-gray-100 rounded-3xl w-full mb-16 overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-4">
            <div className="w-12 h-12 bg-rvo-green/10 rounded-xl" />
            <div className="h-6 bg-gray-100 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
