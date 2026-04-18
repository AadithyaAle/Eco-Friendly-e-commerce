import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * MainLayout — Standard layout for most public pages.
 * Includes global Navbar, content area (Outlet), and Footer.
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-eco-canvas selection:bg-eco-sage-light selection:text-eco-charcoal">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        {/* pt-20 offsets the fixed sticky navbar safely */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
