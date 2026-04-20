import { Routes, Route, Outlet } from 'react-router-dom';
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
import Login from './pages/Login';
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

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen bg-ivory-white selection:bg-premium-gold/30 selection:text-forest-green pt-[90px]">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
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
              {/* === Public Routes Wrapper === */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/about" element={<About />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Client Routes */}
                <Route 
                  path="/profile" 
                  element={<ProtectedRoute><Profile /></ProtectedRoute>} 
                />
                <Route 
                  path="/checkout" 
                  element={<ProtectedRoute><Checkout /></ProtectedRoute>} 
                />
              </Route>

              {/* === Admin Routes Wrapper === */}
              {/* === Admin Routes Wrapper === */}
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
                
                {/* Placeholders for future use */}
                <Route path="orders" element={<div className="p-8">Orders coming soon</div>} />
                <Route path="customers" element={<div className="p-8">Customers coming soon</div>} />
                
                {/* 👇 CHANGE THIS LINE 👇 */}
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
