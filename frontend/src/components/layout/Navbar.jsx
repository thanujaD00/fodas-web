import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">FOADS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className={`text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') ? 'border-b-2 border-white' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about"
              className={`text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/about') ? 'border-b-2 border-white' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/blog"
              className={`text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/blog') ? 'border-b-2 border-white' : ''
              }`}
            >
              Blog
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center text-white hover:text-gray-300 px-3 py-2 text-sm font-medium">
                  <span className="mr-2">{user.firstName}</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md">
          <Link
            to="/"
            className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            to="/blog"
            className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
          >
            Blog
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;