import axios from "./axios.js";

export const createActivityRequest = (activity, foroId) => axios.post(`/actividad/${foroId}`, activity);

export const getActivitiesRequest = (foroId) => axios.get(`/actividad/${foroId}`);

export const deleteActivityRequest = (activityId) => axios.delete(`/actividad/${activityId}`);
