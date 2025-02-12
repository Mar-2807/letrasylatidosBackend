import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true
  },
  bookTitle: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, refPath: 'likedByModel' }], // IDs de quienes dieron like
  likedByModel: { type: String, enum: ['User', 'Teacher'], required: true } // Diferencia entre students y teachers
}, { timestamps: true });

export default mongoose.model('Like', LikeSchema);
