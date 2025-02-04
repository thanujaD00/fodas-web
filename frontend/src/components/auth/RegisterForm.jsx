import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../features/auth/authSlice';
import { User, Mail, Phone, Lock, CalendarDays } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    age: '',
    phoneNumber: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateStep1 = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.firstName || !formData.lastName || !formData.age || !formData.phoneNumber) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (formData.age < 13 || formData.age > 120) {
      toast.error('Please enter a valid age');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    try {
      const { confirmPassword, ...registrationData } = formData;
      await dispatch(register(registrationData)).unwrap();
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error?.message || 'Registration failed');
    }
  };

  const inputStyle = "bg-black/20 text-white placeholder-gray-400 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 w-full";
  const labelStyle = "block text-sm font-medium text-gray-200 mb-1";
  const iconStyle = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {currentStep === 1 ? (
        // Step 1: Account Information
        <>
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username
            </label>
            <div className="relative">
              <User className={iconStyle} size={20} />
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`${inputStyle} pl-10`}
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <div className="relative">
              <Mail className={iconStyle} size={20} />
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`${inputStyle} pl-10`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <div className="relative">
              <Lock className={iconStyle} size={20} />
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`${inputStyle} pl-10`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelStyle}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock className={iconStyle} size={20} />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className={`${inputStyle} pl-10`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={nextStep}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next Step
          </button>
        </>
      ) : (
        // Step 2: Personal Information
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={labelStyle}>
                First Name
              </label>
              <div className="relative">
                <User className={iconStyle} size={20} />
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className={`${inputStyle} pl-10`}
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className={labelStyle}>
                Last Name
              </label>
              <div className="relative">
                <User className={iconStyle} size={20} />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className={`${inputStyle} pl-10`}
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="age" className={labelStyle}>
              Age
            </label>
            <div className="relative">
              <CalendarDays className={iconStyle} size={20} />
              <input
                id="age"
                name="age"
                type="number"
                required
                min="13"
                max="120"
                className={`${inputStyle} pl-10`}
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className={labelStyle}>
              Phone Number
            </label>
            <div className="relative">
              <Phone className={iconStyle} size={20} />
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                className={`${inputStyle} pl-10`}
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 py-3 px-4 border border-white rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                'Complete Registration'
              )}
            </button>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <p className="text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;