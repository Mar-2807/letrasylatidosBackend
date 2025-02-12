import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    foroId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Foro', 
        required: true 
    },
    userRealname: { 
        type: String, 
        required: true, 
        trim: true 
    },
    userLastname: { 
        type: String, 
        required: true, 
        trim: true 
    },
    comment: { 
        type: String, 
        required: true, 
        trim: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});


export default mongoose.model("Comment", commentSchema);