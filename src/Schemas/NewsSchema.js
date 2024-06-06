import { string, z } from 'zod'

export const NewsSchema = z.object({
    title: z
    .string()
    .trim() //proibir os espaços
    .min(3, 'o titulo precisa ter no mínimo três caracteres'),

    banner: z
    .string()
    .trim()
    .min(3, 'esse não é um link compatível'),

    text: z
    .string()
    .trim()
    .min(3, 'o texto precisa ter no mínimo três caracteres')

})



//title
//banner
//text