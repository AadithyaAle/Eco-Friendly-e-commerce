import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/routes';
import ScrollToTop from './components/ScrollToTop';

/**
 * App — Root component with global providers and centralized routing.
 */
export default function App() {
  return (
    <Router>
      {/* Instantly scroll to top on every route change */}
      <ScrollToTop />
      
      <AuthProvider>
        {/* Crisp global toast configuration */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: 'toast-custom',
            style: {
              background: '#fff',
              color: '#1F1F1F',
              border: '1px solid #E0DDD5',
              padding: '12px 16px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              fontFamily: "'Inter', sans-serif"
            },
            success: {
              iconTheme: {
                primary: '#3D6B35',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#DC3545',
                secondary: '#fff',
              },
            },
          }}
        />

        {/* Render all application routes */}
        <AppRoutes />

      </AuthProvider>
    </Router>
  );
}
