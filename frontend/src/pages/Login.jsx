import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564')] bg-cover bg-center opacity-20"></div>
      </div>
      
      <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute h-2 w-2 bg-blue-500 rounded-full top-1/4 left-1/4 animate-pulse"></div>
          <div className="absolute h-2 w-2 bg-purple-500 rounded-full top-3/4 left-1/3 animate-pulse delay-75"></div>
          <div className="absolute h-2 w-2 bg-yellow-500 rounded-full top-1/2 right-1/4 animate-pulse delay-100"></div>
          <div className="absolute h-2 w-2 bg-green-500 rounded-full bottom-1/4 right-1/3 animate-pulse delay-150"></div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <h1 className="text-center text-4xl font-extrabold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-400 max-w-sm mx-auto">
            Sign in to continue your journey through the cosmos
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow-xl ring-1 ring-white/10 sm:rounded-lg sm:px-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;