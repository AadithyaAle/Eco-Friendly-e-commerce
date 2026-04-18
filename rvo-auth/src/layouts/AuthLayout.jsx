import { Outlet } from 'react-router-dom';

/**
 * AuthLayout — Minimal wrapper for authentication pages.
 * Ensures the screen is filled and no global navigation interferes.
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-eco-canvas flex flex-col">
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
