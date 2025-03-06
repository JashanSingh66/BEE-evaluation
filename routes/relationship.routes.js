import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import { users, posts, relationships } from '../data/data.js';

const router = express.Router();
router.get('/relationships', asyncHandler(async (req, res) => {
    res.status(200).json({ relationships });
}));

router.post('/relationships', asyncHandler(async (req, res) => {
    const { userId, postId } = req.body;

    if (!users.some(user => user.id === userId)) {
        throw { statusCode: 404, message: "User not found" };
    }
    if (!posts[postId]) {
        throw { statusCode: 404, message: "Post not found" };
    }

    relationships.push({ userId, postId });
    res.status(201).json({ message: "Relationship added successfully", relationships });
}));


export default router;
