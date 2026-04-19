import { useState, useEffect } from 'react';
import { uploadProductImage } from '../../services/adminProducts';
import { getCategories } from '../../services/categories';
import toast from 'react-hot-toast';

const INITIAL_STATE = {
  name: '',
  slug: '',
  sku: '',
  category: '',
  short_description: '',
  full_description: '',
  price: '',
  discount_price: '',
  stock: 0,
  dimensions: '',
  weight: '',
  material: '',
  care_instructions: '',
  color: '',
  eco_score: '',
  featured: false,
  best_seller: false,
  active: true,
  image: '',
  gallery: [],
};

const ProductForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [categories, setCategories] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...INITIAL_STATE,
        ...initialData,
        gallery: initialData.gallery || [],
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === 'name' && !initialData) {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      setFormData((prev) => ({
        ...prev,
        name: value,
        slug,
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);

      const imageUrl = await uploadProductImage(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      toast.success('Main image uploaded');
    } catch (error) {
      console.error(error);
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      setUploadingImage(true);

      const uploadedUrls = [];

      for (const file of files) {
        const url = await uploadProductImage(file);
        uploadedUrls.push(url);
      }

      setFormData((prev) => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...uploadedUrls],
      }));

      toast.success('Gallery images uploaded');
    } catch (error) {
      console.error(error);
      toast.error('Gallery upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,

      name: formData.name.trim(),
      slug: formData.slug.trim(),

      price: formData.price === '' ? 0 : Number(formData.price),

      discount_price:
        formData.discount_price === ''
          ? null
          : Number(formData.discount_price),

      stock: formData.stock === '' ? 0 : Number(formData.stock),

      sku: formData.sku || null,
      category: formData.category || null,
      short_description: formData.short_description || null,
      full_description: formData.full_description || null,
      dimensions: formData.dimensions || null,
      weight: formData.weight || null,
      material: formData.material || null,
      care_instructions: formData.care_instructions || null,
      color: formData.color || null,
      eco_score: formData.eco_score || null,
      image: formData.image || null,
      gallery: formData.gallery || [],
    };

    onSubmit(cleanedData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8"
    >
      {/* 1. Basic Info */}
      <div>
        <h3 className="text-xl font-serif text-forest-green mb-4 border-b pb-2">
          Basic Info
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            required
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            required
            type="text"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={formData.sku || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <select
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-white"
          >
            <option value="">Select Category...</option>

            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Pricing */}
      <div>
        <h3 className="text-xl font-serif text-forest-green mb-4 border-b pb-2">
          Pricing & Inventory
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input
            required
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="number"
            step="0.01"
            name="discount_price"
            placeholder="Discount Price"
            value={formData.discount_price || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            required
            type="number"
            min="0"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* 3. Descriptions */}
      <div>
        <h3 className="text-xl font-serif text-forest-green mb-4 border-b pb-2">
          Product Details
        </h3>

        <textarea
          rows="2"
          name="short_description"
          placeholder="Short Description"
          value={formData.short_description || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md mb-4"
        />

        <textarea
          rows="4"
          name="full_description"
          placeholder="Full Description"
          value={formData.full_description || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* 4. Product Details */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="material"
            placeholder="Material"
            value={formData.material || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            name="dimensions"
            placeholder="Dimensions"
            value={formData.dimensions || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            name="weight"
            placeholder="Weight"
            value={formData.weight || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <textarea
          rows="2"
          name="care_instructions"
          placeholder="Care Instructions"
          value={formData.care_instructions || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md mt-4"
        />
      </div>

      {/* 5. Eco + Images */}
      <div>
        <h3 className="text-xl font-serif text-forest-green mb-4 border-b pb-2">
          Eco Impact & Images
        </h3>

        <input
          type="text"
          name="eco_score"
          placeholder="Eco Score / Impact"
          value={formData.eco_score || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md mb-4"
        />

        {/* Main Image */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Main"
            className="w-24 h-24 object-cover border rounded-md mb-3"
          />
        )}

        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md mb-3"
        />

        <label className="inline-block cursor-pointer bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition">
          {uploadingImage ? 'Uploading...' : 'Upload Main Image'}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Gallery */}
        <div className="mt-6">
          <p className="font-medium mb-3">Gallery Images</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {(formData.gallery || []).map((img, index) => (
              <div
                key={index}
                className="relative border rounded-md overflow-hidden"
              >
                <img
                  src={img}
                  alt="Gallery"
                  className="w-full h-24 object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <label className="inline-block cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
            Upload Gallery Images

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 6. Flags */}
      <div className="flex gap-6 flex-wrap">
        <label>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />{' '}
          Active
        </label>

        <label>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />{' '}
          Featured
        </label>

        <label>
          <input
            type="checkbox"
            name="best_seller"
            checked={formData.best_seller}
            onChange={handleChange}
          />{' '}
          Bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || uploadingImage}
        className="bg-green-700 text-white px-8 py-3 rounded-md"
      >
        {isLoading ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  );
};

export default ProductForm;