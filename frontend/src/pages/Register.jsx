import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a')] bg-cover bg-center opacity-20"></div>
      </div>
      
      <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <h1 className="text-center text-4xl font-extrabold text-white mb-2">
            Join FOADS
          </h1>
          <p className="text-center text-gray-400 max-w-sm mx-auto">
            Be part of our growing community of astronomers and space enthusiasts
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;