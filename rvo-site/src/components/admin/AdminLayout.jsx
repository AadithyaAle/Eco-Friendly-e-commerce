import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-ivory-white font-sans selection:bg-premium-gold/30 selection:text-forest-green">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 md:pt-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
