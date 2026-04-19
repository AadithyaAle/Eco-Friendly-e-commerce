import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiMinus, FiPlus, FiShoppingBag, FiShield, FiTruck, FiRefreshCcw } from 'react-icons/fi';
import { getProductById } from '../services/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const data = await getProductById(id);
      if (!data) {
        toast.error('Product not found');
        navigate('/products');
        return;
      }
      setProduct(data);
      setIsLoading(false);
    };
    fetchProduct();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="section-padding py-24 pt-32 bg-ivory-white min-h-screen">
        <div className="flex flex-col lg:flex-row gap-16 mb-20 animate-pulse">
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 flex-shrink-0 hide-scrollbar">
              {[1,2,3,4].map((i) => <div key={i} className="w-20 h-24 md:w-full md:h-32 bg-gray-200 rounded-lg"></div>)}
            </div>
            <div className="flex-grow aspect-[4/5] bg-gray-200 rounded-xl"></div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col py-4">
            <div className="h-6 w-1/4 bg-gray-200 mb-4 rounded"></div>
            <div className="h-10 w-3/4 bg-gray-200 mb-6 rounded"></div>
            <div className="h-8 w-1/3 bg-gray-200 mb-6 rounded"></div>
            <div className="h-24 w-full bg-gray-200 mb-8 rounded"></div>
            <div className="h-14 w-full bg-gray-200 mb-8 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  // Assuming product.image is a comma separated string or single image for now
  // We'll mock extra images if only one is available for layout purposes
  const images = [
    product.image,
    'https://images.unsplash.com/photo-1584305581177-84bc3623fa55?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1620330925769-d4cbae08c5c7?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="section-padding py-24 pt-32 bg-ivory-white min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16 mb-20">
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 flex-shrink-0 hide-scrollbar">
            {images.map((img, idx) => (
              <button 
                key={idx} 
                className={`w-20 h-24 md:w-full md:h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-premium-gold' : 'border-transparent opacity-70 hover:opacity-100'}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
              </button>
            ))}
          </div>
          <div className="flex-grow aspect-[4/5] bg-white rounded-xl overflow-hidden shadow-sm relative group">
            <img src={images[activeImage]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out cursor-zoom-in" alt={product.name} />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col py-4">
          <div className="mb-2 uppercase text-sm font-bold tracking-widest text-premium-gold">{product.category || 'Designer Collection'}</div>
          <h1 className="text-4xl md:text-5xl font-serif text-forest-green mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
             {product.discount_price && product.discount_price < product.price ? (
               <>
                 <span className="text-3xl font-sans font-medium text-forest-green">₹{product.discount_price}</span>
                 <span className="text-xl font-sans text-forest-green/60 line-through">₹{product.price}</span>
               </>
             ) : (
               <span className="text-3xl font-sans font-medium text-forest-green">₹{product.price}</span>
             )}
          </div>
          
          <p className="text-lg text-forest-green/80 mb-6 leading-relaxed">
            {product.description || 'A beautiful, durable everyday carry engineered from completely upcycled materials.'}
          </p>

          <div className="bg-forest-green/5 p-4 rounded-lg flex items-center space-x-4 mb-8 border border-forest-green/10">
            <div className="w-12 h-12 rounded-full bg-premium-gold flex items-center justify-center text-white text-2xl flex-shrink-0"><FiRefreshCcw /></div>
            <div>
              <div className="font-semibold text-forest-green">Eco Impact</div>
              <div className="text-forest-green/80">{product.eco_score || 'This product saved 2.1kg textile waste and 14 liters of water.'}</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="font-semibold text-forest-green mb-2">Material:</div>
            <div className="text-forest-green/80">{product.material || 'Recycled thick canvas cotton & upcycled denim lining.'}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 border-t border-forest-green/10 pt-8">
            <div className="flex items-center border border-forest-green/20 rounded-full bg-white">
              <button 
                className="px-5 py-3 text-forest-green hover:text-premium-gold"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              ><FiMinus /></button>
              <span className="w-10 text-center font-semibold text-forest-green">{quantity}</span>
              <button 
                className="px-5 py-3 text-forest-green hover:text-premium-gold"
                onClick={() => setQuantity(quantity + 1)}
              ><FiPlus /></button>
            </div>

            <button 
              onClick={() => {
                addToCart(product, quantity);
                toast.success('Added to Cart');
              }}
              className="flex-grow flex items-center justify-center space-x-2 bg-white border border-forest-green text-forest-green px-8 py-3 rounded-full hover:bg-forest-green/5 hover:-translate-y-1 transition-all"
            >
              <FiShoppingBag /> <span>Add to Cart</span>
            </button>
            
            <button 
              onClick={() => toggleWishlist(product)}
              className={`px-6 py-3 border border-forest-green/20 rounded-full transition-all ${isInWishlist(product.id) ? 'bg-red-50 text-red-500 border-red-200' : 'text-forest-green bg-white hover:text-white hover:bg-premium-gold hover:border-premium-gold'}`}
            >
              <FiHeart className={`text-xl ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          <button 
            className="w-full premium-btn text-lg py-4 mb-10"
            onClick={() => {
              addToCart(product, quantity);
              navigate('/checkout');
            }}
          >
            Buy Now
          </button>

          <div className="grid grid-cols-2 gap-4 text-sm text-forest-green/70 border-t border-forest-green/10 pt-6">
            <div className="flex items-center space-x-2"><FiTruck className="text-premium-gold" /> <span>Free Shipping over ₹999</span></div>
            <div className="flex items-center space-x-2"><FiRefreshCcw className="text-premium-gold" /> <span>7 Days Easy Return</span></div>
            <div className="flex items-center space-x-2"><FiShield className="text-premium-gold" /> <span>6 Month Warranty</span></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex border-b border-forest-green/10 mb-8 overflow-x-auto hide-scrollbar text-center">
          {['description', 'shipping', 'care'].map(tab => (
            <button 
              key={tab}
              className={`flex-1 py-4 text-lg font-serif font-medium capitalize border-b-2 transition-all ${activeTab === tab ? 'border-premium-gold text-forest-green' : 'border-transparent text-forest-green/50 hover:text-forest-green'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'care' ? 'Care Instructions' : tab}
            </button>
          ))}
        </div>
        <div className="min-h-[200px] text-forest-green/80 leading-relaxed font-sans bg-white p-8 rounded-2xl border border-forest-green/5 shadow-sm">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p>{product.full_description || product.description || 'Every piece in our Designer Collection is unique. By sourcing end-of-roll premium fabrics and gently used garments, we create small-batch runs of luxury accessories that don\'t cost the Earth.'}</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                {product.dimensions && <li>Dimensions: {product.dimensions}</li>}
                {product.weight && <li>Weight: {product.weight}</li>}
                {product.color && <li>Color: {product.color}</li>}
                {!product.dimensions && !product.weight && !product.color && (
                  <>
                    <li>Dimensions: 16" H x 14" W x 4" D</li>
                    <li>Laptop sleeve fits up to 15"</li>
                    <li>Reinforced double-stitched straps</li>
                  </>
                )}
              </ul>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <p>We pack all our products in 100% biodegradable and compostable mailers. No single-use plastic is used anywhere in our supply chain.</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Standard Shipping (4-6 days): ₹99 (Free over ₹999)</li>
                <li>Express Shipping (2-3 days): ₹199</li>
                <li>International Shipping: Calculation at checkout</li>
              </ul>
            </div>
          )}
          {activeTab === 'care' && (
            <div className="space-y-4">
              <p>{product.care_instructions || 'To ensure the longevity of your RVO Fabric product, please follow these care guidelines:'}</p>
              {!product.care_instructions && (
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>Spot clean with minimal water and mild soap for small stains.</li>
                  <li>Gentle cold hand wash only when necessary.</li>
                  <li>Do not machine wash, bleach, or tumble dry.</li>
                  <li>Dry flat in shade to preserve colors and fabric integrity.</li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
