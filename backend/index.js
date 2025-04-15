import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import dotenv from 'dotenv';
import connectDb from './db/db.js';
dotenv.config();
connectDb();

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});