import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: String,
  prize: String,
  organizer: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,  // You can store the file path or URL here
    required: false,  // If you don't always want an image to be required
  },
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
