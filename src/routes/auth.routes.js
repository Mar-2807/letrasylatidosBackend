import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    login, 
    loginTeachers,
    register, 
    registerTeachers,
    welcome, 
    logout, 
    editUser,
    verifyToken,
} from '../controllers/auth.controller.js';
import { validateSchema } from "../middlewares/validator.middleware.js";
import { 
    registerSchema, 
    loginSchema,
    registerTeacherSchema,
    loginTeachersSchema,
} from "../schemas/auth.schema.js";

const router = Router();

router.get('/', welcome);
router.post('/register', validateSchema(registerSchema), register);
router.post('/register-teachers', validateSchema(registerTeacherSchema), registerTeachers);
router.post('/login', validateSchema(loginSchema), login);
router.post('/login-teachers', validateSchema(loginTeachersSchema), loginTeachers);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.post('/profile', authRequired, editUser);

export default router;