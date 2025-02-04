import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/axios';

// Fetch all blogs
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async ({ page = 1, filter = 'all', search = '', sort = 'latest' }, { rejectWithValue }) => {
    try {
      const response = await api.get('/blogs', {
        params: { page, filter, search, sort }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch blogs' });
    }
  }
);

// Fetch single blog
export const fetchBlogById = createAsyncThunk(
  'blog/fetchBlogById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch blog' });
    }
  }
);

// Create blog
export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await api.post('/blogs', blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to create blog' });
    }
  }
);

// Like blog
export const likeBlog = createAsyncThunk(
  'blog/likeBlog',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/blogs/${id}/like`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to like blog' });
    }
  }
);

// Add comment
export const addComment = createAsyncThunk(
  'blog/addComment',
  async ({ blogId, comment }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/blogs/${blogId}/comments`, { content: comment });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to add comment' });
    }
  }
);

const initialState = {
  blogs: [],
  currentBlog: null,
  featuredBlog: null,
  totalPages: 1,
  currentPage: 1,
  totalBlogs: 0,
  stats: {
    totalPosts: 0,
    totalAuthors: 0,
    totalCategories: 0
  },
  loading: false,
  error: null,
  categories: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalBlogs = action.payload.totalBlogs;
        state.stats = action.payload.stats || state.stats;
        if (action.payload.featuredBlog) {
          state.featuredBlog = action.payload.featuredBlog;
        }
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch blogs';
      })

      // Fetch single blog
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch blog';
      })

      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create blog';
      })

      // Like blog
      .addCase(likeBlog.fulfilled, (state, action) => {
        const blog = state.blogs.find(blog => blog._id === action.payload._id);
        if (blog) {
          blog.likes = action.payload.likes;
        }
        if (state.currentBlog?._id === action.payload._id) {
          state.currentBlog.likes = action.payload.likes;
        }
      })

      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.currentBlog?._id === action.payload.blogId) {
          state.currentBlog.comments = action.payload.comments;
        }
      });
  }
});

export const { clearError, setCurrentPage } = blogSlice.actions;
export default blogSlice.reducer;