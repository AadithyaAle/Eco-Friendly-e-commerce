import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Grouped Form State for scalability
  const [formData, setFormData] = useState({
    general: {
      storeName: 'RVO Fabric Essentials',
      contactEmail: currentUser?.email || 'admin@rvofabrics.com',
      phone: '+91 98765 43210',
      address: '123 Silk Board Layout, Bengaluru, Karnataka 560068',
    },
    shipping: {
      standardFee: '99',
      freeThreshold: '999',
      enableCod: true,
    },
    payments: {
      testMode: true,
      currency: 'INR',
    }
  });

  const handleGeneralChange = (e) => {
    setFormData({
      ...formData,
      general: { ...formData.general, [e.target.name]: e.target.value }
    });
  };

  const handleShippingChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      shipping: { ...formData.shipping, [e.target.name]: value }
    });
  };

  const handlePaymentsChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      payments: { ...formData.payments, [e.target.name]: value }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate database save
    setTimeout(() => {
      toast.success('Settings updated successfully!');
      setIsSaving(false);
    }, 800);
  };

  // Sidebar Menu Items
  const menuItems = [
    { id: 'general', label: 'General Details', icon: '🏪' },
    { id: 'payments', label: 'Payments & Checkout', icon: '💳' },
    { id: 'shipping', label: 'Shipping & Delivery', icon: '🚚' },
    { id: 'taxes', label: 'Taxes & Duties', icon: '📊' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'legal', label: 'Legal & Policies', icon: '⚖️' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-forest-green">Store Settings</h1>
        <p className="text-gray-500 mt-2">Manage your e-commerce configurations and business rules.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* LEFT: VERTICAL SIDEBAR */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === item.id
                    ? 'bg-forest-green text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-forest-green'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* RIGHT: SETTINGS CONTENT */}
        <div className="flex-grow bg-white rounded-2xl shadow-sm border overflow-hidden min-h-[500px]">
          <form onSubmit={handleSave} className="p-8">
            
            {/* --- GENERAL TAB --- */}
            {activeTab === 'general' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-serif text-forest-green border-b pb-4 mb-6">General Store Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                    <input
                      type="text"
                      name="storeName"
                      value={formData.general.storeName}
                      onChange={handleGeneralChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.general.contactEmail}
                      onChange={handleGeneralChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.general.phone}
                      onChange={handleGeneralChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                    <textarea
                      name="address"
                      value={formData.general.address}
                      onChange={handleGeneralChange}
                      rows="3"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-forest-green focus:ring-1 focus:ring-forest-green outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- PAYMENTS TAB --- */}
            {activeTab === 'payments' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-serif text-forest-green border-b pb-4 mb-6">Payments & Checkout</h2>
                
                <div className="bg-gray-50 p-6 rounded-xl border mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Razorpay Gateway</h3>
                      <p className="text-sm text-gray-500">Currently active and processing payments.</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">ACTIVE</span>
                  </div>
                  
                  <label className="flex items-center gap-3 cursor-pointer mt-4 border-t pt-4">
                    <input
                      type="checkbox"
                      name="testMode"
                      checked={formData.payments.testMode}
                      onChange={handlePaymentsChange}
                      className="w-5 h-5 text-forest-green rounded border-gray-300 focus:ring-forest-green"
                    />
                    <span className="text-sm text-gray-700 font-medium">Enable Test Mode (Sandbox)</span>
                  </label>
                  <p className="text-xs text-gray-500 ml-8 mt-1">Check this to simulate transactions without real money.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Store Currency</label>
                  <select
                    name="currency"
                    value={formData.payments.currency}
                    onChange={handlePaymentsChange}
                    className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:border-forest-green outline-none"
                  >
                    <option value="INR">INR (₹) - Indian Rupee</option>
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                  </select>
                </div>
              </div>
            )}

            {/* --- SHIPPING TAB --- */}
            {activeTab === 'shipping' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-serif text-forest-green border-b pb-4 mb-6">Shipping & Delivery</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Standard Shipping Fee (₹)</label>
                    <input
                      type="number"
                      name="standardFee"
                      value={formData.shipping.standardFee}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-forest-green outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold (₹)</label>
                    <input
                      type="number"
                      name="freeThreshold"
                      value={formData.shipping.freeThreshold}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-forest-green outline-none"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">Orders above this amount qualify for free shipping.</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableCod"
                      checked={formData.shipping.enableCod}
                      onChange={handleShippingChange}
                      className="w-5 h-5 text-forest-green rounded border-gray-300 focus:ring-forest-green"
                    />
                    <span className="text-sm text-gray-900 font-medium">Enable Cash on Delivery (COD)</span>
                  </label>
                  <p className="text-xs text-gray-500 ml-8 mt-1">Allow customers to pay when the package arrives.</p>
                </div>
              </div>
            )}

            {/* PLACEHOLDER FOR UNFINISHED TABS */}
            {['taxes', 'notifications', 'legal'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-64 text-center animate-fade-in">
                <span className="text-4xl mb-4">🚧</span>
                <h3 className="text-lg font-medium text-gray-900">Under Construction</h3>
                <p className="text-gray-500">This settings module will be available in the next update.</p>
              </div>
            )}

            {/* ACTION BUTTON (Always visible at the bottom) */}
            <div className="mt-10 pt-6 border-t flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="premium-btn px-8 py-2 rounded-lg bg-forest-green text-white hover:bg-forest-green/90 transition-colors disabled:opacity-70 font-medium"
              >
                {isSaving ? 'Saving...' : 'Save All Changes'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;