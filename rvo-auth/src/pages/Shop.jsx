import { useState } from 'react';
import { FaStar, FaLeaf, FaFilter } from 'react-icons/fa';

export default function Shop() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Generate 12 products matching the blueprint request
  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    name: ['Jute Tote', 'Hemp Backpack', 'Cotton Shopper', 'Canvas Grocery'][i % 4],
    price: ['M', 'C'].includes(['Jute Tote', 'Hemp Backpack', 'Cotton Shopper', 'Canvas Grocery'][i % 4][0]) ? '$45' : '$35', 
    img: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597404294326-1d37b60580da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560481464-bf6adbb4ffdf?auto=format&fit=crop&w=800&q=80'
    ][i % 4],
    rating: (4.5 + (i % 5) * 0.1).toFixed(1),
  }));

  // Sidebar Filter Section Component (to avoid repetition)
  const FilterSidebar = () => (
    <div className="bg-white p-6 rounded-lg border border-[#EAE6DB] space-y-8">
      {/* Material Filter */}
      <div>
        <h3 className="font-bold text-eco-charcoal mb-4 flex justify-between items-center">
          Material <span className="text-xs">&uarr;</span>
        </h3>
        <div className="space-y-3">
          {['Jute', 'Hemp', 'Cotton'].map((item, idx) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${idx === 0 ? 'bg-eco-sage border-eco-sage' : 'border-[#C4C0B6] group-hover:border-eco-sage'}`}>
                {idx === 0 && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className={`text-sm ${idx === 0 ? 'text-eco-charcoal font-bold' : 'text-eco-grey'}`}>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-[#EAE6DB]" />

      {/* Price Filter */}
      <div>
        <h3 className="font-bold text-eco-charcoal mb-4 flex justify-between items-center">
          Price <span className="text-xs">&uarr;</span>
        </h3>
        <div className="px-2 mb-2">
          {/* Mock Slider */}
          <div className="h-1 bg-[#EAE6DB] w-full rounded relative">
             <div className="absolute top-0 left-0 w-1/3 h-1 bg-eco-sage rounded" />
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-eco-sage rounded-full shadow cursor-pointer" />
             <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-4 h-4 bg-eco-sage rounded-full shadow cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-eco-charcoal font-bold mt-3">
          <span>$20</span>
          <span>$30</span>
        </div>
      </div>

      <hr className="border-[#EAE6DB]" />

      {/* Usage Filter */}
      <div>
        <h3 className="font-bold text-eco-charcoal mb-4 flex justify-between items-center">
          Usage <span className="text-xs">&uarr;</span>
        </h3>
        <div className="space-y-3">
          {['Gear bag', 'Crossbody', 'Over shoulder'].map((item) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-[#C4C0B6] group-hover:border-eco-sage flex items-center justify-center transition-colors"></div>
              <span className="text-sm text-eco-grey">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-eco-canvas pb-20">
      {/* =========================================
          HEADER BANNER 
          ========================================= */}
      <div className="w-full bg-[#EAE6DB] h-48 lg:h-64 relative overflow-hidden flex items-center justify-center">
        {/* Abstract subtle texture representation using overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/woven-light.png')] opacity-20 pointer-events-none" />
        <h1 className="text-4xl md:text-5xl font-bold text-eco-charcoal relative z-10 font-serif">
          Tote Bags
        </h1>
        {/* Decorative bag corner image */}
        <img 
          src="https://images.unsplash.com/photo-1597404294326-1d37b60580da?auto=format&fit=crop&q=80" 
          alt="Jute Tote" 
          className="absolute -right-10 -bottom-20 w-64 h-64 object-cover object-top mix-blend-multiply opacity-50 blur-sm rounded-full pointer-events-none"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Mobile Filter Toggle */}
        <button 
          className="md:hidden flex items-center gap-2 btn-outline w-full bg-white mb-4"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        >
          <FaFilter /> Filters
        </button>

        {/* =========================================
            SIDEBAR (Filters) 
            ========================================= */}
        <aside className={`w-full md:w-64 shrink-0 transition-all duration-300 md:block ${mobileFilterOpen ? 'block' : 'hidden'}`}>
           <FilterSidebar />
        </aside>

        {/* =========================================
            PRODUCT GRID 
            ========================================= */}
        <main className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-[#EAE6DB] hover:shadow-xl hover:border-eco-sage/50 transition-all duration-300 group flex flex-col h-full">
                <div className="w-full aspect-[4/5] bg-eco-canvas-dark relative overflow-hidden block">
                  <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-eco-charcoal text-lg line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-1 text-sm font-bold text-amber-500 shrink-0">
                        <FaStar className="w-3.5 h-3.5" /> {product.rating}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-eco-charcoal">{product.price}</span>
                      <span className="text-xs text-eco-grey font-medium uppercase tracking-wider">by Maya</span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-2">
                     <span className="inline-block px-3 py-1 bg-eco-canvas text-eco-charcoal text-xs font-semibold rounded-md border border-[#EAE6DB]">
                       Sustainable
                     </span>
                     <div className="flex items-center gap-2 text-xs text-eco-sage font-bold bg-eco-sage-light px-3 py-2 rounded-md">
                       <FaLeaf className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">Saved 3 Bags</span>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}
