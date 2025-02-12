// backend/models/Book.js
import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  savedById: [{ type: mongoose.Schema.Types.ObjectId, refPath: 'savedByModel' }],
  savedByModel: { type: String, enum: ['User', 'Teacher'], required: true },
  title: { type: String, required: true },
  authors: [String],
  url: { type: String },
  apiSource: { type: String }, // 'openlibrary' o 'gutendex'
  // Agrega otros campos según la información que recibas de las APIs
  cover: { type: String }, // URL de la portada, opcional
}, { timestamps: true });

export default mongoose.model('Book', BookSchema);
