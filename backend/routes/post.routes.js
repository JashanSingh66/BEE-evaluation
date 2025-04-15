import express from 'express';
import asyncHandler from '../utils/asynchandler.js';

const router = express.Router();

// In-memory posts store
const posts = {};

router.get('/', asyncHandler(async (req, res) => {
    res.json({ posts: Object.values(posts) });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { title, content, date, prize, organizer } = req.body;

    if (!title || !content || !date || !prize || !organizer) {
        throw { statusCode: 400, message: "All post fields are required" };
    }

    const id = Object.keys(posts).length + 1;
    const newPost = { id, title, content, date, prize, organizer };
    posts[id] = newPost;

    res.status(201).json({ message: "Post created successfully", post: newPost });
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!posts[id]) {
        throw { statusCode: 404, message: "Post not found" };
    }

    res.json({ post: posts[id] });
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, date, prize, organizer } = req.body;

    if (!posts[id]) {
        throw { statusCode: 404, message: "Post not found" };
    }

    posts[id] = { id, title, content, date, prize, organizer };

    res.json({ message: "Post updated successfully", post: posts[id] });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!posts[id]) {
        throw { statusCode: 404, message: "Post not found" };
    }

    const deletedPost = posts[id];
    delete posts[id];

    res.json({ message: "Post deleted successfully", post: deletedPost });
}));

export default router;
