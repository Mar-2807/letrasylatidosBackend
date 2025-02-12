import axios from "./axios.js";

export const getForosRequest = () => axios.get('/foros', { withCredentials: true });

export const getYourForosRequest = () => axios.get('/mis-foros', { withCredentials: true });

export const getForoRequest = (id) => axios.get(`/foros/${id}`, { withCredentials: true });

export const createForoRequest = (foro) => axios.post('/foros', foro, { withCredentials: true });

export const updateForoRequest = (foro) => axios.put(`/foros/${foro._id}`, foro, { withCredentials: true });

export const deleteForoRequest = (id) => axios.delete(`/foros/${id}`, { withCredentials: true });

export const searchForosRequest = (searchTitle) => axios.get(`/search-foros?title=${searchTitle}`, { withCredentials: true });

