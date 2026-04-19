import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signup(data.email, data.password, data.fullName);
      toast.success('Account created successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to create account. Check Firebase setup or connection.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding py-24 min-h-[70vh] flex items-center justify-center bg-ivory-white">
      <div className="bg-white p-10 rounded-2xl border border-forest-green/10 shadow-sm w-full max-w-md">
        <h2 className="text-3xl font-serif text-forest-green mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-green/80 mb-2">Full Name</label>
            <input 
              type="text" 
              {...register('fullName', { required: 'Full name is required' })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-400' : 'border-forest-green/20'} focus:outline-none focus:border-premium-gold`}
              placeholder="Jane Doe"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-forest-green/80 mb-2">Email Address</label>
            <input 
              type="email" 
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-forest-green/20'} focus:outline-none focus:border-premium-gold`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-forest-green/80 mb-2">Password</label>
            <input 
              type="password" 
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
              })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-400' : 'border-forest-green/20'} focus:outline-none focus:border-premium-gold`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-forest-green/80 mb-2">Confirm Password</label>
            <input 
              type="password" 
              {...register('confirmPassword', { 
                required: 'Please confirm password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-400' : 'border-forest-green/20'} focus:outline-none focus:border-premium-gold`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full premium-btn py-3 mt-4 disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-forest-green/70">
          Already have an account? <Link to="/login" className="text-premium-gold font-medium hover:text-forest-green transition-colors">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
