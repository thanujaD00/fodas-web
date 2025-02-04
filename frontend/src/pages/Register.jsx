import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
  const { user } = useSelector((state) => state.auth);

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RegisterForm />
    </div>
  );
};

export default Register;