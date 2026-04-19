import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';
import { createProduct } from '../../services/adminProducts';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createProduct(formData);
      toast.success('Product created successfully!');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.message || 'Error creating product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-forest-green mb-8">Add New Product</h1>
      <div className="max-w-5xl">
        <ProductForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </div>
  );
};

export default AddProduct;
