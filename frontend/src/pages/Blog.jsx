import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  User,
  ArrowRight,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchBlogs, likeBlog, setCurrentPage } from '../features/blog/blogSlice';

const Blog = () => {
  const dispatch = useDispatch();
  const { 
    blogs, 
    loading, 
    error, 
    totalPages, 
    currentPage, 
    stats,
    featuredBlog 
  } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetchBlogsData();
  }, [dispatch, filter, searchTerm, sortBy, currentPage]);

  const fetchBlogsData = () => {
    dispatch(fetchBlogs({
      page: currentPage,
      filter,
      search: searchTerm,
      sort: sortBy
    }));
  };

  const handleLike = async (blogId) => {
    try {
      if (!user) {
        toast.error('Please login to like posts');
        return;
      }
      await dispatch(likeBlog(blogId)).unwrap();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const BlogCard = ({ blog, featured = false }) => (
    <div className={`bg-white/5 backdrop-blur-md rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 ${
      featured ? 'col-span-full' : ''
    }`}>
      <div className={`flex ${featured ? 'md:flex-row flex-col' : 'flex-col'}`}>
        {blog.image && (
          <div className={`${featured ? 'md:w-1/2' : ''} h-48`}>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={`p-6 flex flex-col ${featured ? 'md:w-1/2' : 'w-full'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
              {blog.category}
            </span>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock size={14} className="mr-1" />
              {new Date(blog.createdAt).toLocaleDateString()}
            </div>
          </div>

          <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold text-white mb-3 line-clamp-2`}>
            {blog.title}
          </h3>

          <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
            {blog.content}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLike(blog._id)}
                className="flex items-center space-x-1 text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Heart
                  size={16}
                  className={blog.likes?.includes(user?._id) ? 'fill-current text-pink-500' : ''}
                />
                <span>{blog.likes?.length || 0}</span>
              </button>
              <div className="flex items-center space-x-1">
                <MessageCircle size={16} />
                <span>{blog.comments?.length || 0}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-gray-400" />
                <span className="text-gray-400 text-sm">{blog.author?.username}</span>
              </div>
              <button
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + `/blog/${blog._id}`);
                  toast.success('Link copied to clipboard!');
                }}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) {
    toast.error(error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Hero Section with Stats */}
      <div className="relative py-20 bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3')] bg-cover bg-center opacity-20"
            style={{ filter: 'blur(3px)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
              Space Science Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the latest breakthroughs in astronomy and space exploration
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Published Articles', value: stats.totalPosts, icon: Clock },
              { label: 'Expert Authors', value: stats.totalAuthors, icon: User },
              { label: 'Categories', value: stats.totalCategories, icon: Filter }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredBlog && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Article</h2>
          <BlogCard blog={featuredBlog} featured={true} />
        </div>
      )}

      {/* Controls Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:min-w-[240px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-gray-800 rounded-lg text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-gray-800 rounded-lg text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="astronomy">Astronomy</option>
              <option value="space-science">Space Science</option>
              <option value="research">Research</option>
              <option value="technology">Space Technology</option>
              <option value="exploration">Space Exploration</option>
            </select>
          </div>

          {/* Create Post Button */}
          {user && (
            <Link
              to="/blog/create"
              className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Create Post</span>
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-white mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-800 rounded-lg text-gray-400 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === pageNumber
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-800 text-gray-400 hover:bg-white/5'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-800 rounded-lg text-gray-400 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;