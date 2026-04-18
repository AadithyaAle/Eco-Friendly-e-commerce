import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

// Auth Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';

// Protected Pages
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Wishlist from '../pages/Wishlist';
import Account from '../pages/Account';
import Orders from '../pages/Orders';

// Admin Pages
import Admin from '../pages/Admin';

/**
 * AppRoutes — Centralized routing configuration.
 */
export default function AppRoutes() {
  return (
    <Routes>
      
      {/* ======================================= */}
      {/* MAIN PUBLIC LAYOUT (Navbar + Footer)    */}
      {/* ======================================= */}
      <Route element={<MainLayout />}>
        {/* Core Public Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Core Protected Routes (No Sidebar) */}
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        
        {/* Protected Dashboard Routes (With Sidebar) */}
        <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route path="/dashboard" element={<Navigate to="/account" replace />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>

        {/* Global 404 inside MainLayout for consistent UI */}
        <Route path="*" element={<NotFound />} />
      </Route>


      {/* ======================================= */}
      {/* AUTH LAYOUT (Minimal)                   */}
      {/* ======================================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      </Route>


      {/* ======================================= */}
      {/* ADMIN LAYOUT (Future)                   */}
      {/* ======================================= */}
      <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      
    </Routes>
  );
}
