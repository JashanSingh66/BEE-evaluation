import express from 'express';
import asyncHandler from '../utils/asynchandler.js';
import Post from '../models/post.model.js';
import authMiddleware from '../utils/auth.js';
import multer from 'multer';
import path from 'path';
import cloudinary from 'cloudinary';
import { config } from 'dotenv';

// Load environment variables
config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage (no longer saving locally)
const storage = multer.memoryStorage(); // Store the image in memory

// Initialize multer
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb('Error: Images only (JPEG, JPG, PNG, GIF)');
    },
}).single('image'); // 'image' is the field name in the form for the image upload

const router = express.Router();

// Get all posts
router.get('/', asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ posts });
}));

// Create a new post
router.post('/', authMiddleware, upload, asyncHandler(async (req, res) => {
    const { title, content, date, prize, organizer } = req.body;
  
    if (!title || !content || !date || !prize || !organizer) {
      return res.status(400).json({ message: "All post fields are required" });
    }
  
    let image = ''; // Default image to an empty string if no image is uploaded
    if (req.file) {
      // Upload image to Cloudinary and wait for the result
      try {
        const result = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error);
              resolve(result);
            }
          ).end(req.file.buffer); // Upload image buffer to Cloudinary
        });
  
        image = result.secure_url; // Get the secure URL of the uploaded image
      } catch (error) {
        return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
      }
    }
  
    // Create the new post with image URL (if image is uploaded)
    const newPost = await Post.create({
      title,
      content,
      date,
      prize,
      organizer,
      createdBy: req.userId, // userId from auth middleware
      image, // Store the image URL returned by Cloudinary (or empty string if no image)
    });
  
    res.status(201).json({ message: "Post created successfully", post: newPost });
  }));
  
// Update a post by ID (protected + image upload)
router.put('/:id', authMiddleware, upload, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, date, prize, organizer } = req.body;

  const post = await Post.findById(id);
  if (!post) {
      return res.status(404).json({ message: "Post not found" });
  }

  if (post.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not authorized to update this post" });
  }

  // Handle optional image update
  if (req.file) {
      try {
          const result = await new Promise((resolve, reject) => {
              cloudinary.v2.uploader.upload_stream(
                  { resource_type: 'auto' },
                  (error, result) => {
                      if (error) reject(error);
                      resolve(result);
                  }
              ).end(req.file.buffer);
          });

          post.image = result.secure_url;
      } catch (error) {
          return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
      }
  }

  // Update text fields
  post.title = title || post.title;
  post.content = content || post.content;
  post.date = date || post.date;
  post.prize = prize || post.prize;
  post.organizer = organizer || post.organizer;

  await post.save();
  res.json({ message: "Post updated successfully", post });
}));


export default router;
