import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const AdminRoute = ({ children }) => {
  const { currentUser, userProfile } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    if (currentUser === null || userProfile === undefined || userProfile === null) {
      // Waiting for auth to load or not logged in yet
      if (currentUser === false) { // Assuming false means done loading and no user
         setIsAuthorized(false);
      }
      return;
    }

    if (userProfile?.role === 'admin') {
      setIsAuthorized(true);
    } else {
      toast.error('Access Denied: Admins Only');
      setIsAuthorized(false);
    }
  }, [currentUser, userProfile]);

  if (currentUser === null || isAuthorized === null) {
    return <div className="min-h-screen flex items-center justify-center text-forest-green font-serif">Loading Admin...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return isAuthorized ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
