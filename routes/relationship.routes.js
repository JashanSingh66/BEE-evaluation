import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import { users, posts, relationships } from '../data/data.js';

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { username, postid } = req.query; 

    if (!username || !postid) {
        throw { statusCode: 400, message: "Username and postid are required" };
    }

    if (!users.includes(username)) {
        throw { statusCode: 404, message: "User not found" };
    }

    if (!posts[postid]) {
        throw { statusCode: 404, message: "Post not found" };
    }

    if (relationships.find(rel => rel.username === username && rel.postid === postid)) {
        throw { statusCode: 409, message: "Relationship already exists" };
    }

    relationships.push({ username, postid });
    res.status(201).json({ message: "Relationship created successfully", relationships });
}));


router.get('/', asyncHandler(async (req, res) => {
    res.json({ relationships });
}));

export default router;
