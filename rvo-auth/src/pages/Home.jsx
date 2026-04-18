import { Link } from 'react-router-dom';
import { FaLeaf, FaHandsHelping, FaGlobeAmericas, FaStar } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="w-full">
      {/* =========================================
          HERO SECTION 
          ========================================= */}
      <section className="w-full bg-white relative overflow-hidden px-6 lg:px-8 py-16 md:py-24">
        {/* Soft abstract background blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-eco-sage/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-eco-canvas-dark rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          {/* Hero Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F3E9] border border-[#EAE6DB] rounded-full text-sm font-bold text-eco-sage">
              <FaLeaf className="w-3 h-3" /> Latest Collection
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-eco-charcoal leading-tight">
              Carry a <br className="hidden md:block" />
              <span className="text-eco-sage">Greener Future</span>
            </h1>
            <p className="text-lg text-eco-grey leading-relaxed max-w-lg mx-auto md:mx-0">
              Discover handmade, sustainable bags from global artisans. Every purchase reduces plastic waste and supports ethical communities.
            </p>
            <div className="pt-4">
              <Link to="/shop" className="btn-primary w-full md:w-auto text-lg px-8 py-4">
                Shop Collection
              </Link>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
               {/* Reliable Hero Placeholder Image */}
               <img 
                 src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80" 
                 alt="Sustainable bag"
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          OUR MISSION SECTION 
          ========================================= */}
      <section className="py-20 px-6 lg:px-8 bg-white border-t border-[#EAE6DB]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-eco-charcoal mb-16">Our Mission</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Mission 1 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-xl bg-eco-sage-light flex items-center justify-center text-eco-sage mb-2">
                <FaGlobeAmericas className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-eco-charcoal">Planet</h3>
              <p className="text-eco-grey max-w-xs leading-relaxed">
                We remove plastic waste from ecosystems by providing 100% biodegradable and reusable alternatives.
              </p>
            </div>
            {/* Mission 2 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-xl bg-eco-sage-light flex items-center justify-center text-eco-sage mb-2">
                <FaHandsHelping className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-eco-charcoal">Artisan</h3>
              <p className="text-eco-grey max-w-xs leading-relaxed">
                We partner with skilled global artisans, ensuring fair wages and preserving traditional weaving methods.
              </p>
            </div>
            {/* Mission 3 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-xl bg-eco-sage-light flex items-center justify-center text-eco-sage mb-2">
                <FaLeaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-eco-charcoal">Ethical</h3>
              <p className="text-eco-grey max-w-xs leading-relaxed">
                Operating with complete transparency, sourcing only sustainable plant-based fibers like jute and hemp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FEATURED PRODUCTS SECTION 
          ========================================= */}
      <section className="py-20 px-6 lg:px-8 bg-eco-canvas">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 border-b border-[#EAE6DB] pb-4">
            <h2 className="text-3xl font-bold text-eco-charcoal">Featured Products</h2>
            <Link to="/shop" className="text-eco-sage font-bold hover:underline mb-1">
              View all products &rarr;
            </Link>
          </div>
          
          {/* Robust Grid Layout ensuring no squishing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product Card Component (repeated x4) */}
            {[
              { name: 'Jute Tote', price: '$35', img: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80', rating: 4.8 },
              { name: 'Hemp Backpack', price: '$75', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', rating: 4.9 },
              { name: 'Cotton Shopper', price: '$45', img: 'https://images.unsplash.com/photo-1597404294326-1d37b60580da?auto=format&fit=crop&w=800&q=80', rating: 4.7 },
              { name: 'Canvas Grocery', price: '$25', img: 'https://images.unsplash.com/photo-1622560481464-bf6adbb4ffdf?auto=format&fit=crop&w=800&q=80', rating: 5.0 }
            ].map((product, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-[#EAE6DB] hover:shadow-xl hover:border-eco-sage/50 transition-all duration-300 group flex flex-col h-full">
                {/* Fixed Aspect Ratio for Uniformity safely using w-full and padding trick or explicit aspect */}
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
        </div>
      </section>

      {/* =========================================
          IMPACT COUNTER SECTION 
          ========================================= */}
      <section className="py-16 px-6 lg:px-8 bg-eco-sage-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-eco-sage/20">
            <div className="py-4 md:py-0">
               <p className="text-eco-charcoal font-bold mb-1">Plastic Bags Saved</p>
               <p className="text-5xl font-bold text-eco-sage">145,210</p>
            </div>
            <div className="py-4 md:py-0">
               <p className="text-eco-charcoal font-bold mb-1">Trees Planted</p>
               <p className="text-5xl font-bold text-eco-sage">3,450</p>
            </div>
            <div className="py-4 md:py-0">
               <p className="text-eco-charcoal font-bold mb-1">Artisans Supported</p>
               <p className="text-5xl font-bold text-eco-sage">98</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
