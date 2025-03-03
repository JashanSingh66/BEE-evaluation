import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import { posts } from '../data/data.js';

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    res.json({ posts });
}));


router.post('/', asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        throw { statusCode: 400, message: "Title and content are required" };
    }

    const id = Object.keys(posts).length + 1;
    posts[id] = { id, title, content };

    res.status(201).json({ message: "Post created successfully", post: posts[id] });
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
    const { title, content } = req.body;

    if (!posts[id]) {
        throw { statusCode: 404, message: "Post not found" };
    }

    posts[id] = { id, title, content };

    res.json({ message: "Post updated successfully", post: posts[id] });
}));


router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!posts[id]) {
        throw { statusCode: 404, message: "Post not found" };
    }

    delete posts[id];

    res.json({ message: "Post deleted successfully" });
}));

export default router;
