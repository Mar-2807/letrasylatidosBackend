import axios from "./axios.js";

export const createLiveRequest = (live, foroId) => axios.post(`/live/${foroId}`, live, { withCredentials: true });

export const getLiveRequest = (foroId) => axios.get(`/live/${foroId}`, { withCredentials: true });

export const deleteLiveRequest = (foroId) => axios.delete(`/live/${foroId}`, { withCredentials: true });

export const editLiveRequest = (live, foroId) => axios.put(`/live/${foroId}`, live, { withCredentials: true });
