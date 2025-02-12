import User from '../models/user.js';
import Teacher from '../models/teachers.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const welcome = (req, res) => {
    res.send('Holis');
};

export const register = async (req, res) => {
    const {username, realname, lastname, grade, group, email, password} = req.body; 

    try {
        const emailFound = await User.findOne({email});
        if (emailFound) return res.status(400).json(['El correo ya existe']);
        
        const userFound = await User.findOne({username});
        if (userFound) return res.status(400).json(['El usuario ya existe']);

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, 
            realname, 
            lastname, 
            grade, 
            group, 
            email, 
            password: passwordHash
        });
        const userSaved = await newUser.save();

        const token = await createAccessToken({id: userSaved._id});
        res.cookie('token', token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None'
        });
        
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            realname: userSaved.realname,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const registerTeachers = async (req, res) => {
    const {username, realname, lastname, email, password} = req.body; 
    try {
        const emailFound = await Teacher.findOne({email});
        if (emailFound) return res.status(400).json(['El correo ya existe']);
        
        const userFound = await Teacher.findOne({username});
        if (userFound) return res.status(400).json(['El usuario ya existe']);

        const passwordHash = await bcrypt.hash(password, 10);

        const newTeacher = new Teacher({
            username, 
            realname, 
            lastname, 
            email, 
            password: passwordHash
        });
        const teacherSaved = await newTeacher.save();

        const token = await createAccessToken({id: teacherSaved._id});
        res.cookie('token', token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None'
        });
        
        res.json({
            id: teacherSaved._id,
            username: teacherSaved.username,
            realname: teacherSaved.realname,
            email: teacherSaved.email,
            createdAt: teacherSaved.createdAt,
            updatedAt: teacherSaved.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const userFound = await User.findOne({email});

        if(!userFound) return res.status(400).json(['No se encontró el usuario']);

        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json(['Contraseña incorrecta']);

        const token = await createAccessToken({id: userFound._id});
        res.cookie('token', token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None'
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            realname: userFound.realname,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginTeachers = async (req, res) => {
    const {email, password} = req.body;

    try {
        const userFound = await Teacher.findOne({email});

        if(!userFound) return res.status(400).json(['No se encontró el usuario']);

        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json(['Contraseña incorrecta']);

        const token = await createAccessToken({id: userFound._id});
        res.cookie('token', token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None'
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            realname: userFound.realname,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};


export const editUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const student = await User.findById(userId);
        const teacher = await Teacher.findById(userId);

        if(student){
            await User.findOneAndUpdate({ _id: userId }, req.body, {
                new: true
            });        }
        if(teacher){
            await Teacher.findOneAndUpdate({ _id: userId }, req.body, {
                new: true
            });        
        }
        if(!teacher && !student){
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        return res.status(200).json({ message: "Usuario editado correctamente" });
    } catch (error) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json({ message: "No autorizado"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "No autorizado"});

        const userFound = await User.findById(user.id);
        const teacherFound = await Teacher.findById(user.id);
        if(!userFound && !teacherFound) return res.status(401).json({message: "No autorizado"});

        if(userFound) {
            return res.json({
                id: userFound._id,
                username: userFound.username,
                realname: userFound.realname,
                lastname: userFound.lastname,
                grade: userFound.grade,
                group: userFound.group,
                email: userFound.email,
            });
        }
        if(teacherFound) {
            return res.json({
                id: teacherFound._id,
                username: teacherFound.username,
                realname: teacherFound.realname,
                lastname: teacherFound.lastname,
                email: teacherFound.email,
            });
        }
    })
}
