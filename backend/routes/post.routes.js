import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import Post from '../models/post.model.js';

const router = express.Router();

// Get all posts
router.get('/', asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ posts });
}));

// Create a new post
router.post('/', asyncHandler(async (req, res) => {
    const { title, content, date, prize, organizer } = req.body;

    if (!title || !content || !date || !prize || !organizer) {
        throw { statusCode: 400, message: "All post fields are required" };
    }

    const newPost = await Post.create({ title, content, date, prize, organizer });
    res.status(201).json({ message: "Post created successfully", post: newPost });
}));

// Get a single post by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
        throw { statusCode: 404, message: "Post not found" };
    }

    res.json({ post });
}));

// Update a post by ID
router.put('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, date, prize, organizer } = req.body;

    const post = await Post.findById(id);
    if (!post) {
        throw { statusCode: 404, message: "Post not found" };
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.date = date || post.date;
    post.prize = prize || post.prize;
    post.organizer = organizer || post.organizer;

    await post.save();
    res.json({ message: "Post updated successfully", post });
}));

// Delete a post by ID
router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
        throw { statusCode: 404, message: "Post not found" };
    }

    await post.remove();
    res.json({ message: "Post deleted successfully", post });
}));

export default router;