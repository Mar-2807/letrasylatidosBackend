import axios from './axios.js';

export const verifyTokenRequest = (token) => axios.get('/verify', token);

export const registerRequest = (user) => axios.post('/register', user);

export const registerTeachersRequest = (user) => axios.post('/register-teachers', user);

export const loginRequest = (user) => axios.post('/login', user);

export const loginTeachersRequest = (user) => axios.post('/login-teachers', user);

export const editUserRequest = (user) => axios.post('/profile', user);
