import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import { users, posts, relationships } from '../data/data.js';

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { username, postid } = req.body;  

    if (!username || !postid) {
        return res.status(400).json({ message: "Username and postid are required" });
    }

 
    const userExists = users.some(user => user.username === username);
    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }


    const postIdNumber = Number(postid);
    if (!posts[postIdNumber]) {
        return res.status(404).json({ message: "Post not found" });
    }

 
    if (relationships.some(rel => rel.username === username && rel.postid === postIdNumber)) {
        return res.status(409).json({ message: "Relationship already exists" });
    }


    relationships.push({ username, postid: postIdNumber });
    res.status(201).json({ message: "Relationship created successfully", relationships });
}));

router.get('/', asyncHandler(async (req, res) => {
    res.json({ relationships });
}));

export default router;
