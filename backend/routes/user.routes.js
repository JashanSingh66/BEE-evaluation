import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../utils/auth.js';

const router = express.Router();
const JWT_SECRET =  "your-secret-key-here";

// Register user
router.post('/register', asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw { statusCode: 400, message: "Username, Email, and Password are required" };
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        throw { statusCode: 409, message: "User already exists with given email or username" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
        message: "User registered successfully",
        token,
        user: { id: user._id, username: user.username, email: user.email },
    });
}));

// Login user
router.post('/login', asyncHandler(async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });  
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw { statusCode: 401, message: "Invalid email or password" };
    }

    const token = jwt.sign({ id: user._id },JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: "Login successful", token, user: { id: user._id, username: user.username, email: user.email } });
}));

router.post('/logout', asyncHandler(async (req, res) => {
    res.json({ message: "Logout successful (handled on client)" });
}));

// Get current user profile
router.get('/profile/me', authMiddleware, asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    res.json({ profile: user });
}));

// Update current user
router.put('/me', authMiddleware, asyncHandler(async (req, res) => {
    const { username, email } = req.body;
    const user = await User.findById(req.userId);
    if (!user) throw { statusCode: 404, message: "User not found" };

    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    res.json({ message: "Profile updated", user: { id: user._id, username: user.username, email: user.email } });
}));

// Get the profile of the logged-in user
router.get('/profile', authMiddleware, asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
}));
export default router;
