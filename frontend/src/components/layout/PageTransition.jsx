import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Add entrance animation
    document.body.style.opacity = '0';
    
    const timer = setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [location]);

  return (
    <div className="transition-opacity duration-500 ease-in-out">
      {children}
    </div>
  );
};

export default PageTransition;