import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-32 px-6 text-center animate-fade-in-up bg-white">
      <div className="w-24 h-24 bg-rvo-green/10 rounded-3xl flex items-center justify-center text-rvo-green font-heading font-bold text-4xl mb-8 rotate-12">
        404
      </div>
      
      <h1 className="font-heading text-4xl font-bold text-rvo-dark mb-4">
        Page Not Found
      </h1>
      
      <p className="text-rvo-dark-light max-w-md mx-auto mb-10 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link to="/home" className="btn-primary inline-flex items-center justify-center gap-2 w-auto px-8">
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
