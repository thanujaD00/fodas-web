import api from './axios';

// Auth endpoints
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('token');
  },
  getCurrentUser: () => api.get('/auth/me')
};

// Blog endpoints
export const blogService = {
  // Get all blogs with optional filters
  getAllBlogs: (params) => api.get('/blogs', { params }),

  // Get single blog by ID
  getBlogById: (id) => api.get(`/blogs/${id}`),

  // Create new blog
  createBlog: (blogData) => api.post('/blogs', blogData),

  // Update blog
  updateBlog: (id, blogData) => api.put(`/blogs/${id}`, blogData),

  // Delete blog
  deleteBlog: (id) => api.delete(`/blogs/${id}`),

  // Get user's blogs
  getUserBlogs: () => api.get('/blogs/user'),

  // Like/Unlike blog
  toggleLikeBlog: (id) => api.post(`/blogs/${id}/like`),

  // Add comment
  addComment: (id, comment) => api.post(`/blogs/${id}/comments`, { content: comment }),

  // Delete comment
  deleteComment: (blogId, commentId) => api.delete(`/blogs/${blogId}/comments/${commentId}`),

  // Search blogs
  searchBlogs: (query) => api.get('/blogs/search', { params: { query } })
};

// User profile endpoints
export const userService = {
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.put('/users/change-password', passwordData),
  getUserProfile: (userId) => api.get(`/users/${userId}`),
  uploadAvatar: (formData) => api.post('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

// Category endpoints
export const categoryService = {
  getAllCategories: () => api.get('/categories'),
  createCategory: (categoryData) => api.post('/categories', categoryData),
  updateCategory: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  deleteCategory: (id) => api.delete(`/categories/${id}`)
};

// File upload endpoint
export const uploadService = {
  uploadImage: (formData) => api.post('/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

// Error handler helper
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response from server';
  } else {
    // Something happened in setting up the request that triggered an Error
    return 'Error setting up request';
  }
};

// Response formatter helper
export const formatResponse = (response) => {
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
};

// Request interceptor helper
export const setupRequestInterceptor = (onTokenExpired) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        onTokenExpired();
      }
      return Promise.reject(error);
    }
  );
};

export default {
  auth: authService,
  blog: blogService,
  user: userService,
  category: categoryService,
  upload: uploadService,
  handleError: handleApiError,
  formatResponse,
  setupRequestInterceptor
};