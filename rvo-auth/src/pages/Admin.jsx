import { Navigate } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="min-h-screen bg-rvo-dark text-white flex items-center justify-center p-6 animate-fade-in">
      <div className="text-center max-w-md w-full">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⚡</span>
        </div>
        <h1 className="font-heading text-3xl font-bold mb-4">Admin Portal</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          This area is restricted. You do not have the required permissions to view this dashboard.
        </p>
        <a 
          href="/dashboard"
          className="inline-flex justify-center px-6 py-3 bg-rvo-green text-white font-medium rounded-xl hover:bg-rvo-green-light transition-colors w-full"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
}
