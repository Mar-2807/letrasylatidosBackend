import axios from "./axios.js";

export const postCommentRequest = (comment, foro, user) => axios.post(`/comment/${foro}`, comment, user);

export const getCommentsRequest = (foroId) => axios.get(`/comment/${foroId}`);
