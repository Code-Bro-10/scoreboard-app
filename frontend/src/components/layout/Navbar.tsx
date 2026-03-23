import { Activity, Menu, Bell, Search, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/10 px-4 md:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Menu className="w-5 h-5 md:hidden text-gray-400" />
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <Activity className="w-6 h-6 text-neon-green" />
          <span>Cric<span className="text-neon-green">Live</span></span>
        </Link>
        
        <div className="hidden md:flex ml-8 gap-6 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-white text-white border-b-2 border-neon-green pb-5 pt-5 transition-colors">Live</Link>
          <a href="#" className="hover:text-white py-5 transition-colors">Upcoming</a>
          <a href="#" className="hover:text-white py-5 transition-colors">Results</a>
          <a href="#" className="hover:text-white py-5 transition-colors">Teams</a>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="hidden md:block text-sm text-gray-300 mr-2">
              Hi, <span className="text-white font-semibold">{user.name.split(' ')[0]}</span>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-neon-red rounded-full border border-dark-surface animate-pulse"></span>
            </button>
            <button 
              onClick={handleLogout}
              title="Logout"
              className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gray-300 hover:bg-neon-red/20 hover:text-neon-red hover:border-neon-red/40 transition-colors"
            >
              <LogOut className="w-4 h-4 text-inherit" />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link to="/signup" className="text-sm font-medium px-4 py-1.5 rounded-full bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green hover:text-black transition-colors">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};
