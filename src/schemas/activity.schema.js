import { z } from 'zod';

export const createActivitySquema = z.object({
    activityName: z.string({
        required_error: "El nombre de la actividad es requerido"
    }).min(3, {
        message: 'El nombre de la actividad debe ser mayor a 3 caracteres'
    }).max(40, {
        message: 'El nombre de la actividad debe ser menor a 40 caracteres'
    }),
    
    activityDescription: z.string({
        required_error: "La descripción es requerida"
    }).min(5, {
        message: 'La descripción debe ser mayor a 5 caracteres'
    }).max(800, {
        message: 'La descripción debe ser menor a 800 caracteres'
    }),

    deadline: z.string({
        required_error: "La fecha de entrega es requerida"
    })
});