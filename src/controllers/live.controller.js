import Foro from "../models/foro.js";
import Live from "../models/live.js"

export const createLive = async (req, res) => {
    try {
        const { days, time, link } = req.body;
        const foroId = req.params.foroId;
        const foro = await Foro.findById(foroId);
        if (!foro) {
            return res.status(404).json(['Foro de procedencia no encontrado.']);
        }

        const createdLive = await Live.findOne({foroId});
        if(createdLive) {
            return res.status(500).json(['El foro ya tiene un Live']);
        }
        const newLive = new Live({
            foroId: foro._id,
            days,
            time,
            link
        });

        const savedLive = await newLive.save();
        res.json(savedLive);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getLiveByForo = async (req, res) => {
    try {
        const { foroId } = req.params;
        const live = await Live.findOne({ foroId });
        res.json(live);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteLive = async (req, res) => {
    try {
        const live = await Live.findByIdAndDelete(req.params.foroId);
        if (!live) return res.status(404).json({ message: 'No se encontró el live' });
        return res.status(200).json({message: "Live eliminado"});
    } catch (error) {
        return res.status(404).json({message: "Live no encontrado"});
    }
}; 

export const editLive = async (req, res) => {
    try {
        const live = await Live.findOneAndUpdate({ foroId: req.params.foroId }, req.body, {
            new: true
        });        
        if (!live) return res.status(404).json({ message: 'No se encontró el live' });
        return res.status(200).json({message: "Live editado correctamente"});
    } catch (error) {
        return res.status(404).json({message: "Live no encontrado"});
    }
}