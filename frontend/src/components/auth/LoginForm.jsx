import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingScreen from '../common/LoadingScreen';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadingMessages = [
    'Establishing secure connection...',
    'Verifying credentials...',
    'Preparing your dashboard...',
    'Almost there...'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Start loading sequence
      setLoadingMessage(loadingMessages[0]);
      
      // Login dispatch
      await dispatch(login(formData)).unwrap();
      
      // Simulate loading stages for smooth transition
      for (let i = 1; i < loadingMessages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoadingMessage(loadingMessages[i]);
      }

      // Final delay before navigation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Welcome back!', {
        icon: '🌟',
        duration: 3000,
        style: {
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          backdropFilter: 'blur(8px)',
        },
      });
      
      navigate('/');
    } catch (error) {
      toast.error(error?.message || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen message={loadingMessage} />}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                             group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-black/20 text-white placeholder-gray-400 pl-10 block w-full rounded-lg 
                         border-0 py-3 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 
                         focus:ring-inset focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                             group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-black/20 text-white placeholder-gray-400 pl-10 pr-10 block w-full 
                         rounded-lg border-0 py-3 shadow-sm ring-1 ring-inset ring-white/10 
                         focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                         hover:text-gray-300 focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-gray-400">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
                   shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                   transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign in
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign up now
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;