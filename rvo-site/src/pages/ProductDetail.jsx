import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiRefreshCcw
} from 'react-icons/fi';

import { getProductById } from '../services/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductById(id);

      if (!data) {
        toast.error('Product not found');
        navigate('/products');
        return;
      }

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="py-24 pt-32 min-h-screen bg-white animate-pulse">
        <div className="flex gap-10">
          <div className="w-1/2 h-[500px] bg-gray-200 rounded-xl"></div>
          <div className="w-1/2 space-y-4">
            <div className="h-6 w-1/3 bg-gray-200"></div>
            <div className="h-10 w-2/3 bg-gray-200"></div>
            <div className="h-6 w-1/4 bg-gray-200"></div>
            <div className="h-24 bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  // =========================
  // IMAGE HANDLING (MAIN + GALLERY)
  // =========================

  let mainImage = product.image;

  let gallery = [];

  try {
    if (product.gallery) {
      gallery =
        typeof product.gallery === 'string'
          ? JSON.parse(product.gallery)
          : product.gallery;
    }
  } catch (e) {
    console.error('Gallery parse error', e);
  }

  gallery = gallery.filter(Boolean).filter(img => img !== mainImage);

  const images = [mainImage, ...gallery].filter(Boolean);

  // =========================
  // PRICE LOGIC
  // =========================

  const hasDiscount =
    product.discount_price &&
    product.discount_price < product.price;

  return (
    <div className="py-24 pt-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">

        {/* =========================
            LEFT: IMAGE SECTION
        ========================= */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">

          {/* thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:w-24">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-24 md:w-full md:h-28 rounded-lg overflow-hidden border-2 transition ${
                  activeImage === i
                    ? 'border-black'
                    : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* main image */}
          <div className="flex-1 h-[500px] bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={images[activeImage]}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* =========================
            RIGHT: DETAILS
        ========================= */}
        <div className="w-full lg:w-1/2">

          {/* category */}
          <p className="uppercase text-sm tracking-widest text-gray-500">
            {product.category}
          </p>

          {/* name */}
          <h1 className="text-4xl font-semibold mt-2">
            {product.name}
          </h1>

          {/* price */}
          <div className="mt-4 flex items-center gap-3">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-black">
                  ₹{product.discount_price}
                </span>
                <span className="line-through text-gray-400">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">
                ₹{product.price}
              </span>
            )}
          </div>

          {/* short description */}
          <p className="mt-4 text-gray-600">
            {product.short_description}
          </p>

          {/* eco / highlight */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
            <FiRefreshCcw />
            <span>{product.eco_score || 'Eco-friendly product'}</span>
          </div>

          {/* attributes */}
          <div className="mt-6 space-y-2 text-gray-700">
            <p><strong>Material:</strong> {product.material}</p>
            <p><strong>Weight:</strong> {product.weight}</p>
            <p><strong>Color:</strong> {product.color}</p>
          </div>

          {/* quantity */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded-full px-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <FiMinus />
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <FiPlus />
              </button>
            </div>
          </div>

          {/* actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                addToCart(product, quantity);
                toast.success('Added to cart');
              }}
              className="flex-1 bg-black text-white py-3 rounded-lg flex justify-center items-center gap-2"
            >
              <FiShoppingBag /> Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="px-4 border rounded-lg"
            >
              <FiHeart
                className={
                  isInWishlist(product.id)
                    ? 'text-red-500'
                    : ''
                }
              />
            </button>
          </div>

          {/* buy now */}
          <button
            onClick={() => {
              addToCart(product, quantity);
              navigate('/checkout');
            }}
            className="mt-3 w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Buy Now
          </button>

          {/* shipping info */}
          <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-gray-600">
            <p><FiTruck className="inline mr-2" /> Free shipping over ₹999</p>
            <p><FiRefreshCcw className="inline mr-2" /> 7 day return policy</p>
            <p><FiShield className="inline mr-2" /> 6 month warranty</p>
          </div>
        </div>
      </div>

      {/* =========================
          TABS SECTION
      ========================= */}
      <div className="max-w-5xl mx-auto mt-16 px-6">
        <div className="flex gap-6 border-b">
          {['description', 'shipping', 'care'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-black'
                  : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 text-gray-700 leading-relaxed">
          {activeTab === 'description' && (
            <p>
              {product.full_description || product.short_description}
            </p>
          )}

          {activeTab === 'shipping' && (
            <p>
              Shipping across India in 3–5 days. International shipping available.
            </p>
          )}

          {activeTab === 'care' && (
            <p>
              {product.care_instructions || 'Handle with care. Do not machine wash.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;