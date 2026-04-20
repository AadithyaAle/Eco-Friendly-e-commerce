import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

// Contexts
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Public Layout & Protection
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Policies from './pages/Policies';
import Login from './pages/Login';

// Auth Routes
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';

// Admin Layout & Protection
import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './components/admin/AdminRoute';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import Categories from './pages/admin/Categories';
import AdminAnalytics from './pages/admin/Analytics';
import AdminOrders from './pages/admin/Orders';

import { FaTelegram } from 'react-icons/fa';

// ✅ SINGLE ScrollToTop (fixed)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// ✅ CLEAN merged layout (fixed)
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen bg-ivory-white selection:bg-premium-gold/30 selection:text-forest-green pt-[90px] relative">
    <ScrollToTop />
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
    
    <a 
      href="https://t.me/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#0088cc] hover:bg-[#0077b5] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex items-center justify-center"
      aria-label="Contact us on Telegram"
    >
      <FaTelegram className="text-3xl" />
      <span className="absolute right-full mr-4 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Chat with Support
      </span>
    </a>
  </div>
);

function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            
            <Toaster 
              position="bottom-right" 
              toastOptions={{
                style: {
                  background: '#1F4D36',
                  color: '#FAF9F6',
                  border: '1px solid #C8A96B'
                }
              }} 
            />

            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/policies" element={<Policies />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route 
                  path="/profile" 
                  element={<ProtectedRoute><Profile /></ProtectedRoute>} 
                />
                <Route 
                  path="/checkout" 
                  element={<ProtectedRoute><Checkout /></ProtectedRoute>} 
                />
              </Route>

              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AddProduct />} />
                <Route path="products/edit/:id" element={<EditProduct />} />
                <Route path="categories" element={<Categories />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="customers" element={<div className="p-8">Customers coming soon</div>} />
                <Route path="analytics" element={<AdminAnalytics />} /> 
                <Route path="settings" element={<div className="p-8">Settings coming soon</div>} />
              </Route>
            </Routes>

          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
  );
}

export default App;