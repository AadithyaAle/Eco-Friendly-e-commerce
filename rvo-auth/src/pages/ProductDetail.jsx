import { FaStar, FaLeaf, FaHeart } from 'react-icons/fa';

export default function ProductDetail() {
  return (
    <div className="w-full bg-eco-canvas py-12 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* =========================================
            PDP MAIN FRAME 
            ========================================= */}
        <div className="bg-white rounded-lg border border-[#EAE6DB] shadow-sm p-6 lg:p-10 mb-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Images */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="aspect-[4/5] bg-eco-canvas-dark rounded-lg overflow-hidden border border-[#EAE6DB]">
                <img 
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80" 
                  alt="Handwoven Hemp Backpack"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(thumb => (
                  <div key={thumb} className="aspect-square bg-eco-canvas-dark rounded-lg cursor-pointer border hover:border-eco-sage transition-colors overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80" 
                      alt="Thumbnail"
                      className="w-full h-full object-cover mix-blend-multiply opacity-70 hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Info */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-eco-charcoal mb-2">Handwoven Hemp Backpack</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-eco-charcoal">$78</span>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                  <FaStar /> 4.8
                </div>
              </div>

              <div className="mb-6">
                <span className="text-eco-charcoal font-bold">Made by: </span>
                <span className="text-eco-grey">Cusco Artisan Collective</span>
              </div>

              <p className="text-eco-grey leading-relaxed mb-6">
                Description of eco-friendly bags the global marketplace, combines class and artisans, and confirms their mission. This highly durable, water-resistant pack is perfect for daily commutes and weekend adventures.
              </p>

              <div className="mb-8">
                <span className="text-eco-charcoal font-bold block mb-2">Material:</span>
                <ul className="list-disc list-inside text-eco-grey space-y-1">
                  <li>Sustainable Hemp Fiber</li>
                  <li>Organic Cotton</li>
                  <li>Biodegradable</li>
                </ul>
              </div>

              <div className="space-y-4 mt-auto">
                <button className="btn-primary w-full py-4 text-lg">
                  Add to Cart
                </button>
                <button className="btn-outline w-full py-4 text-lg text-eco-grey hover:text-eco-charcoal border-[#D5D1C9]">
                  <FaHeart className="mr-2" /> Add to Wishlist
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            BELOW MAIN SECTION 
            ========================================= */}
        
        {/* Impact Meter */}
        <div className="bg-eco-sage-light border border-eco-sage/20 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-white text-eco-sage flex items-center justify-center shrink-0 shadow-sm">
             <FaLeaf className="w-6 h-6" />
          </div>
          <p className="text-eco-charcoal font-bold text-lg md:text-xl text-center sm:text-left">
            This purchase saves 12 plastic bags and supports local artisans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Artisan Story */}
          <div>
            <h2 className="text-2xl font-bold text-eco-charcoal mb-6">Artisan Story</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80" 
                alt="Maria the Artisan" 
                className="w-32 h-32 object-cover rounded-lg shrink-0"
              />
              <div>
                <h3 className="font-bold text-eco-charcoal mb-2">Maria</h3>
                <p className="text-eco-grey text-sm leading-relaxed mb-3">
                  Maria of the Cusco Artisan Collective weaves incredible magic in her textiles, reflecting generations of indigenous Quechuan traditions. Her work directly supports her community and local schools.
                </p>
              </div>
            </div>
          </div>

          {/* Material Transparency */}
          <div>
             <h2 className="text-2xl font-bold text-eco-charcoal mb-6">Material Transparency</h2>
             <p className="text-eco-grey text-sm leading-relaxed">
               Source info: Sustainable Hemp Fiber, Organic Cotton, Biodegradable. Produced directly from farmers without harsh chemicals or pesticides, ensuring clean runoffs.
             </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16 border-t border-[#EAE6DB] pt-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-eco-charcoal mb-2">Reviews</h2>
              <div className="flex items-center gap-2 text-amber-500">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> 
                <span className="text-eco-grey text-sm ml-2">18 reviews</span>
              </div>
            </div>
            <button className="btn-outline w-auto py-2 px-6 border-[#D5D1C9]">See All</button>
          </div>
        </div>

        {/* Related Products */}
        <div>
           <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-eco-charcoal">Related Products</h2>
              <button className="text-eco-sage font-bold hover:underline">See All</button>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               {name: 'Small Hemp Bag', price: '$45'},
               {name: 'Market Tote', price: '$25'},
               {name: 'Clutch', price: '$35'},
               {name: 'Grocery Bag', price: '$15'}
             ].map((prod, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden border border-[#EAE6DB] hover:shadow-lg transition-all group p-4 space-y-2">
                  <div className="aspect-square bg-eco-canvas-dark rounded mb-2" />
                  <h3 className="font-bold text-sm text-eco-charcoal truncate">{prod.name}</h3>
                  <div className="font-bold text-eco-charcoal">{prod.price}</div>
                </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
