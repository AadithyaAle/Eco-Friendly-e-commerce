import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiStar, FiTruck, FiBox, FiFeather, FiCheckCircle, FiHeart } from 'react-icons/fi';
import { useProduct } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const Home = () => {
  const categoriesRef = useRef(null);
  const { products } = useProduct();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Pick up to 4 products marked as Bestsellers
  const bestsellers = products.filter(p => p.best_seller).slice(0, 4);

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    const success = await addToCart(product, 1);
    if (success) {
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    toggleWishlist(product);
    if (!isInWishlist(product.id)) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.success(`${product.name} removed from wishlist`);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-ivory-white overflow-hidden py-36">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/clean-textile.png")' }}></div>
        <div className="section-padding relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-accent text-forest-green leading-tight mb-6">
              RVO Fabric <br /> Essentials
            </motion.h1>
            <motion.h2 variants={fadeInUp} className="text-2xl font-serif text-premium-gold mb-6 italic">
              Crafted Sustainably. Designed Elegantly.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-forest-green/80 mb-10 font-sans leading-relaxed">
              Premium recycled fabric bags and lifestyle accessories built for conscious living. Experience luxury with responsibility.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link to="/products" className="premium-btn">
                Shop Now
              </Link>
              <button 
                onClick={scrollToCategories}
                className="premium-btn-outline"
              >
                Explore Collection
              </button>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative h-500px w-full hidden lg:block rounded-2xl overflow-hidden shadow-2xl border-4 border-premium-gold/30">
            <div className="absolute inset-0 bg-forest-green/10 mix-blend-multiply z-10"></div>
            <img src="/Product/PatchWork ToteBag front.png" alt="Premium Eco Tote Bag" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section ref={categoriesRef} className="bg-forest-green text-ivory-white section-padding py-24 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-premium-gold mb-4">Shop by Category</h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto"></div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Designer Tote Bags", img: "/Product/tote 2 front.png" },
            { title: "Yoga Mat Covers", img: "/Product/yoga mat 2 front.png" },
            { title: "Custom Accessories", img: "/Product/laptop front.png" }
          ].map((cat, i) => (
            <motion.div variants={fadeInUp} key={i} className={i === 3 ? 'lg:col-span-2' : ''}>
              <Link to="/products" className="group block relative overflow-hidden rounded-xl h-80">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all z-10"></div>
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-serif text-ivory-white mb-2">{cat.title}</h3>
                  <span className="text-premium-gold font-sans font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">Explore &rarr;</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose RVO */}
      <section className="section-padding py-24 bg-ivory-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-forest-green mb-4">Why Choose RVO</h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <FiFeather />, title: "Recycled Cloth", desc: "Upcycled premium fabric" },
            { icon: <FiCheckCircle />, title: "Premium Stitching", desc: "Built to last long" },
            { icon: <FiBox />, title: "Sustainable Packaging", desc: "Zero plastic involved" },
            { icon: <FiStar />, title: "Made in India", desc: "Supporting local artisans" }
          ].map((feature, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} key={i} className="text-center p-8 bg-white rounded-xl shadow-sm border border-forest-green/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-green/5 text-premium-gold text-2xl mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif text-forest-green mb-3">{feature.title}</h3>
              <p className="text-forest-green/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bestseller Products */}
      <section className="section-padding py-24 bg-forest-green/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-forest-green mb-4">Bestsellers</h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, i) => (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} key={product.id} className="bg-white rounded-xl shadow-md group border border-forest-green/5 overflow-hidden hover:shadow-xl transition-all">
              <Link to={`/product/${product.id}`} className="block">
                <div className="w-full h-72 overflow-hidden bg-gray-50">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-2xl text-forest-green hover:text-premium-gold transition-colors">{product.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <img src="/Product/our story.jpg" alt="Artisan making bag" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 border-8 border-ivory-white rounded-2xl z-10 m-4 pointer-events-none mix-blend-overlay"></div>
          </div>
          <div>
            <h2 className="text-4xl font-serif text-forest-green mb-6">Our Story</h2>
            <div className="w-16 h-1 bg-premium-gold mb-8"></div>
            <p className="text-lg text-forest-green/80 mb-6 leading-relaxed">
              Founded in Mumbai, RVO is a design-driven sustainable brand crafting premium fabric essentials that merge utility, elegance, and environmental responsibility.
            </p>
            <p className="text-lg text-forest-green/80 mb-8 leading-relaxed">
              We believe that eco-conscious choices should never compromise on aesthetics. By upcycling textiles and collaborating with skilled local artisans, we bring you products that tell a story of renewal and heritage.
            </p>
            <Link to="/about" className="premium-btn">
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-forest-green text-ivory-white py-24 text-center">
        <div className="section-padding max-w-3xl border border-premium-gold/30 p-12 rounded-2xl bg-white/5 backdrop-blur-sm">
          <h2 className="text-3xl font-serif mb-4 text-premium-gold">Join the Conscious Community</h2>
          <p className="mb-8 font-sans text-ivory-white/80">Subscribe to receive updates on our latest sustainable collections and exclusive offers.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed successfully!'); }}>
            <input type="email" placeholder="Your email address" className="grow px-6 py-3 rounded-full bg-ivory-white/10 border border-ivory-white/20 focus:outline-none focus:border-premium-gold text-white placeholder-white/50" required />
            <button type="submit" className="px-8 py-3 bg-premium-gold text-forest-green font-semibold rounded-full hover:bg-white transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
