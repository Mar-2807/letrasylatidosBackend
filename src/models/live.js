import mongoose from "mongoose";

const liveSchema = new mongoose.Schema({
    foroId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Foro', 
        required: true 
    },
    days: { 
        type: String, 
        required: true, 
    },
    time: { 
        type: String, 
        required: true, 
        trim: true 
    },
    link: {
        type: String, 
        required: true, 
        trim: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});


export default mongoose.model("Live", liveSchema);