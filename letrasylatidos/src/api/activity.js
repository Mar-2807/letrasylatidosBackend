import axios from "./axios.js";

export const createActivityRequest = (activity, foroId) => axios.post(`/actividad/${foroId}`, activity, { withCredentials: true });

export const getActivitiesRequest = (foroId) => axios.get(`/actividad/${foroId}`, { withCredentials: true });

export const deleteActivityRequest = (activityId) => axios.delete(`/actividad/${activityId}`, { withCredentials: true });
