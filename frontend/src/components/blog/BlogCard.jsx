import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>By {blog.author.username}</span>
        </div>
        <p className="text-gray-600 mb-4">
          {blog.content.substring(0, 150)}...
        </p>
        <div className="flex items-center justify-between">
          <Link
            to={`/blog/${blog._id}`}
            className="text-primary hover:text-primary-light font-medium"
          >
            Read More
          </Link>
          <div className="flex space-x-2">
            {blog.categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-sm rounded-md"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;