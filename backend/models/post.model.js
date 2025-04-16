import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },    // Store the date of the hackathon
  prize: { type: String, required: true },   // Store prize information
  organizer: { type: String, required: true },  // Store the organizer's name
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
