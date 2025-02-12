import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: "El nombre de usuario es requerido"
    }).min(4, {
        message: 'El nombre de usuario debe ser mayor a 4 caracteres'
    }).max(12, {
        message: 'El nombre de usuario debe ser menor a 12 caracteres'
    }),

    realname: z.string({
        required_error: "El nombre es requerido"
    }).min(3, {
        message: 'El nombre debe ser mayor a 3 caracteres'
    }).max(30, {
        message: 'El nombre de usuario debe ser menor a 30 caracteres'
    }),

    lastname: z.string({
        required_error: "Los apellidos son requeridos"
    }).min(8, {
        message: 'Los apellidos deben ser mayores a 8 caracteres'
    }).max(30, {
        message: 'Los apellidos deben ser menores a 30 caracteres'
    }),

    grade: z.string({
        required_error: "El grado es requerido"
    }),
    group: z.string({
        required_error: "El grupo es requerido"
    }),

    email: z.string({
        required_error: "El email es requerido"
    }).email({
        message: 'Email inválido'
    }).refine((email) => {
        return email.endsWith("@cbtis194.edu.mx");
    }, {
        message: "La cuenta de correo no es válida para acceder",
    }),

    password: z.string({
        required_error: "La contraseña es requerida"
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
    }),

    confirmPassword: z.string({
        required_error: "Confirma la contraseña"
    }).min(8, {
        message: 'La confirmación de contraseña debe tener al menos 8 caracteres.'
    })
}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
});

export const registerTeacherSchema = z.object({
    username: z.string({
        required_error: "El nombre de usuario es requerido"
    }).min(4, {
        message: 'El nombre de usuario debe ser mayor a 4 caracteres'
    }).max(12, {
        message: 'El nombre de usuario debe ser menor a 12 caracteres'
    }),

    realname: z.string({
        required_error: "El nombre es requerido"
    }).min(3, {
        message: 'El nombre debe ser mayor a 3 caracteres'
    }).max(30, {
        message: 'El nombre de usuario debe ser menor a 30 caracteres'
    }),

    lastname: z.string({
        required_error: "Los apellidos son requeridos"
    }).min(8, {
        message: 'Los apellidos deben ser mayores a 8 caracteres'
    }).max(30, {
        message: 'Los apellidos deben ser menores a 30 caracteres'
    }),

    email: z.string({
        required_error: "El email es requerido"
    }).email({
        message: 'Email inválido'
    }).refine((email) => {
        return email.endsWith("@cbtis194.edu.mx");
    }, {
        message: "La cuenta de correo no es válida para acceder",
    }),

    password: z.string({
        required_error: "La contraseña es requerida"
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
    }),

    confirmPassword: z.string({
        required_error: "Confirma la contraseña"
    }).min(8, {
        message: 'La confirmación de contraseña debe tener al menos 8 caracteres.'
    })
}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
});


export const loginSchema = z.object({
    email: z.string({
        required_error: "El email es requerido"
    }).email({
        message: 'El email no es válido'
    }),
    password: z.string({
        required_error: "La contraseña es requerida"
    })
});

export const loginTeachersSchema = z.object({
    email: z.string({
        required_error: "El email es requerido"
    }).email({
        message: 'El email no es válido'
    }),
    password: z.string({
        required_error: "La contraseña es requerida"
    })
});