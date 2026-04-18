import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineUser,
  HiOutlinePhone,
} from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';

/**
 * Register Page — Premium sign-up form with comprehensive validation.
 */
export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  function handleChange(field) {
    return (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };
  }

  // Password strength indicators
  const passwordChecks = {
    minLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    matches: formData.password && formData.confirmPassword && formData.password === formData.confirmPassword,
  };

  function validate() {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';

    if (formData.phone && !/^\+?[\d\s\-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    else {
      if (!passwordChecks.minLength) newErrors.password = 'Password must be at least 8 characters';
      else if (!passwordChecks.hasUppercase) newErrors.password = 'Password must contain an uppercase letter';
      else if (!passwordChecks.hasNumber) newErrors.password = 'Password must contain a number';
    }

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!agreeTerms) newErrors.terms = 'You must agree to the Terms & Privacy Policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData.fullName);
      toast.success('Account created! Please check your email for verification. 🌿');
      navigate('/login');
    } catch (err) {
      const errorMessages = {
        'auth/email-already-in-use': 'An account with this email already exists',
        'auth/invalid-email': 'Invalid email address',
        'auth/weak-password': 'Password is too weak',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled',
      };
      toast.error(errorMessages[err.code] || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignUp() {
    setLoading(true);
    try {
      await googleLogin();
      toast.success('Welcome to RVO! 🌿');
      navigate('/');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        toast.error('Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  function PasswordCheck({ passed, label }) {
    return (
      <div className={`flex items-center gap-2 text-xs transition-colors ${passed ? 'text-rvo-green' : 'text-gray-400'}`}>
        {passed ? (
          <HiOutlineCheck className="w-3.5 h-3.5" />
        ) : (
          <HiOutlineX className="w-3.5 h-3.5" />
        )}
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" id="register-page">
      {/* ======================= LEFT SIDE — Hero Image ======================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/auth-hero.png"
          alt="Premium fabric products"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rvo-green via-rvo-brown to-rvo-green" />

        <div className="relative z-10 flex flex-col justify-end p-12 pb-16 w-full">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-rvo-green animate-pulse-ring" />
              <span className="text-white/90 text-xs font-medium tracking-widest uppercase">
                Join the Movement
              </span>
            </div>

            <h1 className="font-heading text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
              Start Your Journey
            </h1>

            <p className="text-white/80 text-lg max-w-md leading-relaxed">
              Join thousands of conscious shoppers making a difference with every purchase.
            </p>

            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/15">
              <div className="text-center">
                <p className="text-white font-heading text-2xl font-bold">♻️</p>
                <p className="text-white/60 text-xs tracking-wide mt-1">Sustainable</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-white font-heading text-2xl font-bold">🌱</p>
                <p className="text-white/60 text-xs tracking-wide mt-1">Eco-Friendly</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-white font-heading text-2xl font-bold">🤝</p>
                <p className="text-white/60 text-xs tracking-wide mt-1">Fair Trade</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= RIGHT SIDE — Register Form ======================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-rvo-cream overflow-auto">
        <div className="w-full max-w-md py-4">
          {/* Brand Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <Link to="/" className="inline-block mb-5">
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
              Create Account
            </h1>
            <p className="text-sm text-rvo-dark-light">
              Join the sustainable fashion community
            </p>
          </div>

          {/* Auth Card */}
          <div className="auth-card animate-fade-in-up stagger-2" style={{ opacity: 0 }}>
            <form onSubmit={handleSubmit} className="space-y-4" id="register-form" noValidate>
              {/* Full Name */}
              <div>
                <label htmlFor="register-name" className="block text-sm font-medium text-rvo-dark mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="register-name"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange('fullName')}
                    placeholder="John Doe"
                    className={`auth-input pl-11 ${errors.fullName ? 'error' : ''}`}
                    autoComplete="name"
                    disabled={loading}
                  />
                </div>
                {errors.fullName && <p className="text-rvo-error text-xs mt-1.5 ml-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="register-email" className="block text-sm font-medium text-rvo-dark mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="register-email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="you@example.com"
                    className={`auth-input pl-11 ${errors.email ? 'error' : ''}`}
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                {errors.email && <p className="text-rvo-error text-xs mt-1.5 ml-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="register-phone" className="block text-sm font-medium text-rvo-dark mb-2">
                  Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <HiOutlinePhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="register-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    placeholder="+91 98765 43210"
                    className={`auth-input pl-11 ${errors.phone ? 'error' : ''}`}
                    autoComplete="tel"
                    disabled={loading}
                  />
                </div>
                {errors.phone && <p className="text-rvo-error text-xs mt-1.5 ml-1">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="register-password" className="block text-sm font-medium text-rvo-dark mb-2">
                  Password
                </label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange('password')}
                    placeholder="min. 8 characters"
                    className={`auth-input pl-11 pr-11 ${errors.password ? 'error' : ''}`}
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rvo-dark transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    id="register-toggle-password"
                  >
                    {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-rvo-error text-xs mt-1.5 ml-1">{errors.password}</p>}

                {/* Password Strength Indicators */}
                {formData.password && (
                  <div className="grid grid-cols-2 gap-1.5 mt-3">
                    <PasswordCheck passed={passwordChecks.minLength} label="Min. 8 characters" />
                    <PasswordCheck passed={passwordChecks.hasUppercase} label="Uppercase letter" />
                    <PasswordCheck passed={passwordChecks.hasNumber} label="Contains number" />
                    <PasswordCheck passed={passwordChecks.matches} label="Passwords match" />
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="register-confirm-password" className="block text-sm font-medium text-rvo-dark mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    placeholder="Re-enter your password"
                    className={`auth-input pl-11 pr-11 ${errors.confirmPassword ? 'error' : ''}`}
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rvo-dark transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    id="register-toggle-confirm-password"
                  >
                    {showConfirmPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-rvo-error text-xs mt-1.5 ml-1">{errors.confirmPassword}</p>}
              </div>

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group" id="terms-label">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => { setAgreeTerms(e.target.checked); setErrors((p) => ({ ...p, terms: '' })); }}
                      className="sr-only peer"
                      id="agree-terms"
                    />
                    <div className="w-4.5 h-4.5 border-1.5 border-gray-300 rounded-md peer-checked:bg-rvo-green peer-checked:border-rvo-green transition-all flex items-center justify-center group-hover:border-rvo-green/50">
                      {agreeTerms && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-rvo-dark-light leading-snug">
                    I agree to the{' '}
                    <a href="#" className="text-rvo-green font-medium hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-rvo-green font-medium hover:underline">Privacy Policy</a>
                  </span>
                </label>
                {errors.terms && <p className="text-rvo-error text-xs mt-1.5 ml-1">{errors.terms}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary mt-2"
                disabled={loading}
                id="register-submit-btn"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin-slow w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google Sign Up */}
            <button
              onClick={handleGoogleSignUp}
              className="btn-google"
              disabled={loading}
              id="google-register-btn"
            >
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-rvo-dark-light mt-8 animate-fade-in-up stagger-3" style={{ opacity: 0 }}>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-rvo-green hover:text-rvo-green-dark transition-colors"
              id="login-link"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
