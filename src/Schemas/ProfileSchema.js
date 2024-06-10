import { z } from 'zod'

export const ProfileSchema = z.object({
    background: z.string().trim().min(3, {message: 'esse link não válido'}),
    avatar: z.string().trim().min(3, {message: 'esse link não é válido'})
})