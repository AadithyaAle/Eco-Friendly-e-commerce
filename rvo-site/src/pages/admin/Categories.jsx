import { useState, useEffect } from 'react';
import { getCategories, createCategory, deleteCategory } from '../../services/categories';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState('');

  const fetchCats = async () => {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      await createCategory({ name: newCatName.trim() });
      toast.success('Category added');
      setNewCatName('');
      fetchCats();
    } catch (err) {
      toast.error('Failed to create category. It might already exist.');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      try {
        await deleteCategory(id);
        toast.success('Category deleted');
        fetchCats();
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-forest-green mb-8">Product Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Category Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-serif text-forest-green mb-4">Add New Category</h2>
          <form onSubmit={handleAdd} className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input 
                required 
                type="text" 
                value={newCatName} 
                onChange={(e) => setNewCatName(e.target.value)} 
                placeholder="e.g. Winter Collection"
                className="w-full px-4 py-2 border rounded-md focus:border-premium-gold outline-none" 
              />
            </div>
            <button type="submit" className="premium-btn w-fit py-2 px-4 shadow-sm flex items-center gap-2">
              <FiPlus /> Add Category
            </button>
          </form>
        </div>

        {/* Category List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-serif text-forest-green">Existing Categories</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {loading ? (
              <li className="p-4 text-center text-gray-500">Loading...</li>
            ) : categories.length === 0 ? (
              <li className="p-4 text-center text-gray-500">No categories found.</li>
            ) : categories.map((cat) => (
              <li key={cat.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <span className="font-medium text-gray-800">{cat.name}</span>
                <button onClick={() => handleDelete(cat.id, cat.name)} className="text-red-500 hover:text-red-700 p-2">
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;
