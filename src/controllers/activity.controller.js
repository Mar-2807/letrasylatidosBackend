import Activity from "../models/activity.js";
import Foro from "../models/foro.js";

export const createActivity = async (req, res) => {
    try {
        const { activityName, activityDescription, deadline } = req.body;
        const foroId = req.params.foroId;
        
        const foro = await Foro.findById(foroId);
        if (!foro) {
            return res.status(404).json({ error: 'Foro de procedencia no encontrado.' });
        }

        const newActivity = new Activity({
            foroId: foro._id,
            activityName,
            activityDescription,
            deadline
        });

        const savedActivity = await newActivity.save();
        res.json(savedActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getActivitiesByForo = async (req, res) => {
    try {
        const { foroId } = req.params;
        const activities = await Activity.find({ foroId });
        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.activityId);
        console.log(activity)
        if (!activity) return res.status(404).json({ message: 'No se encontró la actividad' });
        return res.status(200).json({message: "Actividad eliminada"});
    } catch (error) {
        return res.status(404).json({message: "Actividad no encontrada"});
    }
}; 