import Like from '../models/like.js';
import User from '../models/user.js';
import Teacher from '../models/teachers.js';
import mongoose from 'mongoose';

/**
 * Función para dar o quitar like a un libro.
 */
export const toggleLike = async (req, res) => {
    try {
        const { bookId, bookTitle, userId } = req.body;

        if (!bookId || !userId) {
            return res.status(400).json({ message: "bookId y userId son requeridos" });
        }

        const student = await User.findById(userId);
        const teacher = await Teacher.findById(userId);
        let userType = "";

        if (teacher) userType = "Teacher";
        if (student) userType = "User";
        if (!userType) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        let likeEntry = await Like.findOne({ bookId });

        if (!likeEntry) {
            likeEntry = new Like({ bookId, bookTitle, likes: [userId], likedByModel: userType });
        } else {
            const userObjectId = new mongoose.Types.ObjectId(userId); 

            if (likeEntry.likes.some(id => id.equals(userObjectId))) { 
                likeEntry.likes = likeEntry.likes.filter(id => !id.equals(userObjectId));
            } else {
                likeEntry.likes.push(userObjectId);
            }
        }

        await likeEntry.save();
        return res.status(200).json({ likes: likeEntry.likes.length, liked: likeEntry.likes.includes(userId) });
    } catch (error) {
        console.error("Error en toggleLike:", error);
        return res.status(500).json({ message: "Error al actualizar el like", error });
    }
};



export const getLikesCount = async (req, res) => {
    try {
        const { bookId } = req.params;

        if (!bookId) {
            return res.status(400).json({ message: "bookId es requerido" });
        }

        const likeEntry = await Like.findOne({ bookId });
        const likesCount = likeEntry ? likeEntry.likes.length : 0;

        return res.status(200).json({ likes: likesCount });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener la cantidad de likes", error });
    }
};

export const isLiked = async (req, res) => {
    try {
        const { bookId, userId } = req.query;

        const likeEntry = await Like.findOne({ bookId, likes: userId });
        if(likeEntry === null){
            return res.status(200).json({ liked: false });
        }
        return res.status(200).json({ liked: true });
    } catch (error) {
        return res.status(500).json({ liked: "Error al verificar like", error });
    }
};


