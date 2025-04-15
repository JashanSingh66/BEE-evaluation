import express from 'express';
import asyncHandler from '../utils/asynchandler.js';

const router = express.Router();

// In-memory users store
const users = [];

router.get('/', asyncHandler(async (req, res) => {
    res.status(200).json({ users });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { id, username, email } = req.body;

    if (!id || !username || !email) {
        throw { statusCode: 400, message: "ID, Username, and Email are required" };
    }

    const exists = users.some(user =>
        user.id === id || user.username === username || user.email === email
    );

    if (exists) {
        throw { statusCode: 409, message: "User already exists with given ID, username, or email" };
    }

    const newUser = { id, username, email };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully", user: newUser });
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

    res.json({ message: "User updated successfully", user });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id == id);

    if (index === -1) {
        throw { statusCode: 404, message: "User not found" };
    }

    const deleted = users.splice(index, 1);
    res.json({ message: "User deleted successfully", user: deleted[0] });
}));

export default router;
