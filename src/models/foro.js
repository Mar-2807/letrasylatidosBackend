import mongoose from "mongoose";

const foroSchema = new mongoose.Schema({
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher',
        required: true,
        trim: true,
    },
    bookTitle: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
}, {
    timestamps: true
});

export default mongoose.model("Foro", foroSchema);