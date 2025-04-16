import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import Post from '../models/post.model.js';
import authMiddleware from '../utils/auth.js';

const router = express.Router();

// Get all posts (public)
router.get('/', asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ posts });
}));

// Create a new post (protected)
router.post('/', authMiddleware, asyncHandler(async (req, res) => {
    const { title, content, date, prize, organizer } = req.body;

    if (!title || !content || !date || !prize || !organizer) {
        return res.status(400).json({ message: "All post fields are required" });
    }

    const newPost = await Post.create({
        title,
        content,
        date,
        prize,
        organizer,
        createdBy: req.userId, // userId from auth middleware
    });

    res.status(201).json({ message: "Post created successfully", post: newPost });
}));

// Get a single post by ID (public)
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    res.json({ post });
}));

// Update a post by ID (protected)
router.put('/:id', authMiddleware, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, date, prize, organizer } = req.body;

    const post = await Post.findById(id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // Optional: Check if user is the owner of the post
    if (post.createdBy.toString() !== req.userId) {
        return res.status(403).json({ message: "You are not authorized to update this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.date = date || post.date;
    post.prize = prize || post.prize;
    post.organizer = organizer || post.organizer;

    await post.save();
    res.json({ message: "Post updated successfully", post });
}));

// Delete a post by ID (protected)
router.delete('/:id', authMiddleware, asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // Optional: Check if user is the owner of the post
    if (post.createdBy.toString() !== req.userId) {
        return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await post.remove();
    res.json({ message: "Post deleted successfully", post });
}));

export default router;
