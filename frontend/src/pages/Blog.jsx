import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BlogCard from '../components/blog/BlogCard';
import api from '../services/axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs');
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch blogs');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Latest Blog Posts</h1>
          {user && (
            <button
              onClick={() => {/* Add new blog logic */}}
              className="bg-primary text-secondary px-6 py-2 rounded-md hover:bg-primary-light"
            >
              New Post
            </button>
          )}
        </div>

        {/* Blog Filters */}
        <div className="mb-8">
          <div className="flex space-x-4">
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              onChange={(e) => {/* Add filter logic */}}
            >
              <option value="">All Categories</option>
              <option value="astronomy">Astronomy</option>
              <option value="space-science">Space Science</option>
              <option value="research">Research</option>
            </select>
            
            <input
              type="text"
              placeholder="Search posts..."
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary flex-1"
              onChange={(e) => {/* Add search logic */}}
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Blog;