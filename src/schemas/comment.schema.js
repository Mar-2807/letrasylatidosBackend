import { z } from 'zod';

export const createCommentSquema = z.object({
    comment: z.string({
        required_error: "El día es requerido"
    }).max(2000, {
        message: 'El comentario debe ser menor a 4000 caracteres'
    }),
});