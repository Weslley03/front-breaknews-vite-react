import { z } from 'zod'

export const searchSchema = z.object({
    title: z.string().trim().min(1, {message: 'Por favor, preencha os dados'})
  });