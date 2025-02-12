import { z } from 'zod';

export const createForoSquema = z.object({
    bookTitle: z.string({
        required_error: "El título del libro es requerido"
    }).min(1, {
        message: 'El título del libro debe ser mayor a 1 caracter'
    }),

    author: z.string({
        required_error: "El nombre del autor es requerido"
    }).min(3, {
        message: 'El nombre del autor debe ser mayor a 3 caracteres'
    }).max(40, {
        message: 'El nombre del autor debe ser menor a 40 caracteres'
    }),

    genre: z.string({
        required_error: "El género es requerido"
    }),

    grade: z.string({
        required_error: "El grado es requerido"
    }),
    group: z.string({
        required_error: "El grupo es requerido"
    })
});