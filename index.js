import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import relationshipRoutes from './routes/relationship.routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/relationships', relationshipRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
