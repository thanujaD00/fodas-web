const Blog = require('../models/blogModel');

// Get all blogs
exports.getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        const blogs = await Blog.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Blog.countDocuments();

        res.json({
            blogs,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBlogs: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single blog
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username')
            .populate('comments.user', 'username');

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create blog
exports.createBlog = async (req, res) => {
    try {
        const newBlog = new Blog({
            ...req.body,
            author: req.user._id
        });

        const savedBlog = await newBlog.save();
        await savedBlog.populate('author', 'username');

        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if user is blog author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ).populate('author', 'username');

        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if user is blog author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized' });
        }

        await blog.remove();
        res.json({ message: 'Blog removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Like/Unlike blog
exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const likeIndex = blog.likes.indexOf(req.user._id);
        
        if (likeIndex === -1) {
            blog.likes.push(req.user._id);
        } else {
            blog.likes.splice(likeIndex, 1);
        }

        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add comment
exports.addComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const newComment = {
            content: req.body.content,
            user: req.user._id
        };

        blog.comments.push(newComment);
        await blog.save();
        await blog.populate('comments.user', 'username');

        res.json(blog.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete comment
exports.deleteComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const comment = blog.comments.id(req.params.commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized' });
        }

        comment.remove();
        await blog.save();

        res.json({ message: 'Comment removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};