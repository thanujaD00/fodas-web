import React from 'react';
import { Telescope, Star, Users, BookOpen, Award, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564')] bg-cover bg-center"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backgroundBlendMode: 'overlay'
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About FOADS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Foundation For Observational Astronomy And Development Of Space Sciences
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-6">
                At FOADS, we are dedicated to advancing our understanding of the universe through 
                cutting-edge observational astronomy and space science research.
              </p>
              <p className="text-gray-300">
                Our mission is to promote astronomical research, provide educational opportunities, 
                and foster collaboration among astronomers and space science enthusiasts worldwide.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Telescope, title: 'Advanced Research', count: '50+', text: 'Research Projects' },
                { icon: Users, title: 'Global Network', count: '1000+', text: 'Members Worldwide' },
                { icon: BookOpen, title: 'Education', count: '200+', text: 'Published Papers' },
                { icon: Award, title: 'Excellence', count: '25+', text: 'Awards Received' }
              ].map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md p-6 rounded-lg text-center">
                  <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-2xl font-bold text-blue-400 mb-1">{item.count}</p>
                  <p className="text-gray-400 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Scientific Excellence',
                description: 'Commitment to rigorous scientific methods and groundbreaking research in astronomy.',
                icon: Star
              },
              {
                title: 'Global Collaboration',
                description: 'Fostering international partnerships and knowledge sharing across borders.',
                icon: Globe
              },
              {
                title: 'Educational Impact',
                description: 'Inspiring the next generation of astronomers through education and mentorship.',
                icon: BookOpen
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300"
              >
                <value.icon className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-16">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Director of Research',
                image: '/api/placeholder/300/300'
              },
              {
                name: 'Prof. Michael Chang',
                role: 'Head of Education',
                image: '/api/placeholder/300/300'
              },
              {
                name: 'Dr. Emily Martinez',
                role: 'Chief Observatory Officer',
                image: '/api/placeholder/300/300'
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative group">
                  <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join Our Mission</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Be part of our growing community of astronomers, researchers, and space enthusiasts.
            Together, we can push the boundaries of human knowledge about the universe.
          </p>
          <a
            href="/register"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-400 transition-colors duration-300"
          >
            Become a Member
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;