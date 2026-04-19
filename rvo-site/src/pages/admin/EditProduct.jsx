import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';
import { updateProduct } from '../../services/adminProducts';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setInitialData(data);
      } catch (err) {
        toast.error('Failed to load product details.');
        navigate('/admin/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      await updateProduct(id, formData);
      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.message || 'Error updating product.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-forest-green">Loading product details...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif text-forest-green mb-8">Edit Product &ldquo;{initialData?.name}&rdquo;</h1>
      <div className="max-w-5xl">
        <ProductForm initialData={initialData} onSubmit={handleSubmit} isLoading={saving} />
      </div>
    </div>
  );
};

export default EditProduct;
