import React from 'react';
import { Link } from 'react-router-dom';
import { Telescope, Star, Users, BookOpen } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba")', // Replace with your image
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backgroundBlendMode: 'overlay'
          }}
        />
        
        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              Explore the Cosmos
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
              Foundation For Observational Astronomy And Development Of Space Sciences
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/about"
                className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Learn More
              </Link>
              <Link
                to="/blog"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white p-1">
            <div className="w-1 h-3 bg-white rounded-full mx-auto animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Discover the Universe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 text-white hover:transform hover:scale-105 transition-all duration-300">
              <Telescope size={40} className="mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-4">Observation</h3>
              <p className="text-gray-300">
                Access to advanced telescopes and observational equipment
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 text-white hover:transform hover:scale-105 transition-all duration-300">
              <Star size={40} className="mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-4">Research</h3>
              <p className="text-gray-300">
                Conduct cutting-edge astronomical research
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 text-white hover:transform hover:scale-105 transition-all duration-300">
              <Users size={40} className="mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-gray-300">
                Join a global network of astronomers and enthusiasts
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 text-white hover:transform hover:scale-105 transition-all duration-300">
              <BookOpen size={40} className="mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <p className="text-gray-300">
                Learn from expert astronomers and researchers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Research Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Latest Research
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Add your research cards here */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Be part of groundbreaking astronomical discoveries and contribute to the advancement of space sciences.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;