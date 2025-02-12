import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    foroId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Foro', 
        required: true 
    },
    activityName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    activityDescription: { 
        type: String, 
        required: true, 
        trim: true 
    },
    deadline: {
        type: Date, 
        required: true, 
        trim: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});


export default mongoose.model("Activity", activitySchema);