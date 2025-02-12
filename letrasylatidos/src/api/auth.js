import axios from './axios.js';

export const verifyTokenRequest = (token) => axios.get('/verify', token, { withCredentials: true });

export const registerRequest = (user) => axios.post('/register', user, { withCredentials: true });

export const registerTeachersRequest = (user) => axios.post('/register-teachers', user, { withCredentials: true });

export const loginRequest = (user) => axios.post('/login', user);

export const loginTeachersRequest = (user) => axios.post('/login-teachers', user, { withCredentials: true });

export const editUserRequest = (user) => axios.post('/profile', user, { withCredentials: true });
