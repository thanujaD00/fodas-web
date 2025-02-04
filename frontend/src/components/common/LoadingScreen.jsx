import React from 'react';

const LoadingScreen = ({ message = "Initializing..." }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        {/* Main Loading Animation */}
        <div className="flex flex-col items-center">
          {/* Outer Ring */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-[spin_2s_linear_infinite]" />
            
            {/* Middle Ring */}
            <div className="absolute inset-2 rounded-full border-2 border-blue-400/20 animate-[spin_4s_linear_infinite_reverse]" />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-400 animate-[spin_3s_linear_infinite_reverse]" />
            
            {/* Inner Ring */}
            <div className="absolute inset-4 rounded-full border-2 border-blue-300/20 animate-[spin_5s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-blue-300 animate-[spin_4s_linear_infinite]" />

            {/* Center Orb */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full animate-pulse opacity-75 blur-sm" />
              <div className="absolute w-8 h-8 bg-white rounded-full animate-pulse" />
            </div>

            {/* Particles */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Loading Text */}
          {/* <div className="mt-8 text-center">
            <div className="relative">
              <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <p className="text-white text-lg font-light tracking-wider mt-4 animate-pulse">
                {message}
              </p>
              <div className="flex justify-center mt-2 space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;