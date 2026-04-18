import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';

/**
 * Login Page — Split-screen premium layout.
 *
 * LEFT:  Lifestyle hero image with overlay text
 * RIGHT: Auth card with email/password, Google login, remember me
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect back to intended page after login
  const from = location.state?.from?.pathname || '/';

  function validate() {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! 🌿');
      navigate(from, { replace: true });
    } catch (err) {
      const errorMessages = {
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/invalid-credential': 'Invalid email or password',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
        'auth/user-disabled': 'This account has been disabled',
        'auth/invalid-email': 'Invalid email address',
      };
      toast.error(errorMessages[err.code] || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    try {
      await googleLogin();
      toast.success('Welcome! 🌿');
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        toast.error('Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex" id="login-page">
      {/* ======================= LEFT SIDE — Hero Image ======================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <img
          src="/auth-hero.png"
          alt="Premium fabric products"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rvo-green via-rvo-brown to-rvo-green" />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16 w-full">
          <div className="animate-fade-in-up">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-rvo-green animate-pulse-ring" />
              <span className="text-white/90 text-xs font-medium tracking-widest uppercase">
                Sustainable Living
              </span>
            </div>

            <h1 className="font-heading text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
              Welcome Back
            </h1>

            <p className="text-white/80 text-lg max-w-md leading-relaxed">
              Sign in to continue your conscious shopping journey.
            </p>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/15">
              <div className="text-center">
                <p className="text-white font-heading text-2xl font-bold">5K+</p>
                <p className="text-white/60 text-xs tracking-wide">Happy Customers</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-white font-heading text-2xl font-bold">100%</p>
                <p className="text-white/60 text-xs tracking-wide">Eco-Friendly</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-white font-heading text-2xl font-bold">50+</p>
                <p className="text-white/60 text-xs tracking-wide">Artisan Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= RIGHT SIDE — Login Form ======================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-rvo-cream">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rvo-green flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-lg">R</span>
                </div>
                <div className="text-left">
                  <h2 className="font-heading text-xl font-bold text-rvo-dark leading-none">RVO</h2>
                  <p className="text-[10px] text-rvo-brown font-medium tracking-[0.2em] uppercase">Fabric Essentials</p>
                </div>
              </div>
            </Link>
            <h1 className="font-heading text-3xl font-bold text-rvo-dark mb-2">
              Sign In
            </h1>
            <p className="text-sm text-rvo-dark-light">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Auth Card */}
          <div className="auth-card animate-fade-in-up stagger-2" style={{ opacity: 0 }}>
            <form onSubmit={handleSubmit} className="space-y-5" id="login-form" noValidate>
              {/* Email Field */}
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-rvo-dark mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                    placeholder="you@example.com"
                    className={`auth-input pl-11 ${errors.email ? 'error' : ''}`}
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-rvo-error text-xs mt-1.5 ml-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-rvo-dark mb-2">
                  Password
                </label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
                    placeholder="••••••••"
                    className={`auth-input pl-11 pr-11 ${errors.password ? 'error' : ''}`}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rvo-dark transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    id="login-toggle-password"
                  >
                    {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-rvo-error text-xs mt-1.5 ml-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer group" id="remember-me-label">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only peer"
                      id="remember-me"
                    />
                    <div className="w-4.5 h-4.5 border-1.5 border-gray-300 rounded-md peer-checked:bg-rvo-green peer-checked:border-rvo-green transition-all flex items-center justify-center group-hover:border-rvo-green/50">
                      {rememberMe && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-rvo-dark-light">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-rvo-green hover:text-rvo-green-dark transition-colors"
                  id="forgot-password-link"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary mt-2"
                disabled={loading}
                id="login-submit-btn"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin-slow w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              className="btn-google"
              disabled={loading}
              id="google-login-btn"
            >
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-rvo-dark-light mt-8 animate-fade-in-up stagger-3" style={{ opacity: 0 }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-rvo-green hover:text-rvo-green-dark transition-colors"
              id="create-account-link"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
