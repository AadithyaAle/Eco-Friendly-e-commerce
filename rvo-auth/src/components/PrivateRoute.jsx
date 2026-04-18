import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * PrivateRoute — Protects routes that require authentication.
 *
 * If the user is not logged in, they are redirected to /login.
 * The original location is preserved so the user can be redirected
 * back after successful authentication.
 *
 * Shows a premium loading spinner while auth state is resolving.
 */
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Redirect to login, preserving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
