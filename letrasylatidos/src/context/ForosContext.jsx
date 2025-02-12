import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import {
    createForoRequest,
    getForosRequest,
    getForoRequest,
    getYourForosRequest,
    searchForosRequest,
} from "../api/foros.js";
import { 
    createActivityRequest,
    getActivitiesRequest,
    deleteActivityRequest,
} from '../api/activity.js';
import {
    createLiveRequest,
    getLiveRequest,
    deleteLiveRequest,
    editLiveRequest,
} from '../api/live.js'
import { 
    postCommentRequest, 
    getCommentsRequest,
} from "../api/comments.js";

const ForoContext = createContext();

export const useForos = () => {
    const context = useContext(ForoContext);
    if (!context) {
        throw new Error("useForos must be used within a ForoProvider");
    }

    return context;
}

export function ForoProvider({ children }) {
    const [errors, setErrors] = useState([]);
    const [foros, setForos] = useState([]);
    const [foro, setForo] = useState([]);
    const [tusForos, setTusForos] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [activityCreated, setActivityCreated] = useState(false);
    const [activities, setActivities] = useState([]);
    const [comments, setComments] = useState([]);
    const [live, setLive] = useState([]);

    const getForo = async (id) => {
        try {
            const res = await getForoRequest(id);
            setForo(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getForos = async () => {
        try {
            const res = await getForosRequest();
            setForos(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    const getYourForos = async () => {
        try {
            const res = await getYourForosRequest();
            setTusForos(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const searchForos = async (searchTitle) => {
        try {
            const res = await searchForosRequest(searchTitle);
            setForos(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    const searchYourForos = async (searchTitle) => {
        try {
            const res = await searchForosRequest(searchTitle);
            setTusForos(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const createForo = async (foro) => {
        try {
            const res = await createForoRequest(foro);
            setIsCreated(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const createActivity = async (data, id) => {
        try {
            const res = await createActivityRequest(data, id);
            setActivityCreated(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const getActivities = async (foroId) => {
        try {
            const res = await getActivitiesRequest(foroId);
            setActivities(res.data);
        } catch (error) {
            console.error("Error al obtener actividades:", error);
        }
    };

    const deleteActivity = async (activityId) => {
        try {
            if(window.confirm("¿Está seguro de querer borrar esta tarea?")){
                await deleteActivityRequest(activityId);
            }
        } catch (error) {
            console.error("Error al eliminar actividad:", error);
        }
    }

    const createLive = async (data, foroId) => {
        try {
            const res = await createLiveRequest(data, foroId);
            setLive(res.data)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }
    
    const getLive = async (foroId) => {
        try {
            const res = await getLiveRequest(foroId);
            setLive(res.data)
        } catch (error) {
            console.error("Error al obtener foro en vivo:", error);
        }
    }

    const deleteLive = async (liveId) => {
        try {
            if(window.confirm("¿Está seguro de querer borrar este live?")){
                await deleteLiveRequest(liveId);
            }
        } catch (error) {
            console.error("Error al eliminar actividad:", error);
        }
    }

    const editLive = async (live, foroId) => {
        try {
            await editLiveRequest(live, foroId);
        } catch (error) {
            console.error("Error al editar actividad:", error);
        }
    }

    const postComment = async (comment, foro, user) => {
        try {
            await postCommentRequest(comment, foro, user);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);        }
    }

    const getComments = async (foroId) => {
        try {
            const res = await getCommentsRequest(foroId);
            setComments(res.data);
        } catch (error) {
            console.error("Error al obtener comentarios:", error);
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [errors])

    return (
        <ForoContext.Provider value={{
            foros,
            foro,
            tusForos,
            createForo,
            createActivity,
            getForos,
            getYourForos,
            getForo,
            searchForos,
            searchYourForos,
            setIsCreated,
            isCreated,
            setActivityCreated,
            activityCreated,
            getActivities,
            deleteActivity,
            activities,
            createLive,
            getLive,
            deleteLive,
            live,
            editLive,
            postComment,
            getComments,
            comments,
            errors,
        }}>
            {children}
        </ForoContext.Provider>
    );
}