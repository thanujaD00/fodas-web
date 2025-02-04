import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-secondary py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            FOADS
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-secondary-dark">
              Home
            </Link>
            <Link to="/about" className="hover:text-secondary-dark">
              About Us
            </Link>
            <Link to="/blog" className="hover:text-secondary-dark">
              Blog
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">Welcome, {user.firstName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-secondary-dark"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-secondary-dark"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-secondary-dark"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;