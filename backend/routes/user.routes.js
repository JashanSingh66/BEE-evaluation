import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register user
router.post('/register', asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw { statusCode: 400, message: "Username, Email, and Password are required" };
    }

    const userExists = await User.findOne({ $or: [ { email }, { username } ] });
    if (userExists) {
        throw { statusCode: 409, message: "User already exists with given email or username" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user: { id: user._id, username, email } });
}));

// Login user
router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw { statusCode: 401, message: "Invalid username or password" };
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: "Login successful", token, user: { id: user._id, username: user.username, email: user.email } });
}));

// Logout user (handled client-side by deleting token)
router.post('/logout', asyncHandler(async (req, res) => {
    res.json({ message: "Logout successful (handled client-side)" });
}));

// Get user profile
router.get('/profile/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
        throw { statusCode: 404, message: "User not found" };
    }
    res.json({ profile: user });
}));

// Update user
router.put('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { newUsername, newEmail } = req.body;

    const user = await User.findById(id);
    if (!user) {
        throw { statusCode: 404, message: "User not found" };
    }

    if (newUsername) user.username = newUsername;
    if (newEmail) user.email = newEmail;

    await user.save();
    res.json({ message: "User updated successfully", user: { id: user._id, username: user.username, email: user.email } });
}));

// Delete user
router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        throw { statusCode: 404, message: "User not found" };
    }

    await user.remove();
    res.json({ message: "User deleted successfully", user: { id: user._id, username: user.username, email: user.email } });
}));

export default router;