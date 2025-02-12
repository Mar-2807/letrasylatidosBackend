import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/letrasylatidosBD');
        console.log('DB is connected');
    } catch {
        console.log(error);
    }
};