import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Mission Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-center mb-8">About FOADS</h1>
          <div className="prose lg:prose-xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              The Foundation For Observational Astronomy And Development Of Space Sciences (FOADS) 
              is dedicated to advancing our understanding of the universe through 
              observational astronomy and space science research.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to promote astronomical research, provide educational 
              opportunities, and foster collaboration among astronomers and space 
              science enthusiasts worldwide.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Excellence in Research</h3>
              <p className="text-gray-600">
                We strive for excellence in all our research endeavors, maintaining 
                the highest standards of scientific integrity and innovation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Educational Impact</h3>
              <p className="text-gray-600">
                We are committed to sharing knowledge and inspiring the next 
                generation of astronomers and space scientists.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of collaboration and actively promote 
                partnerships within the scientific community.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We embrace innovative approaches to astronomical observation 
                and research methodologies.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Add team member components here */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold">Dr. Jane Smith</h3>
              <p className="text-gray-600">Director of Research</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold">Dr. John Doe</h3>
              <p className="text-gray-600">Head of Education</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold">Dr. Sarah Johnson</h3>
              <p className="text-gray-600">Senior Researcher</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;