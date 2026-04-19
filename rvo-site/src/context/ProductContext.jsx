import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ProductContext = createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    } else {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  return (
    <ProductContext.Provider value={{ products, loading, getProductById, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
