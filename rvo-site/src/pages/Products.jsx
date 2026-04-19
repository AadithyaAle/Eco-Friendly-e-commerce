import { useState } from 'react';
import { FiFilter, FiHeart, FiShoppingBag, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CATEGORIES = ['Tote Bags', 'Yoga Covers', 'Bottle Covers', 'Accessories'];

const ALL_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Eco-Friendly ${['Tote', 'Yoga Bag', 'Bottle Cover', 'Accessory'][i % 4]} ${i + 1}`,
  category: CATEGORIES[i % 4],
  price: 500 + (i * 350),
  image: `https://images.unsplash.com/photo-1544816155-12df9643f36${i % 10}?auto=format&fit=crop&w=400&q=80`,
}));

const Products = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [maxPrice, setMaxPrice] = useState(5000);

  const handleCategoryChange = (cat) => {
    if (cat === 'All') return setSelectedCategories(['All']);

    let newCats = selectedCategories.filter(c => c !== 'All');

    if (newCats.includes(cat)) {
      newCats = newCats.filter(c => c !== cat);
      if (newCats.length === 0) newCats = ['All'];
    } else {
      newCats.push(cat);
    }

    setSelectedCategories(newCats);
  };

  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const categoryMatch =
      selectedCategories.includes('All') ||
      selectedCategories.includes(product.category);

    const priceMatch = product.price <= maxPrice;

    return categoryMatch && priceMatch;
  });

  return (
    <div className="section-padding py-24 bg-ivory-white min-h-screen">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-serif text-forest-green">Our Collection</h1>

        <button
          className="flex items-center space-x-2 px-4 py-2 border rounded-full"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter /> <span>Filters</span>
        </button>
      </div>

      <div className="flex gap-10">
        {/* Filters */}
        <div className={`w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <h3 className="mb-4 font-semibold">Category</h3>

          {['All', ...CATEGORIES].map(cat => (
            <label key={cat} className="block mb-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              <span className="ml-2">{cat}</span>
            </label>
          ))}

          <h3 className="mt-6 mb-2 font-semibold">Max Price: ₹{maxPrice}</h3>

          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          />
        </div>

        {/* Products */}
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;