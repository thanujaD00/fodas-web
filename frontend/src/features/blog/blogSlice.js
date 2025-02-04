import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/axios';

// Async thunks
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async ({ page = 1, limit = 9, filter = 'all', search = '' }, { rejectWithValue }) => {
    try {
      const response = await api.get('/blogs', {
        params: { page, limit, filter, search }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blog/fetchBlogById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await api.post('/blogs', blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/blogs/${id}`, blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/blogs/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  blogs: [],
  currentBlog: null,
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
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
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.createLoading = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload?.message || 'Failed to create blog';
      })

      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.blogs = state.blogs.map(blog =>
          blog._id === action.payload._id ? action.payload : blog
        );
        if (state.currentBlog?._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload?.message || 'Failed to update blog';
      })

      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
        if (state.currentBlog?._id === action.payload) {
          state.currentBlog = null;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload?.message || 'Failed to delete blog';
      });
  }
});

export const { clearErrors, clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;