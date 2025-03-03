import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import { users } from '../data/data.js';

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    res.status(200).json({ users });
}));


router.post('/', asyncHandler(async (req, res) => {
    const { username } = req.body;

    if (!username) {
        throw { statusCode: 400, message: "Username is required" };
    }

    if (users.includes(username)) {
        throw { statusCode: 409, message: "Username already exists" };
    }

    users.push(username);
    res.status(201).json({ message: "User registered successfully", users });
}));

router.put('/:username', asyncHandler(async (req, res) => {
    const { username } = req.params;
    const { newUsername } = req.body;

    if (!newUsername) {
        throw { statusCode: 400, message: "New username is required" };
    }

    if (!users.includes(username)) {
        throw { statusCode: 404, message: "User not found" };
    }

    if (users.includes(newUsername)) {
        throw { statusCode: 409, message: "Username already exists" };
    }

    const userIndex = users.indexOf(username);
    users[userIndex] = newUsername;

    res.json({ message: "Username updated successfully", users });
}));

router.delete('/:username', asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!users.includes(username)) {
        throw { statusCode: 404, message: "User not found" };
    }

    const updatedUsers = users.filter(user => user !== username);

    res.json({ message: "User deleted successfully", users: updatedUsers });
}));

export default router;
