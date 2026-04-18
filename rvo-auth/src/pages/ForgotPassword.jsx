import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineArrowLeft } from 'react-icons/hi';

/**
 * Forgot Password Page — Elegant card with email input and success state.
 */
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await resetPassword(email);
      setEmailSent(true);
      toast.success('Password reset email sent!');
    } catch (err) {
      const errorMessages = {
        'auth/user-not-found': 'No account found with this email',
        'auth/invalid-email': 'Invalid email address',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
      };
      toast.error(errorMessages[err.code] || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-rvo-cream p-6" id="forgot-password-page">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rvo-green/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rvo-brown/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rvo-green/3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Login */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-rvo-dark-light hover:text-rvo-green transition-colors mb-8 group animate-fade-in"
          id="back-to-login"
        >
          <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Sign In
        </Link>

        {/* Brand */}
        <div className="text-center mb-8 animate-fade-in-up">
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
        </div>

        {/* Card */}
        <div className="auth-card animate-fade-in-up stagger-2" style={{ opacity: 0 }}>
          {!emailSent ? (
            <>
              {/* Reset Form State */}
              <div className="text-center mb-8">
                {/* Icon */}
                <div className="w-16 h-16 bg-rvo-green/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <HiOutlineLockIcon className="w-8 h-8 text-rvo-green" />
                </div>

                <h1 className="font-heading text-2xl font-bold text-rvo-dark mb-2">
                  Forgot Password?
                </h1>
                <p className="text-sm text-rvo-dark-light leading-relaxed">
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" id="forgot-password-form" noValidate>
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-rvo-dark mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="you@example.com"
                      className={`auth-input pl-11 ${error ? 'error' : ''}`}
                      autoComplete="email"
                      autoFocus
                      disabled={loading}
                    />
                  </div>
                  {error && <p className="text-rvo-error text-xs mt-1.5 ml-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  id="send-reset-btn"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin-slow w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center py-4">
                {/* Animated Checkmark */}
                <div className="w-20 h-20 bg-rvo-green/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
                  <div className="w-14 h-14 bg-rvo-green rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <h2 className="font-heading text-2xl font-bold text-rvo-dark mb-3">
                  Check Your Email
                </h2>
                <p className="text-sm text-rvo-dark-light leading-relaxed mb-2">
                  Password reset email sent to
                </p>
                <p className="text-sm font-semibold text-rvo-green mb-6">
                  {email}
                </p>
                <p className="text-xs text-gray-400 mb-8">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => { setEmailSent(false); setEmail(''); }}
                    className="text-rvo-green font-medium hover:underline"
                    id="try-again-btn"
                  >
                    try again
                  </button>
                </p>

                <Link
                  to="/login"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                  id="return-to-login-btn"
                >
                  <HiOutlineArrowLeft className="w-4 h-4" />
                  Return to Sign In
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Create Account Link */}
        <p className="text-center text-sm text-rvo-dark-light mt-8 animate-fade-in-up stagger-3" style={{ opacity: 0 }}>
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-rvo-green hover:text-rvo-green-dark transition-colors"
            id="create-account-link-forgot"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

/**
 * Custom lock icon since we need a specific one for the forgot password header.
 */
function HiOutlineLockIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}
