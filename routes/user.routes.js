import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import { users, relationships } from '../data/data.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    res.status(200).json({ users });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { id, username, email } = req.body;

    if (!id || !username || !email) {
        throw { statusCode: 400, message: "ID, Username, and Email are required" };
    }

    if (users.some(user => user.id === id || user.username === username || user.email === email)) {
        throw { statusCode: 409, message: "User with given ID, username, or email already exists" };
    }

    users.push({ id, username, email });
    res.status(201).json({ message: "User registered successfully", users });
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { newUsername, newEmail } = req.body;

    const user = users.find(user => user.id == id);
    if (!user) {
        throw { statusCode: 404, message: "User not found" };
    }

    if (newUsername) user.username = newUsername;
    if (newEmail) user.email = newEmail;

    res.json({ message: "User updated successfully", users });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex(user => user.id == id);
    if (userIndex === -1) {
        throw { statusCode: 404, message: "User not found" };
    }

    users.splice(userIndex, 1);
    res.json({ message: "User deleted successfully", users });
}));

export default router;

