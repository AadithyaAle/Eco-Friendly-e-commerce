import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out!');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out.');
    }
  };

  return (
    <div className="section-padding py-24 min-h-screen bg-ivory-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-forest-green/10 shadow-sm mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif text-forest-green mb-2">
              Welcome, {currentUser?.displayName || 'Eco-Warrior'}
            </h1>
            <p className="text-forest-green/70">{currentUser?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-2 border border-red-400 text-red-500 rounded-full hover:bg-red-50 transition-colors"
          >
            Log Out
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-forest-green/10 shadow-sm">
            <h2 className="text-xl font-serif text-forest-green mb-6 border-b border-gray-100 pb-4">Order History</h2>
            <div className="text-center py-10 text-forest-green/60">
              <p>No orders yet.</p>
              <button 
                onClick={() => navigate('/products')}
                className="mt-4 text-premium-gold hover:text-forest-green font-medium"
              >
                Start Shopping
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-forest-green/10 shadow-sm">
            <h2 className="text-xl font-serif text-forest-green mb-6 border-b border-gray-100 pb-4">Saved Addresses</h2>
            <div className="text-center py-10 text-forest-green/60">
              <p>No saved addresses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
