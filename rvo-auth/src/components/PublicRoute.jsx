import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * PublicRoute — Prevents authenticated users from accessing auth pages.
 * If user is logged in, they are redirected to /home.
 */
export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    // If accessing login/register while logged in, go to home
    // fallback to location.state?.from if returning from a specific redirect chain
    const destination = location.state?.from?.pathname || '/home';
    return <Navigate to={destination} replace />;
  }

  return children;
}
