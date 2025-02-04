import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Foundation For Observational Astronomy
            </h1>
            <p className="text-xl mb-8">
              Exploring the cosmos through observation, research, and education
            </p>
            <Link
              to="/about"
              className="bg-secondary text-primary px-8 py-3 rounded-md text-lg font-medium hover:bg-secondary-dark"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Research</h3>
              <p className="text-gray-600">
                Conducting cutting-edge astronomical research and observations
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Education</h3>
              <p className="text-gray-600">
                Providing educational resources and programs for aspiring astronomers
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Community</h3>
              <p className="text-gray-600">
                Building a community of space science enthusiasts and researchers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog post cards will be mapped here */}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-block bg-primary text-secondary px-6 py-3 rounded-md hover:bg-primary-light"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;