import Foro from "../models/foro.js"
import User from "../models/user.js"
import Teacher from "../models/teachers.js"

export const getForos = async (req, res) => {
    try {
        const userId = req.user.id;
        const foros = await Foro.find({
            members: { $nin: [userId] },
            createdBy: { $ne: userId }
        }).sort({ createdAt: -1 })
        .limit(21)
        .populate("members", "realname lastname")
        .populate("createdBy", "realname lastname");

        res.json(foros);
    } catch (error) {
        console.error('Error al obtener foros:', error);
        res.status(500).json({ error: 'Error al obtener foros.' });
    }
};

export const getYourForos = async (req, res) => {
    try {
        const userId = req.user.id;
        const tusForos = await Foro.find({
            $or: [
                { members: userId },     
                { createdBy: userId }  
            ]
        }).sort({ createdAt: -1 })
        .populate("members", "realname lastname")
        .populate("createdBy", "realname lastname");
        
        res.json(tusForos);
    } catch (error) {
        console.error('Error al obtener tus foros:', error);
        res.status(500).json({ error: 'Error al obtener tus foros.' });
    }
};

export const searchForos = async (req, res) => {
    const { title } = req.query;
    try {
        const foros = await Foro.find(
            title ? { bookTitle: { $regex: title, $options: "i" } } : {} 
        ).sort({ createdAt: -1 })
        .populate("members", "realname lastname")
        .populate("createdBy", "realname lastname");

        res.json(foros);
    } catch (error) {
        console.error("Error al buscar foros:", error);
        res.status(500).json({ error: "Error al buscar foros" });
    }
};

export const createForo = async (req, res) => {
    try {
        const { bookTitle, author, grade, group, genre } = req.body;
        const teacherId = req.user.id;
        
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ error: 'Maestro no encontrado.' });
        }

        const members = await User.find({grade, group});
        if (!members) {
            return res.status(404).json({ error: 'No se encontraron alumnos para el grupo de trabajo.' });
        }

        const newForo = new Foro({
            createdBy: teacher._id,
            bookTitle,
            author,
            genre,
            grade,
            group,
            members: Array.isArray(members) ? members : [members]
        });

        const savedForo = await newForo.save();

        const foroConDatos = await Foro.findById(savedForo._id)
        .populate("createdBy", "realname lastname")
        .populate("members", "realname lastname");

        res.json(foroConDatos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getForo = async (req, res) => {
    try {
        const foro = await Foro.findById(req.params.id)
        .populate("createdBy", "realname lastname")
        .populate("members", "realname lastname");

        if (!foro) return res.status(404).json({ message: 'No se encontró foro' });
        res.json(foro);
    } catch (error) {
        return res.status(404).json({message: "Foro no encontrado"});
    }
};

export const deleteForo = async (req, res) => {
    try {
        const foro = await Foro.findByIdAndDelete(req.params.id);
        if (!foro) return res.status(404).json({ message: 'No se encontró foro' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({message: "Foro no encontrado"});
    }
};

export const updateForo = async (req, res) => {
    try {
        const foro = await Foro.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!foro) return res.status(404).json({ message: 'No se encontró foro' });
        res.json(foro);
    } catch (error) {
        return res.status(404).json({message: "Foro no encontrado"});
    }
};
