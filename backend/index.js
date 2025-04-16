import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import connectDb from './db/db.js';
import errorHandler from './utils/errorhandler.js'; // Custom error middleware

dotenv.config();
connectDb();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Error handler
app.use(errorHandler); // This should be after routes

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
