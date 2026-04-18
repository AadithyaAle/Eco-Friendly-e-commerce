export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} EcoBag Marketplace. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
           <a href="#privacy" className="text-xs text-gray-400 hover:text-white transition-colors">Privacy</a>
           <a href="#terms" className="text-xs text-gray-400 hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
