import { z } from 'zod'

export const SigninSchema = z.object({
    email: z.string().email({message: 'e-mail inválido'}).toLowerCase(),
    password: z.string().min(6, {message: 'a senha deve ter no mínimo 6 caracteres'})
})