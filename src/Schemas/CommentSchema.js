import { string, z } from 'zod'

const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*?(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

export const CommentSchema = z.object({
    title: z
    .string()
    .trim() 
    .min(3, 'o titulo precisa ter no mínimo três caracteres'),

    //banner: z
    //.string()
    //.regex(base64Regex, 'a imagem precisa estar no formato Base64')
    //.min(1, 'esse não é um link compatível'),

    text: z
    .string()
    .trim()
    .min(3, 'o texto precisa ter no mínimo três caracteres')

})