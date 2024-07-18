import { z } from 'zod'

export const CommentSchema = z.object({
    comment: z
    .string()
    .trim() 
    .min(2, {message: 'o comentario precisa ter no mínimo dois caracteres'}),
})