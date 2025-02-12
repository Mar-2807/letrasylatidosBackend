import { z } from 'zod';

export const createLiveSquema = z.object({
    days: z.string({
        required_error: "El día es requerido"
    }),

    time: z.string({
        required_error: "La hora es requerida"
    }),

    link: z.string({
        required_error: "El link de la reunión es requerido"
    }).url({
        message: "Ingresa una URL válida"
    }).refine((url) => {
        return ["meet.google", "zoom.us"].some(domain => url.includes(domain));    
    }, {
        message: "Solo se permiten links de meet y zoom"
    }),

});