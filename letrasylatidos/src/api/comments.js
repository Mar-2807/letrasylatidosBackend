import axios from "./axios.js";

export const postCommentRequest = (comment, foro, user) => axios.post(`/comment/${foro}`, comment, user, { withCredentials: true });

export const getCommentsRequest = (foroId) => axios.get(`/comment/${foroId}`, { withCredentials: true });
