export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rvo-cream">
      <div className="flex flex-col items-center gap-6">
        {/* Elegant large spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-rvo-cream-dark rounded-full border-t-rvo-green animate-spin-slow" />
        </div>
        <p className="text-sm text-rvo-dark-light font-medium tracking-widest uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
}
