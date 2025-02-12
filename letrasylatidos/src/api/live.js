import axios from "./axios.js";

export const createLiveRequest = (live, foroId) => axios.post(`/live/${foroId}`, live);

export const getLiveRequest = (foroId) => axios.get(`/live/${foroId}`);

export const deleteLiveRequest = (foroId) => axios.delete(`/live/${foroId}`);

export const editLiveRequest = (live, foroId) => axios.put(`/live/${foroId}`, live);
