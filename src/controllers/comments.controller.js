import Comment from "../models/comments.js";
import Foro from "../models/foro.js";
import User from "../models/user.js";
import Teacher from "../models/teachers.js";

export const postComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const foroId = req.params.foroId;
        const userId = req.user.id;

        const student = await User.findById(userId);
        const teacher = await Teacher.findById(userId);
        var userRealname = "";
        var userLastname = "";
        if(teacher){
            userRealname = teacher.realname;
            userLastname = teacher.lastname;
        }
        if(student){
            userRealname = student.realname;
            userLastname = student.lastname;
        }
        if(student === "" && teacher === ""){
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        const foro = await Foro.findById(foroId);
       
        if (!foro) {
            return res.status(404).json({ error: 'Foro de procedencia no encontrado.' });
        }

        const newComment = new Comment({
            foroId: foro._id,
            userRealname,
            userLastname,
            comment
        });

        const savedComment = await newComment.save();
        res.json(savedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getCommentsByForo = async (req, res) => {
    try {
        const { foroId } = req.params;
        const comments = await Comment.find({ foroId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener comentarios" });
    }
};