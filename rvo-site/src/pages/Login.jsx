import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      toast.success('Successfully logged in!');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to login. Please check credentials or Firebase setup.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding py-24 min-h-[70vh] flex items-center justify-center bg-ivory-white">
      <div className="bg-white p-10 rounded-2xl border border-forest-green/10 shadow-sm w-full max-w-md">
        <h2 className="text-3xl font-serif text-forest-green mb-6 text-center">Welcome Back</h2>
        
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

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-forest-green/80">Password</label>
              <Link to="/forgot-password" className="text-xs text-premium-gold hover:text-forest-green transition-colors">Forgot Password?</Link>
            </div>
            <input 
              type="password" 
              {...register('password', { required: 'Password is required' })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-400' : 'border-forest-green/20'} focus:outline-none focus:border-premium-gold`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full premium-btn py-3 disabled:opacity-70"
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-forest-green/70">
          Don't have an account? <Link to="/signup" className="text-premium-gold font-medium hover:text-forest-green transition-colors">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
