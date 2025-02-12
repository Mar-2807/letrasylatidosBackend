import axios from "./axios.js";

export const getForosRequest = () => axios.get('/foros');

export const getYourForosRequest = () => axios.get('/mis-foros');

export const getForoRequest = (id) => axios.get(`/foros/${id}`);

export const createForoRequest = (foro) => axios.post('/foros', foro);

export const updateForoRequest = (foro) => axios.put(`/foros/${foro._id}`, foro);

export const deleteForoRequest = (id) => axios.delete(`/foros/${id}`);

export const searchForosRequest = (searchTitle) => axios.get(`/search-foros?title=${searchTitle}`);

