import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-2">
            <h3 className="text-xl font-bold mb-4">FOADS</h3>
            <p className="mb-4">
              Foundation For Observational Astronomy And Development Of Space Sciences
            </p>
            <p>
              Dedicated to advancing our understanding of the universe through
              observational astronomy and space science research.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-secondary-dark">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary-dark">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-secondary-dark">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>Email: contact@foads.org</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Space Avenue</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} FOADS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;