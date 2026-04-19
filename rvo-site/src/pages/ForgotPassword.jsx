import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, data.email);
      toast.success('Password reset link sent! Check your inbox.');
    } catch (error) {
      toast.error('Failed to send reset link. Please check your email or Firebase setup.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding py-24 min-h-[70vh] flex items-center justify-center bg-ivory-white">
      <div className="bg-white p-10 rounded-2xl border border-forest-green/10 shadow-sm w-full max-w-md">
        <h2 className="text-3xl font-serif text-forest-green mb-6 text-center">Reset Password</h2>
        <p className="text-sm text-forest-green/70 mb-6 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-forest-green/80 mb-2">Email Address</label>
            <input 
              type="email" 
              {...register('email', { required: 'Email is required' })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-forest-green/20'} focus:outline-none focus:border-premium-gold`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full premium-btn py-3 disabled:opacity-70"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-forest-green/70">
          Remember your password? <Link to="/login" className="text-premium-gold font-medium hover:text-forest-green transition-colors">Log in here</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
